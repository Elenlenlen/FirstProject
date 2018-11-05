//callbacks
function printStr1(str, callback) {
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
        printStr1("3", () => { })
    })
})