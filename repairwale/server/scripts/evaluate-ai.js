const fs = require('fs');
const path = require('path');
const { createKnowledgeEngine } = require('../ai/knowledgeEngine');

function normalize(text) {
  return String(text || '').toLowerCase();
}

function pct(part, total) {
  if (!total) return 0;
  return Number(((part / total) * 100).toFixed(2));
}

function main() {
  const evalPathArg = process.argv[2] || './db/ai_eval.sample.json';
  const topKArg = Number(process.argv[3] || 4);
  const evalPath = path.resolve(evalPathArg);

  if (!fs.existsSync(evalPath)) {
    console.error('Evaluation dataset not found:', evalPath);
    process.exit(1);
  }

  const suite = JSON.parse(fs.readFileSync(evalPath, 'utf8'));
  if (!Array.isArray(suite) || !suite.length) {
    console.error('Evaluation dataset is empty or invalid.');
    process.exit(1);
  }

  const engine = createKnowledgeEngine({
    persistPath: path.join(__dirname, '..', 'db', 'ai_knowledge.json')
  });
  engine.load();

  let retrievalHits = 0;
  let answerKeywordHits = 0;

  const rows = suite.map((item, idx) => {
    const question = item.question || '';
    const expectedSources = Array.isArray(item.expectedSources) ? item.expectedSources : [];
    const mustContain = Array.isArray(item.mustContain) ? item.mustContain : [];

    const answer = engine.answerQuestion(question, topKArg);
    const sources = answer.citations.map((c) => c.source);

    const retrievalOk = expectedSources.length
      ? expectedSources.some((s) => sources.includes(s))
      : answer.citations.length > 0;

    if (retrievalOk) retrievalHits += 1;

    const answerText = normalize(answer.answer);
    const keywordOkCount = mustContain.filter((kw) => answerText.includes(normalize(kw))).length;
    const keywordOk = mustContain.length ? keywordOkCount / mustContain.length >= 0.5 : true;

    if (keywordOk) answerKeywordHits += 1;

    return {
      id: item.id || `q${idx + 1}`,
      retrievalOk,
      keywordOk,
      confidence: answer.confidence,
      topSource: answer.citations[0]?.source || 'none',
      sources,
      keywordMatched: keywordOkCount,
      keywordTotal: mustContain.length
    };
  });

  const summary = {
    questions: suite.length,
    topK: topKArg,
    retrievalHitRate: pct(retrievalHits, suite.length),
    answerKeywordScore: pct(answerKeywordHits, suite.length),
    combinedScore: Number((((retrievalHits + answerKeywordHits) / (suite.length * 2)) * 100).toFixed(2))
  };

  console.log('AI Evaluation Summary');
  console.log(JSON.stringify(summary, null, 2));
  console.log('AI Evaluation Details');
  console.log(JSON.stringify(rows, null, 2));
}

main();
