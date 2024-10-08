# Thorbis

**Thorbis** is a modern, flexible CMS built on **Next.js 14**, designed to be the next generation of WordPress. It combines developer control with user-friendly interfaces, making it easy for both developers and everyday business owners to set up and manage their websites.

Thorbis is fully serverless, thanks to integrations with GitHub, Vercel, and Netlify, allowing for seamless control over deployments and repositories. It also supports nearly any database via **Prisma** and uses **Clerk** for authentication, making it a powerful yet intuitive platform for website management.

## Deploy on Vercel

You can deploy Thorbis to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/**GITHUB_USERNAME**/thorbis&env=DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY&project-name=thorbis&repository-name=thorbis)

## Deploy on Netlify

You can deploy Thorbis to Netlify with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/**GITHUB_USERNAME**/thorbis#readme&env=DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY)

> **Note:** Replace `**GITHUB_USERNAME**` with your actual GitHub username.

## Key Features

- 🎨 **Modern WordPress Alternative**: Combines full developer control over the codebase with a simple interface for non-technical users to set up websites.
- 🔥 **Blueprints**: Manage templates, components, styling, and npm packages with blueprint control.
- 🧩 **Component/Block System**: Components are handled like WordPress blocks, dynamically rendered and managed via blueprints.
- 🌐 **API for Developers**: A built-in API enables developers to access dynamic data directly in their templates and components.
- 🚀 **Fully Serverless**: Powered by GitHub, Vercel, Netlify, and Prisma, Thorbis can be deployed with minimal setup, offering full control over deployments and repositories.
- 🔄 **One-Click Deployments**: One-click deployment to Vercel or Netlify through OAuth integrations.
- 🛠️ **GitHub Integration**: Thorbis manages file uploads and repository setup, allowing users to control their website codebase with GitHub.
- 🔑 **Authentication via Clerk**: Uses **Clerk** for robust authentication and user management.
- 💾 **Database Agnostic**: Supports almost any database through **Prisma**, offering flexibility in data storage.
- 📄 **Supabase Integration**: Recommended for databases, Thorbis works seamlessly with Supabase and other OAuth-supported databases.

## Table of Contents

