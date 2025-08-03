"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Calendar, User, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import Link from "next/link";
import { useState, useMemo } from "react";
import { BlogPost } from "@/lib/blog-utils";
import Image from "next/image";

interface BlogClientProps {
    posts: BlogPost[];
    categories: string[];
    tags: string[];
}

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
    // State for multi-category filtering
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Filter posts based on selected categories
    const filteredPosts = useMemo(() => {
        if (selectedCategories.length === 0) {
            return posts;
        }
        return posts.filter(post => selectedCategories.includes(post.category));
    }, [posts, selectedCategories]);

    // Handle category selection
    const handleCategoryClick = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                // Remove category if already selected
                return prev.filter(cat => cat !== category);
            } else {
                // Add category if not selected
                return [...prev, category];
            }
        });
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedCategories([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <div>

                {/* Header with Theme Switcher */}
                <div className="bg-white sticky top-0 self-start dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Emjay Sepahi
                            </Link>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                                Blog
                            </h1>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                My thoughts on anything I like.
                            </p>
                            <div className="flex justify-center">
                                <Badge variant="outline" className="text-sm">
                                    {filteredPosts.length} Articles
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 sticky top-8">
                            {/* Latest Posts */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Latest Posts
                                </h3>
                                <div className="space-y-3">
                                    {posts.slice(0, 5).map((post) => (
                                        <div key={post.slug} className="group">
                                            <a
                                                href={`/blog/${post.slug}`}
                                                className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors line-clamp-2"
                                            >
                                                {post.title}
                                            </a>
                                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                                {format(new Date(post.date), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Categories */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleCategoryClick(category)}
                                            className="text-sm font-medium transition-all duration-200 hover:scale-105"
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                                {selectedCategories.length > 0 && (
                                    <div className="mt-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearAllFilters}
                                            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                        >
                                            Clear all filters
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Posts Grid */}
                    <div className="lg:w-3/4">
                        {/* Category Filter Display */}
                        {selectedCategories.length > 0 && (
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm text-blue-700 dark:text-blue-300">
                                            Showing posts in categories:
                                        </span>
                                        {selectedCategories.map((category) => (
                                            <Badge
                                                key={category}
                                                variant="secondary"
                                                className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                                            >
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearAllFilters}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                                    >
                                        Show all posts
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Posts */}
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPosts.map((post) => (
                                    <article key={post.slug} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="aspect-video relative overflow-hidden">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                <Image
                                                    src={post?.image.replace("/public", "")}
                                                    alt={post.title}
                                                    width={800}
                                                    height={600}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300">
                                                    {post.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                                                </div>
                                            </div>
                                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                                                {post.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 3).map((tag: string) => (
                                                    <Badge key={tag} variant="outline" className="text-xs bg-zinc-50 dark:bg-zinc-800">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <Badge variant="outline" className="text-xs bg-zinc-50 dark:bg-zinc-800">
                                                        +{post.tags.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="max-w-md mx-auto">
                                    <div className="text-6xl mb-4">📝</div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                        No posts found
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                        No posts match the selected categories. Try selecting different categories or view all posts.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={clearAllFilters}
                                        className="mx-auto"
                                    >
                                        View all posts
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center space-y-4">
                        <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                            <div className="flex justify-center space-x-6 text-sm">
                                © 2025  Emjay Sepahi
                            </div>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
} 