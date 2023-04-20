# MasterMind-JS

In our approach we have a two page website. In the first page you log in, entering your name, and in the second one you are able to play mastermind.
We wanted to do a design similar to the popular game wordle, so we went for static inputs and automatic movement of the cursor amongst them. 
To implement the memory we used the window.localstorage. This saves the name of the user, the number of matches won and the number of matches lost.
We decided to keep them separated instead of in a class because only one user will be interacting with our website at a time, and this way it is easier
to modify the won and lost values.

To play the game we neither allow repeated digits in the entered number nor letters so we trigger an alert if the user doesn't follow the rules. We also trigger an
alert if the user wins or loses.

The inputs are placed in a table. In the begining the only row of the table that has working inputs is the first one. Every time the player enters a new number
he fills the row so we insert a new row of inputs under the current one. The cursor moves automatically to the new row so that he doesn't have to change manually.
The same happens when the user enters a number, we automatically change the cursor to the next input. When the user enters a backslash he erases the last number
even if it is in the previous input.
We decided to remove the blinking caret because for our implementation it is more authentic.

**Number generation**
To generate the correct value we use a randomization function called Math.random().

**Hint calculation**
Firstly you must check if the entered number and the correct one have the same digits.
To do so we will generate an array 0-9 that contains numbers and we're going to count the appearances of those numbers in the entered array. We will do the same thing 
with the correct value. This way we'll be able to compare the two resulting arrays and we'll know:
1. If the entered array has a repeated number
2. The numbers that appear in both arrays at the same positions. This way we know how many numbers of the entered array also appear in the correct one. 

Afterwards we'll compare the entered numbers digit by digit to know how many numbers appear in the same position in the entered value and the correct one, and doing a 
simple substraction we'll be able to have both the number of digits that appear in positions different from where they should (we'll name them correct numbers) and 
numbers that appear in the position they have in the correct number (we'll name them guessed numbers).

> ![MasterMind](https://user-images.githubusercontent.com/71326643/233481524-a0ec7c18-f292-4248-a8de-9f54708ca28a.png)
> Image of Login

> ![MasterMind2](https://user-images.githubusercontent.com/71326643/233482143-ecde33d8-70a1-4527-8d60-c23dbc1d6313.png)
> Image of login
