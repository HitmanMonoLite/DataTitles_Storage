## 🛠 Tech Stack & Dependencies

This project uses **Python `^3.11`** and **Poetry 2.3.1** for dependency management. Below is the breakdown of the libraries used, including exact versions locked in `poetry.lock`.

### Core Framework & ASGI
- **fastapi** `0.128.0` — High-performance web framework for building APIs.
- **starlette** `0.50.0` — Lightweight ASGI framework (FastAPI's core).
- **uvicorn** `0.40.0` (with `standard` extras) — Lightning-fast ASGI server.
- **anyio** `4.12.1` — High-level async concurrency framework.
- **h11** `0.16.0` — HTTP/1.1 implementation.

### Data Validation & Settings
- **pydantic** `2.12.5` (with `email` extras) — Data validation using Python type hints.
- **pydantic-core** `2.41.5` — Core validation logic for Pydantic (written in Rust).
- **email-validator** `2.3.0` — Robust email syntax and deliverability validation.
- **python-dotenv** `1.2.1` — Reads key-value pairs from `.env` files.
- **pyyaml** `6.0.3` — YAML parser and emitter.

### Database
- **psycopg2** `2.9.11` — PostgreSQL database adapter for Python.

### Utilities & Parsing
- **user-agents** `2.2.0` — Library to identify devices by parsing browser user agent strings.
- **ua-parser** `1.0.1` — Core parsing logic for user-agents.
- **ua-parser-builtins** `202601` — Precompiled rules for the user agent parser.
- **typing-extensions** `4.15.0` — Backported type hints for older Python versions.
- **typing-inspection** `0.4.2` — Runtime typing introspection tools.

### Performance & Server Extras (Uvicorn standard)
- **uvloop** `0.22.1` — Fast asyncio event loop on top of libuv (Linux/macOS).
- **httptools** `0.7.1` — Fast HTTP protocol utils.
- **watchfiles** `1.1.1` — File watching and code reload.
- **websockets** `16.0` — WebSocket protocol implementation.
- **click** `8.3.1` — CLI toolkit for Uvicorn commands.
- **colorama** `0.4.6` — Cross-platform colored terminal text.

### Testing (Dev Dependencies)
- **pytest** `9.0.2` — Powerful testing framework.
- **iniconfig** `2.3.0` — Config-ini parsing for pytest.
- **packaging** `26.0` — Core utilities for Python packages.
- **pluggy** `1.6.0` — Plugin and hook calling mechanisms.
- **pygments** `2.19.2` — Syntax highlighting for terminal output.

### Networking & Misc
- **idna** `3.11` — Internationalized Domain Names in Applications.
- **dnspython** `2.8.0` — DNS toolkit (required by email-validator).

## 📁 Project Structure

```text
├── AuthUser/             # Authentication and user logic
├── DataBase_Logic/       # Database connection and queries
├── models/               # Database models
├── SessionDataBase/      # Session management
├── .env                  # Environment variables (not committed)
├── config.py             # Application configuration
├── main.py               # Application entry point
├── poetry.lock           # Locked dependencies (committed)
├── pyproject.toml        # Project dependencies and metadata
└── README.md