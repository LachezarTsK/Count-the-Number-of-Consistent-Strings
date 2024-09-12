
public class Solution {

    private static final int[] RANGE_OF_LETTERS = {'a', 'z'};

    public int countConsistentStrings(String targetLetters, String[] words) {
        int bitStampForTargetLetters = createBitStampForTargetLetters(targetLetters);
        return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters);
    }

    private int createBitStampForLetter(char letter) {
        return 1 << (letter - RANGE_OF_LETTERS[0]);
    }

    private int createBitStampForTargetLetters(String targetLetters) {
        int bitStampForTargetLetters = 0;
        for (char letter : targetLetters.toCharArray()) {
            bitStampForTargetLetters |= createBitStampForLetter(letter);
        }
        return bitStampForTargetLetters;
    }

    private boolean isTargetLetter(char letter, int bitStampForTargetLetters) {
        return (createBitStampForLetter(letter) & bitStampForTargetLetters) != 0;
    }

    private int countNumberOfWordsContainingOnlyTargetLetters(String[] words, int bitStampForTargetLetters) {
        int numberOfWordsContainingOnlyTargetLetters = 0;

        for (String word : words) {
            int countWord = 1;

            for (char letter : word.toCharArray()) {
                if (!isTargetLetter(letter, bitStampForTargetLetters)) {
                    countWord = 0;
                    break;
                }
            }
            numberOfWordsContainingOnlyTargetLetters += countWord;
        }
        return numberOfWordsContainingOnlyTargetLetters;
    }
}
