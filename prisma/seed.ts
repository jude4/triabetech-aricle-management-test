import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create parent categories
  const technologyCategory = await prisma.article.upsert({
    where: { slug: "technology" },
    update: {},
    create: {
      title: "Technology",
      slug: "technology",
      content:
        "# Technology\n\nThis is the technology category containing various tech-related articles.",
    },
  });

  const programmingCategory = await prisma.article.upsert({
    where: { slug: "programming" },
    update: {},
    create: {
      title: "Programming",
      slug: "programming",
      content:
        "# Programming\n\nThis is the programming category containing various programming-related articles.",
      parentId: technologyCategory.id,
    },
  });

  const webDevCategory = await prisma.article.upsert({
    where: { slug: "web-development" },
    update: {},
    create: {
      title: "Web Development",
      slug: "web-development",
      content:
        "# Web Development\n\nThis is the web development category containing various web development-related articles.",
      parentId: programmingCategory.id,
    },
  });

  // Create sample articles
  await prisma.article.upsert({
    where: { slug: "getting-started-with-react" },
    update: {},
    create: {
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      content: `# Getting Started with React

React is a JavaScript library for building user interfaces. In this article, we'll cover the basics of React and how to get started.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

- **Components**: The building blocks of React applications
- **JSX**: A syntax extension that lets you write HTML-like code in JavaScript
- **Props**: A way to pass data from parent to child components
- **State**: A way to manage data that changes over time

## Getting Started

To create a new React application, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will create a new React application and start the development server.`,
      parentId: webDevCategory.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "introduction-to-typescript" },
    update: {},
    create: {
      title: "Introduction to TypeScript",
      slug: "introduction-to-typescript",
      content: `# Introduction to TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## What is TypeScript?

TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static type checking to the language.

## Benefits of TypeScript

- **Static Type Checking**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Code Quality**: More maintainable and readable code
- **JavaScript Compatibility**: All valid JavaScript is valid TypeScript

## Basic Types

\`\`\`typescript
// String
let message: string = "Hello, TypeScript!";

// Number
let count: number = 42;

// Boolean
let isActive: boolean = true;

// Array
let numbers: number[] = [1, 2, 3, 4, 5];

// Object
interface User {
  name: string;
  age: number;
  email: string;
}
\`\`\``,
      parentId: programmingCategory.id,
    },
  });

  await prisma.article.upsert({
    where: { slug: "database-design-basics" },
    update: {},
    create: {
      title: "Database Design Basics",
      slug: "database-design-basics",
      content: `# Database Design Basics

Good database design is crucial for building scalable and maintainable applications. This article covers the fundamental principles of database design.

## What is Database Design?

Database design is the process of producing a detailed data model of a database. This data model contains all the needed logical and physical design choices and physical storage parameters needed to generate a design in a data definition language.

## Key Principles

### 1. Normalization
Normalization is the process of organizing data in a database to eliminate redundancy and dependency.

### 2. Primary Keys
Every table should have a primary key that uniquely identifies each record.

### 3. Foreign Keys
Foreign keys establish relationships between tables and maintain referential integrity.

### 4. Indexing
Proper indexing improves query performance by creating efficient access paths to data.

## Common Patterns

- **One-to-Many**: A customer can have many orders
- **Many-to-Many**: Students can enroll in many courses, courses can have many students
- **One-to-One**: A user has one profile

## Best Practices

1. Use meaningful table and column names
2. Avoid storing calculated values
3. Use appropriate data types
4. Plan for future growth
5. Document your schema`,
      parentId: technologyCategory.id,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
