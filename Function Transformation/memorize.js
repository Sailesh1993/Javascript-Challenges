/* Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with 
the same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.

-- sum accepts two integers a and b and returns a + b.
-- fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) 
    otherwise.
--factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n 
    otherwise.

Example 1:

Input:
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
Output: [4,4,1,3,2]
Explanation:
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
// "getCallCount" - total call count: 1
memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
// "getCallCount" - total call count: 2 
*/

/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    // create acache object to store the cached values.
    const cache = {}; 
    return function(...args) {
        // convert the arguments into a string representation to use as the key for the cache
        const key = JSON.stringify(args);  
        // check if there is already a cached value for the given argument, if there is return cached value.
        if(cache[key] !== undefined) {
            return cache[key];
        }
        // if not then call the original fn with the arguments and store the result in the cache before returning it
        const result = fn(...args);
        cache[key] = result;

        return result;
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */
