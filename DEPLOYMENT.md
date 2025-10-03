# Deployment Guide

This guide will help you deploy your Mini CMS to various platforms.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites

- GitHub repository with your code
- Vercel account
- PostgreSQL database (Supabase recommended)

### Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Remix project

3. **Environment Variables**
   Add these in Vercel dashboard:

   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

4. **Database Setup**

   - Use Supabase (recommended) or any PostgreSQL provider
   - Create a new database
   - Run migrations locally or use Prisma Studio

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

## 🐳 Railway Deployment

### Steps

1. **Connect Repository**

   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Add Database**

   - Add PostgreSQL service
   - Copy the connection string

3. **Environment Variables**

   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

4. **Deploy**
   - Railway will automatically build and deploy

## 🌊 Render Deployment

### Steps

1. **Create Web Service**

   - Go to [render.com](https://render.com)
   - Connect your GitHub repository

2. **Add PostgreSQL Database**

   - Create a new PostgreSQL database
   - Copy the connection string

3. **Environment Variables**

   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

4. **Build Settings**
   - Build Command: `npm run build`
   - Start Command: `npm run start`

## 🗄️ Database Setup

### Using Supabase (Recommended)

1. **Create Project**

   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Get Connection String**

   - Go to Settings > Database
   - Copy the connection string

3. **Run Migrations**

   ```bash
   npx prisma migrate deploy
   ```

4. **Seed Data**
   ```bash
   npx prisma db seed
   ```

### Using Other PostgreSQL Providers

1. **Create Database**

   - Create a new PostgreSQL database
   - Note the connection details

2. **Update Environment**

   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

## 🔧 Post-Deployment

### Verify Deployment

1. **Check Health**

   - Visit your deployed URL
   - Ensure the app loads correctly

2. **Test Database**

   - Try creating an article
   - Verify data persistence

3. **Check Logs**
   - Monitor application logs
   - Fix any errors

### Custom Domain (Optional)

1. **Add Domain in Vercel**

   - Go to Project Settings
   - Add your custom domain
   - Update DNS records

2. **SSL Certificate**
   - Vercel automatically provides SSL
   - Ensure HTTPS is working

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Check DATABASE_URL format
   - Verify database is accessible
   - Check firewall settings

2. **Build Failures**

   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

3. **Runtime Errors**
   - Check environment variables
   - Verify database migrations
   - Check application logs

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Create a new issue with error details
- Include deployment logs and environment info

## 📊 Monitoring

### Vercel Analytics

- Enable Vercel Analytics for usage insights
- Monitor performance metrics

### Database Monitoring

- Use Supabase dashboard for database insights
- Monitor query performance
- Set up alerts for issues

---

**Happy deploying! 🚀**
