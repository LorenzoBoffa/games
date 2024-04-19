function printFooBar(){
    for (let ii=1; ii<=100 ; ii++){
        let is3Multiple: boolean = ii % 3 === 0;
        let is5Multiple: boolean = ii % 5 === 0;
        
        let result = is3Multiple && is5Multiple ? "FooBar" : is3Multiple ? "Foo" : is5Multiple ? "Bar" : ii.toString();
        console.log(result);   
    }
}