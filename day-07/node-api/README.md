# Express Employee API

This API keeps routing, request handling, business operations, and SQL in separate files. It uses Node's built-in `node:sqlite` with a local database file. Node 24 prints an experimental-feature warning for that module.

The ignored local `.env` sets `PORT`, `DATABASE_PATH`, and `FRONTEND_URL`. `.env.example` is a safe template for another local setup. From this folder, run:

```powershell
npm install
npm run dev
```

The API listens on port 5000 and seeds its four sample records only when the table is empty. Its routes are `GET /api/employees`, `GET /api/employees/:id`, `POST /api/employees`, `PUT /api/employees/:id`, and `DELETE /api/employees/:id`.

`src/middleware/authBasics.js` demonstrates an API-key check but is not mounted on CRUD routes. It is for learning only, not a production authentication system.
