
## Environment Configuration

Set the environment variables before starting the backend:

```bash
export DB_PASSWORD='YOUR_MYSQL_APPLICATION_PASSWORD'
export APP_USERNAME='admin'
export APP_PASSWORD='YOUR_CHOSEN_API_PASSWORD'
```

The backend uses HTTP Basic Authentication for `/api/**` endpoints.
Use the configured username and password when making API requests.
Swagger UI and OpenAPI documentation are accessible without authentication.

For local development, the frontend reads API credentials from
`frontend/.env.local`:

```dotenv
VITE_API_USERNAME=admin
VITE_API_PASSWORD=YOUR_CHOSEN_API_PASSWORD
```

Do not commit `frontend/.env.local` or real credentials. Vite variables
are visible in browser code and are intended only for this local demo.
A production application should use a proper authentication flow.
