const fs = require('fs');
const path = require('path');
const { createKnowledgeEngine } = require('../ai/knowledgeEngine');

function parseDataset(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const trimmed = raw.trim();

  if (!trimmed) return [];

  // JSON array format
  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : [];
  }

  // JSON Lines format
  return trimmed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function main() {
  const inputPath = process.argv[2];
  const shouldReset = process.argv.includes('--reset');

  if (!inputPath) {
    console.error('Usage: node scripts/import-ai-knowledge.js <dataset.json|dataset.jsonl> [--reset]');
    process.exit(1);
  }

  const absoluteInput = path.resolve(inputPath);
  if (!fs.existsSync(absoluteInput)) {
    console.error('Dataset file not found:', absoluteInput);
    process.exit(1);
  }

  const dataset = parseDataset(absoluteInput);
  if (!dataset.length) {
    console.error('No documents found in dataset file.');
    process.exit(1);
  }

  const engine = createKnowledgeEngine({
    persistPath: path.join(__dirname, '..', 'db', 'ai_knowledge.json')
  });

  engine.load();

  const result = engine.ingestDocuments(dataset, {
    resetBefore: shouldReset,
    sourcePrefix: 'imported',
    chunkSize: 120,
    overlap: 24
  });

  engine.save();

  console.log('AI dataset import complete');
  console.log(JSON.stringify({
    importedDocuments: dataset.length,
    ...result,
    stats: engine.stats()
  }, null, 2));
}

main();
