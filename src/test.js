function changeProps (key) {
    let hello = ''
    if(key === 'say') {
        hello = key
    } else {
        hello = 'input not say'
    }
    return console.log(hello)
}

changeProps('sahely')

const url = '/motor/types/delete/'
console.log(url.slice(0, url.length-7))