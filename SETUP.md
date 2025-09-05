# CEO Portfolio Setup Guide

## Environment Variables Setup

### 1. Tiptap Rich Text Editor

The rich text editor uses Tiptap, which doesn't require any API keys or external services. It's ready to use out of the box with all features included.

### 2. Vercel Blob Storage

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Link your project: `vercel link`
4. Create a Blob store: `vercel blob create`
5. Get your token from Vercel dashboard or CLI
6. Add it to your `.env.local` file:
   ```
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   ```

### 3. Database Setup

1. Set up a PostgreSQL database (local or cloud)
2. Add the connection string to your `.env.local` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ceo_portfolio"
   ```
3. Run migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

### 4. NextAuth Setup

1. Generate a secret key:
   ```bash
   openssl rand -base64 32
   ```
2. Add it to your `.env.local` file:
   ```
   NEXTAUTH_SECRET="your-generated-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

## Features Implemented

### ✅ Rich Text Editor (Tiptap)
- Clean, minimal Tiptap editor with essential features
- Simple toolbar with core formatting options
- Text formatting: Bold, italic, code
- Block elements: Headings (H2), bullet lists, ordered lists, blockquotes
- Media: Image uploads to Vercel Blob, links
- Character/word count display
- No external API dependencies
- Focused on essential blog writing features

### ✅ Dynamic Companies Management
- Database model for companies with full CRUD operations
- Admin interface for managing companies
- Public companies page fetching from database
- Image upload support for company logos and featured images
- Status management (Active, Inactive, Sold, Acquired)
- Featured companies support

### ✅ Image Storage
- Vercel Blob integration for image uploads
- Support for blog post inline images
- Company logo and featured image uploads
- Automatic file validation and size limits

## Usage

### Managing Companies
1. Go to `/admin/companies` to view all companies
2. Click "Add Company" to create a new company
3. Fill in company details including images
4. Companies will appear on the public `/companies` page

### Writing Blog Posts
1. Go to `/admin/posts/new` to create a new blog post
2. Use the rich text editor to write content
3. Upload images directly in the editor
4. Images are automatically stored in Vercel Blob

### Image Uploads
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 10MB
- Images are automatically optimized and served from Vercel's CDN

## API Endpoints

### Companies
- `GET /api/companies` - Public companies list
- `GET /api/admin/companies` - Admin companies list
- `POST /api/admin/companies` - Create company
- `GET /api/admin/companies/[id]` - Get company
- `PUT /api/admin/companies/[id]` - Update company
- `DELETE /api/admin/companies/[id]` - Delete company

### Image Upload
- `POST /api/upload/image` - Upload image to Vercel Blob
- `DELETE /api/upload/image` - Delete image (placeholder)

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
npx prisma migrate dev
npx prisma generate

# Start development server
npm run dev
```

## Deployment

1. Deploy to Vercel: `vercel --prod`
2. Set up environment variables in Vercel dashboard
3. Ensure database is accessible from Vercel
4. Configure Blob storage in Vercel dashboard
