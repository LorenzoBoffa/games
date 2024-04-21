export type Choice = "rock" | "paper" | "scissors" | "lizard" | "spock" ;
export const choices: Choice[] = ["rock", "paper", "scissors"];
export const choicesExtended: Choice[] = ["rock", "paper", "scissors", "lizard", "spock"];

/**
 * Possible states of a single play
 */
export enum PlayState {
    Win = "win",
    Lose = "lose",
    Draw = "draw"
}

/**
 * Associate every single Choice with the weaker ones
 */
const weakerChoices: Record<Choice, Choice[]> = {
    rock : ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["scissors", "rock"]
}

/**
 * Selects casually a choice among the available ones
 * @param availableChoices available game choices. Default is rock, paper, scissors 
 * @returns a random game choice
 */
export function getRandomChoice(availableChoices: Choice[] = choices):Choice {
    return availableChoices[Math.floor(Math.random()*(choices.length))];
}

/**
 * Calculate result for a single play given two choices
 * @param choice1 player 1 choice, computed as random if not provided
 * @param choice2 player 1 choice, computed as random if not provided
 * @param weakerChoicesRecord record mapping choiches to their weaker choices. Default one are the classic rules.
 * @returns 
 */
export function getPlayResult(choice1: Choice = getRandomChoice(), choice2: Choice = getRandomChoice(), weakerChoicesRecord = weakerChoices): PlayState{   
    if (choice1 === choice2) return PlayState.Draw
    else if (weakerChoicesRecord[choice1].includes(choice2)) return PlayState.Win
    else return PlayState.Lose
}
