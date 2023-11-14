/* Given a function fn, an array of arguments args, and a timeout t in 
milliseconds, return a cancel function cancelFn.

After a delay of t, fn should be called with args passed as parameters unless 
cancelFn was invoked before the delay of t milliseconds elapses, specifically at 
cancelT ms. In that case, fn should never be called. 

Example 1:

Input: fn = (x) => x * 5, args = [2], t = 20, cancelT = 50
Output: [{"time": 20, "returned": 10}]
Explanation: 
const result = []

const fn = (x) => x * 5

const start = performance.now() 

const log = (...argsArr) => {
    const diff = Math.floor(performance.now() - start);
    result.push({"time": diff, "returned": fn(...argsArr)})
}
     
const cancel = cancellable(log, [2], 20);

const maxT = Math.max(t, 50)
          
setTimeout(cancel, cancelT)

setTimeout(() => {
     console.log(result) // [{"time":20,"returned":10}]
}, 65)

The cancellation was scheduled to occur after a delay of cancelT (50ms), which happened after the execution of fn(2) at 20ms.
*/

/* Solution: 
    This question is asking you to create a function that manages the execution of another function (fn) with a delay (t milliseconds) and provides a way to cancel the execution before the delay elapses.

Here's a breakdown of the components involved:

fn (Function): The function that needs to be delayed and potentially canceled.

args (Array): An array of arguments that should be passed to the function (fn) when it is eventually called.

t (Number): The delay time in milliseconds before calling the function (fn).

cancelFn (Function): A function that can be called to cancel the scheduled execution of fn.
 */

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    let timerId ;

    //Set up the timeout to execute fn after t miliseconds
    const delayPromise = new Promise((resolve) => {
        timerId = setTimeout(()=> {
            resolve(fn(...args));
        },t)
    });
    // Define the cancel function
    const cancelFn = ()=> {
        clearTimeout(timerId); // Clear the timeout
        console.log("Execution canceled");
    };
    return cancelFn;
};

// Example usage:
const cancelFunction = cancellable(
    (param) => console.log("Function executed with param:", param),
    ["example argument"],
    2000
);
/**
 *  const result = []
 *
 *  const fn = (x) => x * 5
 *  const args = [2], t = 20, cancelT = 50
 *
 *  const start = performance.now() 
 *
 *  const log = (...argsArr) => {
 *      const diff = Math.floor(performance.now() - start);
 *      result.push({"time": diff, "returned": fn(...argsArr)})
 *  }
 *       
 *  const cancel = cancellable(log, args, t);
 *
 *  const maxT = Math.max(t, cancelT)
 *           
 *  setTimeout(() => {
 *     cancel()
 *  }, cancelT)
 *
 *  setTimeout(() => {
 *     console.log(result) // [{"time":20,"returned":10}]
 *  }, maxT + 15)
 */