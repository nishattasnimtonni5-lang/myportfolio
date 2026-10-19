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
    image: fitlogImage,
    featured: false,
  },
];

export default projects;
