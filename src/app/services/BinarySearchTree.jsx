export default class BinarySearchTree {
	
	/*
		My custom Binary search tree implementation.
		Search tree in fact consists of two trees: one for words and one for the whole paragraphs.
		BENEFIT of this approach: rather fast time of processing words.
			If query is a sentence then search will be processed using paragraph tree
		DRAWBACK: this search tree is very simplified so precision of search counter is poor.
			For example, query "the" will ignore items "there" and "therefore" etc
				until longer query will be provided
	*/
	
	
	constructor() {
		this.word = { rootNode: null };
		this.paragraph = {rootNode: null};
	}

    
    addNode (type, value, index){

        var node = { 
		    value: value, 
		    left: null,
		    right: null,
		    indexes: [index],
		    type: type
        };
            
        var current;
    
        // Init tree in case of its emptiness
        if (this[type].rootNode === null){
            this[type].rootNode = node;
        } else {
            current = this[type].rootNode;
            
            while(true){
            
                // Go left
                if (value < current.value){
                
                    // Init left node
                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {                    
                        current = current.left;
                    }
                    
                // Go right
                } else if (value > current.value){
                
                    // Init right node
                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {                    
                        current = current.right;
                    }       
 
                } else {
                	// Add new index
                	current.indexes.push(index);
                    break;
                }
            }        
        }
    }
    
    searchText (phrase) {
    
        var found = false;
        var current = (phrase.trim().split(" ").length === 1) ? 
            this.word.rootNode :
            this.paragraph.rootNode;
            
        var result = {
        	data: {}
        };
        
        // Init query time
        var startTime = performance.now();
	        
		while(!found && current) {
			// Check whether current node value starts with given query
			// If not - move down through tree
			if (current.value.indexOf(phrase) === -1) {
				// Go left
			    if (phrase < current.value) {
			    	current = current.left;
			    } else {
			    // Go right
			    	current = current.right;	
				}
			} else {
		        found = true;
		      	result.data = current;
		      	// Query end time
		      	result.queryTime = performance.now() - startTime;
		    }
		}	
	    
	    return result;	

    }
}
