/* Given a positive integer millis, write an asynchronous function that 
sleeps for millis milliseconds. It can resolve any value.

Example 1:

Input: millis = 100
Output: 100
Explanation: It should return a promise that resolves after 100ms.
let t = Date.now();
sleep(100).then(() => {
  console.log(Date.now() - t); // 100
});
 */

/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise((resolve)=>{
        const start = Date.now()
        setTimeout(()=>{
            const end = Date.now()
            resolve(end - start);
        },millis);
    });
}

//Example usage:
let t = Date.now()
console.log(t)
sleep(200).then((elapsedTime) => console.log("Elapsed time", elapsedTime)) // 100

