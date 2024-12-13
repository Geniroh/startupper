"use server";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

export async function incrementViews(id: string) {
  // Fetch the current view count
  const { views: currentViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // Increment the view count
  const newViews = (currentViews || 0) + 1;

  // Update the view count in Sanity
  await writeClient.patch(id).set({ views: newViews }).commit();

  return newViews;
}
