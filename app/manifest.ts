import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// The web app manifest — lets browsers treat the site as an installable app and
// supplies the name/colors used for the install prompt and OS integration.
// Colors are the design-system tokens (globals.css): warm off-white canvas and
// the clay brand accent. (The branded icon is added in app/icon.svg.)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f8f6",
    theme_color: "#d97757",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
