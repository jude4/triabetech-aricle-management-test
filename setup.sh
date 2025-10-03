#!/bin/bash

# Mini CMS Setup Script
echo "🚀 Setting up Mini CMS..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please update .env with your database credentials"
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Check if DATABASE_URL is set
if grep -q "postgresql://" .env; then
    echo "🗄️  Running database migrations..."
    npm run db:migrate
    
    echo "🌱 Seeding database..."
    npm run db:seed
    
    echo "✅ Database setup complete!"
else
    echo "⚠️  Please set DATABASE_URL in .env file and run:"
    echo "   npm run db:migrate"
    echo "   npm run db:seed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your database credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "Happy coding! 🚀"
