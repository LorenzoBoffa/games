import { describe, expect, test } from "vitest";
import { choices, PlayState, getPlayResult, type Choice } from "../gameModel";


describe("Test partite pari", ()=>{
    choices.forEach((choice)=>{
        test(`${choice} vs ${choice}`, ()=>{
            const result: PlayState = getPlayResult(choice, choice);
            expect(result).toBe(PlayState.Draw)
        } )
    })
})

describe("Test partite vinte", ()=>{
    const winningCombinations: Record<Choice, Choice> = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    }
        
    choices.forEach((choice)=>{
        test(`${choice} vs ${winningCombinations[choice]}`, ()=>{
            const result: PlayState = getPlayResult(choice, winningCombinations[choice]);
            expect(result).toBe(PlayState.Win)
        } )
    })
})

describe("Test partite perse", ()=>{
    const losingCombinations: Record<Choice, Choice> = {
        "rock": "paper",
        "paper": "scissors",
        "scissors": "rock"
    }
        
    choices.forEach((choice)=>{
        test(`${choice} vs ${losingCombinations[choice]}`, ()=>{
            const result: PlayState = getPlayResult(choice, losingCombinations[choice]);
            expect(result).toBe(PlayState.Lose)
        } )
    })
})