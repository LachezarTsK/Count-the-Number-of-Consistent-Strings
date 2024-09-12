
class Solution {

    private companion object {
        val RANGE_OF_LETTERS = charArrayOf('a', 'z')
    }

    fun countConsistentStrings(targetLetters: String, words: Array<String>): Int {
        val bitStampForTargetLetters = createBitStampForTargetLetters(targetLetters)
        return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters)
    }

    private fun createBitStampForLetter(letter: Char): Int {
        return 1 shl (letter - RANGE_OF_LETTERS[0])
    }

    private fun createBitStampForTargetLetters(targetLetters: String): Int {
        var bitStampForTargetLetters = 0
        for (letter in targetLetters) {
            bitStampForTargetLetters = bitStampForTargetLetters or createBitStampForLetter(letter)
        }
        return bitStampForTargetLetters
    }

    private fun isTargetLetter(letter: Char, bitStampForTargetLetters: Int): Boolean {
        return (createBitStampForLetter(letter) and bitStampForTargetLetters) != 0
    }

    private fun countNumberOfWordsContainingOnlyTargetLetters(words: Array<String>, bitStampForTargetLetters: Int): Int {
        var numberOfWordsContainingOnlyTargetLetters = 0

        for (word in words) {
            var countWord = 1

            for (letter in word) {
                if (!isTargetLetter(letter, bitStampForTargetLetters)) {
                    countWord = 0
                    break
                }
            }
            numberOfWordsContainingOnlyTargetLetters += countWord
        }
        return numberOfWordsContainingOnlyTargetLetters
    }
}
