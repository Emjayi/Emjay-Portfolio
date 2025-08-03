// Simple test script to verify tag processing
const matter = require('gray-matter');

// Test data simulating both formats
const testData1 = `---
title: "Test Post 1"
tags: ["Design", "UI/UX", "Visual Design"]
---`;

const testData2 = `---
title: "Test Post 2"
tags: iran,world,war
---`;

const testData3 = `---
title: "Test Post 3"
tags: 
---`;

// Function to process tags (same logic as in blog-utils.ts)
function processTags(tags) {
    return Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
            ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : [];
}

// Test the processing
console.log('Test 1 (Array format):', processTags(matter(testData1).data.tags));
console.log('Test 2 (Comma-separated):', processTags(matter(testData2).data.tags));
console.log('Test 3 (Empty):', processTags(matter(testData3).data.tags));
console.log('Test 4 (Undefined):', processTags(undefined));
console.log('Test 5 (Null):', processTags(null)); 