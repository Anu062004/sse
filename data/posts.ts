export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "identify-jcb-3dx-spool-valve",
    title: "How to identify the right JCB 3DX spool valve",
    excerpt:
      "The model badge is not enough. Year, valve block and spool position decide which spool fits your 3DX.",
    date: "2026-11-12",
    readingTime: "4 min",
    category: "Fitment",
    author: "SSE Team",
    body: [
      {
        type: "p",
        text: "A JCB 3DX built in 2006 and one built in 2014 can look almost identical at the valve block, yet use different spools. Before you order, confirm three things: the machine year, the valve block make and the position of the spool in the block.",
      },
      {
        type: "h2",
        text: "Start with the machine year",
      },
      {
        type: "p",
        text: "Our 3DX loader spools are grouped by build period: 2005–2007, 2008–2010 and 2013 onwards. The land spacing and end detail change between these groups. The machine serial plate or the registration papers will give you the year. If the plate is missing, send a clear photo of the old spool next to a ruler.",
      },
      {
        type: "h2",
        text: "Check the valve block",
      },
      {
        type: "p",
        text: "JCB machines in the field use more than one valve block make. Husco and Hydra Control are the two most common on the 3DX family, and the same machine model can appear with either. The make is usually cast or stamped on the block body. A photo of the block, taken straight on, is often enough for us to identify it.",
      },
      {
        type: "h2",
        text: "Match the spool position",
      },
      {
        type: "ul",
        items: [
          "Loader spools control the loader circuit and are often supplied as a matched set of two.",
          "Unloader spools sit in a separate position and are usually ordered singly.",
          "Excavator spools are specific to the excavator valve block, not the loader block.",
        ],
      },
      {
        type: "p",
        text: "If you are unsure, send the old spool, the machine model and the valve block photo on WhatsApp. We will match the part and confirm the pack size before dispatch.",
      },
    ],
  },
  {
    slug: "husco-hydra-control-walvoil-valve-block",
    title: "Husco, Hydra Control or Walvoil: which valve block is on your machine?",
    excerpt:
      "Three valve block makes, one machine badge. Here is where to look and what to photograph.",
    date: "2026-10-24",
    readingTime: "3 min",
    category: "Valve blocks",
    author: "SSE Team",
    body: [
      {
        type: "p",
        text: "Aftermarket spools are matched to the valve block, not just the machine. JCB, L&T, Escorts, Terex, Bull, Caterpillar and Mahindra machines can carry different blocks depending on the build year, the model and the market.",
      },
      {
        type: "h2",
        text: "Look at the block, not the machine badge",
      },
      {
        type: "p",
        text: "Clean the side of the valve block and look for a cast name, a stamped plate or a tag. Husco blocks usually carry a clear cast mark. Hydra Control blocks are common on older JCB loader and excavator applications. Walvoil blocks appear on newer L&T, Terex, Escorts and Case loader models.",
      },
      {
        type: "h2",
        text: "Why the same model can use different blocks",
      },
      {
        type: "p",
        text: "Manufacturers change suppliers across production runs. A 3DX from one year may use a Husco block, while a later XTRA machine may use Hydra Control. That is why we ask for the year and the block make together, and why a part number alone can be misleading.",
      },
      {
        type: "h2",
        text: "What to send us",
      },
      {
        type: "ul",
        items: [
          "A straight-on photo of the valve block, with the casting marks visible.",
          "A photo of the old spool on a flat surface, with a ruler alongside it.",
          "The machine model and year from the serial plate.",
          "Any part number stamped on the old spool or block.",
        ],
      },
      {
        type: "p",
        text: "Send these on WhatsApp and we will confirm the spool, the seal kit and the pack size. If the block is unclear, we will tell you what else to check before you order.",
      },
    ],
  },
  {
    slug: "wiper-seal-failure-valve-blocks",
    title: "Why wiper seals fail on earthmoving valve blocks",
    excerpt:
      "Dust, grit and a worn wiper cause more spool problems than hydraulic pressure. Here is what to check.",
    date: "2026-09-18",
    readingTime: "4 min",
    category: "Seal kits",
    author: "SSE Team",
    body: [
      {
        type: "p",
        text: "A spool valve runs in a bore with very small clearances. The wiper seal is the first line of defence against dust, sand and grit. When it wears, contamination reaches the spool lands and the bore, and the valve starts to stick or bypass.",
      },
      {
        type: "h2",
        text: "Dust is the enemy",
      },
      {
        type: "p",
        text: "Earthmoving machines work in abrasive conditions. A damaged wiper lets fine dust past the seal, where it mixes with hydraulic oil and acts like a grinding paste. Replacing only the O-rings without the wiper leaves the same path open.",
      },
      {
        type: "h2",
        text: "Fit the kit, not just the O-ring",
      },
      {
        type: "p",
        text: "Our wiper seal kits are supplied as complete sets for the valve block. Fit the wiper, the seals and the O-rings together, clean the bore, and check the spool for scoring before reassembly. If the spool is scored, a new seal kit will not fix the leak.",
      },
      {
        type: "h2",
        text: "Pack sizes",
      },
      {
        type: "ul",
        items: [
          "JCB loader valve block (Husco): one kit contains four sets.",
          "JCB 3DX XTRA excavator valve block: one kit contains twelve sets.",
          "JCB 2D valve block: one kit contains four sets.",
          "L&T, Escorts and Terex valve blocks: supplied as a single kit.",
        ],
      },
      {
        type: "p",
        text: "Tell us the machine, year and valve block make, and we will confirm the right kit. For dealer and bulk quantities, use the quote form or call us directly.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
