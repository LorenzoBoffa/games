import { describe, expect, test } from "vitest";
import { choicesExtended, PlayState, getPlayResult, type Choice, getRandomChoice, choices } from "../gameModel";


describe("Test partite pari", ()=>{
    choicesExtended.forEach((choice)=>{
        test(`${choice} vs ${choice}`, ()=>{
            const result: PlayState = getPlayResult(choice, choice);
            expect(result).toBe(PlayState.Draw)
        } )
    })
})

describe("Test partite vinte", ()=>{
    const winningCombinations: Record<Choice, Choice[]> = {
        "rock": ["scissors", "lizard"],
        "paper": ["rock", "spock"],
        "scissors": ["paper", "lizard"],
        "lizard": ["paper", "spock"],
        "spock": ["scissors", "rock"],
    };
    
    choicesExtended.forEach(choice => {
        test(`${choice} vs ${winningCombinations[choice][0]}`, () => {
            const result: PlayState = getPlayResult(choice, winningCombinations[choice][0]);
            expect(result).toBe(PlayState.Win);
        });
    
        test(`${choice} vs ${winningCombinations[choice][1]}`, () => {
            const result: PlayState = getPlayResult(choice, winningCombinations[choice][1]);
            expect(result).toBe(PlayState.Win);
        });
    });
    
})

describe("Test partite perse", ()=>{
    const losingCombinations: Record<Choice, Choice[]> = {
        "rock": ["paper", "spock"],
        "paper": ["scissors", "lizard"],
        "scissors": ["rock", "spock"],
        "lizard": ["rock", "scissors"],
        "spock": ["lizard", "paper"],
    };
    
    choicesExtended.forEach(choice => {
        test(`${choice} vs ${losingCombinations[choice][0]}`, () => {
            const result: PlayState = getPlayResult(choice, losingCombinations[choice][0]);
            expect(result).toBe(PlayState.Lose);
        });

        test(`${choice} vs ${losingCombinations[choice][1]}`, () => {
            const result: PlayState = getPlayResult(choice, losingCombinations[choice][1]);
            expect(result).toBe(PlayState.Lose);
        });
    });
    
})


describe("Test scelte random per il gioco base", ()=>{
    const randomChoices: Choice[] = [];
    for (let ii=0; ii<1000; ii++){
        randomChoices.push(getRandomChoice());
    }
    
    const uniqueRandomChoices = [...new Set(randomChoices)];

    test("Numero corretto di scelte", ()=>
        expect(randomChoices.length).toBe(1000));

    test("Contiene le scelte corrette", ()=>
        expect(uniqueRandomChoices.sort()).toEqual(choices.sort()));
    
})

describe("Test scelte random per il gioco esteso", ()=>{
    const randomChoices: Choice[] = [];
    for (let ii=0; ii<1000; ii++){
        randomChoices.push(getRandomChoice(choicesExtended));
    }
    
    const uniqueRandomChoices = [...new Set(randomChoices)];

    test("Numero corretto di scelte", ()=>
        expect(randomChoices.length).toBe(1000));

    test("Contiene le scelte corrette", ()=>
        expect(uniqueRandomChoices.sort()).toEqual(choicesExtended.sort()));
    
})