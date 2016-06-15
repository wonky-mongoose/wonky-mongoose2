# Toy Problems

## Card 
### Question
"How would you verify a prime number?"
### Answer
"A prime number is only divisible by itself and 1. So, i will run a while loop and increase by 1."
### Explanation
"step-1: Any number will not be divisible by a number bigger than half of it. for example, 13 will never be divisible by 7, 8, 9 .. it could be as big as half of it for even number. for example, 16 will be divisible by 8 but will never be by 9, 10, 11, 12...
Decision: a number will never be divisible by a number bigger than half of its values. So, we dont have to loop 50%
step-2: Now, if a number is not divisible by 3. (if it is divisible by 3, then it wouldn't be a prime number). then it would be divisible any number bigger than the 1/3 of its value. for example, 35 is not divisible by 3. hence it will be never divisible by any number bigger than 35/3 will never be divisible by 12, 13, 14 ... if you take an even number like 36 it will never be divisible by 13, 14, 15
Decision: a number could be divisible by numbers 1/3 of its value.
step-3: For example u have the number 127. 127 is not divisible by 2 hence you should check upto 63.5. Secondly, 127 is not divisible by 3. So, you will check up to 127/3 approximately 42. It is not divisible by 5, divisor should be less than 127/5 approximately 25 not by 7. So, where should we stop?
Decision: divisor would be less than Math.sqrt (n)"
---
## Card 
### Question
"Count total number of zeros from 1 up to n?"
### Answer
"If n = 50. number of 0 would be 11 (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100). Please note that 100 has two 0.",
### Explanation
"So the tick here is. if you have a number 1 to 50 the value is 5. just 50 divided by 10. However, if the value is 100. the value is 11. you will get by 100/10 = 10 and 10/10. Thats how you will get in the more zeros in one number like (100, 200, 1000)."
---
## Card 
### Question
"How would you create all permutation of a string?"
### Answer
"You can do it!",
### Explanation
"Idea: Idea is very simple. We will convert the string to an array. from the array we will pick one character and then permute rest of it. After getting the permutation of the rest of the characters, we will concatenate each of them with the character we have picked.
step-1 First copy original array to avoid changing it while picking elements
step-2 Use splice to removed element from the copied array. We copied the array because splice will remove the item from the array. We will need the picked item in the next iteration.
step-3 [1,2,3,4].splice(2,1) will return [3] and remaining array = [1,2,4]
step-4 Use recursive method to get the permutation of the rest of the elements by passing array as string
step-5 Finally, concat like a+permute(bc) for each"
---
