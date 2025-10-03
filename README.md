# Mini CMS - Content Management System

A simple and elegant content management system built with Remix, React, Prisma, and PostgreSQL. This CMS allows you to create, manage, and organize blog articles in a hierarchical tree structure.

## 🚀 Features

- **Article Management**: Create, edit, delete, and preview articles
- **Hierarchical Organization**: Organize articles in a tree structure with parent-child relationships
- **Rich Text Editor**: Markdown support for content creation
- **Tree Navigation**: Collapsible tree view for easy content navigation
- **Responsive Design**: Clean, modern UI built with TailwindCSS
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Database Integration**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Remix + React + TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL (Supabase recommended)
- **ORM**: Prisma
- **Deployment**: Vercel
- **Authentication**: Supabase Auth (optional)

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-cms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file:

```bash
cp env.example .env
```

Update the `.env` file with your database credentials:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mini_cms?schema=public"

# Supabase (Optional - for authentication)
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 4. Database Setup

Generate Prisma client:

```bash
npm run db:generate
```

Run database migrations:

```bash
npm run db:migrate
```

Seed the database with sample data:

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
mini-cms/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Layout.tsx       # Main layout component
│   │   ├── ArticleTable.tsx # Article list view
│   │   ├── ArticleTree.tsx  # Tree navigation
│   │   └── ArticleEditor.tsx # Article editor form
│   ├── lib/                 # Utility functions
│   │   ├── db.server.ts     # Database connection
│   │   └── utils.ts         # Helper functions
│   ├── routes/              # Remix routes
│   │   ├── _index.tsx       # Home page
│   │   ├── articles._index.tsx # Articles list
│   │   ├── articles.new.tsx # Create article
│   │   ├── articles.$id.tsx # Edit article
│   │   └── articles.$id.delete.tsx # Delete article
│   ├── globals.css          # Global styles
│   └── root.tsx             # Root component
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seed script
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema

The application uses a single `Article` table with self-referencing relationships:

```prisma
model Article {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String
  parentId  String?
  parent    Article? @relation("ArticleHierarchy", fields: [parentId], references: [id])
  children  Article[] @relation("ArticleHierarchy")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🎯 Usage

### Creating Articles

1. Navigate to the "Articles" page
2. Click "New Article" or "Create Article"
3. Fill in the article details:
   - **Title**: The article title
   - **Slug**: URL-friendly version (auto-generated)
   - **Parent Category**: Optional parent for hierarchical organization
   - **Content**: Article content (Markdown supported)

### Organizing Content

- Create parent categories by leaving "Parent Category" empty
- Add child articles by selecting a parent category
- Use the tree navigation in the editor to browse your content hierarchy

### Managing Articles

- **View**: See all articles in a table format
- **Edit**: Click "Edit" to modify an article
- **Delete**: Click "Delete" to remove an article (must delete children first)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Remix project

3. **Environment Variables**:

   - Add your `DATABASE_URL` in Vercel's environment variables
   - Add any other required environment variables

4. **Database Setup**:

   - Use Supabase or another PostgreSQL provider
   - Run migrations: `npm run db:migrate`
   - Seed data: `npm run db:seed`

5. **Deploy**: Vercel will automatically deploy on every push to main

### Alternative Deployment Options

- **Railway**: Great for full-stack apps with database
- **Render**: Simple deployment with PostgreSQL
- **DigitalOcean App Platform**: Full control over deployment

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checks

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

### Adding Features

1. **New Routes**: Add files in `app/routes/`
2. **Components**: Add reusable components in `app/components/`
3. **Database Changes**: Update `prisma/schema.prisma` and run migrations
4. **Styling**: Use TailwindCSS classes or add custom styles

## 🔧 Configuration

### TailwindCSS

The project uses TailwindCSS for styling. Configuration is in `tailwind.config.js`.

### Prisma

Database schema and configuration is in `prisma/schema.prisma`.

### TypeScript

TypeScript configuration is in `tsconfig.json`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🎉 Acknowledgments

- Built with [Remix](https://remix.run/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Database powered by [Prisma](https://prisma.io/)
- Deployed on [Vercel](https://vercel.com/)

---

**Happy coding! 🚀**
