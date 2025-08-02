import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils";
import { format } from "date-fns";
import { Badge } from "@/app/components/ui/badge";
import { notFound } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ThemeSwitcher } from "@/app/components/theme-switcher";

interface PageProps {
	params: {
		slug: string;
	};
}

// Generate static params for all blog posts
export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default function Page({ params }: PageProps) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="space-y-8">
			{/* Back to Blog Button */}
			<div className="sticky top-0 bg-gradient-to-b -mt-8 dark:from-black from-white to-transparent from-80% pt-8 self-start">
				<div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 pr-4 py-2 flex justify-between items-center">
					<Link href="/blog">
						<Button variant="ghost" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">
							<ArrowLeft className="h-4 w-4" />
							Back to Blog
						</Button>
					</Link>
					<ThemeSwitcher />
				</div>
			</div>

			{/* Post Header */}
			<div className="space-y-6">
				<div className="space-y-4">
					<Badge variant="outline" className="text-sm font-medium">
						{post.category}
					</Badge>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
						{post.title}
					</h1>
					<p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
						{post.description}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
					<div className="flex items-center gap-2">
						<User className="h-4 w-4" />
						<span>{post.author}</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						<span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<Tag className="h-4 w-4 text-zinc-400 mt-1" />
					{post.tags.map((tag: string) => (
						<Badge key={tag} variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700">
							{tag}
						</Badge>
					))}
				</div>
			</div>

			{/* Content */}
			<article className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 md:p-12">
				<div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed">
					<ReactMarkdown
						components={{
							h1: ({ children }) => (
								<h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 mt-8 border-b border-zinc-200 dark:border-zinc-700 pb-4">
									{children}
								</h1>
							),
							h2: ({ children }) => (
								<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 mt-8">
									{children}
								</h2>
							),
							h3: ({ children }) => (
								<h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 mt-6">
									{children}
								</h3>
							),
							p: ({ children }) => (
								<p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed text-lg">
									{children}
								</p>
							),
							code: ({ children, className }) => {
								const isInline = !className;
								return isInline ? (
									<code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-sm font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
										{children}
									</code>
								) : (
									<code className={`${className} block bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl overflow-x-auto border border-zinc-200 dark:border-zinc-700 my-6`}>
										{children}
									</code>
								);
							},
							pre: ({ children }) => (
								<pre className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl overflow-x-auto border border-zinc-200 dark:border-zinc-700 my-6">
									{children}
								</pre>
							),
							ul: ({ children }) => (
								<ul className="list-disc list-inside mb-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">
									{children}
								</ul>
							),
							ol: ({ children }) => (
								<ol className="list-decimal list-inside mb-6 space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">
									{children}
								</ol>
							),
							li: ({ children }) => (
								<li className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
									{children}
								</li>
							),
							blockquote: ({ children }) => (
								<blockquote className="border-l-4 border-blue-500 pl-6 italic text-zinc-600 dark:text-zinc-400 mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
									{children}
								</blockquote>
							),
							strong: ({ children }) => (
								<strong className="font-bold text-zinc-900 dark:text-white">
									{children}
								</strong>
							),
							em: ({ children }) => (
								<em className="italic text-zinc-700 dark:text-zinc-300">
									{children}
								</em>
							),
						}}
					>
						{post.content}
					</ReactMarkdown>
				</div>
			</article>
		</div>
	);
}
