/*
	
	Sliding Puzzle
	
	Difficulty: hard
	
	https://leetcode.com/problems/sliding-puzzle/description/
	
*/

var slidingPuzzle = function(board) {
    var tree = []
      , start = initNode(board[0].concat(board[1]))
      , maxDepth = 19
      , BreakException = {}
      , target = [1, 2, 3, 4, 5, 0];

    tree[0] = [];
    tree[0][0] = start;

    if (equalBoard(start.state, target)) {
        return 0;
    } else {
        try {
            for (var i = 1; i < maxDepth; i++) {
                tree[i] = [];

                var counter = 0;

                // clean unused tree nodes to save memory
                if(i > 2) {
                    tree[i - 2] = [];
                }

                for (var j = 0; j < tree[i-1].length; j++) {
                    getNextNodes(tree[i-1][j]).forEach(function(newNode) {
                        tree[i][counter] = newNode;
                        counter++;

                        if (equalBoard(newNode.state, target)) {
                            throw BreakException;
                        }
                    });
                }
            }
        } catch (e) {
            if (e !== BreakException) {
                throw e;
            } else {
                return tree.length - 1;
            }
        }

        return -1;
    }
};

function getNextNodes(node) {
    var result = [];

    //possible zeroPos changes: -1 +1 -3 +3
    //also depends on the actual zeroPos

    if(((node.zeroPos < 5) && (node.zeroPos != 2)) && (node.zeroPos + 1 != node.prevZeroPos)) {
        var newState = [];
        newState = node.state.slice(0);
        newState[node.zeroPos] = newState[node.zeroPos + 1];
        newState[node.zeroPos + 1] = 0;
        result.push(initNode(newState, node.zeroPos + 1, node.zeroPos));
    }

    if(((node.zeroPos > 0) && (node.zeroPos != 3)) && (node.zeroPos - 1 != node.prevZeroPos)) {
        var newState = [];
        newState = node.state.slice(0);
        newState[node.zeroPos] = newState[node.zeroPos - 1];
        newState[node.zeroPos - 1] = 0;
        result.push(initNode(newState, node.zeroPos - 1, node.zeroPos));
    }

    if(node.zeroPos < 3 && (node.zeroPos + 3 != node.prevZeroPos)) {
        var newState = [];
        newState = node.state.slice(0);
        newState[node.zeroPos] = newState[node.zeroPos + 3];
        newState[node.zeroPos + 3] = 0;
        result.push(initNode(newState, node.zeroPos + 3, node.zeroPos));
    }

    if(node.zeroPos > 2 && (node.zeroPos - 3 != node.prevZeroPos)) {
        var newState = [];
        newState = node.state.slice(0);
        newState[node.zeroPos] = newState[node.zeroPos - 3];
        newState[node.zeroPos - 3] = 0;
        result.push(initNode(newState, node.zeroPos - 3, node.zeroPos));
    }

    return result;
}

/*
    Should utilize ES2015 class
    
    [] state, int zeroPos, int prevZeroPos
*/
function initNode(s, z, pz) {
    if (!z) {
        z = s.indexOf(0);
    }

    return {
        state: s,
        zeroPos: z,
        prevZeroPos: pz,
    };
}

function equalBoard(n1, n2) {
    var result = true;

    for (var i = 0; i < 6; i++) {
        if (n1[i] !== n2[i]) {
            result = false;
        }
    }

    return result;
}