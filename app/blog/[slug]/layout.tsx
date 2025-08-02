import { getPostBySlug } from "@/lib/blog-utils";
import { ThemeProvider } from "../../theme-provider";
import BlogSidebar from "@/app/components/blog/BlogSidebar";
import Link from "next/link";
import { ThemeSwitcher } from "@/app/components/theme-switcher";

interface LayoutProps {
	children: React.ReactNode;
	params: {
		slug: string;
	};
}

export default function Layout({ children, params }: LayoutProps) {
	const post = getPostBySlug(params.slug);
	const backgroundImage = post?.image || "/products/3.jpg"; // fallback to original image

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<section>
				<div
					className="h-96 bg-zinc-800/10 dark:bg-zinc-800/50 bg-blend-overlay bg-fixed"
					style={{ backgroundImage: `url('${backgroundImage}')` }}
				>

					{/* Header with Theme Switcher */}
					<div className="bg-zinc-100 sticky top-0 self-start dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
						<div className="max-w-7xl mx-auto px-4 py-4">
							<div className="flex justify-between items-center">
								<Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
									Emjay Sepahi
								</Link>
								<ThemeSwitcher />
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="flex flex-col lg:flex-row gap-8">
						<main className="flex-1">
							{children}
						</main>
						<div className="lg:sticky lg:top-8 lg:self-start">
							<BlogSidebar currentSlug={params.slug} />
						</div>
					</div>
				</div>
			</section>
			<footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
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
		</ThemeProvider>
	);
}
