import { describe, expect, test } from "vitest";
import { getFooBar } from "../foobar";


describe("Test foobar", ()=>{
    const foobarStrings = getFooBar();

    test("Correct length", ()=>{
        expect(foobarStrings.length).toBe(100);
    })

    test("Number 1 corresponds to 1", () => {
        expect(foobarStrings[0]).toBe("1");
    });

    test("Number 3 corresponds to 'Foo'", () => {
        expect(foobarStrings[2]).toBe("Foo");
    });

    test("Number 5 corresponds to 'Bar'", () => {
        expect(foobarStrings[4]).toBe("Bar");
    });

    test("Number 15 corresponds to 'FooBar'", () => {
        expect(foobarStrings[14]).toBe("FooBar");
    });

})