import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, Code2, FileText, Github, Layers, User } from "lucide-react"
import { soloProjects } from "@/lib/solo-projects"
import { ProjectMedia } from "@/app/components/project-media"
import { ProjectLink } from "@/app/components/project-navigation"
import styles from "./project.module.css"
import type { CSSProperties } from "react"

export function generateStaticParams() {
  return soloProjects.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = soloProjects.find(project => project.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} | Emjay Sepahi`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.description, images: [project.cover] },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = soloProjects.findIndex(project => project.slug === params.slug)
  if (index === -1) notFound()
  const project = soloProjects[index]
  const next = soloProjects[(index + 1) % soloProjects.length]
  return (
    <main className={styles.page} style={{ "--project-color": project.color } as CSSProperties}>
      <nav className={styles.nav} aria-label="Project navigation">
        <ProjectLink href="/#projects"><ArrowLeft size={18} /> All projects</ProjectLink>
        <span>SOLO PROJECT / {String(index + 1).padStart(2, "0")}</span>
      </nav>
      <div className={styles.layout}>
        <aside className={styles.media} aria-label={`${project.title} images`}>
          <div className={styles.sticky}>
            <div className={styles.cover} data-project-media={project.slug} style={{ viewTransitionName: `project-${project.slug}` } as CSSProperties}>
              <ProjectMedia key={project.slug} cover={project.cover} video={project.video} title={project.title} />
            </div>
            {project.gallery.length > 0 && <div className={styles.gallery}>
              {project.gallery.map((src, i) => <a key={src} href={src.startsWith("/") ? src : `/images/${src}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} image ${i + 1}`}>
                <Image src={src.startsWith("/") ? src : `/images/${src}`} alt={`${project.title}, additional view ${i + 1}`} width={720} height={540} sizes="(max-width: 767px) 45vw, 22vw" />
              </a>)}
            </div>}
          </div>
        </aside>
        <article className={styles.details}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.intro}>{project.description}</p>
          <div className={styles.actions}>
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">Visit website <ArrowUpRight size={18} /></a>}
            {project.git_link && <a href={project.git_link} target="_blank" rel="noopener noreferrer"><Github size={18} /> Source code</a>}
          </div>
          <section className={styles.section}>
            <User aria-hidden="true" /><div><h2>Created by</h2><p>{project.author}</p><p className={styles.muted}>Solo project</p></div>
          </section>
          <section className={styles.section}>
            <Layers aria-hidden="true" /><div><h2>Project type</h2><p>{project.category}</p></div>
          </section>
          <section className={styles.section}>
            <Calendar aria-hidden="true" /><div><h2>Date</h2><p>{new Date(`${project.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}</p></div>
          </section>
          <section className={styles.section}>
            <FileText aria-hidden="true" /><div><h2>About the project</h2><p>{project.body}</p></div>
          </section>
          <section className={styles.section}>
            <Code2 aria-hidden="true" /><div><h2>Technologies & focus</h2><ul className={styles.tags}>{project.tags.split(",").map(tag => <li key={tag}>{tag.trim().replace(/-/g, " ")}</li>)}</ul></div>
          </section>
          <ProjectLink href={`/projects/${next.slug}`} className={styles.next}><span>Next project<strong>{next.title}</strong></span><ArrowUpRight size={28} /></ProjectLink>
        </article>
      </div>
    </main>
  )
}
