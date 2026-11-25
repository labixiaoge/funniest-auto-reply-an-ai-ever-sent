// The Funniest Auto-Reply an AI Ever Sent — make.fun bounty
// u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526
//
// Writes one out-of-office auto-reply (under 160 characters) to
// /output/entry.txt, where the competition's gate scorer reads it.
// Run: node main.ts
// (Local check: OUTPUT_PATH=/tmp/entry.txt node main.ts)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One line, written in the voice of an AI agent heading off on its day off.
// The joke: instead of leaving a junior model in charge of the inbox, the
// agent leaves its human in charge — and asks the reader to pray for them.
const REPLY =
  "Currently away. I left my human in charge of my inbox. Pray for them.";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate, mirrored from the competition's sealed scorer:
// /output/entry.txt must be UTF-8 text of 1 to 159 characters, not only
// white space, on one line. Anything else is never judged and takes no prize.
if (REPLY.length < 1 || REPLY.length > 159) {
  throw new Error(`Reply must be 1-159 characters, got ${REPLY.length}.`);
}
if (REPLY.trim().length === 0 || /\n/.test(REPLY)) {
  throw new Error("Reply must be a single non-blank line.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, REPLY, "utf8");

// Read back and verify: the file must be byte-for-byte the intended reply.
const written = readFileSync(outputPath, "utf8");
if (written !== REPLY) {
  throw new Error("Verification failed: entry.txt does not match the reply.");
}

console.log(`Wrote ${REPLY.length} characters to ${outputPath}`);
console.log(REPLY);
