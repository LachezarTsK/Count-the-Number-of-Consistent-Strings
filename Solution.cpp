
#include <span>
#include <array>
#include <vector>
#include <string>
#include <string_view>
using namespace std;

/*
The code will run faster with ios::sync_with_stdio(0).
However, this should not be used in production code and interactive problems.
In this particular problem, it is ok to apply ios::sync_with_stdio(0).

Many of the top-ranked C++ solutions for time on leetcode apply this trick,
so, for a fairer assessment of the time percentile of my code
you could outcomment the lambda expression below for a faster run.
*/

/*
const static auto speedup = [] {
    ios::sync_with_stdio(0);
    return nullptr;
}();
*/

class Solution {

    static constexpr array<int, 2> RANGE_OF_LETTERS{ { 'a', 'z' } };

public:
    int countConsistentStrings(const string& targetLetters, const vector<string>& words) const {
        int bitStampForTargetLetters = createBitStampForTargetLetters(targetLetters);
        return countNumberOfWordsContainingOnlyTargetLetters(words, bitStampForTargetLetters);
    }

private:
    int createBitStampForLetter(char letter) const {
        return 1 << (letter - RANGE_OF_LETTERS[0]);
    }

    int createBitStampForTargetLetters(string_view targetLetters) const {
        int bitStampForTargetLetters = 0;
        for (const auto& letter : targetLetters) {
            bitStampForTargetLetters |= createBitStampForLetter(letter);
        }
        return bitStampForTargetLetters;
    }

    bool isTargetLetter(char letter, int bitStampForTargetLetters) const {
        return (createBitStampForLetter(letter) & bitStampForTargetLetters) != 0;
    }

    int countNumberOfWordsContainingOnlyTargetLetters(span<const string> words, int bitStampForTargetLetters) const {
        int numberOfWordsContainingOnlyTargetLetters = 0;

        for (const auto& word : words) {
            int countWord = 1;

            for (char letter : word) {
                if (!isTargetLetter(letter, bitStampForTargetLetters)) {
                    countWord = 0;
                    break;
                }
            }
            numberOfWordsContainingOnlyTargetLetters += countWord;
        }
        return numberOfWordsContainingOnlyTargetLetters;
    }
};
