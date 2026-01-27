# Roadmap Roulette

**Tech**: HTML, CSS, JavaScript, Chart.js | **Time**: 60 min

## What You're Building
An interactive roadmap planning tool where PMs can add initiatives, tag them by theme, assign T-shirt sizes, and drag/click to move them between quarters. A balance chart shows theme distribution per quarter.

## Key Features
- Quarter columns (Q1-Q4 + Backlog) displaying initiative cards
- Initiative cards with theme badges and T-shirt size indicators
- Drag-drop or click-to-move functionality between quarters
- Stacked bar chart showing theme distribution per quarter
- Form to add new initiatives

## Success Criteria
- [ ] Five columns display (Q1, Q2, Q3, Q4, Backlog)
- [ ] Initiative cards show name, theme badge, and size
- [ ] Initiatives can be moved between quarters
- [ ] Balance chart updates when initiatives move
- [ ] New initiatives can be added via form
- [ ] Theme colors are consistent across cards and chart

## Quick Start

1. Open `implementation/index.html` in a browser to see the working solution
2. Read `spec_roadmap-roulette.md` to understand the requirements and data structures
3. Choose an option below and use the example prompts, refining as needed

### Option A: One-Shot Build
Prompt Cursor: "Read spec_roadmap-roulette.md and build the complete application as a single HTML file with embedded CSS and JavaScript. Use Chart.js via CDN for the balance chart."

### Option B: Incremental Build
Build feature by feature:
1. "Read spec_roadmap-roulette.md and create the initiative data structure and render 5 quarter columns with initiative cards"
2. "Add theme badges (growth, retention, tech_debt, compliance) and T-shirt size indicators to each card"
3. "Add click-to-move buttons on each card to move initiatives between quarters"
4. "Add a Chart.js stacked bar chart showing theme distribution per quarter that updates when initiatives move"

## Getting Unstuck
- Screenshot the reference implementation and drag into Cursor chat
- Start with click-to-move buttons before attempting drag-drop
- Use `chart.update()` to refresh the balance chart after moves

## Resources
- [Chart.js Stacked Bar Chart](https://www.chartjs.org/docs/latest/charts/bar.html#stacked-bar-chart)
- [MDN Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## Bonus Features

Here are some ideas for additional features you may want to add if you have time, but feel free to extend or modify as you see fit:

- Constraint warnings when quarters are overloaded
- Dependency arrows between related initiatives
- Size-weighted balance chart (XS=1, S=2, M=3, L=5, XL=8)
- Shareable roadmap export (HTML snapshot)
