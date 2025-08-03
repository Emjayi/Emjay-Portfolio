"use client"

import { useRef, useState, useEffect } from "react"
import Skills from "../Main/Skills"
import TextReveal from "@/components/ui/textreveal"

const About = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [encounteredSections, setEncounteredSections] = useState<Set<string>>(new Set())
	const [isMobile, setIsMobile] = useState(false)

	// Define sections with their scroll position ranges
	const sections = [
		{
			type: "paragraph",
			content:
				"I'm Mohammad Javad, a 25-year-old web developer with over 5 years of experience in the tech industry.",
			startPosition: 0.02,
			endPosition: 0.10,
			mobileStartPosition: 0, // 0px
			mobileEndPosition: 500, // 500px
		},
		{
			type: "paragraph",
			content:
				"I began my journey with WordPress, gradually moving into front-end development by learning CSS, HTML, and JavaScript.",
			startPosition: 0.10,
			endPosition: 0.18,
			mobileStartPosition: 500, // 500px
			mobileEndPosition: 1000, // 1000px
		},
		{
			type: "paragraph",
			content:
				"As I deepened my skills through self-study and online courses, I transitioned into modern frameworks like React and eventually specialized in Next.js.",
			startPosition: 0.16,
			endPosition: 0.24,
			mobileStartPosition: 1000, // 1000px
			mobileEndPosition: 1500, // 1500px
		},
		{
			type: "paragraph",
			content:
				"For the past 3 years, I've been working professionally with Next.js, building scalable, high-performance applications while continuously expanding my knowledge of modern web technologies and tools.",
			startPosition: 0.24,
			endPosition: 0.30,
			mobileStartPosition: 1500, // 1500px
			mobileEndPosition: 2000, // 2000px
		},
		{
			type: "paragraph",
			content:
				"I'm a dedicated lifelong learner, always seeking better solutions, cleaner code, and more efficient workflows.",
			startPosition: 0.30,
			endPosition: 0.36,
			mobileStartPosition: 2000, // 2000px
			mobileEndPosition: 2500, // 2500px
		}
	]

	// Check if device is mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Handle scroll to update scroll position
	useEffect(() => {
		const handleScroll = () => {
			if (isMobile) {
				// For mobile: use actual scroll position in pixels
				setScrollPosition(window.scrollY)
			} else {
				// For desktop: use percentage-based scroll progress
				const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
				const currentProgress = window.scrollY / scrollHeight
				setScrollPosition(currentProgress)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [isMobile])

	// Track encountered sections
	useEffect(() => {
		const newEncounteredSections = new Set(encounteredSections)
		let hasChanges = false

		sections.forEach(section => {
			let isInSection = false

			if (isMobile) {
				// Mobile: check if scroll position is within the pixel range
				isInSection = scrollPosition >= section.mobileStartPosition && scrollPosition < section.mobileEndPosition
			} else {
				// Desktop: check if scroll position is within the percentage range
				isInSection = scrollPosition >= section.startPosition && scrollPosition < section.endPosition
			}

			if (isInSection) {
				const sectionKey = isMobile
					? `mobile-${section.mobileStartPosition}-${section.mobileEndPosition}`
					: `${section.startPosition}-${section.endPosition}`

				if (!newEncounteredSections.has(sectionKey)) {
					newEncounteredSections.add(sectionKey)
					hasChanges = true
				}
			}
		})

		if (hasChanges) {
			setEncounteredSections(newEncounteredSections)
		}
	}, [scrollPosition, encounteredSections, isMobile])

	// Get all paragraph sections that have been encountered
	const paragraphSections = sections.filter(section => {
		const sectionKey = isMobile
			? `mobile-${section.mobileStartPosition}-${section.mobileEndPosition}`
			: `${section.startPosition}-${section.endPosition}`

		return section.type === "paragraph" && encounteredSections.has(sectionKey)
	})

	// Check if we're in skills section
	const isInSkillsSection = isMobile
		? scrollPosition >= 2500 // 2500px for mobile
		: scrollPosition >= 0.34 // 34% for desktop

	return (
		<div ref={containerRef} className="h-[400vh] mt-12 md:mt-0 md:h-[800vh]" id="about">
			{/* Fixed position content container with transparent background */}
			<div className="sticky top-6 md:top-0 h-screen w-full flex items-center justify-center">
				{/* Content that changes based on scroll position */}
				<div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 transition-opacity duration-300">
					{/* Always show paragraphs if they've been encountered */}
					{paragraphSections.length > 0 && (
						<div className="w-full max-w-4xl space-y-3 sm:space-y-4 px-4 sm:px-6">
							{paragraphSections.map((section, index) => {
								const sectionKey = isMobile
									? `mobile-${section.mobileStartPosition}-${section.mobileEndPosition}`
									: `${section.startPosition}-${section.endPosition}`

								const isCurrentlyActive = isMobile
									? scrollPosition >= section.mobileStartPosition && scrollPosition < section.mobileEndPosition
									: scrollPosition >= section.startPosition && scrollPosition < section.endPosition

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
