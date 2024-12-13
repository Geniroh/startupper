import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityToken } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: sanityToken,
});

if (!writeClient.config().token) {
  throw new Error("Write token not found");
}
