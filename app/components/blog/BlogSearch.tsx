"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, User } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { format } from "date-fns";
import { BlogPost } from "@/lib/blog-utils";

interface BlogSearchProps {
    allPosts: BlogPost[];
}

export default function BlogSearch({ allPosts }: BlogSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter posts based on search query
    const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(post.tags) && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <>
            {/* Search Input */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                    Search Posts
                </h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    />
                </div>
            </div>

            {/* Search Results */}
            {searchQuery && (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                        Search Results ({filteredPosts.length})
                    </h3>
                    <div className="space-y-4">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
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
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                No posts found matching "{searchQuery}"
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 