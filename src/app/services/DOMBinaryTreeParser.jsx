import $ from "jquery";

import BinarySearchTree from './BinarySearchTree.jsx';

export default class BinaryParser {
	constructor(struct) {
		this.struct = $(struct).find("p");
	}
	
	getTree() {
		var tree = new BinarySearchTree();
		
		$.each(this.struct, function(index, element) {
			var $node = $(this);
			
			//Capture all words
			var paragraph = $node.text().toLowerCase();
			var words = paragraph.match(/(\w+)/g);
			$.each(words, function(i, word){
				tree.addNode("word", word, index);
			});
			
			// Duplicate each paragraph in a tree in order to search phrases faster
			tree.addNode("paragraph", paragraph, index);
			
			// Add id to every paragraph
			$(this).attr("id", `element${index}`);
		});
		
		return tree;
		
	}
}