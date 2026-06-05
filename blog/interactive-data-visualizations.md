# Interactive Data Visualizations: Rendering Dynamic DAGs in React Flow

**Published:** Feb 20, 2026  
**Read Time:** 5 min read  
**Category:** Frontend Development  

When presenting educational roadmaps or complex dependencies, displaying information in a static bulleted list makes it difficult to see relationships between topics. Visualizing content as interactive nodes within a **Directed Acyclic Graph (DAG)** offers a more engaging and intuitive user experience. 

In this post, we'll walk through how to recursively parse hierarchical goal-based roadmaps (similar to the system built in **VidyaMarg**) and render them dynamically as interactive, layout-optimized DAG canvas structures using React Flow.

---

## Visualizing Roadmaps with React Flow

Generating a dynamic interactive roadmap visual node system requires handling three main layout components:
1. **Structural Hierarchy Parsing:** Recursively parsing the raw hierarchical roadmap structures into flat node and edge lists.
2. **Automated Layout Calculations:** Applying layout engines (like Dagre or NetworkX) to calculate node coordinates automatically, preventing overlap.
3. **Interactive UI Rendering:** Rendering nodes in React Flow with zoom, pan, and collapsible milestone states.

---

## Step 1: Flattening Hierarchical Outputs

LLM APIs typically return roadmap structures as nested JSON objects (e.g., milestones containing tasks, which contain sub-tasks). React Flow, however, requires flat arrays of `nodes` (specifying unique IDs, labels, and X/Y coordinates) and `edges` (defining connections between source and target IDs).

We use a recursive function to flatten the nested JSON tree and generate clean edge connections:

```javascript
// Recursively parse nested roadmap milestones into React Flow arrays
function flattenRoadmap(milestone, parentId = null, nodes = [], edges = []) {
    const nodeId = `node-${milestone.id}`;
    
    // 1. Create and add node definition
    nodes.push({
        id: nodeId,
        type: 'customMilestone', // Custom React Flow node type
        data: { label: milestone.title, description: milestone.desc },
        position: { x: 0, y: 0 } // Layout coordinates will be calculated next
    });
    
    // 2. Map edge connection from parent
    if (parentId) {
        edges.push({
            id: `edge-${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            animated: true,
            style: { stroke: '#06B6D4' } // Cyan glow edge styling
        });
    }
    
    // 3. Process child milestones recursively
    if (milestone.children && milestone.children.length > 0) {
        milestone.children.forEach(child => {
            flattenRoadmap(child, nodeId, nodes, edges);
        });
    }
    
    return { nodes, edges };
}
```

---

## Step 2: Calculating Node Coordinates with Dagre

Setting node coordinates manually leads to messy layouts. To calculate coordinates automatically, we use the `dagre` layout library. Dagre takes our flat nodes and edges list, analyzes the hierarchy direction (e.g., Left-to-Right or Top-to-Bottom), and calculates optimized X and Y coordinates for each node.

```javascript
import dagre from 'dagre';

const calculateLayout = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 70, ranksep: 100 });

    // Populate dagre nodes
    nodes.forEach(node => {
        dagreGraph.setNode(node.id, { width: 200, height: 80 });
    });

    // Populate dagre edges
    edges.forEach(edge => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // Calculate layout coordinates
    dagre.layout(dagreGraph);

    // Map calculated positions back to React Flow nodes
    return nodes.map(node => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 100, // adjust centered offset
                y: nodeWithPosition.y - 40
            }
        };
    });
};
```

---

## Step 3: Creating a Responsive, Glassmorphic Canvas

To match our overall portfolio theme, we wrap the React Flow renderer in a glassmorphic container and customize the node templates. Milestone nodes are styled with semi-transparent backgrounds, blur filters, and neon borders. To enhance interactivity, we enable animated connection lines and configure tooltips to show detail summaries when hovering over nodes.

---

## Conclusion

Displaying data visually shifts web applications from passive reading logs to active, engaging experiences. By using React Flow and Dagre layout engines, we can easily build responsive and clean graph visualizer platforms. This setup helps users understand learning sequences at a glance, improving information absorption and overall engagement.
