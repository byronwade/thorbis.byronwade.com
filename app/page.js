// app/[...slug]/page.js
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma'; // Alias for Prisma client

export default async function DynamicPage(props) {
  const params = await props.params;
  const slug = '/' + (params.slug ? params.slug.join('/') : '');

  // Fetch the active blueprint
  const activeBlueprint = await prisma.blueprint.findFirst({
    where: { isActive: true },
    include: {
      components: true,
      templates: true,
    },
  });

  if (!activeBlueprint) {
    return notFound(); // Handle case where no active blueprint exists
  }

  // Fetch the page based on the slug
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      template: true, // Include the template relation if assigned
      seoSettings: true, // Include SEO settings if available
    },
  });

  if (!page) {
    return notFound(); // Return 404 if the page is not found
  }

  // Get the folder name for the active blueprint
  const blueprintFolder = activeBlueprint.name; // This will dynamically load from the DB

  // Import the template dynamically from the blueprint folder (using aliases)
  let TemplateComponent = null;
  if (page.template) {
    try {
      // Dynamically import the template from the blueprints folder using an alias
      TemplateComponent = await import(
        `@/blueprints/templates/${blueprintFolder}/${page.template.name}`
      ).then((mod) => mod.default);
    } catch (err) {
      console.error('Template not found:', err);
      return notFound(); // Return 404 if the template is not found
    }
  }

  // Dynamically import components for the active blueprint using aliases
  const dynamicComponents = {};
  for (const component of activeBlueprint.components) {
    try {
      const componentModule = await import(
        `@/blueprints/components/${component.name}`
      );
      dynamicComponents[component.name] = componentModule.default;
    } catch (err) {
      console.error(`Component ${component.name} not found:`, err);
    }
  }

  // Handle SEO settings
  const { title, description } = page.seoSettings || {};

  return (
    <>
      {/* Handle SEO metadata */}
      <head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </head>

      <div>
        {/* Render the page content using the assigned template */}
        {TemplateComponent ? (
          <TemplateComponent
            components={dynamicComponents} // Pass the dynamically imported components
            content={page.content} // Pass the page content
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </div>
    </>
  );
}
