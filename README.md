# 🔐 Auth Service

This is the **Auth** microservice for the Smart Home Energy Monitoring system.

---

## 🚀 Setup & Run

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Install dependencies (requires [pnpm](https://pnpm.io/installation)):

```bash
pnpm install
```

3. Run the service with Docker Compose (service + Postgres):

```bash
docker compose up --build
```

For subsequent runs (without rebuilding):

```bash
docker compose up
```