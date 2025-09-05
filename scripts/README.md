# Database Seeding Scripts

This directory contains scripts to populate your database with sample data for development and testing.

## Available Scripts

### 1. Full Seed (`seed.ts`)
Populates the database with comprehensive sample data including:
- 2 users (admin and editor)
- 4 categories (Technology, Business, Leadership, Innovation)
- 8 tags
- 4 blog posts (3 published, 1 draft)
- 3 newsletter subscribers
- 2 email campaigns

**Usage:**
```bash
npm run db:seed
```

### 2. Minimal Seed (`seed-minimal.ts`)
Creates only the essential data needed to get started:
- 1 admin user
- 1 basic category
- 1 basic tag

**Usage:**
```bash
npm run db:seed-minimal
```

### 3. Database Reset
Resets the database and runs the full seed:
```bash
npm run db:reset
```

## Prerequisites

1. Make sure your database is set up and accessible
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure your `.env` file has the correct `DATABASE_URL`
4. Run Prisma migrations if needed:
   ```bash
   npx prisma db push
   ```

## Login Credentials

After running either seed script, you can log in with:

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`

**Editor User (full seed only):**
- Email: `editor@example.com`
- Password: `editor123`

## Customization

You can modify the seed scripts to:
- Change user credentials
- Add more sample data
- Modify the content of blog posts
- Add different categories and tags

## Troubleshooting

### "tsx not found" error
Install tsx as a dev dependency:
```bash
npm install -D tsx
```

### Database connection errors
1. Check your `DATABASE_URL` in `.env`
2. Make sure your database server is running
3. Verify database permissions

### Prisma client errors
Regenerate the Prisma client:
```bash
npx prisma generate
```

## Notes

- The full seed script will **clear existing data** before seeding (comment out the delete operations if you want to preserve existing data)
- The minimal seed script uses `upsert` operations to avoid duplicates
- All passwords are hashed using bcrypt with 12 salt rounds
- Blog post content includes sample Markdown formatting
