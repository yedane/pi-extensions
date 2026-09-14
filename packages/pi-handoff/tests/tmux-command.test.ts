import assert from "node:assert/strict"
import { test } from "node:test"
import { buildTmuxHandoffCommand } from "../src/index.ts"

test("builds a quoted pi command for tmux", () => {
  const command = buildTmuxHandoffCommand({
    piBin: "pi",
    sessionPath: "/tmp/sessions/child.jsonl",
    sessionName: "[handoff] fix-auth",
    provider: "anthropic",
    model: "claude-sonnet-4-5",
    prompt: "Continue from this handoff:\n\n/tmp/handoff.md",
  })

  assert.equal(
    command,
    "pi --session '/tmp/sessions/child.jsonl' --name '[handoff] fix-auth' " +
      "--provider 'anthropic' --model 'claude-sonnet-4-5' " +
      "'Continue from this handoff:\n\n/tmp/handoff.md'",
  )
})

test("escapes single quotes in arguments", () => {
  const command = buildTmuxHandoffCommand({
    piBin: "pi",
    sessionPath: "/tmp/a.jsonl",
    sessionName: "it's fine",
    provider: "p",
    model: "m",
    prompt: "x",
  })

  assert.match(command, /--name 'it'\\''s fine'/)
})
