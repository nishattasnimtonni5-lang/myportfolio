import bazarDorImage from "../assets/projects/bazar-dor-overview.png";
import assignmentFiveImage from "../assets/projects/assignment-5-overview.png";
import fitlogImage from "../assets/projects/fitlog-overview.png";

const projects = [
  {
    id: 3,
    title: "Bazar Dor",
    category: "Market price tracker",
    description:
      "A Bangla market-price guide for checking everyday prices across categories including produce, fish, meat, and pantry essentials.",
    live: "https://b14-a-7-bazar-dor.vercel.app/",
    github: "https://github.com/nishattasnimtonni5-lang/b14-A-7-Bazar-Dor",
    technologies: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "daisyUI",
      "MongoDB",
      "Better Auth (MongoDB adapter)",
      "Resend",
      "react-toastify",
      "Moment.js",
    ],
    challenges: [
      "Modelling Bangla market categories and daily price entries so editors could update prices without breaking existing records.",
      "Wiring Better Auth with the MongoDB adapter and guarding server actions so only verified editors can change prices.",
      "Keeping lists fresh with server-side revalidation while staying fast on slow mobile connections.",
      "Sending transactional emails through Resend from server actions without blocking the UI, plus timezone-safe timestamps with Moment.",
    ],
    future: [
      "Price history charts and weekly trends for each item.",
      "User accounts with saved favourites and price-drop email alerts.",
      "Crowdsourced price submissions with a moderation queue.",
      "PWA/offline mode so the guide works inside noisy markets.",
    ],
    image: bazarDorImage,
    featured: true,
  },
  {
    id: 2,
    title: "Assignment 5",
    category: "Batch 14 project",
    description:
      "A web project built as part of the Programming Hero Batch 14 assignments.",
    live: "https://assignment-5-b14.vercel.app/",
    github: "https://github.com/nishattasnimtonni5-lang/assignment-5-b14",
    technologies: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS 4",
      "daisyUI",
      "react-toastify",
      "Iconify icons",
      "ESLint",
    ],
    challenges: [
      "Covering every assignment requirement while keeping the interface clean instead of feature-stuffed.",
      "Building reusable components shared across sections without prop drilling or duplicated markup.",
      "Matching the daisyUI theme with Tailwind so the design stayed consistent on mobile and desktop.",
      "Replacing blocking browser alerts with react-toastify feedback that never interrupts the flow.",
    ],
    future: [
      "Route-level code splitting with React.lazy for a faster first load.",
      "Dark/light theme toggle with saved user preference.",
      "Unit tests with Vitest and Testing Library.",
      "CMS-driven content so sections can be updated without redeploying.",
    ],
    image: assignmentFiveImage,
    featured: true,
  },
  {
    id: 1,
    title: "FITLOG",
    category: "Fitness & workout planning",
    description:
      "A fitness experience for exploring workouts and managing a personal training plan.",
    live: "https://b-14-a-06-nixw.vercel.app/",
    github: "https://github.com/nishattasnimtonni5-lang/b-14-A-06",
    technologies: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "daisyUI",
      "Vitest + Testing Library",
      "Playwright (E2E)",
      "react-toastify",
    ],
    challenges: [
      "Designing a workout data model that supports both one-off sessions and longer training plans.",
      "Keeping the plan editor responsive on touch devices while exercises are reordered.",
      "Logging a set instantly with optimistic UI so the app never feels blocked mid-workout.",
      "Writing meaningful unit and end-to-end tests for interactive flows with Vitest and Playwright.",
    ],
    future: [
      "Progress charts for volume and personal records with weekly summaries.",
      "Rest timer, set history and reusable workout templates.",
      "Authentication with cloud sync and a mobile-installable PWA.",
      "Export plans and logs to CSV or Google Sheets.",
    ],
    image: fitlogImage,
    featured: false,
  },
];

export default projects;
