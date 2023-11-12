/* Given a function fn, return a new function that is identical 
to the original function except that it ensures fn is called at most once.

-- The first time the returned function is called, it should return the same 
    result as fn.
-- Every subsequent time it is called, it should return undefined. 

Example 1:

Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
Output: [{"calls":1,"value":6}]
Explanation:
const onceFn = once(fn);
onceFn(1, 2, 3); // 6
onceFn(2, 3, 6); // undefined, fn was not called
*/

/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function(fn) {
    //flag to track whether the fn function has been called
    let hasBeenCalled = false;
    
	return function(...args){
        if(!hasBeenCalled) 
        // if fn function hasn't been called yet,  call it and set the flag
        {
            hasBeenCalled = true;
            return fn(...args); // return the result of the original function
        }
        else {
            // if fn has already been called then return undefined
            return undefined;
        }
    }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */