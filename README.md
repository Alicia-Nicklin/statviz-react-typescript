# StatViz

A small interactive statistics visualiser built with React and TypeScript.

I chose this project because it links to my Engineering Mathematics background and gave me a focused way to practise front-end fundamentals: typed data structures, reusable React components, custom hooks, state management, accessibility labels, and SVG-based visualisation.

The project is intentionally small, but it focuses on clear TypeScript, readable component structure, and maintainable front-end code.

## Features

- Distribution explorer for a normal distribution
- Adjustable mean and standard deviation
- SVG bell curve generated without a charting library
- One-sample z-test calculator
- Two-tailed, left-tailed, and right-tailed tests
- Live p-value, z-score, standard error, and effect size
- Accessible form labels and tab navigation
- Core statistics implemented without external maths libraries

## Tech stack

- React
- TypeScript
- Vite
- CSS
- Git/GitHub

## Project structure

```text
src/
├── components/
│   ├── BellCurve.tsx
│   ├── DistributionExplorer.tsx
│   └── ZTestPanel.tsx
├── hooks/
│   ├── useDistribution.ts
│   └── useZTest.ts
├── types/
│   └── index.ts
├── utils/
│   └── stats.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
