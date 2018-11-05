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
.then( () => printStr2("2"))
.then( () => printStr2("3"))