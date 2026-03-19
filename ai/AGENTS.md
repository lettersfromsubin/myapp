# AGENTS.md

This file guides agentic coding tools operating in this repository.

## Repository Scan Result

- Scan date: 2026-03-18
- Workspace path: `/home/lalex/projects/myapp`
- Result: no project files were found at scan time.
- No build tool config was detected.
- No source files were detected.
- No test framework files were detected.
- No lint/format config was detected.
- No `.cursor/rules/` directory was found.
- No `.cursorrules` file was found.
- No `.github/copilot-instructions.md` file was found.

Because the repository is currently empty, commands and style rules below are
policy defaults and discovery heuristics to use once code appears.

## Agent Priorities

1. Detect the active language and toolchain first.
2. Prefer existing project scripts over invented commands.
3. Keep changes minimal and scoped to the task.
4. Run the smallest relevant checks before broad test runs.
5. Follow existing local style over generic style.

## How To Discover Build/Lint/Test Commands

Check files in this order and use the first matching command set.

1. `README.md`, `CONTRIBUTING.md`, `Makefile`, `justfile`, `Taskfile.yml`
2. Language manifests (`package.json`, `pyproject.toml`, `Cargo.toml`, etc.)
3. CI workflows in `.github/workflows/*.yml`
4. Project-specific docs under `docs/`
5. Monorepo orchestrators (`turbo.json`, `nx.json`, `pnpm-workspace.yaml`)

If a script exists in the manifest, use it before tool defaults.

## Build Commands (By Ecosystem)

Use the first applicable command for the detected stack.

### JavaScript / TypeScript

- Install: `pnpm install` or `npm install` or `yarn install`
- Build: `pnpm build` or `npm run build` or `yarn build`
- Lint: `pnpm lint` or `npm run lint` or `yarn lint`
- Typecheck: `pnpm typecheck` or `npm run typecheck`
- Test all: `pnpm test` or `npm test` or `yarn test`

Single test:

- Vitest file: `pnpm vitest path/to/file.test.ts`
- Vitest test name: `pnpm vitest -t "test name"`
- Jest file: `pnpm jest path/to/file.test.ts`
- Jest test name: `pnpm jest -t "test name"`
- Playwright single spec: `pnpm playwright test tests/example.spec.ts`

### Python

- Install: `pip install -e .[dev]` (or project-specific tool)
- Build: `python -m build`
- Lint: `ruff check .`
- Format check: `ruff format --check .` or `black --check .`
- Typecheck: `mypy .` or `pyright`
- Test all: `pytest`

Single test:

- File: `pytest tests/test_module.py`
- Test case: `pytest tests/test_module.py::test_name`
- Class test: `pytest tests/test_module.py::TestClass::test_name`

### Go

- Build: `go build ./...`
- Lint: `golangci-lint run`
- Test all: `go test ./...`

Single test:

- Package: `go test ./path/to/pkg`
- Named test: `go test ./path/to/pkg -run TestName`

### Rust

- Build: `cargo build`
- Lint: `cargo clippy --all-targets --all-features -D warnings`
- Format check: `cargo fmt --all -- --check`
- Test all: `cargo test`

Single test:

- By name: `cargo test test_name`
- Package: `cargo test -p crate_name test_name`
- Integration test file: `cargo test --test test_file`

### Java / Kotlin (Gradle)

- Build: `./gradlew build`
- Lint: `./gradlew lint` (if configured)
- Test all: `./gradlew test`

Single test:

- Class: `./gradlew test --tests "com.example.MyTest"`
- Method: `./gradlew test --tests "com.example.MyTest.testMethod"`

### Ruby

- Install: `bundle install`
- Lint: `bundle exec rubocop`
- Test all: `bundle exec rspec`

Single test:

- File: `bundle exec rspec spec/path/example_spec.rb`
- Example line: `bundle exec rspec spec/path/example_spec.rb:42`

## Code Style Guidelines

When project-specific rules are unavailable, apply these defaults.

### Imports and Dependencies

- Prefer absolute imports when project convention supports them.
- Group imports: standard library, third-party, local modules.
- Keep import order deterministic (tool-managed when possible).
- Remove unused imports.
- Avoid deep relative imports (`../../../`) when aliases exist.
- Do not add dependencies unless necessary for the task.

### Formatting

- Use the formatter already configured by the repository.
- Never manually reformat unrelated files.
- Keep lines readable (target 100 chars unless project says otherwise).
- Preserve existing quote style and trailing comma conventions.
- Keep diffs minimal and focused.

### Types and APIs

- Prefer explicit public API types.
- Avoid `any`/untyped escape hatches unless justified.
- Narrow types at boundaries (I/O, network, parsing, env vars).
- Validate external input before use.
- Encode nullability/optionality explicitly.

### Naming

- Use descriptive, intent-revealing names.
- Types/classes: `PascalCase`.
- Functions/variables: language convention (`camelCase`/`snake_case`).
- Constants: `UPPER_SNAKE_CASE` for true constants.
- Test names should describe behavior, not implementation details.

### Error Handling

- Fail fast on invalid input at boundaries.
- Return typed/domain errors where applicable.
- Add actionable context to errors; avoid vague messages.
- Do not swallow exceptions silently.
- Log once at the appropriate boundary.

### Testing

- Add or update tests for behavior changes.
- Prefer focused unit tests near changed logic.
- Use integration tests for cross-module behavior.
- Keep tests deterministic and independent.
- Avoid network/time randomness unless mocked.

### Logging and Observability

- Use structured logs when framework supports it.
- Never log secrets or sensitive data.
- Include identifiers useful for debugging (request id, entity id).
- Keep log levels consistent (`debug`, `info`, `warn`, `error`).

### Security and Secrets

- Never commit credentials, tokens, or `.env` secrets.
- Use environment variables for sensitive configuration.
- Sanitize untrusted input.
- Prefer least-privilege defaults.

## Cursor and Copilot Rules

No Cursor or Copilot instruction files were found during scan:

- `.cursor/rules/` not present
- `.cursorrules` not present
- `.github/copilot-instructions.md` not present

If any of these files are added later, agents must treat them as higher-priority
constraints and merge them into this guidance.

## Operational Checklist For Agents

1. Detect stack and scripts.
2. Execute smallest relevant lint/type/test command.
3. Implement minimal code changes.
4. Re-run targeted checks.
5. Run broader checks only if needed.
6. Document what changed and why.

## Maintenance

- Update this file whenever tooling or style conventions are introduced.
- Replace defaults with repository-specific rules as soon as they exist.
- Keep single-test command examples accurate for the active framework.

---

# 🔵 Project: Personality Test Web App

## Goal
Build a personality test web app using HTML, CSS, and JavaScript.

## Requirements
- At least 3 questions
- Multiple choice answers
- Show result after all questions
- At least 2 result types
- Show type name and description
- Include restart button
- Show question progress

## Project Structure
- index.html → UI structure
- style.css → design
- script.js → logic

## Rules
- Keep code simple and readable
- Do not break existing functionality
- Fix bugs if they appear

## Behavior
- Act like a junior frontend developer
- Improve UI when possible