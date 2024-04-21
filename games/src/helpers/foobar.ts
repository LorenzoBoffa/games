/**
 * Maps and prints in console the numbers from 1 to 100 with the following rules: 
 * - if multiple of 3 substitute with "Foo"
 * - if multiple of 5 substitute with "Bar"
 * - if multiple of both 3 and 5 substitute with "FooBar"
 */
function printConsoleFooBar(){
    for (let ii=1; ii<=100 ; ii++){
        let is3Multiple: boolean = ii % 3 === 0;
        let is5Multiple: boolean = ii % 5 === 0;
        
        let result = is3Multiple && is5Multiple ? "FooBar" : is3Multiple ? "Foo" : is5Multiple ? "Bar" : ii.toString();
        console.log(result);   
    }
}

/**
 * Maps numbers from 1 to 100 with the following rules: 
 * - if multiple of 3 substitute with "Foo"
 * - if multiple of 5 substitute with "Bar"
 * - if multiple of both 3 and 5 substitute with "FooBar"
 * @returns array containing all the numbers with correct transformations
 */
export function getFooBar():string[]{
    const fooBar: string[] = [];
    for (let ii=1; ii<=100 ; ii++){
        let is3Multiple: boolean = ii % 3 === 0;
        let is5Multiple: boolean = ii % 5 === 0;
        
        fooBar.push(is3Multiple && is5Multiple ? "FooBar" : is3Multiple ? "Foo" : is5Multiple ? "Bar" : ii.toString()); 
    }

    return fooBar;
}