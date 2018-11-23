import java.util.ArrayList;
import java.util.Collections;
import java.util.TreeSet;

public class Main implements Constants {
    public static void main(String[] args) {
        char[][] grid = new char[17][17];

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                grid[i][j] = '.';
            }
        }

        for (int i = 0; i < 17; i++) {
            grid[0][i] = 'w';
            grid[i][0] = 'w';
            grid[16][i] = 'w';
            grid[i][16] = 'w';
        }

        // initial starting positions
        Bike s = new Bike(8, 14);
        Bike p = new Bike(8, 2);


        grid[s.row][s.col] = 's';
        grid[p.row][p.col] = 'p';


//        printGrid(grid);

//        System.out.println(" UP " + distanceToNearestObstacle(grid, p, 'u'));
//        System.out.println(" DOWN " + distanceToNearestObstacle(grid, p, 'd'));
//        System.out.println(" LEFT " + distanceToNearestObstacle(grid, p, 'l'));
//        System.out.println(" RIGHT " + distanceToNearestObstacle(grid, p, 'r'));
//
//        System.out.println(freeSpacesAtIndex(s, grid));
//        System.out.println(relativeY(s, p));


        ArrayList<Genome> currentGeneration = new ArrayList<>();

        // make initial generation
        for (int i = 0; i < 10000; i++) {
            currentGeneration.add(new Genome());
        }

        for (int generation = 0; generation < 50; generation++) {
            System.out.println("Generation " + generation);

            ArrayList<Genome> newGeneration = new ArrayList<>();

            // play all mutations
            for (int i = 0; i < currentGeneration.size(); i += 2) {
                Result r = playGame(currentGeneration.get(i), currentGeneration.get(i + 1));

                if (generation >= 40) {
                    r.winner.length -= r.loser.length;
                }

                newGeneration.add(r.loser);
                newGeneration.add(r.winner);
            }

            Collections.sort(newGeneration);

            if (generation == 49) {
                for (int i = 0; i < 50; i++) {
                    System.out.println(newGeneration.get(i));
                }

//                Tron t = new Tron();
//                t.returnWinnerVerbose(newGeneration.get(0), newGeneration.get(1));
            }

            currentGeneration = new ArrayList<>();

            // Keep top 15%
            for (int i = 0; i < 1500; i++) {
                currentGeneration.add(newGeneration.get(i));
            }

            // breed two random indices of current generation
            for (int i = 1500; i < 8000; i++) {
                int random1 = random(0, 149);
                int random2 = random(0, 149);
                currentGeneration.add(new Genome(newGeneration.get(random1), newGeneration.get(random2)));
            }

            // top dog
            for (int i = 1; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(0), newGeneration.get(i)));
            }

            // second best
            for (int i = 2; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(1), newGeneration.get(i)));
            }

            // third best
            for (int i = 3; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(2), newGeneration.get(i)));
            }

            // forurth best
            for (int i = 4; i < 1500; i++) {
                currentGeneration.add(new Genome(newGeneration.get(4), newGeneration.get(i)));
            }

            // fifth boi
            for (int i = 6; i < 16; i++) {
                currentGeneration.add(new Genome(newGeneration.get(5), newGeneration.get(i)));
            }


            // introduce 25% random population
            for (int i = 7500; i < 10000; i++) {
                int random1 = random(0, 100);
                currentGeneration.add(new Genome(newGeneration.get(random1)));
            }
        }

// simulate final two winner
//        Tron t = new Tron();
//        t.returnWinnerVerbose(genomes[0], genomes[1]);
    }

    static Result playGame(Genome g1, Genome g2) {
        g1.length = 0;
        g2.length = 0;
        Tron tron = new Tron();
//        System.out.println(g1);
//        System.out.println(g2);
        return tron.returnWinner(g1, g2);
    }

    static int random(int low, int high) {
        return (int) (Math.random() * (high - low)) + 1;
    }


    /*
    TODO: Determines the direction of the bike heading.
     */
    public char bikeHeading(Bike b, char[][] grid) {
        return '.';
    }

    /*
    Prints the array as a debug function.
     */
    public static void printGrid(char[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                System.out.print(" " + grid[i][j] + " ");
            }
            System.out.println();
        }
    }
}