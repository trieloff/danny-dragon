# Technical Specification: Roadmap Roulette

**Author**: Dragons Den AI
**Status**: Draft
**Created**: 2026-01-16
**Last Updated**: 2026-01-16

## 1. Overview
Roadmap planning sessions often suffer from recency bias and loudest-voice-wins dynamics, where the most vocal stakeholder or the most recent request dominates the conversation. This exercise challenges you to build an interactive roadmap planning tool that brings structure and transparency to the prioritization process. Build a tool where PMs can add initiatives, tag them by theme (growth, retention, tech debt, compliance), estimate size using T-shirt sizing, and drag-drop them into quarters. The key differentiator is a visual balance chart that shows how much of each theme is planned per quarter—making trade-offs visible and rationale communicable to stakeholders.

## 2. Context & Scope
### Problem Statement
Roadmap planning sessions suffer from recency bias and loudest-voice-wins dynamics. PMs need a structured way to evaluate trade-offs and communicate rationale to stakeholders. Without visual representation of theme distribution, teams struggle to see if they're over-investing in growth while neglecting tech debt, or if Q1 is overloaded while Q3 sits empty. The lack of transparency leads to reactive planning where the most recent customer complaint or executive request takes priority over strategic balance. Teams need a tool that makes these trade-offs explicit and helps communicate the "why" behind roadmap decisions.

### Goals
- Build an **interactive roadmap planning tool** with quarterly views
- Support **theme tagging** (growth, retention, tech debt, compliance) for all initiatives
- Implement **T-shirt sizing** (XS, S, M, L, XL) for effort estimation
- Enable **drag-drop or click-to-move** functionality to assign initiatives to quarters
- Display a **visual balance chart** showing theme distribution per quarter
- Support **adding new initiatives** with all required metadata
- Provide **5+ mock initiatives** to demonstrate the concept
- **Complete the prototype within 60 minutes**

### Non-Goals
- **Do not integrate with real JIRA** or other project management tools
- No complex authentication or user management
- No production deployment or hosting setup
- No backend server or database
- No real-time collaboration features (multiple users editing simultaneously)
- No complex dependency management systems (bonus feature only)

## 3. Proposed Solution
Build a **single HTML file** with embedded CSS and JavaScript that acts as an interactive roadmap planning dashboard. The app will use **Chart.js** (loaded via CDN) to visualize theme distribution as a stacked bar chart, making it easy to see the balance of work across quarters at a glance.

**Simulation Strategy:**
All initiatives and their quarter assignments will be hardcoded in a JSON object within the JavaScript. Moving initiatives between quarters (via drag-drop or click-to-move buttons) triggers immediate recalculation of the balance chart. The chart shows how many initiatives of each theme are planned per quarter, updating reactively as initiatives are moved. No backend processing occurs—this demonstrates the planning interface concept that would be used in real roadmap planning sessions.

## 4. Detailed Design
### 4.1 Architecture
- **Stack**: Single HTML file with embedded CSS and JavaScript. No build step required.
- **Structure**:
  - `index.html`: Contains the complete application
  - `<style>`: Embedded CSS using CSS Grid for quarter columns layout
  - `<script>`: Contains mock data, Chart.js initialization, drag-drop logic, and balance calculation
