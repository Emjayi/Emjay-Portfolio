import { getAllPosts } from "@/lib/blog-utils";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";
import BlogSearch from "./BlogSearch";

interface BlogSidebarProps {
    currentSlug?: string;
}

export default function BlogSidebar({ currentSlug }: BlogSidebarProps) {
    const allPosts = getAllPosts();

    // Get latest posts (excluding current post)
    const latestPosts = allPosts
        .filter(post => post.slug !== currentSlug)
        .slice(0, 5);

    return (
        <aside className="w-full lg:w-80 space-y-8">
            {/* Search */}
            <BlogSearch allPosts={allPosts} />

            {/* Latest Posts */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                    Latest Posts
                </h3>
                <div className="space-y-4">
                    {latestPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block group hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg p-3 transition-colors"
                        >
                            <div className="space-y-2">
                                <h4 className="font-medium text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <User className="h-3 w-3" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        <span>{format(new Date(post.date), 'MMM dd')}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {Array.isArray(post.tags) && post.tags.slice(0, 2).map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                    {Array.isArray(post.tags) && post.tags.length > 2 && (
                                        <Badge
                                            variant="secondary"
                                            className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                        >
                                            +{post.tags.length - 2}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 font-medium transition-colors"
                >
                    View all posts
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </aside>
    );
} 