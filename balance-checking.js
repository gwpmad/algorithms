/* You are given a string with just two types of bracket characters in it - '(' and ')'.Write a function that takes that string as an input and returns a boolean indicating whether the string is balanced or not. A string is considered balanced if all the open-parenthesis characters '(' have a matching close-parenthesis character and all of them are correctly nested and syntactically correct.
Example: given the string
 ((())) => the answer is true
 (((( => the answer is false
 ()() => the answer is true
 ))(( = the answer is false
Your code should work for all possible test cases and should have good time-complexity
*/

// my solution:
function isBalanced(string) {
  const array = string.split("");

  for (let i = 0; i < array.length; i++) {
    const char = array[i];
    if (!char) continue;
    if (char === "(") {
      const closingBracketIdx = array.indexOf(")", i);
      if (closeBracketIdx > -1) {
        array[i] = null;
        array[closingBracketIdx] = null;
      }
    } else {
      return false;
    }
  }

  const allCharactersBalanced = array.every((char) => !char);
  return allCharactersBalanced;
}
// The above works but is 𝑂(𝑛2) at worst. What we need is something to keep track of the ordering so we only have to go through the array once.
// One very good solution is a 'stack' - if we hit a ( we put it in the stack, then if the next char is a ) we pop() the ( out of the stack.
// If we ever hit a ) and there is nothing in the stack to cancel it out, we immediately return false
// At the end we return true if the stack is empty, false if not.
// This would be 𝑂(𝑛)

// A stack uses the LIFO principle (last in, first out), whereas a queue uses FIFO.

function isBalanced(string) {
  if (string[0] === ")" || string[string.length - 1] === "(") return false;
  const stack = [];

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char === "(") {
      stack.push(char);
    } else {
      if (stack.length) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return !stack.length;
}
