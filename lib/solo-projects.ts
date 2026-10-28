import { projects } from "@/content/data"

export function projectSlug(title: string) {
  return title.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function projectCover(src: string) {
  return `/images/projects/${src.replace(/\.[^.]+$/, ".webp")}`
}

export const soloProjects = projects.map(project => ({
  ...project,
  slug: projectSlug(project.title),
  cover: projectCover(project.src),
  video: (project as typeof project & { video?: string }).video,
  gallery: (project.images ?? []) as string[],
}))
