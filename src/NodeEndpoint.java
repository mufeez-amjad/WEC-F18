public class NodeEndpoint {
    public static void main(String[] args) {
        char[][] grid = new char[15][15];

        int myR = 0, myC = 0;
        int enemyR = 0, enemyC = 0;
        for (int i = 0; i < 255; i++) {
            int row = i / 15;
            int col = i % 15;
            grid[row][col] = args[i].charAt(0);
            if (grid[row][col] == '7') {
                myR = row;
                myC = col;
            }
            if (grid[row][col] != 'w' && grid[row][col] != '.') {
                enemyR = row;
                enemyC = col;
            }
        }

        Bike myBike = new Bike(myR, myC);
        Bike enemyPos = new Bike(enemyR, enemyC);
        char start = 'l';
        Genome g = new Genome();
        g.closeFreespace = -68.19992301056678;
        g.closeWallDistance = 7.711618744086696;
        g.closeRelativeEnemyX[0] = 17.0087652461643;
        g.closeRelativeEnemyX[1] = 9.982544732485222;
        g.closeRelativeEnemyX[2] = 9.982544732485222;
        g.closeRelativeEnemyY[0] = 16.19868325276556;
        g.closeRelativeEnemyY[1] =13.72941658717545;
        g.closeRelativeEnemyY[2] = 15.30354185202797;
        g.farFreespace = 4.968225240387672;
        g.farWallDistance = -13.390812448287972;
        g.farRelativeEnemyX[0] = 14.599178079539005;
        g.farRelativeEnemyX[1] = 18.62465199728543;
        g.farRelativeEnemyX[2] = 15.38798471317374;
        g.farRelativeEnemyY[0] = 16.566245953209155;
        g.farRelativeEnemyY[1] = 16.28109430823892;
        g.farRelativeEnemyY[2] = 9.526455174475428;
        g.currDirection = ' ';

        System.out.println(g.nextMove(grid, myBike, enemyPos, start));
    }
}

