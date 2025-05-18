/**
 * This utility file handles loading and managing project markdown files
 */

// Function to get markdown content for a project based on its index
export const getProjectMarkdown = async (index) => {
  try {
    // Calculate project number (1-based indexing)
    const projectNumber = index + 1;

    // Dynamically match files with prefixes like `01_`
    const files = require.context('../assets/projects', false, /\d+_.+\.md$/);
    const fileKey = files.keys().find((key) => key.includes(`${projectNumber}_`));

    if (!fileKey) {
      throw new Error(`No markdown file found for project ${projectNumber}`);
    }

    // Import the markdown file using raw-loader
    const markdownModule = await import(`!!raw-loader!../assets/projects/${fileKey.replace('./', '')}`);

    // The default export contains the raw markdown content
    return markdownModule.default;
  } catch (error) {
    console.warn(`Error loading markdown file for project ${index + 1}`, error);
    return `# Project ${index + 1}\n\n*No additional information available for this project.*`;
  }
};

// Extract title from markdown content (assumes first line is an H1)
export const extractTitle = (markdown) => {
  const titleMatch = markdown.match(/^# (.+)$/m);
  if (titleMatch) {
    // Remove numeric prefix (e.g., '01_') if present
    return titleMatch[1].replace(/^\d+_/, '');
  }
  return `Project`;
};
