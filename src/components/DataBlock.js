import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LineChart from "./LineChart";
import DataBlockParagraph from "./DataBlockParagraph";


export default class DataBlock extends React.Component {
  render() {
  	console.log(this.props.paragraphText);
  	let {paragraphText, paragraphFields, data} = this.props;

    return (
      <div className="data-block">
      	<h5 className="data-block__title">{this.props.title}</h5>
      	<div className="data-block__content">
	      	<DataBlockParagraph paragraphText={paragraphText} paragraphFields={paragraphFields} data={data}/>
	      	<div className="data-block__chart">
	      		<LineChart data={this.props.data} variables={this.props.vizVars}/>
	      	</div>
	    </div>
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