import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { services, servicePath } from "@/config/services";

/* Pas de date « lastModified » : la date du build changerait à chaque déploiement sans que le contenu
   change, et Google ignore les dates peu fiables. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[string, number]> = [
    ["/", 1],
    ["/services", 0.9],
    ...services.map((s): [string, number] => [servicePath(s), 0.9]),
    ["/tarifs", 0.8],
    ["/realisations", 0.6],
    ["/a-propos", 0.6],
    ["/contact", 0.8],
    ["/mentions-legales", 0.2],
    ["/politique-de-confidentialite", 0.2],
    ["/cookies", 0.2],
    ["/conditions-generales", 0.2],
    ...projects.map((p): [string, number] => [`/realisations/${p.slug}`, 0.5]),
  ];
  return pages.map(([path, priority]) => ({ url: new URL(path, site.url).toString(), priority }));
}
