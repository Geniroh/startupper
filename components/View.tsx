import React from "react";
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{totalViews ? totalViews : 0} views</span>
      </p>
    </div>
  );
};

export default View;

// "use client";
// import React, { useEffect, useState } from "react";
// import Ping from "@/components/Ping";
// import { incrementViews } from "@/actions/incrementViews";

// const View = ({ id }: { id: string }) => {
//   const [myViews, setMyViews] = useState(0);

//   useEffect(() => {
//     const fetchViews = async () => {
//       const views = await incrementViews(id);
//       setMyViews(views);
//     };

//     fetchViews();
//   }, []);

//   return (
//     <div className="view-container">
//       <div className="absolute -top-2 -right-2">
//         <Ping />
//       </div>
//       <p className="view-text">
//         <span className="font-black">{myViews} views</span>
//       </p>
//     </div>
//   );
// };

// export default View;
