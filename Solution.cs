
using System;

public class Solution
{
    private static readonly int[] RANGE_OF_LETTERS = { 'a', 'z' };

    public int CountConsistentStrings(string targetLetters, string[] words)
    {
        int bitStampForTargetLetters = CreateBitStampForTargetLetters(targetLetters);
        return CountNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters);
    }

    private int CreateBitStampForLetter(char letter)
    {
        return 1 << (letter - RANGE_OF_LETTERS[0]);
    }

    private int CreateBitStampForTargetLetters(String targetLetters)
    {
        int bitStampForTargetLetters = 0;
        foreach (char letter in targetLetters)
        {
            bitStampForTargetLetters |= CreateBitStampForLetter(letter);
        }
        return bitStampForTargetLetters;
    }

    private bool IsTargetLetter(char letter, int bitStampForTargetLetters)
    {
        return (CreateBitStampForLetter(letter) & bitStampForTargetLetters) != 0;
    }

    private int CountNumberOfWordsContainingOnlyTargetLetters(String[] words, int bitStampForTargetLetters)
    {
        int numberOfWordsContainingOnlyTargetLetters = 0;

        foreach (string word in words)
        {
            int countWord = 1;

            foreach (char letter in word)
            {
                if (!IsTargetLetter(letter, bitStampForTargetLetters))
                {
                    countWord = 0;
                    break;
                }
            }
            numberOfWordsContainingOnlyTargetLetters += countWord;
        }
        return numberOfWordsContainingOnlyTargetLetters;
    }
}
