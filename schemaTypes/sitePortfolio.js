export default {
  title: "Vitrines",
  name: "sitePortfolio",
  type: "document",
  fields: [
    { name: "titre",       title: "Titre du site",        type: "string" },
    { name: "description", title: "Description",           type: "text"   },
    {
      name: "image",
      title: "Image principale (screenshot / aperçu)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "galerie",
      title: "Galerie (captures supplémentaires)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Site vitrine",  value: "vitrine"   },
          { title: "E-commerce",    value: "ecommerce" },
          { title: "Portfolio",     value: "portfolio" },
          { title: "Blog",          value: "blog"      },
          { title: "Landing page",  value: "landing"   },
          { title: "Web App",       value: "webapp"    },
        ],
        layout: "radio",
      },
    },
    {
      name: "statut",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "✅ Livré",     value: "livre"    },
          { title: "🔧 En cours",  value: "en_cours" },
          { title: "📦 Archivé",   value: "archive"  },
        ],
        layout: "radio",
      },
      initialValue: "livre",
    },
    {
      name: "tags",
      title: "Technologies utilisées",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    { name: "lien",  title: "Lien live (URL du site)", type: "url"    },
    { name: "ordre", title: "Ordre d'affichage",        type: "number" },
  ],
  preview: {
    select: { title: "titre", subtitle: "categorie", media: "image" },
  },
};