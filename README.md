# CEO Portfolio & Blog

This is a Next.js project for CEO's personal portfolio and blog. It includes an admin panel for managing content, companies, and newsletters.

## Features

-   **Blog:** A fully functional blog with categories, tags, and search.
-   **Company Portfolio:** Showcase a portfolio of companies with details.
-   **Newsletter:** Allow users to subscribe to a newsletter.
-   **Admin Panel:** A comprehensive admin panel to manage all content.
-   **Authentication:** Secure authentication for the admin panel.
-   **File Uploads:** File uploads are handled by Vercel Blob storage.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v20 or later)
-   [npm](https://www.npmjs.com/)
-   [PostgreSQL](https://www.postgresql.org/) (This project is configured to use [Neon](https://neon.tech/) for the database)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/ceo-portfolio.git
    cd ceo-portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    -   Create a new project on [Neon](https://neon.tech/) and get your PostgreSQL connection string.
    -   Copy the `.env.example` file to a new file named `.env` and update the `DATABASE_URL` with your Neon connection string.

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Environment Variables

To run this project, you will need to create a `.env` file in the root of the project and add the following environment variables:

-   `DATABASE_URL`: The connection string for your PostgreSQL database.
-   `NEXTAUTH_URL`: The URL of your Next.js application. For local development, this is `http://localhost:3000`.
-   `NEXTAUTH_SECRET`: A secret key for NextAuth.js. You can generate one using `openssl rand -hex 32`.
-   `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob read/write token.
-   `RESEND_API_KEY`: Your API key for Resend (for sending emails).
-   `NEXT_PUBLIC_SITE_URL`: The public URL of your site (e.g., `https://stevejohnson.com`).

## Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Open your browser:**

    Navigate to `http://localhost:3000` to see the application.

## Running the Seed

To populate the database with initial data, you can run the seed script:

```bash
npm run db:seed
```

This will create a new admin user and some sample data.

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma       # Prisma schema file
│   └── seed.ts             # Seed script
├── public/                 # Public assets
├── scripts/                # Additional scripts
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── (admin)/        # Admin panel pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (public)/       # Public pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/                # Helper functions and utilities
│   └── ...
└── ...
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  **Push your code to a Git repository.**
2.  **Import your project into Vercel.**
3.  **Configure the environment variables in the Vercel dashboard.**
4.  **Deploy!**

## Built With

-   [Next.js](https.nextjs.org/) - React framework
-   [Prisma](https://www.prisma.io/) - ORM for Node.js and TypeScript
-   [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
-   [Tailwind CSS](https://tailwindcss.com/) - CSS framework
-   [shadcn/ui](https://ui.shadcn.com/) - UI components
-   [Vercel Blob](https://vercel.com/storage/blob) - File storage