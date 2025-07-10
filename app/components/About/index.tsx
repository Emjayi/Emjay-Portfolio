"use client"

import { useRef, useState, useEffect } from "react"
import Skills from "../Main/Skills"

const About = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [scrollPosition, setScrollPosition] = useState(0)

	// Define sections with their scroll position ranges
	const sections = [
		{
			type: "title",
			content: "About Me",
			startPosition: 0,
			endPosition: 0.06,
		},
		{
			type: "paragraph",
			content:
				"I'm Mohammad Javad, a Full-Stack Web Developer with a passion for design, computers, and solving problems.",
			startPosition: 0.06,
			endPosition: 0.12,
		},
		{
			type: "paragraph",
			content:
				"My journey began with WordPress web design, where I first discovered the joy of building things that live on the internet.",
			startPosition: 0.12,
			endPosition: 0.18,
		},
		{
			type: "paragraph",
			content:
				"From there, I dove headfirst into the world of CSS and JavaScript, turning static pages into interactive experiences.",
			startPosition: 0.16,
			endPosition: 0.24,
		},
		{
			type: "paragraph",
			content:
				"These days, I'm fully immersed in the ever-evolving universe of web development, working hands-on with cutting-edge technologies to bring ideas to life.",
			startPosition: 0.24,
			endPosition: 0.30,
		},
		{
			type: "paragraph",
			content:
				"For me, coding isn't just about writing lines of code — it's about crafting something meaningful and, if I'm lucky, a little magical.",
			startPosition: 0.30,
			endPosition: 0.36,
		},
		{
			type: "skills",
			content: "So here you can see my skills...",
			startPosition: 0.36,
			endPosition: 0.56,
		},
	]

	// Handle scroll to update scroll position
	useEffect(() => {
		const handleScroll = () => {
			// Calculate scroll progress (0 to 1)
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
			const currentProgress = window.scrollY / scrollHeight
			setScrollPosition(currentProgress)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Find the active section based on scroll position
	const activeSection = sections.find(
		(section) => scrollPosition >= section.startPosition && scrollPosition < section.endPosition,
	)

	return (
		<div ref={containerRef} className="md:h-[800vh]" id="about">
			{/* Fixed position content container with transparent background */}
			<div className="md:sticky md:top-0 h-screen w-full flex items-center justify-center">
				{/* Content that changes based on scroll position */}
				<div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 transition-opacity duration-300">
					{activeSection && (
						<>
							{activeSection.type === "title" && (
								<h1 className="text-3xl md:text-4xl font-black tracking-tight">{activeSection.content}</h1>
							)}

							{activeSection.type === "paragraph" && (
								<p className="text-2xl md:text-4xl font-bold max-w-4xl">{activeSection.content}</p>
							)}

							{activeSection.type === "skills" && (
								<div className="w-full max-w-4xl">
									<h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight text-center">
										{activeSection.content}
									</h2>
								</div>
							)}
						</>
					)}
				</div>
			</div>


		</div>
	)
}

export default About
