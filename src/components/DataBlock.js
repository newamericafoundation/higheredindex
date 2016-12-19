import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LineChart from "./LineChart";

export default class DataBlock extends React.Component {
  render() {
  	console.log(this.props.paragraphText);
  	let {paragraphText, paragraphFields, data} = this.props;

  	let populatedText = [];

	paragraphText.map((text, i) => {
		let field = paragraphFields[i],
			fieldClass = field == 'name' ? '' : "data-block__paragraph__data";
		populatedText.push(<span> {text} </span>);
		populatedText.push(<span className={fieldClass}>{data[field]}</span>);
    })

	console.log(populatedText);
    return (
      <div className="data-block">
      	<h5 className="data-block__title">{this.props.title}</h5>
      	<p>{populatedText}</p>
      	<LineChart />

      </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
// 	console.log(state);
// 	console.log(ownProps);
//   return {
//     id: ownProps.params.id,
//     fetchedSts: state.fetchedSts || {}
//   }
// }


// export default connect(mapStateToProps)(DataBlock)