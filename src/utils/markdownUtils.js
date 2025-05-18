/**
 * This utility file handles loading and managing project markdown files
 */

// Function to get markdown content for a project based on its index
export const getProjectMarkdown = async (index) => {
  try {
    // Calculate project number (1-based indexing)
    const projectNumber = index + 1;
    
    // Import the markdown file using raw-loader
    const markdownModule = await import(`!!raw-loader!../assets/projects/${projectNumber}.md`);
    
    // The default export contains the raw markdown content
    return markdownModule.default;
  } catch (error) {
    console.warn(`No markdown file found for project ${index + 1}`, error);
    return `# Project ${index + 1}\n\n*No additional information available for this project.*`;
  }
};

// Extract title from markdown content (assumes first line is an H1)
export const extractTitle = (markdown) => {
  const titleMatch = markdown.match(/^# (.+)$/m);
  return titleMatch ? titleMatch[1] : `Project`;
};
