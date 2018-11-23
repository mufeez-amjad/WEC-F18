public class DFS {
    char[][] graph;
    boolean[][] visited;
    Bike start;
    int counter = 0;

    public DFS(char[][] graph, Bike start) {
        this.graph = graph;
        visited = new boolean[graph.length][graph[0].length];
        this.start = start;
    }

    int dfs() {
//        for (int i = 0; i < graph.length; i++) {
//            System.out.print('[');
//            for (int j = 0; j < graph[0].length; j++) {
//                System.out.print("'" + graph[i][j] + (j == graph[0].length - 1 ? "'" : "',"));
//            }
//            System.out.println("],");
//        }
//        System.out.println("START VALUE IS " + start.row + " " + start.col);
        dfs_driver(start);
//        System.out.println("COUNTER IS " + counter);
        return counter;
    }

    void dfs_driver(Bike point) {
        if (point.row < 1 || point.col < 1 || point.row >= 16 || point.col >= 17)
            return;
        if (visited[point.row][point.col])
            return;
        char c = graph[point.row][point.col];

        if (c != '.') return;
        counter++;

        visited[point.row][point.col] = true;

        dfs_driver(new Bike(point.row - 1, point.col));
        dfs_driver(new Bike(point.row + 1, point.col));
        dfs_driver(new Bike(point.row, point.col - 1));
        dfs_driver(new Bike(point.row, point.col + 1));
    }
}
