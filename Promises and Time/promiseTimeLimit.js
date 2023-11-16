/* Given an asynchronous function fn and a time t in milliseconds, return a
new time limited version of the input function. fn takes arguments provided to 
the time limited function.

The time limited function should follow these rules:

If the fn completes within the time limit of t milliseconds, the time limited 
function should resolve with the result.
If the execution of the fn exceeds the time limit, the time limited function 
should reject with the string "Time Limit Exceeded".
 

Example 1:

Input: 
fn = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // Output

The provided function is set to resolve after 100ms. However, the time limit is 
set to 50ms. It rejects at t=50ms because the time limit was reached. 
*/

/* Approach
The timeLimit function takes two arguments: fn, which is the asynchronous function 
you want to limit, and t, which is the time limit in milliseconds.
It returns a new asynchronous function that takes any number of arguments using 
the spread operator (...args).
Within this new function, a Promise is created, and the setTimeout function is used 
to set a timer for t milliseconds. 4. If the timer expires, the Promise will be 
rejected with the message "Time Limit Exceeded."
The original asynchronous function fn is called with the provided arguments. 
If fn resolves before the timer expires, the Promise is resolved with the result of fn. If fn rejects, the Promise is rejected with the same error.

 */

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    
	return async function(...args) {
        const originalFnPromise = fn(...args);

        const timeoutPromise = new Promise( (_, reject) => {
            setTimeout( ()=> {
                reject("Time Limit Exceeded")
            },t);
        })
         return Promise.race([originalFnPromise, timeoutPromise]);
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */