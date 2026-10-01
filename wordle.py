"""wordle game in terminal"""
import random

def main():
    """wordle game in terminal"""
    file_name = "word.txt"
    secret_word = random.choice(open(file_name).read().splitlines())
    current_guess = ""
    guess_count = 0
    max_guesses = 6
    guess_history = []
    secret_freq = {}
    for i, letter in enumerate(secret_word):
        secret_freq[letter] = secret_freq.get(letter, 0) + 1

    while guess_count < max_guesses:
        copy_freq = secret_freq.copy()
        print_out = ['_'] * 5
        current_guess = input("Enter your guess: ")
        if len(current_guess) != 5:
            print("Please enter a 5-letter word.")
            continue
        else:
            guess_count += 1
            current_guess = current_guess.lower()
            guess_history.append(current_guess)
            if current_guess == secret_word:
                print(f"Congratulations! You've guessed the word '{secret_word}' in {guess_count} attempts.")
                break
            for i, letter in enumerate(current_guess):
                if letter == secret_word[i]:
                    print_out[i] = letter
                    copy_freq[letter] -= 1
            for i, letter in enumerate(current_guess):
                if letter != secret_word[i] and letter in secret_word and copy_freq[letter] > 0:
                    print_out[i] = letter + ('*')
                    copy_freq[letter] -= 1
            print(" ".join(print_out))
    if (guess_count == max_guesses and current_guess != secret_word):
        print(f"Sorry, you've used all your attempts. The secret word was '{secret_word}'.")   

#----------------------------------------------------------------------

if __name__ == '__main__':
    main()
