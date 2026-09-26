# Next.js Frontend

This app uses the App Router and TypeScript. Server pages fetch employees from the Express API; client components handle search, filtering, sorting, forms, and delete confirmation.

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the API base URL, then run:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/employees`. The backend must be running first. `npm run typecheck`, `npm run lint`, and `npm run build` check the frontend.
