/*

	Add two numbers
	
	Difficulty: medium
	
	https://leetcode.com/problems/add-two-numbers/description/#

*/

var addTwoNumbers = function(l1, l2) {   
    var val1 = l1.val,
        val2 = l2.val,
        next1 = l1.next,
        next2 = l2.next,
        buff = 0,
        resultArray = [];
    
    var add = function(num1 = 0, num2 = 0) {      
        var result = num1+num2+buff;
        
        if(result > 9) {
           buff = parseInt((''+result)[0]);
           result = parseInt((''+result)[1]);
           resultArray.push(result); 
        } else {
           buff = 0;
           resultArray.push(result); 
        }  
    };
    
    add(val1, val2);
    
    while(next1 || next2) {
        val1 = undefined,
        val2 = undefined;
        
        if(next1) {
            val1 = next1.val;
            next1 = next1.next;
        }
        
        if(next2) {
            val2 = next2.val;
            next2 = next2.next;
        }
        
        add(val1, val2);
    }
    
    if(buff > 0) {
        add();
    }

    return resultArray;
};