/**
 * @param {number[]} nums
 * @return {number}
 */
// 如果相同数字，则其二进制都一样，返回0，不一样的返回1，这段代码，返回了nums数组中唯一不一样的值。
var singleNumber = function(nums) {
    var a;
    for (var index = 0, leng=nums.length; index < leng; index++){
        a ^= nums[index];
    }
    return a;
};
var nums = [5, 5, 5, 6, 5];
console.log(singleNumber(nums));// 6

// 怎么实现字符？
var strs = ['k', 'k', 'k', 'm', 'k'];
console.log(singleNumber(strs));// 0
