


//Question 1
function modula() {
    for(let i = 1; i <= 100; i++) {
        if ((i%3 == 0) && (i%5 == 0)) {
            console.log(' Annabelle')
        } else if (i%3 == 0) {
            console.log(' belle')
        } else if (i%5 == 0) {
            console.log(' Anna')
        }
    }
}

// modula()

//Question 2
function anagram(phrase, comparer) {
    if ((phrase.toUpperCase()).length != (comparer.toUpperCase()).length) 
        return false
    
    for(let i = 0; i < phrase.length; i++) {
        if (comparer.toUpperCase().includes(phrase[i].toUpperCase())) {
            comparer[i] = ''
        } else {
            return false
        }
    }

    return true
}

// console.log(anagram('eolbo', 'beloo'))
