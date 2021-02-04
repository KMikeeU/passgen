


Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.randomCaps = function(){
    let index = Math.floor(Math.random() * this.length)
    let char = this.charAt(index)
    return this.replaceAt(index, char.toUpperCase())
}

const generate = (wordList, options = {}) => {
    let defaultOptions = {
        words: {
            count: 4,
            minLen: 5,
            maxLen: 8,
            randomCaps: 1
        },
        seperator: {
            seperatorChars: "-_.,",
            random: false
        },
        charPadding: {
            paddingChars: "!?-:;.,_",
            left: 0,
            right: 2,
            random: true
        },
        numPadding: {
            paddingChars: "0123456789",
            left: 2,
            right: 0,
            random: true
        }
    }

    
    Object.assign(defaultOptions, options)
    
    // Split seperator char strings into arrays
    defaultOptions.seperator.seperatorChars = defaultOptions.seperator.seperatorChars.split("")
    defaultOptions.charPadding.paddingChars = defaultOptions.charPadding.paddingChars.split("")
    defaultOptions.numPadding.paddingChars = defaultOptions.numPadding.paddingChars.split("")

    // Filter out words with invalid length
    wordList = wordList.filter(word => word.length >= defaultOptions.words.minLen && word.length <= defaultOptions.words.maxLen)

    
    // Start generation
    let password = "";

    let charPaddingChar = defaultOptions.charPadding.paddingChars.random()
    for(let i = 0; i < defaultOptions.charPadding.left; i++){
        password += charPaddingChar

        if(defaultOptions.charPadding.random){
            charPaddingChar = defaultOptions.charPadding.paddingChars.random()
        }
    }
    
    let numPaddingChar = defaultOptions.numPadding.paddingChars.random()
    for(let i = 0; i < defaultOptions.numPadding.left; i++){
        password += numPaddingChar

        if(defaultOptions.charPadding.random){
            numPaddingChar = defaultOptions.numPadding.paddingChars.random()
        }
    }
    
    let seperatorChar = defaultOptions.seperator.seperatorChars.random()
    let randomCaps = 0;
    for(let i = 0; i < defaultOptions.words.count; i++){
        password += seperatorChar

        if(randomCaps < defaultOptions.words.randomCaps){
            password += wordList.random().randomCaps()
            randomCaps++
        }else{
            password += wordList.random()
        }
        
        if(defaultOptions.seperator.random){
            seperatorChar = defaultOptions.seperator.seperatorChars.random()
        }
    }
    password += seperatorChar;

    
    numPaddingChar = defaultOptions.numPadding.paddingChars.random()
    for(let i = 0; i < defaultOptions.numPadding.right; i++){
        password += numPaddingChar

        if(defaultOptions.charPadding.random){
            numPaddingChar = defaultOptions.numPadding.paddingChars.random()
        }
    }

    charPaddingChar = defaultOptions.charPadding.paddingChars.random()
    for(let i = 0; i < defaultOptions.charPadding.right; i++){
        password += charPaddingChar

        if(defaultOptions.charPadding.random){
            charPaddingChar = defaultOptions.charPadding.paddingChars.random()
        }
    }
    

    return password;
}

module.exports = {
    generate
}