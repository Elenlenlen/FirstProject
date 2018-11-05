//callbacks
function printStr1(str, callback){
    setTimeout(
        () => {
            console.log(str);
            callback();
        },
        2000
    )
}

printStr1("1", () => {
    printStr1("2", () => {
        printStr1("3", () => {})
    })
})

//promises
function printStr2(str1){
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log(str)
                resolve()
            },
            500
        )
    })
}

printStr2("1")
.then( () => {
    return printStr2("2")
})
.then( () => {
    return printStr2("3")
})

//malo lepse 
printStr2("1")
.then( () => printStr2("2"))
.then( () => printStr2("3"))