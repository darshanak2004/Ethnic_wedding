# Ethnic Weddings website

    frontend/   React + Vite site and admin panel  -> deploy on Vercel (or Netlify)
    backend/    Node + Express API                 -> deploy on Render / Railway / any Node host
                Neon PostgreSQL (data) + Cloudinary (photo/video files) + WhatsApp (enquiry alerts)

## How it fits together

- **Photos and videos** are uploaded from `/admin` straight to Cloudinary. Only the **URL** is saved in Neon, so the free database stays tiny.
  Photos are shrunk in the browser before upload (max 2200 px), and when you remove a photo in the admin it is also deleted from Cloudinary.
- **Admin panel** (`/admin`): change hero video/photos on the homepage, add/remove photos in each portfolio event, create new events (e.g. Birthday), view enquiries, link WhatsApp.
- **Contact form**: saved in the database first, then sent to the admin's WhatsApp by the backend itself (Baileys library, no Meta developer account, no paid API).
  If WhatsApp is offline when someone enquires, the enquiry is kept and delivered automatically when it reconnects. It is also visible in Admin > Enquiries.
- **Floating WhatsApp icon** (all pages) opens a normal chat with your business number.

## 1. Accounts (all free tiers)

1. **Neon**: create a project, copy the *pooled* connection string. Tables are created automatically on first start.
2. **Cloudinary**: Dashboard shows Cloud name, API Key, API Secret.
3. **A host for the backend** (Render is the simplest). WhatsApp needs a server that stays running, so Vercel/Netlify functions will not work for the backend.

## 2. Run locally

    cd backend && cp .env.example .env     # fill it in
    npm install && npm run dev             # http://localhost:4000

    cd frontend && cp .env.example .env
    npm install && npm run dev             # http://localhost:5173

## 3. Deploy

**Backend (Render, Web Service)**: root directory `backend`, build `npm install`, start `npm start`.
Set the environment variables from `backend/.env.example`:

| Variable | Meaning |
|---|---|
| DATABASE_URL | Neon pooled connection string |
| FRONTEND_URL | your live site, e.g. `https://ethnicweddings.in` (comma separate several; no trailing slash) |
| ADMIN_PASSWORD, JWT_SECRET | admin login; JWT_SECRET is any long random string |
| CLOUDINARY_CLOUD_NAME / _API_KEY / _API_SECRET | from Cloudinary |
| ADMIN_WHATSAPP | number(s) that **receive** enquiries, e.g. `919876543210` (comma separate for several) |
| WHATSAPP_ENABLED | `true` |

**Frontend (Vercel)**: root directory `frontend`, framework Vite. Environment variables:
`VITE_API_URL` = your backend URL, `VITE_WA_NUMBER` = business WhatsApp number (country code + digits, no plus).
`vercel.json` already makes `/admin` and other pages work on refresh.

## 4. Link WhatsApp (once)

1. Open `https://your-site/admin`, sign in, go to **WhatsApp**.
2. On the phone that will **send** the alerts: WhatsApp > Settings > Linked devices > Link a device > scan the QR.
   On the same phone as the admin page? Use "Link with phone number instead" and type the code shown after entering the number.
3. Press **Send test message**.

The login session is stored in your Neon database, so redeploys and restarts do not unlink it.
Use a different account for sending than the one receiving (ADMIN_WHATSAPP), otherwise alerts land in "Message yourself" and may not notify.

## 5. Things to know

- **Unofficial WhatsApp connection.** Baileys talks to WhatsApp the way WhatsApp Web does. It needs no Meta approval, but WhatsApp does not endorse it and it can break when WhatsApp changes things. Keep it to alerts to your own number(s) at low volume (this setup does that). Don't use your only/personal number as the sender.
- **Free hosts sleep.** If the backend sleeps, the first visit wakes it (about 30 to 60 s). The site shows instantly from cached content meanwhile, and enquiries are never lost. To avoid sleeping, add a free monitor (e.g. UptimeRobot) that requests `https://your-backend/api/health` every 5 minutes. Check your host's current free-tier terms.
- **Storage.** Neon holds only text rows (enquiries, image URLs, WhatsApp session), far below the free limit. Files live in Cloudinary; delete unused photos from the admin to free space.
- Spam protection: hidden honeypot field plus 5 enquiries per 10 minutes per visitor; admin login is limited to 10 attempts per 15 minutes.
