
/**
 * @param {string} targetLetters
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (targetLetters, words) {
    this.RANGE_OF_LETTERS = ['a', 'z'];
    const bitStampForTargetLetters = createBitStampForTargetLetters(targetLetters);
    return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters);
};

/**
 * @param {string} letter
 * @return {number}
 */
function createBitStampForLetter(letter) {
    return 1 << (letter.codePointAt(0) - this.RANGE_OF_LETTERS[0].codePointAt(0));
}

/**
 * @param {string} targetLetters
 * @return {number}
 */
function createBitStampForTargetLetters(targetLetters) {
    let bitStampForTargetLetters = 0;
    for (let letter of targetLetters) {
        bitStampForTargetLetters |= createBitStampForLetter(letter);
    }
    return bitStampForTargetLetters;
}

/**
 * @param {string} letter
 * @param {number} bitStampForTargetLetters
 * @return {boolean}
 */
function isTargetLetter(letter, bitStampForTargetLetters) {
    return (createBitStampForLetter(letter) & bitStampForTargetLetters) !== 0;
}

/**
 * @param {string[]} words
 * @param {number} bitStampForTargetLetters
 * @return {number}
 */
function countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters) {
    let numberOfWordsContainingOnlyTargetLetters = 0;

    for (let word of words) {
        let countWord = 1;
        for (let letter of word) {
            if (!isTargetLetter(letter, bitStampForTargetLetters)) {
                countWord = 0;
                break;
            }
        }
        numberOfWordsContainingOnlyTargetLetters += countWord;
    }
    return numberOfWordsContainingOnlyTargetLetters;
}
