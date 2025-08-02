"use client"

import { useRef, useState, useEffect } from "react"
import Skills from "../Main/Skills"
import TextReveal from "@/components/ui/textreveal"

const About = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [encounteredSections, setEncounteredSections] = useState<Set<string>>(new Set())

	// Define sections with their scroll position ranges
	const sections = [
		{
			type: "paragraph",
			content:
				"I'm Mohammad Javad, a 25-year-old web developer with over 5 years of experience in the tech industry.",
			startPosition: 0.02,
			endPosition: 0.10,
		},
		{
			type: "paragraph",
			content:
				"I began my journey with WordPress and Elementor, gradually moving into front-end development by learning CSS, HTML, and JavaScript.",
			startPosition: 0.10,
			endPosition: 0.18,
		},
		{
			type: "paragraph",
			content:
				"As I deepened my skills through self-study and online courses, I transitioned into modern frameworks like React and eventually specialized in Next.js.",
			startPosition: 0.16,
			endPosition: 0.24,
		},
		{
			type: "paragraph",
			content:
				"For the past 3 years, I’ve been working professionally with Next.js, building scalable, high-performance applications while continuously expanding my knowledge of modern web technologies and tools.",
			startPosition: 0.24,
			endPosition: 0.30,
		},
		{
			type: "paragraph",
			content:
				"I’m a dedicated lifelong learner, always seeking better solutions, cleaner code, and more efficient workflows.",
			startPosition: 0.30,
			endPosition: 0.36,
		}
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

	// Track encountered sections
	useEffect(() => {
		const newEncounteredSections = new Set(encounteredSections)
		let hasChanges = false

		sections.forEach(section => {
			if (scrollPosition >= section.startPosition && scrollPosition < section.endPosition) {
				const sectionKey = `${section.startPosition}-${section.endPosition}`
				if (!newEncounteredSections.has(sectionKey)) {
					newEncounteredSections.add(sectionKey)
					hasChanges = true
				}
			}
		})

		if (hasChanges) {
			setEncounteredSections(newEncounteredSections)
		}
	}, [scrollPosition, encounteredSections])

	// Get all paragraph sections that have been encountered
	const paragraphSections = sections.filter(section =>
		section.type === "paragraph" &&
		encounteredSections.has(`${section.startPosition}-${section.endPosition}`)
	)

	// Check if we're in skills section
	const isInSkillsSection = scrollPosition >= 0.34

	return (
		<div ref={containerRef} className="md:h-[800vh]" id="about">
			{/* Fixed position content container with transparent background */}
			<div className="md:sticky md:top-0 h-screen w-full flex items-center justify-center">
				{/* Content that changes based on scroll position */}
				<div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 transition-opacity duration-300">
					{/* Always show paragraphs if they've been encountered */}
					{paragraphSections.length > 0 && (
						<div className="w-full max-w-4xl space-y-4">
							{paragraphSections.map((section, index) => {
								const sectionKey = `${section.startPosition}-${section.endPosition}`
								const isCurrentlyActive = scrollPosition >= section.startPosition && scrollPosition < section.endPosition

								return (
									<TextReveal
										key={sectionKey}
										text={section.content}
										shouldAnimate={isCurrentlyActive}
										isActive={isCurrentlyActive}
										index={index}
										shouldFade={isInSkillsSection}
									/>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default About
