import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number]> = [
    ["/", 1],
    ["/services", 0.9],
    ["/tarifs", 0.9],
    ["/realisations", 0.7],
    ["/a-propos", 0.7],
    ["/contact", 0.8],
    ["/mentions-legales", 0.2],
    ["/politique-de-confidentialite", 0.2],
    ["/cookies", 0.2],
    ["/conditions-generales", 0.2],
  ];
  return [
    ...pages.map(([path, priority]) => ({
      url: new URL(path, site.url).toString(),
      lastModified: now,
      priority,
    })),
    ...projects.map((p) => ({
      url: new URL(`/realisations/${p.slug}`, site.url).toString(),
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
