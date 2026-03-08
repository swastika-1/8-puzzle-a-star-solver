import heapq
import time

GOAL_STATE = ((1, 2, 3),
              (4, 5, 6),
              (7, 8, 0))

def manhattan(state):
    distance = 0
    for i in range(3):
        for j in range(3):
            value = state[i][j]
            if value != 0:
                goal_x = (value - 1) // 3
                goal_y = (value - 1) % 3
                distance += abs(i - goal_x) + abs(j - goal_y)
    return distance

def get_neighbors(state):
    neighbors = []

    for i in range(3):
        for j in range(3):
            if state[i][j] == 0:
                x, y = i, j

    directions = [(1,0),(-1,0),(0,1),(0,-1)]

    for dx, dy in directions:
        nx, ny = x+dx, y+dy
        if 0 <= nx < 3 and 0 <= ny < 3:
            new_state = [list(row) for row in state]
            new_state[x][y], new_state[nx][ny] = new_state[nx][ny], new_state[x][y]
            neighbors.append(tuple(tuple(row) for row in new_state))

    return neighbors

def is_solvable(state):
    flat = sum(state, ())
    inversions = 0

    for i in range(len(flat)):
        for j in range(i+1, len(flat)):
            if flat[i] != 0 and flat[j] != 0 and flat[i] > flat[j]:
                inversions += 1

    return inversions % 2 == 0

def a_star(start):

    if not is_solvable(start):
        return {"error": "Unsolvable Puzzle!"}

    start_time = time.time()

    open_list = []
    heapq.heappush(open_list, (manhattan(start), 0, start))

    came_from = {}
    g_score = {start: 0}
    visited = set()

    while open_list:
        f, g, current = heapq.heappop(open_list)

        if current == GOAL_STATE:

            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]

            path.append(start)
            path.reverse()

            return {
                "path": path,
                "moves": len(path) - 1,
                "time": round(time.time() - start_time, 5),
                "explored_nodes": len(visited),
                "initial_manhattan": manhattan(start),
                "complexity": "O(b^d), b ≤ 4"
            }

        visited.add(current)

        for neighbor in get_neighbors(current):
            tentative_g = g + 1

            if neighbor in visited:
                continue

            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + manhattan(neighbor)
                heapq.heappush(open_list, (f_score, tentative_g, neighbor))

    return {"error": "No solution found"}