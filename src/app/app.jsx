import React from 'react';

import DOMBinaryTreeParser from './services/DOMBinaryTreeParser.jsx';
import BinarySearchTree from './services/BinarySearchTree.jsx';

import SearchResult from './components/SearchResult.jsx';

// Get content from div on the page - the simplest case
var data = document.getElementById("searchContent");

var binaryParser = new DOMBinaryTreeParser(data);
var tree = binaryParser.getTree();

class SearchHelper extends React.Component {
	
	constructor(props) {
		super(props);
		this.performSearch = this.performSearch.bind(this);
		this.state = {
			query: null,
			result: null,
			lastQueryTime: 0	
		};
	}
	
	performSearch(e) {
		var searchText = e.target.value;
		var timeStart = Date.now();
		if (searchText && searchText.length > 2) {
			var treeResult = tree.searchText(searchText.trim().toLowerCase());
			this.setState({query: searchText});
			this.setState({result: treeResult.data});
			this.setState({lastQueryTime: treeResult.queryTime});
		} else {
			this.setState({result: null});
		}
	}
	
	render () {
		return (
			<div className = "app">
				<div className = "app-input" refs = "searchField" onChange = { this.performSearch } >
					<input type = "text" placeholder = "Search on the page..."/>
				</div>
				{ this.state.lastQueryTime ? 
					(
						<p><strong>Query time: </strong>{ this.state.lastQueryTime.toFixed(4) }ms</p>
					) 
					: null
				}
				<SearchResult data = { this.state.result } query = {this.state.query} />
			</div>	
		);
	}
}

React.render(<SearchHelper/>, document.getElementById("searchHelper"));