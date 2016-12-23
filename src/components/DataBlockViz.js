import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LineChart from "./LineChart";
import $ from 'jquery';


export default class DataBlockViz extends React.Component {
  render() {
  	const {settings, data} = this.props,
      {type} = settings;

    let viz;
    switch (type) {
      case "line-chart":
        viz = <LineChart settings={settings} data={data} />
        break;
      default:
        viz = "No Chart Type";
    }

    return (
    	<div className="data-block__viz">
    		{viz}
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