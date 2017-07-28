import React from 'react';

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";

export default class DataBlock extends React.Component {
  render() {
  	let {settings, data, collectionName} = this.props,
      {title, paragraphSettings, vizSettings} = settings;

    if (!data) { return null }
      console.log(title, paragraphSettings)
    return (
      <div className="data-block">
      	<h5 className="data-block__title">{title}</h5>
      	<div className="data-block__content">
	      	{ paragraphSettings && <DataBlockInfo settings={settings} data={data} collectionName={collectionName}/> }
          { vizSettings && <DataBlockViz settings={vizSettings} data={data}/> }
        </div>
      </div>
    )
  }
}