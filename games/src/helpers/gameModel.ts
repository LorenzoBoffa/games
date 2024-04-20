export type Choice = "rock" | "paper" | "scissors";
export const choices: Choice[] = ["rock", "paper", "scissors"];

export enum PlayState {
    Win = "win",
    Lose = "lose",
    Draw = "draw"
}

const weakerChoices: Record<string, string[]> = {
    rock : ["scissors"],
    paper: ["rock"],
    scissors: ["paper"]
}

/**
 * Seleziona casualmente una scelta tra le disponibili
 * @param availableChoices scelte di gioco disponibili. Default rock, paper, scissors 
 * @returns scelta di gioco
 */
export function getRandomChoice(availableChoices: Choice[] = choices):Choice {
    return availableChoices[Math.floor(Math.random()*(choices.length))];
}

/**
 * Calcola l'esito di gioco date due scelte
 * @param choice1 scelta del giocatore 1, calcolata random se non fornita
 * @param choice2 scelta del giocatore 2, calcolata random se non fornita
 * @param weakerChoicesRecord record con le scelte perdenti per ciascuna mossa disponibile
 * @returns 
 */
export function getPlayResult(choice1: Choice = getRandomChoice(), choice2: Choice = getRandomChoice(), weakerChoicesRecord = weakerChoices): PlayState{   
    if (choice1 === choice2) return PlayState.Draw
    else if (weakerChoicesRecord[choice1].includes(choice2)) return PlayState.Win
    else return PlayState.Lose
}

