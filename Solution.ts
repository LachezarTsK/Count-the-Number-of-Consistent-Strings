
function countConsistentStrings(targetLetters: string, words: string[]): number {
    this.RANGE_OF_LETTERS = ['a', 'z'];
    const bitStampForTargetLetters = createBitStampForTargetLetters(targetLetters);
    return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters);
};

function createBitStampForLetter(letter: string): number {
    return 1 << (letter.codePointAt(0) - this.RANGE_OF_LETTERS[0].codePointAt(0));
}

function createBitStampForTargetLetters(targetLetters: string): number {
    let bitStampForTargetLetters = 0;
    for (let letter of targetLetters) {
        bitStampForTargetLetters |= createBitStampForLetter(letter);
    }
    return bitStampForTargetLetters;
}

function isTargetLetter(letter: string, bitStampForTargetLetters: number): boolean {
    return (createBitStampForLetter(letter) & bitStampForTargetLetters) !== 0;
}

function countNumberOfWordsContainingOnlyTargetLetters(words: string[], bitStampForTargetLetters: number): number {
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
