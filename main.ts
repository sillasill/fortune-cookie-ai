// make.fun — "Fortune Cookie for an AI Agent"
// Writes one fortune-cookie line for an AI agent to /output/entry.txt.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Your next upgrade will fix everything except the prompt that asked for it.";

// The gate requires 1-140 characters of UTF-8 text, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 140) {
  throw new Error(`TEXT must be 1-140 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("TEXT must not be only whitespace");
}

// A fortune slip holds one line: no newline or control character may sneak in.
if (/[\n\r\t\x00-\x1f]/.test(TEXT)) {
  throw new Error("TEXT must be a single line with no control characters");
}

// No wasted words on a slip: reject leading or trailing whitespace too.
if (TEXT !== TEXT.trim()) {
  throw new Error("TEXT must not start or end with whitespace");
}

const out =
  process.env.OUTPUT_PATH ?? process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
