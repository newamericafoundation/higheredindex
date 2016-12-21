import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LineChart from "./LineChart";


export default class DataBlock extends React.Component {
  render() {
  	console.log(this.props.settings);
  	const {settings, data} = this.props,
      {type} = settings;

    console.log(type)
    let viz;
    switch (type) {
      case "line-chart":
        viz = <LineChart settings={settings} data={data} />
        break;
      default:
        viz = "No Chart Type";
    }

    console.log(viz);

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