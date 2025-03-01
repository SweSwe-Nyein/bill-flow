# Bill Flow

Bill Flow is a project designed to manage and streamline billing processes. This project uses various technologies and services to provide a robust and efficient billing solution.

## Project Structure
## Environment Variables

The project requires several environment variables to be set. These are defined in the `.env` file.

### Database Configuration

- `DATABASE_URL`: Connection string for the database.
- `DATABASE_URL_UNPOOLED`: Connection string for the database without pgbouncer.
- `PGHOST`: Host for the PostgreSQL database.
- `PGHOST_UNPOOLED`: Host for the PostgreSQL database without pgbouncer.
- `PGUSER`: User for the PostgreSQL database.
- `PGDATABASE`: Database name for the PostgreSQL database.
- `PGPASSWORD`: Password for the PostgreSQL database.

### Vercel Postgres Templates

- `POSTGRES_URL`: Connection string for the PostgreSQL database.
- `POSTGRES_URL_NON_POOLING`: Connection string for the PostgreSQL database without pooling.
- `POSTGRES_USER`: User for the PostgreSQL database.
- `POSTGRES_HOST`: Host for the PostgreSQL database.
- `POSTGRES_PASSWORD`: Password for the PostgreSQL database.
- `POSTGRES_DATABASE`: Database name for the PostgreSQL database.
- `POSTGRES_URL_NO_SSL`: Connection string for the PostgreSQL database without SSL.
- `POSTGRES_PRISMA_URL`: Connection string for the PostgreSQL database with Prisma.

### Authentication

- `AUTH_SECRET`: Secret key for authentication.

### AI Integration

- `OPENAI_API_KEY`: API key for OpenAI.
- `GEMINI_API_KEY`: API key for Gemini.

## Installation

To install the project dependencies, run:

```sh
pnpm install
