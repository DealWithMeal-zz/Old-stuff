/*

	String to Integer (atoi)
	
	Difficulty: medium
	
	https://leetcode.com/problems/string-to-integer-atoi/description/

*/

var myAtoi = function(str) {
    var integerRegex = /^([+-]?[0-9]\d*|0)/,
        subStr = '',
        result = 0;
    
    str = str.trim();
    
    if(integerRegex.exec(str)) {
       subStr = integerRegex.exec(str)[0];
       result = parseInt(subStr);
            
       if(result > 2147483647) {
           result = 2147483647;
       } else if(result < -2147483648) {
           result = -2147483648;
       } 
    }
    
    return result;
};