- **External Dependencies**: Chart.js loaded via CDN (https://cdn.jsdelivr.net/npm/chart.js)

### 4.2 Data Model
You will define a constant `ROADMAP_DATA` object in your JavaScript containing initiative definitions.

**JSON Schema:**

```json
{
  "initiatives": [
    {
      "id": 1,
      "name": "AI Content Recommendations",
      "description": "ML-powered content suggestions based on user behavior patterns",
      "theme": "growth",
      "size": "L",
      "quarter": "Q1"
    },
    {
      "id": 2,
      "name": "Database Query Optimization",
      "description": "Refactor slow queries causing page load delays",
      "theme": "tech_debt",
      "size": "M",
      "quarter": "Q1"
    },
    {
      "id": 3,
      "name": "GDPR Consent Management",
      "description": "Update consent flows to meet new regulatory requirements",
      "theme": "compliance",
      "size": "S",
      "quarter": "Q2"
    },
    {
      "id": 4,
      "name": "Email Re-engagement Campaign",
      "description": "Automated email sequences for inactive users",
      "theme": "retention",
      "size": "M",
      "quarter": "Q2"
    },
    {
      "id": 5,
      "name": "Mobile App Push Notifications",
      "description": "Real-time notifications for content updates and mentions",
      "theme": "growth",
      "size": "XL",
      "quarter": "Q3"
    },
    {
      "id": 6,
      "name": "API Rate Limiting",
      "description": "Implement rate limiting to prevent abuse and ensure stability",
      "theme": "tech_debt",
      "size": "S",
      "quarter": "Q3"
    },
    {
      "id": 7,
      "name": "Personalized Onboarding Flow",
      "description": "Adaptive onboarding based on user role and goals",
      "theme": "retention",
      "size": "L",
      "quarter": "Q4"
    },
    {
      "id": 8,
      "name": "Accessibility Audit Remediation",
      "description": "Fix WCAG 2.1 AA compliance issues identified in audit",
      "theme": "compliance",
      "size": "M",
      "quarter": "Backlog"
    }
  ],
  "themes": ["growth", "retention", "tech_debt", "compliance"],
  "sizes": ["XS", "S", "M", "L", "XL"],
  "quarters": ["Q1", "Q2", "Q3", "Q4", "Backlog"]
}
```

**Field Definitions:**
- `id` (integer): Unique identifier for the initiative
- `name` (string): Short, descriptive initiative name
- `description` (string): One-sentence explanation of the initiative
- `theme` (string): Category for strategic grouping
  - `growth`: Features that acquire new users or expand usage
  - `retention`: Features that keep existing users engaged
  - `tech_debt`: Technical improvements, refactoring, performance
  - `compliance`: Regulatory, security, legal requirements
- `size` (string): T-shirt size estimate for effort
  - `XS`: 1-2 weeks
  - `S`: 3-4 weeks
  - `M`: 1-2 months
  - `L`: 3-4 months
  - `XL`: 5+ months
- `quarter` (string): Current assignment (Q1, Q2, Q3, Q4, or Backlog)

### 4.3 Interface / API
**UI Components:**
- **Quarter Columns**: Five columns displayed side-by-side
  - Q1, Q2, Q3, Q4 (representing fiscal or calendar quarters)
  - Backlog (unscheduled initiatives)
  - Each column shows initiatives assigned to that quarter
  - Visual indicators for quarter capacity
- **Initiative Cards**: Draggable cards within quarter columns
  - Initiative name prominently displayed
  - Theme badge (color-coded by theme)
  - Size badge (T-shirt size)
  - Description visible on hover or click
  - Move buttons (if drag-drop not implemented)
- **Balance Chart**: Stacked bar chart using Chart.js
  - X-axis: Quarters (Q1, Q2, Q3, Q4)
  - Y-axis: Count of initiatives
  - Stacked bars showing theme distribution per quarter
  - Color-coded by theme (consistent with card badges)
  - Updates immediately when initiatives move
- **Add Initiative Form**: Simple form to add new initiatives
  - Name input (text)
  - Description textarea
  - Theme dropdown (growth, retention, tech_debt, compliance)
  - Size dropdown (XS, S, M, L, XL)
  - Initial quarter dropdown (Q1-Q4, Backlog)
  - Submit button
- **Theme Legend**: Shows color mapping for each theme

**Key JavaScript Functions:**
- `moveInitiative(initiativeId, targetQuarter)`: Moves an initiative to a different quarter
  - Updates the initiative's quarter property
  - Re-renders the quarter columns
  - Recalculates and updates the balance chart
- `calculateBalance()`: Computes theme distribution per quarter
  - Returns object: `{ Q1: { growth: 2, retention: 1, ... }, Q2: { ... }, ... }`
  - Used to populate the stacked bar chart
- `renderChart(balanceData)`: Initializes or updates Chart.js stacked bar chart
  - Configures stacked bar chart with theme datasets
  - Color-codes each theme consistently
  - Updates smoothly on data changes
- `renderQuarters()`: Populates all quarter columns with initiative cards
  - Groups initiatives by quarter
  - Creates draggable card elements
  - Attaches drag-drop or click handlers
- `addInitiative(initiative)`: Adds new initiative to the initiatives array
  - Assigns unique ID
  - Adds to appropriate quarter
  - Updates chart and columns
- `setupDragDrop()`: Initializes HTML5 Drag and Drop API
  - Makes initiative cards draggable
  - Makes quarter columns drop targets
  - Handles drag events (dragstart, dragover, drop)
- `setupClickToMove()`: Alternative to drag-drop using buttons
  - Adds "Move to Q1/Q2/Q3/Q4/Backlog" buttons to each card
  - Simpler implementation if drag-drop proves difficult

## 5. Security & Privacy
- **Mock Data Only**: All data is mock data representing hypothetical product initiatives. No real product roadmap data or customer information is involved.
- Input fields should not transmit data to external servers.
- No cookies, local storage, or tracking mechanisms required.
- Chart.js loaded from trusted CDN (jsDelivr or cdnjs).
- No authentication or authorization needed for this prototype.

## 6. Migration & Compatibility
- **Prototype Only**: No migration path defined. This is a standalone demonstration.
- **Future Consideration**: The bonus feature "shareable roadmap export" could be implemented by generating a downloadable HTML or PDF snapshot of the current roadmap state. Integration with JIRA API could pull real initiative data from project management tools. Dependency arrows mentioned in bonus could be implemented using SVG lines connecting related initiative cards.
- **Browser Compatibility**: Modern browsers with ES6 support. Tested in Chrome, Firefox, Safari, Edge. Drag and Drop API supported in all modern browsers.

## 7. Alternatives Considered
- **Full JIRA Integration**: Connecting to real JIRA APIs to pull initiative data was considered but rejected due to the 60-minute time constraint. OAuth authentication, API rate limits, and data mapping would consume the entire session. Mock data demonstrates the concept effectively while keeping the exercise achievable.
- **Complex Drag-Drop Libraries (SortableJS, React DnD)**: Third-party drag-drop libraries offer smoother interactions but add dependency complexity. HTML5 Drag and Drop API is native and sufficient for this prototype. If drag-drop proves difficult, simple "Click to Move" buttons provide the same functionality with less implementation complexity.
- **Backend Service with Database**: A Node.js backend with MongoDB to persist roadmap sessions was considered but rejected because Node.js availability is not guaranteed on participant machines and adds unnecessary complexity for a prototype.
- **React/Vue Framework**: Using a modern framework would provide better state management but requires build tools and setup time. Single HTML file with vanilla JavaScript is faster to implement and demonstrates the core concept effectively.

## 8. Risks & Dependencies
**Risks:**
- **Risk**: Drag-and-drop implementation consuming too much time or proving buggy
  - **Mitigation**: Start with simpler "Click to Move" buttons approach. Implement drag-drop only if time permits. The core value is the visual balance chart, not the interaction method. Provide clear guidance to focus on functionality over interaction polish.
- **Risk**: Chart.js stacked bar configuration complexity
  - **Mitigation**: Use Chart.js simple stacked bar chart configuration with default styling. Reference the Chart.js documentation for stacked bar examples. Focus on data visualization over aesthetic perfection. Test with hardcoded data first before connecting to dynamic calculations.
- **Risk**: Participants spending excessive time on CSS styling instead of functionality
  - **Mitigation**: Provide clear guidance to use simple CSS Grid layouts. The goal is a functional roadmap tool, not a design showcase. Basic column layout with cards is sufficient.
- **Risk**: Balance calculation logic errors leading to incorrect chart display
  - **Mitigation**: Test calculation function with known data. Display raw counts in console for debugging. Start with simple count-per-quarter before adding theme breakdown.

**Dependencies:**
- **Chart.js** (via CDN): https://cdn.jsdelivr.net/npm/chart.js
  - Version: 4.x (latest stable)
  - Fallback: If CDN fails, provide offline copy or use simple HTML/CSS stacked bars
- **HTML5 Drag and Drop API**: Native browser API, no external dependency
  - Fallback: Click-to-move buttons if drag-drop proves difficult
- **Modern Browser**: ES6 JavaScript support required (arrow functions, template literals, const/let)
- **No Backend**: All logic runs client-side, no server dependencies

## 9. Cursor Rules & Documentation URLs

### Cursor Rules
Create a file at `.cursor/rules/roadmap-roulette.mdc` with the following content:

```markdown
# Roadmap Roulette - Cursor Rules

## Architecture Constraints
- MUST use a single HTML file with embedded CSS and JavaScript
- NO separate .js or .css files
- NO build tools, bundlers, or transpilers
- NO backend server or API calls
- ALL data manipulation happens client-side

## Required Libraries
- Chart.js MUST be loaded via CDN (https://cdn.jsdelivr.net/npm/chart.js)
- Use Chart.js version 4.x for stacked bar charts

## Data Structure
- Mock initiatives MUST be defined as a constant array in JavaScript
- Each initiative MUST have: id, name, description, theme, size, quarter
- Themes: "growth", "retention", "tech_debt", "compliance"
- Sizes: "XS", "S", "M", "L", "XL"
- Quarters: "Q1", "Q2", "Q3", "Q4", "Backlog"

## Theme Definitions
- growth: Features that acquire new users or expand usage
- retention: Features that keep existing users engaged
- tech_debt: Technical improvements, refactoring, performance
- compliance: Regulatory, security, legal requirements

## Drag-and-Drop Implementation
- PREFER simple "Click to Move" buttons over HTML5 Drag and Drop API
- If implementing drag-drop, use native HTML5 API (no libraries)
- Make initiative cards draggable with draggable="true"
- Quarter columns must be drop targets
- Handle dragstart, dragover, drop, and dragend events
- Prevent default behavior on dragover to allow drop

## Balance Chart Requirements
- MUST use Chart.js stacked bar chart (type: 'bar' with stacked: true)
- X-axis: Quarters (Q1, Q2, Q3, Q4) - exclude Backlog from chart
- Y-axis: Count of initiatives
- Each theme gets its own dataset in the stacked bar
- Color-code themes consistently across cards and chart
- Chart MUST update immediately when initiatives move between quarters

## Balance Calculation Logic
- Count initiatives per quarter grouped by theme
- Return structure: { Q1: { growth: 2, retention: 1, tech_debt: 1, compliance: 0 }, ... }
- Exclude Backlog from chart (but keep in UI columns)
- Handle empty quarters gracefully (show 0 for all themes)

## UI Layout
- Use CSS Grid for quarter columns (5 columns: Q1, Q2, Q3, Q4, Backlog)
- Initiative cards should be visually distinct with borders/shadows
- Theme badges should be color-coded
- Size badges should be clearly visible
- Chart should be prominently displayed above or below quarter columns

## Color Coding
- growth: Green (#10b981 or similar)
- retention: Blue (#3b82f6 or similar)
- tech_debt: Orange (#f59e0b or similar)
- compliance: Red (#ef4444 or similar)
- Use consistent colors across cards, badges, and chart

## Performance
- All calculations MUST be client-side
- Updates MUST be immediate (no artificial delays)
- Use Chart.js built-in update methods for smooth transitions
- Avoid full page re-renders; update only changed elements

## Code Style
- Use ES6+ features (const, let, arrow functions, template literals)
- Use camelCase for JavaScript variables and functions
- Add comments explaining balance calculation and drag-drop logic
- Keep functions small and focused (< 30 lines)
- Use descriptive variable names (e.g., balanceData not bd)
```

### Documentation URLs
Participants should add these documentation resources to their Cursor project:

1. **Chart.js Documentation**
   - Main docs: https://www.chartjs.org/docs/latest/
   - Stacked Bar Chart: https://www.chartjs.org/docs/latest/charts/bar.html#stacked-bar-chart
   - Configuration: https://www.chartjs.org/docs/latest/configuration/
   - Getting Started: https://www.chartjs.org/docs/latest/getting-started/
   - Updating Charts: https://www.chartjs.org/docs/latest/developers/updates.html

2. **HTML5 Drag and Drop API**
   - MDN Drag and Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
   - Drag Operations: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations
   - DataTransfer: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer

3. **Roadmap Planning Best Practices**
   - Product Roadmap Guide: https://www.productplan.com/learn/what-is-a-product-roadmap/
   - Theme-Based Roadmaps: https://www.productplan.com/glossary/theme/
   - T-Shirt Sizing: https://www.productplan.com/glossary/t-shirt-sizing/

4. **HTML/CSS/JS Reference**
   - MDN Web Docs: https://developer.mozilla.org/en-US/
   - CSS Grid Layout: https://css-tricks.com/snippets/css/complete-guide-grid/
   - ES6 Features: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
   - Template Literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

### Adding Documentation to Cursor
To add these URLs to your Cursor project for AI-assisted coding:

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Navigate to "Features" → "Docs"
3. Click "Add new doc"
4. Add each URL from the list above
5. Cursor will index the documentation and make it available to the AI during coding

Alternatively, you can reference these URLs directly in your prompts to Cursor's AI when asking for implementation help.

## 10. Bonus Features (Optional Extensions)
If participants complete the core deliverable early, they can explore these extensions:

- **Constraint Warnings**: Add visual warnings when a quarter is overloaded. Define capacity limits (e.g., max 3 large initiatives per quarter) and display warning badges or color changes when exceeded. Show a "Quarter Capacity" meter for each column.

- **Dependency Arrows**: Add the ability to mark dependencies between initiatives. When two initiatives are linked, draw an SVG arrow connecting them. Highlight dependency chains and warn when a dependent initiative is scheduled before its prerequisite.

- **Shareable Roadmap Export**: Generate a downloadable HTML snapshot of the current roadmap state. Include a "Share" button that creates a static HTML file with the current quarter assignments and chart. Optionally generate a PDF using browser print functionality.

- **Size-Weighted Balance Chart**: Instead of counting initiatives, weight them by size (XS=1, S=2, M=3, L=5, XL=8). Show total effort per quarter per theme, making capacity planning more realistic.

- **Theme Filtering**: Add checkboxes to show/hide specific themes. Update both the quarter columns and the chart to reflect the filtered view. Useful for focusing on specific strategic areas.

- **Historical Snapshots**: Add a "Save Snapshot" button that stores the current roadmap state with a timestamp. Display a timeline of past roadmap versions showing how priorities shifted over time.

- **Initiative Details Modal**: Click an initiative card to open a modal with full details, notes field, and history of quarter changes. Allow editing all fields from the modal.

- **Drag-to-Reorder Within Quarter**: Allow reordering initiatives within a single quarter to indicate priority. Display rank numbers within each quarter column.
