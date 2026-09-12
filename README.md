## Tech Stack & Dependencies

This project uses **Python `^3.11`** and **Poetry 2.3.1** for dependency management. Below is the breakdown of the libraries used, including exact versions locked in `poetry.lock`.

### Core Framework & ASGI
- **fastapi** `0.128.0`
- **starlette** `0.50.0`
- **uvicorn** `0.40.0` (with `standard` extras)
- **anyio** `4.12.1`
- **h11** `0.16.0`

### Data Validation & Settings
- **pydantic** `2.12.5` (with `email` extras)
- **pydantic-core** `2.41.5`
- **email-validator** `2.3.0`
- **python-dotenv** `1.2.1`
- **pyyaml** `6.0.3`

### Database
- **psycopg2** `2.9.11`

### Utilities & Parsing
- **user-agents** `2.2.0`
- **ua-parser** `1.0.1`
- **ua-parser-builtins** `202601`
- **typing-extensions** `4.15.0`
- **typing-inspection** `0.4.2`

### Performance & Server Extras (Uvicorn standard)
- **uvloop** `0.22.1`
- **httptools** `0.7.1`
- **watchfiles** `1.1.1`
- **websockets** `16.0`
- **click** `8.3.1`
- **colorama** `0.4.6`

### Testing (Dev Dependencies)
- **pytest** `9.0.2`
- **iniconfig** `2.3.0`
- **packaging** `26.0`
- **pluggy** `1.6.0`
- **pygments** `2.19.2`

### Networking & Misc
- **idna** `3.11`
- **dnspython** `2.8.0`

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