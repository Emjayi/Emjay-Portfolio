"use client";
import { other_projects } from "@/content/data";
import { Button } from "../../components/ui/button";
import { Github } from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [project, setProject] = React.useState<typeof other_projects[0] | undefined>(undefined);

	React.useEffect(() => {
		const currentProject = other_projects.find((project) => project.link === pathname);
		setProject(currentProject);
	}, [pathname]);

	const git_link = project?.git_link;

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<section className="flex flex-col sm:block justify-stretch items-stretch w-full min-h-screen">
				<Script
					id="structured-data-projects"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "ItemList",
							itemListElement: other_projects.map((project, index) => ({
								"@type": "ListItem",
								position: index + 1,
								url: `https://emjaysepahi.com/${project.link}`,
								name: project.title,
							})),
						}),
					}}
				/>
				{children}
				<div className="blcok md:hidden flex justify-center gap-5 py-4">
					<Button
						onClick={() => window.history.back()}
						className=" md:fixed z-50 left-4 top-4"
						variant="outline"
					>
						Back
					</Button>
					{git_link && (
						<Link href={git_link}>
							<Button
								variant="outline"
								className="md:fixed z-50 right-4 top-4"
							>
								<Github className="mr-2 h-4 w-4" />
								GitHub
							</Button>
						</Link>
					)}
				</div>
				<Button
					onClick={() => window.history.back()}
					className="hidden md:block md:fixed z-50 left-4 top-4"
					variant="outline"
				>
					Back
				</Button>
				{git_link && (
					<Link href={git_link}>
						<Button
							variant="outline"
							className="hidden md:flex md:fixed z-50 right-4 top-4"
						>
							<Github className="mr-2 h-4 w-4" />
							GitHub
						</Button>
					</Link>
				)}
				<Footer />
			</section>
		</ThemeProvider>
	);
}