- [Installation](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Getting Started](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Admin Panel Overview](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Blueprints](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Dynamic Page Rendering](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Using the Thorbis API](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [One-Click Deployments](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Serverless Features](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Multitenancy Support](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [SEO Optimization](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Caching and ISR](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Deployment](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [Contributing](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)
- [License](https://www.notion.so/1192cff2b82a806db817c6a376253629?pvs=21)

## Installation

1. Clone the Thorbis repository:
    
    ```bash
    bash
    Copy code
    git clone https://github.com/your-username/thorbis.git
    cd thorbis
    
    ```
    
2. Install the dependencies:
    
    ```bash
    bash
    Copy code
    npm install
    
    ```
    
3. Set up the database:
    
    Thorbis uses **Prisma** for database management. Set up the `.env` file with your database credentials.
    
    ```bash
    bash
    Copy code
    cp .env.example .env
    
    ```
    
4. Run the Prisma migrations:
    
    ```bash
    bash
    Copy code
    npx prisma migrate dev --name init
    
    ```
    
5. Generate the Prisma client:
    
    ```bash
    bash
    Copy code
    npx prisma generate
    
    ```
    
6. Run the development server:
    
    ```bash
    bash
    Copy code
    npm run dev
    
    ```
    

Thorbis will now be running locally at `http://localhost:3000`.

## Getting Started

Thorbis combines the power of a developer-friendly codebase with the simplicity of a business-focused admin panel. You can deploy and manage your website with ease through the **GitHub, Vercel, and Netlify** integrations while using the **admin panel** to control the structure, templates, components, and content of your website.

1. **Access the Admin Panel**:
Navigate to `/admin` in your browser. Here, you can manage blueprints, pages, components, and more.
2. **Set Up Your First Blueprint**:
Blueprints control the structure of your site, including:
    - **Templates**: Define reusable layouts for pages.
    - **Components**: Reusable UI elements.
    - **Styling**: Global or page-specific CSS.
    - **Packages**: npm dependencies required for the website.
3. **Create a New Page**:
Pages are created in the admin panel. You can assign templates to pages or use blocks (components) defined via the active blueprint.

## Admin Panel Overview

The Thorbis admin panel provides full control over your website’s structure, content, and design, making it easy for business owners and developers alike to manage websites.

- **Dashboard**: Overview of site activity and quick links to common tasks.
- **Blueprints**: Manage the active blueprint and define templates, components, styles, and packages. Only one blueprint can be active at a time to prevent conflicts.
- **Pages**: Create and manage pages with content stored dynamically in the database.
- **Components**: Add or edit reusable UI components (blocks).
- **Templates**: Define and manage page layouts.
- **Settings**: Configure global settings, SEO, and manage external integrations.

## Blueprints

### Blueprint-Driven Architecture

In Thorbis, a **blueprint** defines the structure of a website, including templates, components, and styles. Each blueprint controls how content is rendered dynamically, and only one blueprint can be active at a time.

### Blueprint Components

Components (or blocks) are handled like WordPress blocks, dynamically rendered and stored in a JSON format in the database. They are reusable across multiple pages.

Example structure of a blueprint:

```json
{
  "components": [
    {
      "name": "Hero",
      "settings": { "title": "Welcome", "image": "/hero.jpg" }
    },
    {
      "name": "Features",
      "settings": { "items": ["Fast", "Reliable", "Scalable"] }
    }
  ],
  "templates": {
    "HomePage": {
      "layout": ["Hero", "Features"]
    }
  },
  "styles": {
    "global": "body { font-family: Arial; }"
  }
}

```

### Activating a Blueprint

In the admin panel, navigate to **Blueprints** and activate the desired blueprint. This blueprint will then control the website’s layout, components, and styles.

## Dynamic Page Rendering

Thorbis uses dynamic page rendering by querying the database for page content and components, then loading the active blueprint to determine how to render that content.

1. **Fetch the Active Blueprint**:
Thorbis queries the database to determine the active blueprint and fetches the templates and components.
2. **Load the Page Structure**:
Pages are stored in the database with components (blocks) serialized in a JSON format.
3. **Render the Page**:
Components are dynamically imported based on the blueprint and rendered sequentially as defined by the page structure.

### Example Page Rendering

```json
{
  "title": "About Us",
  "blocks": [
    { "name": "Hero", "settings": { "title": "Welcome to Our Company", "image": "/hero-bg.jpg" } },
    { "name": "Footer", "settings": { "copyright": "© 2024 Thorbis" } }
  ]
}

```

## Using the Thorbis API

Thorbis includes a **Developer API** that can be used to access and modify content within templates and components. The API allows developers to interact with the CMS, fetching dynamic data, managing user input, and more.

### API Features

- **Fetching Content**: Retrieve data from the database and inject it into templates and components.
- **User Authentication**: Built-in support for user authentication and roles using **Clerk**.
- **Data Handling**: CRUD operations for content, components, and pages.
- **Hooks**: Extend functionality with lifecycle hooks (before/after save, render, etc.).

### Example Usage in a Template

```js
import { useThorbisApi } from 'lib/thorbis-api';

const Hero = () => {
  const { data } = useThorbisApi('hero-content');

  return (
    <section>
      <h1>{data.title}</h1>
      <img src={data.image} alt="Hero background" />
    </section>
  );
};

```

## One-Click Deployments

Thorbis offers a **one-click deployment** process for Vercel and Netlify. Here's how it works:

1. **GitHub Clone**: Thorbis clones the base Thorbis repository from GitHub into the user’s GitHub account.
2. **OAuth Setup**: Users sign in via GitHub, and Thorbis manages the repository setup and file uploads.
3. **Database Setup**: Users can choose a database (Thorbis recommends **Supabase**) using OAuth integrations. Thorbis handles the setup and connection to the database, making the process seamless.
4. **Vercel/Netlify Deployment**: The admin panel prompts the user to deploy the site via Vercel or Netlify OAuth. Once the database and repository are set up, users can deploy their website with a single click.
5. **Website Setup**: After deployment, users are guided through a setup process, similar to WordPress, where a default template and components are applied to the website.

This ensures that Thorbis is fully serverless, while users only need to create accounts and connect their services. The platform