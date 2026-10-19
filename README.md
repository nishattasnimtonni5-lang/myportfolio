# Nishat Tasnim Tonni — Portfolio

A responsive developer portfolio built with React 19, Vite, React Router, and Tailwind CSS 4. The site combines a cinematic dark interface with the developer's profile, background, skills, project links, education, and contact details.

## Features

- **Automatic name intro:** On entering the home page, a glowing bulb falls and joins the dot of the final `i` in “Nishat Tasnim Tonni.” There is no intro button; selecting the brand mark on the home page replays the sequence. Reduced-motion preferences skip the animation.
- **Digital Abyss landing page:** A layered, CSS-based atmosphere responds to scroll without taking over native scrolling.
- **Interactive project cover flow:** Three real projects appear in a perspective carousel. Use the previous/next buttons, keyboard arrow keys while focused on the carousel, mouse dragging, or touch swipes. Project cards link to their live sites; the detail links remain available.
- **Cursor trail:** A fixed, pointer-transparent canvas adds short-lived pink, purple, cyan, and amber light trails on pointer movement and touch. It pauses for reduced-motion preferences and when the page is hidden.
- **Education and course history:** Displays the supplied academic results, locations, and coursework.
- **Printable resume:** Open `/resume` and choose **Print / Save PDF** to use the browser's print dialog. Select **Save as PDF** in the print destination to download a copy.
- **Project detail pages:** Open `/projects/:id` for the project description and available links.
- **Responsive navigation and contact:** Includes section navigation, a mobile menu, and contact methods.

## Project links

Project names, descriptions, featured flags, and live URLs are maintained in [`frontend/src/data/projects.js`](./frontend/src/data/projects.js):

| Project | Live site |
| --- | --- |
| Bazar Dor | <https://b14-a-7-bazar-dor.vercel.app/> |
| Assignment 5 | <https://assignment-5-b14.vercel.app/> |
| FITLOG | <https://b-14-a-06-nixw.vercel.app/> |

The carousel uses local overview screenshots captured from each of the three live project pages. Their image files are stored in `frontend/src/assets/projects/` and referenced alongside each project in `frontend/src/data/projects.js`.

## Run locally

Requirements: Node.js and npm.

```sh
cd frontend
npm install
npm run dev
```

Vite prints the local development URL when the server starts.

## Build and lint

Run these commands from `frontend`:

```sh
npm run build
npm run lint
```

The production files are generated in `frontend/dist`.

## Project structure

```text
frontend/
  public/                 Static assets
  src/
    assets/               Profile and local visual assets
    components/           Navigation, portfolio sections, cursor trail
    data/projects.js      Project content and live URLs
    pages/                Home, project details, printable resume
    App.jsx               Routes and shared layout
    index.css             Theme, responsive layout, and animations
```

## Editing content

- Update project names, copy, featured status, or live URLs in `frontend/src/data/projects.js`.
- Update academic records and courses in `frontend/src/components/Education.jsx`; the matching resume content is in `frontend/src/pages/Resume.jsx`.
- Update contact information in the contact component and resume page.
- `CursorTrail` is mounted on the home page after the cinematic environment and before the page content. It draws only while particles are active, does not intercept pointer input, and can be reused on another page by importing `frontend/src/components/CursorTrail.jsx`.

## Accessibility and motion

The site uses semantic links and buttons, keyboard-operable carousel controls, visible focus indicators, and native page scrolling. Intro, carousel transitions, parallax, and cursor particles respect `prefers-reduced-motion`.
