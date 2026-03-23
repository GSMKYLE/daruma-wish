# Daruma Wish

Daruma Wish is a cute, emotionally supportive web app where users come when they feel sad, stressed, lost, or hopeful. They choose a mood, write a wish, complete a Daruma ritual by filling the blank eye, and receive a positive result card.

This project was converted from a static HTML/CSS prototype into a production-ready React application using Next.js 14, Tailwind CSS, Zustand, and Supabase.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database/Auth:** Supabase
- **Icons:** Font Awesome (via CDN in `globals.css` / matching prototype)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Set up Environment Variables

Create a `.env.local` file in the root directory by copying the `.env.example` file:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

### 3. Database Setup (Supabase)

1. Create a new Supabase project.
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run the query to set up the necessary tables, relationships, and Row Level Security (RLS) policies.

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app. Note that the app is designed with a mobile-first approach and is best viewed at a max width of 480px.

## Implementation Notes: Mock vs Real Data

Currently, the UI is fully built out, but the application relies partially on mock data and local state to demonstrate the flow.

### **Implemented with Real State/Logic (Zustand & Local Logic)**
- **Routing:** Full Next.js App Router implementation.
- **Mood Selection:** Selected mood is saved to Zustand store and persists across the flow.
- **Wish Creation:** Wish draft, category, and privacy toggles are managed via Zustand.
- **Ritual Interaction:** The press-and-hold interaction is fully implemented using React hooks (`useRef`, `setInterval`) to track progress and update the UI dynamically.
- **Affirmations:** A local utility (`src/utils/affirmations.ts`) generates contextual affirmations based on the user's selected mood after the ritual is completed.

### **Implemented with Mock Data (Ready for Supabase Integration)**
- **Authentication:** Currently bypasses strict auth. The app flow works without logging in. Supabase auth is configured in the schema but not yet enforced on the frontend.
- **Wishes Persistence:** Saving a wish currently relies on Zustand. It needs to be wired up to the `supabase.from('wishes').insert(...)` call in `src/app/ritual/[wishId]/page.tsx` or `wish/new/page.tsx`.
- **Community Wall:** The `/community` page uses hardcoded `mockPosts` to display the feed.
- **Personal Archive:** The `/archive` page uses hardcoded `mockWishes` to display the user's past wishes.
- **Reactions:** The reaction counters on the community wall are static mock data.

## Recommended Next Features

1. **Connect Supabase APIs:** Replace the mock data arrays in `/community` and `/archive` with actual `supabase.from('...').select()` calls.
2. **User Authentication:** Implement a magic link or OAuth sign-in flow on the Home page, storing the user session in Zustand or React Context.
3. **Framer Motion Animations:** While CSS animations handle the basics, integrating `framer-motion` for page transitions (e.g., sliding between steps) will make the flow feel even more seamless.
4. **Form Validation:** Integrate `react-hook-form` and `zod` in `src/app/wish/new/page.tsx` to handle complex validation gracefully.
5. **Real-time Reactions:** Use Supabase Realtime subscriptions to update reaction counts live on the Community Wall.
