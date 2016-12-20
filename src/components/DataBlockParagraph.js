import React from 'react';
var d3 = require("d3");

export default function DataBlockParagraph(props) {
	const {paragraphText, paragraphFields, data} = props;
	console.log(paragraphText, paragraphFields, data)
  	let populatedText = [];

	paragraphText.map((text, i) => {
		let field = paragraphFields[i],
			fieldClass = field == 'name' ? '' : "data-block__paragraph__data";
			
		populatedText.push(<span> {text} </span>);

		console.log(typeof(data[field]) );
		if (typeof(data[field]) == 'object') {
			let keys = Object.keys(data[field]);
			let maxYear = d3.max(keys, (d) => { return Number(d) });

			populatedText.push(<span className={fieldClass}>{data[field][maxYear]}</span>);
		} else {
			populatedText.push(<span className={fieldClass}>{data[field]}</span>);
		}
		
    })

	console.log(populatedText);
    return (
      <div className="data-block__paragraph">
      	<p>{populatedText}</p>
      </div>
    )
}