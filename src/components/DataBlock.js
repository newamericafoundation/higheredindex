import React from 'react';

import DataBlockParagraph from "./DataBlockParagraph";
import DataBlockViz from "./DataBlockViz";

export default class DataBlock extends React.Component {
  render() {
  	let {settings, data, collectionName} = this.props,
      {title, callOutBoxSettings, paragraphSettings, vizSettings} = settings;

      // console.log(data)
      // console.log(paragraphSettings)
      // console.log(vizSettings)
    if (!data) { return null }
      
    return (
      <div className="data-block">
      	<h5 className="data-block__title">{title}</h5>
      	<div className="data-block__content">
	      	{ paragraphSettings && <DataBlockParagraph settings={paragraphSettings} calloutSettings={callOutBoxSettings} data={data} collectionName={collectionName}/> }
          <DataBlockViz settings={vizSettings} data={data}/>
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