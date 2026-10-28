"use client"
import Image from "next/image"
import type React from "react"

import styles from "./style.module.scss"
import { useRef, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ProjectLink } from "@/app/components/project-navigation"
import { projectSlug, projectCover } from "@/lib/solo-projects"
import SpotlightCard from "../../../ui/carddd"
import { Button } from "@/app/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const Card = memo(({ title, description, src, link, git_link, color, i }: any) => {
	const container = useRef(null)

	const { scrollYProgress } = useScroll({
		target: container,
		layoutEffect: false,
		offset: ["start end", "start start"],
	})

	const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

	const handleButtonClick = (e: React.MouseEvent, url: string) => {
		e.preventDefault()
		e.stopPropagation()
		window.open(url, "_blank", "noopener,noreferrer")
	}

	return (
		<div style={{ top: `calc(-5vh + ${ i * 25}px)` }} className={styles.cardContainer} ref={container}>
			<div
				className={styles.card}
			>
				<SpotlightCard className="custom-spotlight-card h-full" spotlightColor={color}>
					<ProjectLink href={`/projects/${projectSlug(title)}`} className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><span className="sr-only">View {title} project details</span></ProjectLink>
					<h2 className="text-zinc-200">{title}</h2>
					<div className={styles.body}>
						<div className={styles.description}>
							<p className="font-sans text-zinc-200">{description}</p>
							<div className="relative z-20 mt-4 flex gap-3">
								{link && link !== "#" && (
									<Button
										variant="outline"
										size="sm"
										className="bg-transparent border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-800"
										onClick={(e) => handleButtonClick(e, link)}
									>
										<ExternalLink className="mr-2 h-4 w-4" />
										Project
									</Button>
								)}
								{git_link && (
									<Button
										variant="outline"
										size="sm"
										className="bg-transparent border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-800"
										onClick={(e) => handleButtonClick(e, git_link)}
									>
										<Github className="mr-2 h-4 w-4" />
										GitHub
									</Button>
								)}
							</div>
						</div>

						<div className={styles.imageContainer} data-project-media={projectSlug(title)} style={{ viewTransitionName: `project-${projectSlug(title)}` } as React.CSSProperties}>
							<motion.div style={{ scale: imageScale }} className={`${styles.inner} object-contain`}>
								<Image fill src={projectCover(src)} sizes="(max-width: 768px) 100vw, 50vw" alt={`${title} website preview`} />
							</motion.div>
						</div>
					</div>
				</SpotlightCard>
			</div>
		</div>
	)
})

Card.displayName = "Card"
export default Card
