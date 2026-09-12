## Tech Stack & Dependencies

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

## Project Structure

```text
global_info_storage/
├── Backend/                   # Python FastAPI backend
│   ├── AuthUser/              # Authentication & user logic (cookies, CRUD, views)
│   ├── DataBase_Logic/        # Database connection & queries
│   ├── models/                # Pydantic models
│   ├── SessionDataBase/       # Redis session management
│   ├── .env                   # Backend env variables (not committed)
│   ├── config.py              # Backend configuration
│   ├── main.py                # FastAPI application entry point
│   ├── poetry.lock            # Locked backend dependencies
│   └── pyproject.toml         # Backend dependencies & metadata
│
├── Frontend/                  # React + Vite frontend
│   ├── src/                   # Frontend source code
│   │   ├── api/               # API requests (axios, auth)
│   │   ├── components/        # React components (panels, providers)
│   │   ├── context/           # React contexts (Auth, Theme)
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # React entry point
│   ├── .env                   # Frontend env variables (not committed)
│   ├── package.json           # Frontend dependencies
│   ├── package-lock.json      # Locked frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── .env.example               # Template for environment variables
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation