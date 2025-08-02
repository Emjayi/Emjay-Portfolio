import { CardDemo } from "@/app/components/ui/ContentCard";
import { HoverBorderGradient } from "@/app/components/ui/Hover-Border-Gradient";
import { getAllPosts } from "@/lib/blog-utils";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Calendar, User, Tag, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { ThemeProvider } from "@/app/theme-provider";
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import Link from "next/link";
import { BlogClient } from "./BlogClient";

export default function Page() {
	const posts = getAllPosts();
	const categories = [...new Set(posts.map(post => post.category))];
	const tags = [...new Set(posts.flatMap(post => post.tags))];

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<BlogClient
				posts={posts}
				categories={categories}
				tags={tags}
			/>
		</ThemeProvider>
	);
}
