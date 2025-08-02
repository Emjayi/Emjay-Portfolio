"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Home, BookOpen } from "lucide-react";
import { ThemeProvider } from "@/app/theme-provider";
import { ThemeSwitcher } from "@/app/components/theme-switcher";

export default function NotFound() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
                {/* Header with Theme Switcher */}
                <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Emjay Sepahi
                            </Link>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>

                {/* Not Found Content */}
                <div className="flex items-center justify-center flex-1 py-12">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 md:p-12 max-w-md mx-auto text-center">
                        <div className="space-y-6">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                                <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                    Post Not Found
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    The blog post you're looking for doesn't exist or may have been moved to a different location.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/blog">
                                    <Button className="flex items-center gap-2 w-full sm:w-auto">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Blog
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                                        <Home className="h-4 w-4" />
                                        Go Home
                                    </Button>
                                </Link>
                            </div>

                            {/* Additional Info */}
                            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                    If you believe this is an error, please check the URL or contact support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simple Footer */}
                <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <div className="text-center space-y-4">
                            <div className="flex justify-center space-x-6 text-sm text-zinc-500 dark:text-zinc-400">
                                <span>© 2024 Emjay Sepahi</span>
                                <span>•</span>
                                <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                    Portfolio
                                </Link>
                                <span>•</span>
                                <Link href="/blog" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                    Blog
                                </Link>
                            </div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                Built with Next.js, TypeScript, and Tailwind CSS
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
} 