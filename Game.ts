import { Player } from "./Player";
import { Board } from "./Board";
import { GameStatus } from "./Extras";

class Game {
    board: Board;
    playerTurn: boolean;
    firstPlayer: Player;
    secondPlayer: Player;
    winner: Player;
    status: GameStatus;
    moveHistory: number[];

    constructor(rows: number, columns: number) {
        this.board = new Board(rows, columns);
        this.status = 1;
        this.playerTurn = true;
        this.moveHistory = [];
    }


    addPlayer = function (newPlayer: Player): void {

        if (this.firstPlayer !== undefined && this.secondPlayer !== undefined) {
            console.log("You already have 2 players!");
            return;
        }
        if (newPlayer.playerChar.length > 1) {
            console.log("Player must have single char. Player has not been added");
            return;
        }
        if (this.firstPlayer === undefined) {
            this.firstPlayer = newPlayer;
        }
        else {
            this.secondPlayer = newPlayer;
        }
    }

    nextMove = function (row: number, col: number): boolean {

        let playerChar;
        if (this.playerTurn) {
            playerChar = this.firstPlayer.playerChar;
        }
        else {
            playerChar = this.secondPlayer.playerChar;
        }
        if (this.board.addMove(row, col, playerChar)) {
            this.moveHistory.push(row, col);
            this.playerTurn = !this.playerTurn;
            let returnedChar = this.board.checkIfGameEnded();
            if (returnedChar !== null) {
                this.status = 0;
                if (returnedChar === this.firstPlayer.playerChar) {
                    this.winner = this.firstPlayer;
                }
                else {
                    this.winner = this.secondPlayer;
                }

            }
            return true;
        }
        return false;
    }


    printSummary = function (): void {

        let printString = GameStatus[this.status] + " - ";
        if (this.winner !== undefined) {
            printString += this.winner.playerName + " won!";
        }
        else {
            printString += "Game is in progress"
        }
        console.log(printString);
        let flag = true;
        let name: string;
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            if (flag) {
                name = this.firstPlayer.playerName;
            }
            else {
                name = this.secondPlayer.playerName;
            }
            console.log("(" + this.moveHistory[i] + "," + this.moveHistory[i + 1] + ") " + name);
            flag = !flag;
        }
    }

}

const game = new Game(3, 3); // rows count, cols count
game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));
game.board.print(); // simple console.log is fine (prints empty board)
console.log(GameStatus[game.status]) // game status - InProgress/Completed (enum)
game.printSummary(); // InProgress - "Game is in progress" + moves history (console.log is fine)
// nextMove - sets the next player's move. The next player is determined by the order they were added
// Returns a boolean - false if the game is over or the cell is already occupied, otherwise true
console.log(game.nextMove(0, 0)); // row, col - sets 'x' in the top left cell, prints true
console.log(game.nextMove(0, 0)); // does nothing and prints false (cell is already occupied)
console.log(game.nextMove(1, 1)); // sets 'o' in the center, prints true
console.log(game.nextMove(0, 2)); // sets 'x' in the top right cell, prints true
console.log(game.nextMove(2, 2)); // sets 'o' in the bottom right cell, prints true
console.log(game.nextMove(0, 1)); // sets 'x' in the top center cell, prints true
console.log(game.nextMove(2, 1)); // does nothing and prints false (Game over, John won)
game.board.print(); // simple console.log is fine
game.printSummary(); // Completed - "John Doe won!" + moves history


