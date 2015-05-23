import React from 'react';
import _ from 'lodash';
import $ from "jquery";

export default class SearchResult extends React.Component {
		
	render() {
		
		var data = this.props.data;
		var query = this.props.query;
		
		if (!data || !data.indexes) { return null; }
		
		return (
			<div className = "app-result">
				{
					(data.indexes) ? (
						<p><strong>Results: </strong>{ data.indexes.length }</p>
					) : null
				} 
				<ul>
					{_.slice(data.indexes, 0, 5).map((item, i) => {
						
						var $node = $(`#element${item}`);
						// Get text from the nearest preceding heading
						var theme = $node.prevAll("h1, h2, h3, h4, h5, h6").eq(0).text();
						
						var dataHTML = $node.text();
						var sentenceToShow;
						
						// Get sentence where detected word appears
						_.forEach(dataHTML.split("."), (sentence) => {
							let sentenceText = sentence.trim().toLowerCase();
							if (new RegExp(query.trim()).test(sentenceText)) {
								sentenceToShow = sentence.trim();
								return false;
							}
						});
						return (
							<li className = "search_result-item" key = {i} >
								<div className = "search_result-item-body">
									<h4>{ theme }</h4>
									<div className = "search_result-item-sentence">
										{ sentenceToShow }.
									</div>
									<p className = "search_result-item-link">
										<a href = { `#element${item}` }>{`Go to paragraph ${item}`}</a>
									</p>
								</div>
								
							</li>
						);
					})}
				</ul>	
			</div>
		);
	}
}