import heapq

def dijkstra(adj_list, start, destination):
    distances = {node: float('inf') for node in adj_list}
    distances[start] = 0
    previous_nodes = {node: None for node in adj_list} 

    priority_queue = [(0, start)]

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_node == destination:
            break

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in adj_list[current_node].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node  
                heapq.heappush(priority_queue, (distance, neighbor))

    path = []
    current_node = destination
    if distances[current_node] == float('inf'):
        return float('inf'), []  

    while current_node is not None:
        path.insert(0, current_node)
        current_node = previous_nodes[current_node]

    return distances[destination], path

edge_list = [
    ('A', 'B', 3), ('A', 'C', 8), ('B', 'C', 2), ('B', 'E', 5), 
    ('C', 'D', 1), ('C', 'E', 6), ('D', 'E', 2), ('D', 'F', 3), 
    ('E', 'F', 5)
]


def edge_list_to_adjacency_list(edge_list):
    adj_list = {}
    for (src, dest, weight) in edge_list:
        if src not in adj_list:
            adj_list[src] = {}
        if dest not in adj_list:
            adj_list[dest] = {}
        adj_list[src][dest] = weight
        adj_list[dest][src] = weight
    return adj_list

adj_list = edge_list_to_adjacency_list(edge_list)

distance, path = dijkstra(adj_list, 'A', 'F')
print(f"The shortest distance from A to F is {distance}")
print(f"The path from A to F is {path}")
