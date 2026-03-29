export default {
  title: "Applications",
  name: "appSoftware",
  type: "document",
  fields: [
    { name: "nom", title: "Nom", type: "string" },
    { name: "version", title: "Version", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "icone", title: "Icône (emoji ou image)", type: "string" },
    { name: "lienTelecharger", title: "Lien téléchargement", type: "url" },
    { name: "lienGitHub", title: "Lien GitHub", type: "url" },
    { name: "gratuit", title: "Gratuit", type: "boolean" },
    { name: "ordre", title: "Ordre", type: "number" }
  ],
  preview: {
    select: { title: "nom", subtitle: "version" }
  }
};
