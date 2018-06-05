/*
	
	Median of Two Sorted Arrays
	
	Difficulty: hard
	
	https://leetcode.com/problems/median-of-two-sorted-arrays/
	
*/

var findMedianSortedArrays = function(nums1, nums2) {
    var merge = function(left, right) {
        var result = [],
            indexLeft = 0,
            indexRight = 0;

        while (indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft] < right[indexRight]) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else {
                result.push(right[indexRight]);
                indexRight++;
            }
        }
        
        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    };
        
    var resultArray = merge(nums1, nums2), 
        resultLength = nums1.length + nums2.length;
    
    if(resultLength % 2 === 1 && resultLength > 1) {
        //single pos
        var pos = Math.floor(resultLength/2);
        return resultArray[pos];
    } else {
        //double pos
        var pos1 = Math.floor(resultLength / 2) - 1,
            pos2 = Math.floor(resultLength / 2);

        if(resultLength > 4) {
            return (resultArray[pos1] + resultArray[pos2]) / 2;
        } else {
            if(resultLength === 1) {
                return resultArray[0];
            } else {
                return (resultArray[pos1] + resultArray[pos2]) / 2;
            }
        }
    }
};