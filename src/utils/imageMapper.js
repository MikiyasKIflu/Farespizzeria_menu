
// Dynamically import all images from the images directory
const imageModules = import.meta.glob('../images/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Build a map of filename -> image path
// e.g., 'shero_tegabino' -> '/src/images/shero_tegabino.jpeg'
export const images = Object.fromEntries(
    Object.entries(imageModules).map(([path, module]) => {
        const filename = path.split('/').pop().split('.')[0].toLowerCase().replace(/[-_]/g, '');
        return [filename, module.default];
    })
);



// Helper to manually access specific specific assets if needed (like logo)
export const getLogo = () => {
    // Try to find the logo
    // Matches 'logo.png', 'Ayu-Logo.jpg', 'ayu_logo.jpg' etc.
    return images['ayulogo'] || images['logo'] || null;
};

export const getCategoryImage = (category, itemName = '') => {
    // Temporarily use logo for everything as requested
    return images['logo'] || images['ayulogo'] || null;
};
