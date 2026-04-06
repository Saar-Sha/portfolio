# How to Add a New Project

All projects live in one file: `data/projects.json`

No changes to any HTML or JavaScript files are needed.

---

## Step 1: Open the Data File

Open `data/projects.json` in any text editor.

The file has two arrays:
- `"tools"` — for Tools, dashboards, pipelines, scripts, ML tools, GIS tools
- `"research"` — for Research Papers, publications, studies

---

## Step 2: Add Your Project

Copy this template and paste it into the correct array:

```json
{
  "id": "your-project-id",
  "project_title": "Your Project Name",
  "short_description": "One or two sentences describing what it does.",
  "category": "Tool",
  "technologies_used": ["Python", "SQL", "Power BI"],
  "problem_description": "What problem did this solve? What was missing or broken?",
  "solution_approach": "How did you build it? What methods or systems did you use?",
  "results_or_impact": "What happened as a result? Numbers, adoption, outcomes.",
  "links": {
    "github": "https://github.com/your-repo",
    "paper": null,
    "demo": null
  },
  "featured": false,
  "tags": ["Python", "SQL", "Agriculture"]
}
```

For Research Papers, use `"category": "Research Paper"` and add the array to `"research"`.

---

## Field Reference

| Field | Required | Notes |
|-------|----------|-------|
| id | Yes | Unique slug, lowercase with hyphens. Example: "gis-water-tool" |
| project_title | Yes | Display name shown in cards and modal |
| short_description | Yes | Shown on card. Keep under 2 sentences. |
| category | Yes | Must be exactly "Tool" or "Research Paper" |
| technologies_used | Yes | Array of strings. Full tech stack shown in modal. |
| problem_description | Yes | Shown in modal detail view |
| solution_approach | Yes | Shown in modal detail view |
| results_or_impact | Yes | Shown in modal detail view. Include numbers if possible. |
| links.github | No | Set to null if not available |
| links.paper | No | URL to paper PDF or DOI link |
| links.demo | No | URL to live demo |
| featured | No | Set to true to show on homepage (limit to 3) |
| tags | Yes | Used for filtering. Match existing tag names for consistency. |

---

## Common Tags (use existing ones for consistent filtering)

Python, SQL, Power BI, GIS, ML, Agriculture, BI, DAX, Data Engineering,
Remote Sensing, IoT, Research, PostgreSQL, Azure, Pandas

---

## Adding an Image (Optional)

1. Save your image to: `images/projects/your-project-id.png`
2. Recommended size: 800×450px (16:9 ratio)
3. Formats: PNG or JPG

Note: Images are not yet wired to display by default. To enable them, update the
`createCard()` function in `js/main.js` to include an `<img>` tag referencing
`./images/projects/${project.id}.png`.

---

## Featured Projects

Set `"featured": true` on up to 3 projects to show them on the homepage.
If more than 3 are featured, only the first 3 will show.

---

## Example: Complete Tool Entry

```json
{
  "id": "crop-monitoring-dashboard",
  "project_title": "Crop Monitoring Dashboard",
  "short_description": "Real-time Power BI dashboard tracking crop health KPIs across 12 farm sites.",
  "category": "Tool",
  "technologies_used": ["Power BI", "DAX", "SQL Server", "Python"],
  "problem_description": "Farm managers had no unified view of crop health across sites. Decisions relied on weekly paper reports.",
  "solution_approach": "Built a star-schema data model aggregating IoT sensor data, satellite imagery indices, and field observation logs. Deployed a 6-page Power BI report with drill-through by site, crop, and date range.",
  "results_or_impact": "Reduced reporting time from 8 hours to 20 minutes per week. Adopted by 4 regional managers as their primary monitoring tool.",
  "links": {
    "github": null,
    "paper": null,
    "demo": null
  },
  "featured": false,
  "tags": ["Power BI", "DAX", "SQL", "Agriculture"]
}
```

---

## Verification

After saving `projects.json`, open `pages/projects.html` in your browser.
Your new project should appear in the correct tab. Click it to verify the modal shows all fields correctly.
