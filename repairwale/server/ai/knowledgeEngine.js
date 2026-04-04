const fs = require('fs');
const path = require('path');

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it',
  'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'you', 'your', 'we', 'our'
]);

const EMBEDDING_DIM = 192;

function normalize(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
  const tokens = normalize(text).split(' ').filter(Boolean);
  return tokens.filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function buildLocalEmbedding(text) {
  const tokens = tokenize(text);
  const vector = new Array(EMBEDDING_DIM).fill(0);

  for (const token of tokens) {
    // Use a small hashed embedding space for fast local semantic retrieval.
    let hash = 2166136261;
    for (let i = 0; i < token.length; i += 1) {
      hash ^= token.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const idx = Math.abs(hash) % EMBEDDING_DIM;
    vector[idx] += 1;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  if (!magnitude) return vector;

  return vector.map((v) => v / magnitude);
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += (a[i] || 0) * (b[i] || 0);
  }
  return dot;
}

function splitIntoWordChunks(content, chunkSize = 120, overlap = 24) {
  const words = String(content || '').split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const chunks = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);
    chunks.push(words.slice(start, end).join(' '));
    if (end === words.length) break;
    start = Math.max(0, end - overlap);
  }

  return chunks;
}

function createKnowledgeEngine({ persistPath }) {
  const state = {
    chunks: [],
    bySource: new Map(),
    updatedAt: null
  };

  function hydrateSources() {
    state.bySource = new Map();
    for (const chunk of state.chunks) {
      const source = chunk.source || 'unknown';
      const count = state.bySource.get(source) || 0;
      state.bySource.set(source, count + 1);
    }
  }

  function save() {
    try {
      const folder = path.dirname(persistPath);
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(
        persistPath,
        JSON.stringify({ chunks: state.chunks, updatedAt: state.updatedAt }, null, 2),
        'utf8'
      );
      return true;
    } catch (error) {
      console.error('[AI] Failed to persist knowledge:', error.message);
      return false;
    }
  }

  function load() {
    try {
      if (!fs.existsSync(persistPath)) return false;
      const raw = fs.readFileSync(persistPath, 'utf8');
      const parsed = JSON.parse(raw);
      state.chunks = Array.isArray(parsed.chunks) ? parsed.chunks : [];
      state.updatedAt = parsed.updatedAt || new Date().toISOString();
      hydrateSources();
      console.log(`[AI] Loaded ${state.chunks.length} chunks from ${persistPath}`);
      return true;
    } catch (error) {
      console.error('[AI] Failed to load knowledge store:', error.message);
      state.chunks = [];
      state.updatedAt = null;
      state.bySource = new Map();
      return false;
    }
  }

  function reset() {
    state.chunks = [];
    state.bySource = new Map();
    state.updatedAt = new Date().toISOString();
  }

  function ingestDocuments(documents, options = {}) {
    const { resetBefore = false, sourcePrefix = 'dataset', chunkSize = 120, overlap = 24 } = options;

    if (!Array.isArray(documents)) {
      throw new Error('documents must be an array');
    }

    if (resetBefore) reset();

    let addedChunks = 0;

    documents.forEach((doc, index) => {
      if (!doc || !doc.content) return;

      const title = String(doc.title || `Document ${index + 1}`);
      const source = String(doc.source || `${sourcePrefix}-${index + 1}`);
      const tags = Array.isArray(doc.tags) ? doc.tags.map((x) => String(x).toLowerCase()) : [];
      const parts = splitIntoWordChunks(doc.content, chunkSize, overlap);

      parts.forEach((text, i) => {
        const tokens = tokenize(`${title} ${text} ${tags.join(' ')}`);
        const tf = {};
        tokens.forEach((t) => {
          tf[t] = (tf[t] || 0) + 1;
        });

        state.chunks.push({
          id: `${source}::${i + 1}`,
          source,
          title,
          tags,
          text,
          tf,
          tokenCount: tokens.length,
          embedding: buildLocalEmbedding(`${title} ${tags.join(' ')} ${text}`)
        });

        addedChunks += 1;
      });
    });

    state.updatedAt = new Date().toISOString();
    hydrateSources();

    return {
      addedChunks,
      totalChunks: state.chunks.length,
      sourceCount: state.bySource.size,
      updatedAt: state.updatedAt
    };
  }

  function search(query, topK = 4) {
    const qTokens = tokenize(query);
    const qEmbedding = buildLocalEmbedding(query);
    if (!qTokens.length || !state.chunks.length) return [];

    const scored = state.chunks
      .map((chunk) => {
        let lexicalScore = 0;
        for (const token of qTokens) {
          const tf = chunk.tf[token] || 0;
          if (!tf) continue;
          const tagBoost = chunk.tags.includes(token) ? 1.5 : 1;
          lexicalScore += tf * tagBoost;
        }

        const semanticScore = Math.max(0, cosineSimilarity(qEmbedding, chunk.embedding || []));
        const score = lexicalScore * 0.55 + semanticScore * 4.5;

        if (score <= 0) return null;

        return {
          ...chunk,
          score,
          lexicalScore,
          semanticScore
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.max(1, Math.min(Number(topK) || 4, 10)));

    return scored;
  }

  function answerQuestion(question, topK = 4) {
    const matches = search(question, topK);

    if (!matches.length) {
      return {
        answer: "I don't have enough information in the current knowledge base yet. Please import more training documents.",
        citations: [],
        confidence: 0
      };
    }

    const primary = matches[0];
    const bullets = matches.slice(0, Math.min(matches.length, 3)).map((m) => `- ${m.text.slice(0, 180)}${m.text.length > 180 ? '...' : ''}`);

    return {
      answer: `Based on the knowledge base, here is what I found:\n\n${bullets.join('\n')}\n\nPrimary source: ${primary.title}`,
      citations: matches.map((m) => ({
        id: m.id,
        source: m.source,
        title: m.title,
        score: Number(m.score.toFixed(3)),
        lexicalScore: Number((m.lexicalScore || 0).toFixed(3)),
        semanticScore: Number((m.semanticScore || 0).toFixed(3)),
        preview: m.text.slice(0, 180)
      })),
      confidence: Number((Math.min(primary.score / 6, 1)).toFixed(3)),
      retrievalMode: 'hybrid-embedding'
    };
  }

  function stats() {
    return {
      chunks: state.chunks.length,
      sources: state.bySource.size,
      updatedAt: state.updatedAt,
      embedding: {
        type: 'local-hash',
        dimensions: EMBEDDING_DIM
      },
      sourceBreakdown: Array.from(state.bySource.entries()).map(([source, count]) => ({ source, chunks: count }))
    };
  }

  function bootstrapDefaults() {
    if (state.chunks.length) return;

    ingestDocuments([
      {
        source: 'repairwale-services',
        title: 'RepairWale Core Services',
        tags: ['services', 'pricing', 'emergency', 'booking'],
        content:
          'Emergency services include breakdown quick fix 549 INR, flat tyre assist 399 INR, and battery jump-start 299 INR. Maintenance includes basic service 1299 INR and comprehensive service 2299 INR. Customers can book from the service page, add items to cart, and proceed to checkout. Tracking is available from the orders page after booking.'
      },
      {
        source: 'repairwale-support',
        title: 'Support and Policy',
        tags: ['support', 'refund', 'warranty', 'tracking'],
        content:
          'Support is available through in-app chat and phone helpdesk. Users can track mechanic location in real time from tracking page. Payment methods include UPI, cards, and wallet. Refund and cancellation handling depends on service stage. Warranty and quality checks are offered for completed services.'
      }
    ], { resetBefore: true });

    save();
  }

  return {
    load,
    save,
    reset,
    ingestDocuments,
    search,
    answerQuestion,
    stats,
    bootstrapDefaults
  };
}

module.exports = { createKnowledgeEngine };
