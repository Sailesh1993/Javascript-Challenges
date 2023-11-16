/* Given a function fn, an array of arguments args, and an interval time t, 
return a cancel function cancelFn.

The function fn should be called with args immediately and then called again 
every t milliseconds until cancelFn is called at cancelT ms.

Example 1:

Input: fn = (x) => x * 2, args = [4], t = 35, cancelT = 190
Output: 
[
   {"time": 0, "returned": 8},
   {"time": 35, "returned": 8},
   {"time": 70, "returned": 8},
   {"time": 105, "returned": 8},
   {"time": 140, "returned": 8},
   {"time": 175, "returned": 8}
]
Explanation: 
const result = []
const fn = (x) => x * 2
const args = [4], t = 35, cancelT = 190

const start = performance.now()

const log = (...argsArr) => {
    const diff = Math.floor(performance.now() - start)
    result.push({"time": diff, "returned": fn(...argsArr)})
}

const cancel = cancellable(log, [4], 35);
setTimeout(cancel, 190);

setTimeout(() => {
    console.log(result) // Output
 }, cancelT + t + 15)  

Every 35ms, fn(4) is called. Until t=190ms, then it is cancelled.
1st fn call is at 0ms. fn(4) returns 8.
2nd fn call is at 35ms. fn(4) returns 8.
3rd fn call is at 70ms. fn(4) returns 8.
4th fn call is at 105ms. fn(4) returns 8.
5th fn call is at 140ms. fn(4) returns 8.
6th fn call is at 175ms. fn(4) returns 8.
 */

/* Approach
Call fn(...args).
Set an interval timer. The setInterval function in the code below will 
call () => fn(...args) every t milliseconds. Note, setInterval does not 
initially call the function before t milliseconds, which is why we 
call fn(...args) once before setting the interval.
Now, we define a cancelFn function, which clears the interval when called. 
Return cancelFn.
The function cancelFn is not called when our cancellable function is first defined.
However, whenever someone calls cancellable, the line return cancelFn, in order 
to return, will call and execute cancelFn, thereby cancelling the interval.
For example, if we define var myFunc = cancellable((num) => 1 + num, 13, 100), 
the interval will repeatedly call (num) => 1 + num until myFunc() is called. 
When myFunc() is called, the return line in myFunc is read, which will 
consequentially make cancelFn execute and return, thereby clearing the interval.
 */

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    fn(...args);
    let timer = setInterval(()=> fn(...args),t);
    let cancelFn = ()=> clearInterval(timer)
    return cancelFn
  };
  
  /**
   *  const result = []
   *
   *  const fn = (x) => x * 2
   *  const args = [4], t = 35, cancelT = 190
   *
   *  const start = performance.now()
   *
   *  const log = (...argsArr) => {
   *      const diff = Math.floor(performance.now() - start)
   *      result.push({"time": diff, "returned": fn(...argsArr)})
   *  }
   *       
   *  const cancel = cancellable(log, args, t);
   *
   *  setTimeout(() => {
   *     cancel()
   *  }, cancelT)
   *   
   *  setTimeout(() => {
   *    console.log(result)  // [
   *                         //      {"time":0,"returned":8},
   *                         //      {"time":35,"returned":8},
   *                         //      {"time":70,"returned":8},           
   *                         //      {"time":105,"returned":8},
   *                         //      {"time":140,"returned":8},
   *                         //      {"time":175,"returned":8}
   *                         //  ]
   *  }, cancelT + t + 15)    
   */