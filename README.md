# LabiPilot

LabiPilot is a custom AI engineering learning website inspired by the broad learning platform structure of Framis, but with original branding, content, layout, and visuals.

Live site: https://labipilot-lake.vercel.app

## Included

1. Public landing page
2. Course, lesson, project, resource, about, and contact pages
3. Learner dashboard preview
4. First lesson page with local progress tracking
5. Second lesson page with local progress tracking
6. Third lesson page with generated code review guidance
7. Fourth lesson page with data, forms, and access rule planning
8. Toolkit page with copy ready prompts
9. Interactive learning tracks
10. Project labs and outcomes
11. Local waitlist preview using browser storage
12. Admin preview page at `/admin`
13. Privacy and terms pages
14. Supabase waitlist schema in `supabase-schema.sql`
15. SEO metadata, robots file, sitemap, and social preview image

## Deploying to Vercel

This repository is connected to Vercel. Pushing to `main` creates a new production deployment.

Current deployment settings:

1. Build command: `npm run build`
2. Output directory: `.`
3. Framework preset: static site

No environment variables are required for this first version.

## Supabase next step

Create a separate Supabase project for LabiPilot, then run `supabase-schema.sql` in that project. Do not reuse an unrelated project database for production signups.
