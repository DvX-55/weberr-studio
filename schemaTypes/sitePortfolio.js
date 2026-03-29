export default {
  title: "Vitrines",
  name: "sitePortfolio",
  type: "document",
  fields: [
    { name: "titre", title: "Titre", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "lien", title: "Lien (URL)", type: "url" },
    { name: "ordre", title: "Ordre", type: "number" }
  ],
  preview: {
    select: { title: "titre", subtitle: "description", media: "image" }
  }
};
