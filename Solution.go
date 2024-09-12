
package main

import "fmt"

var RANGE_OF_LETTERS = []byte{'a', 'z'}

func countConsistentStrings(targetLetters string, words []string) int {
	bitStampForTargetLetters := createBitStampForTargetLetters(targetLetters)
	return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters)
}

func createBitStampForLetter(letter byte) int {
	return 1 << (letter - RANGE_OF_LETTERS[0])
}

func isTargetLetter(letter rune, bitStampForTargetLetters int) bool {
	return (createBitStampForLetter(byte(letter)) & bitStampForTargetLetters) != 0
}

func createBitStampForTargetLetters(targetLetters string) int {
	bitStampForTargetLetters := 0
	for _, letter := range targetLetters {
		bitStampForTargetLetters |= createBitStampForLetter(byte(letter))
	}
	return bitStampForTargetLetters
}

func countNumberOfWordsContainingOnlyTargetLetters(words []string, bitStampForTargetLetters int) int {
	numberOfWordsContainingOnlyTargetLetters := 0

	for _, word := range words {
		countWord := 1

		for _, letter := range word {
			if !isTargetLetter(letter, bitStampForTargetLetters) {
				countWord = 0
				break
			}
		}
		numberOfWordsContainingOnlyTargetLetters += countWord
	}
	return numberOfWordsContainingOnlyTargetLetters
}
