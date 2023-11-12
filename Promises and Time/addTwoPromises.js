/* Given two promises promise1 and promise2, return a new promise. 
promise1 and promise2 will both resolve with a number. The returned promise 
should resolve with the sum of the two numbers.

Example 1:

Input: 
promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)), 
promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
Output: 7
Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.

*/

/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    try
    {
        //Use await to wait for each promise to resolve
        const result1 = await promise1;
        const  result2 = await promise2;

        //Calculate the sum of the resolved numbers
        const sum = result1 + result2;

        //Return the sum
        return sum;
    }
    catch (error) 
    {
        //handle any errors that may occur during the resolution of promise
        throw error;
    }
     
};

const promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20))
const promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
const result =  addTwoPromises(promise1,promise2)
console.log(result)