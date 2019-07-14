export class Board {
    boardMatrix: string[][];
    gameEnded: boolean;

    constructor(rows: number, columns: number) {
        this.boardMatrix = [];
        this.gameEnded = false;

        for (let i = 0; i < rows; i++) {
            this.boardMatrix[i] = [];
        }
    }

    print = function (): void {
        for (let row = 0; row < this.boardMatrix.length; row++) {
            let rowString = "";
            for (let col = 0; col < this.boardMatrix[0].length; col++) {
                if (this.boardMatrix[row][col] === undefined) {
                    rowString += "      ";
                }
                else {
                    rowString += (this.boardMatrix[row][col] + "     ");
                }

            }
            console.log(rowString);
            console.log("");
        }
    }

    addMove = function (row: number, col: number, playerChar: string): boolean {
        if (this.gameEnded)
            return false;
        if (this.boardMatrix[row][col] === undefined) {
            this.boardMatrix[row][col] = playerChar;
            return true;
        }
        return false;
    }

    checkIfGameEnded = function (): string {   //This function returns the char of the player who won, or null if there is no winner yet

        if (this.gameEnded)
            return;

        for (let row = 0; row < this.boardMatrix.length; row++) {        //checking rows
            let firstChar = this.boardMatrix[row][0];
            if (firstChar !== undefined)
                for (let col = 1; col < this.boardMatrix[0].length; col++) {
                    if (this.boardMatrix[row][col] !== firstChar) {
                        break;
                    }
                    if (col === (this.boardMatrix[0].length - 1)) {
                        this.gameEnded = true;
                        return firstChar;
                    }
                }
        }

        for (let col = 0; col < this.boardMatrix[0].length; col++) {  //checking columns
            let firstChar = this.boardMatrix[0][col];
            if (firstChar !== undefined)
                for (let row = 1; row < this.boardMatrix.length; row++) {
                    if (this.boardMatrix[row][col] !== firstChar) {
                        break;
                    }
                    if (row === (this.boardMatrix.length - 1)) {
                        this.gameEnded = true;
                        return firstChar;
                    }
                }
        }

        let firstChar = this.boardMatrix[0][0];      //checking diagonal
        if (firstChar !== undefined)
            for (let index = 1; index < this.boardMatrix.length; index++) {
                if (this.boardMatrix[index][index] !== firstChar) {
                    break;
                }
                if (index === (this.boardMatrix.length - 1)) {
                    this.gameEnded = true;
                    return firstChar;
                }
            }


        let col = this.boardMatrix.length - 1;                   //checking opposite diagonal
        firstChar = this.boardMatrix[0][col];
        col--;
        if (firstChar !== undefined)
            for (let row = 1; row < this.boardMatrix.length; row++) {
                if (this.boardMatrix[row][col] !== firstChar) {
                    break;
                }
                if (row === (this.boardMatrix.length - 1)) {
                    this.gameEnded = true;
                    return firstChar;
                }
                col--;
            }

        return null;
    }
}