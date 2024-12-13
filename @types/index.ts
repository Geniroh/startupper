// export type StartupTypeCard = {
//   _createdAT: string;
//   _id: number | string;
//   views: number;
//   //eslint-disable-next-line
//   author: any;
//   description: string;
//   image: string;
//   category: string;
//   title: string;
// };

import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };
