import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'app/_posts')

export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    author: string
    category: string
    tags: string[]
    image: string
    content: string
}

export function getAllPosts(): BlogPost[] {
    // Get file names under /app/_posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            // Remove ".md" from file name to get slug
            const slug = fileName.replace(/\.md$/, '')

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents)

            // Combine the data with the slug
            return {
                slug,
                title: matterResult.data.title || '',
                description: matterResult.data.description || '',
                date: matterResult.data.date || '',
                author: matterResult.data.author || '',
                category: matterResult.data.category || '',
                tags: Array.isArray(matterResult.data.tags)
                    ? matterResult.data.tags
                    : typeof matterResult.data.tags === 'string'
                        ? matterResult.data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                        : [],
                image: matterResult.data.image || '',
                content: matterResult.content,
            }
        })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the slug
        return {
            slug,
            title: matterResult.data.title || '',
            description: matterResult.data.description || '',
            date: matterResult.data.date || '',
            author: matterResult.data.author || '',
            category: matterResult.data.category || '',
                tags: Array.isArray(matterResult.data.tags)
                    ? matterResult.data.tags
                    : typeof matterResult.data.tags === 'string'
                        ? matterResult.data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                        : [],
            image: matterResult.data.image || '',
            content: matterResult.content,
        }
    } catch (error) {
        return null
    }
}

export function getPostsByCategory(category: string): BlogPost[] {
    const allPosts = getAllPosts()
    return allPosts.filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): BlogPost[] {
    const allPosts = getAllPosts()
    return allPosts.filter((post) => Array.isArray(post.tags) && post.tags.includes(tag))
} 