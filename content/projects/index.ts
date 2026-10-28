// Project registry. To add a project: create `<slug>.mdx` in this folder (copy _template.mdx),
// then add one import + one entry below. The object key becomes the URL: /projects/<key>.
import * as securescan from "./securescan.mdx";
import * as homeSocLab from "./home-soc-lab.mdx";
import * as phishingAnalyzer from "./phishing-analyzer.mdx";
import * as secureNotes from "./secure-notes-api.mdx";

export const projectModules = {
  securescan,
  "home-soc-lab": homeSocLab,
  "phishing-analyzer": phishingAnalyzer,
  "secure-notes-api": secureNotes,
};
