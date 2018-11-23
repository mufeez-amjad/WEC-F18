public class Result {
    Genome winner;
    Genome loser;
    int loserPoints;
    int winnerPoints;

    public Result(Genome winner, Genome loser) {
        this.winner = winner;
        this.loser = loser;
//        this.loserPoints = loserPoints;
//        this.winnerPoints = winnerPoints;
    }
}
