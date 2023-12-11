/* 
Given an object or an array, return if it is empty.

An empty object contains no key-value pairs.
An empty array contains no elements.
You may assume the object or array is the output of JSON.parse.

 

Example 1:

Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
*/

/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function(obj) {
    // if it's an array then check its length
     if(Array.isArray(obj))
    { 
        return obj.length == 0;
    }
 // if it's an object check the number of keys.
 if(obj && typeof obj === 'object') 
 {
     return Object.keys(obj).length === 0;
 }
  return false;
 };