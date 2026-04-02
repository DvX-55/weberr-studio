export default {
  title: "Applications",
  name: "appSoftware",
  type: "document",
  fields: [
    { name: "nom",         title: "Nom de l'application", type: "string" },
    { name: "version",     title: "Version (ex: v1.2.0)",  type: "string" },
    { name: "description", title: "Description",           type: "text"   },
    {
      name: "logo",
      title: "Logo (image)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "icone",
      title: "Icône emoji (fallback si pas de logo)",
      type: "string",
    },
    {
      name: "screenshots",
      title: "Captures d'écran",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "techStack",
      title: "Technologies / Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "plateforme",
      title: "Plateforme",
      type: "string",
      options: {
        list: [
          { title: "Windows",       value: "windows" },
          { title: "macOS",         value: "macos"   },
          { title: "Linux",         value: "linux"   },
          { title: "Cross-platform",value: "cross"   },
          { title: "Web",           value: "web"     },
        ],
        layout: "radio",
      },
    },
    { name: "lienTelecharger", title: "Lien téléchargement", type: "url" },
    { name: "lienGitHub",      title: "Lien GitHub",         type: "url" },
    { name: "gratuit",         title: "Gratuit ?",           type: "boolean", initialValue: true },
    { name: "ordre",           title: "Ordre d'affichage",   type: "number"  },
  ],
  preview: {
    select: { title: "nom", subtitle: "version", media: "logo" },
  },
};