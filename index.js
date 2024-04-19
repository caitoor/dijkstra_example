// example data taken from https://de.wikipedia.org/wiki/Dijkstra-Algorithmus
// graph is represented as an object where the keys are the nodes and the values are objects with the neighbors and the distance to them
const graph = {
    saarbruecken: { kaiserslautern: 70, karlsruhe: 145 },
    kaiserslautern: { saarbruecken: 70, ludwigshafen: 53, frankfurt: 103 },
    karlsruhe: { saarbruecken: 145, heilbronn: 84 },
    ludwigshafen: { kaiserslautern: 53, wuerzburg: 183 },
    frankfurt: { kaiserslautern: 103, wuerzburg: 116 },
    heilbronn: { karlsruhe: 84, wuerzburg: 102 },
    wuerzburg: { ludwigshafen: 183, frankfurt: 116, heilbronn: 102 }
};

function dijkstra(graph, start, end) {
    const shortestDistances = {};
    const previous = {};
    const nodes = new Set();

    // init all nodes
    for (const vertex in graph) {
        shortestDistances[vertex] = Infinity;
        previous[vertex] = null;
        nodes.add(vertex);
    }

    shortestDistances[start] = 0;

    while (nodes.size) {
        // choose nodes with the smallest distance
        let closestNode = null;
        for (const node of nodes) {
            if (closestNode === null || shortestDistances[node] < shortestDistances[closestNode]) {
                closestNode = node;
            }
        }

        nodes.delete(closestNode);

        if (closestNode === end) {
            // reconstruct path from start to end
            const path = [];
            let u = end;
            while (previous[u]) {
                path.unshift(u);
                u = previous[u];
            }
            path.unshift(start);
            return { distance: shortestDistances[end], path };
        }

        // update distances to neighboring nodes
        for (const neighbor in graph[closestNode]) {
            let alt = shortestDistances[closestNode] + graph[closestNode][neighbor];
            if (alt < shortestDistances[neighbor]) {
                shortestDistances[neighbor] = alt;
                previous[neighbor] = closestNode;
            }
        }
    }

    return { distance: Infinity, path: null };
}

// example usage
console.log(dijkstra(graph, 'frankfurt', 'karlsruhe'));
