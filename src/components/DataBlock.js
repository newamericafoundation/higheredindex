import React from 'react';

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";
import { connect } from 'react-redux'
import { fetchCongDistrictInfo } from '../actions.js';

class DataBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      const {getCongDistrictInfo, fetchedCongDistrictInfo, data, settings} = this.props;

      if (settings.vizSettings.chart1Settings.type == "state-map") {
        if (!fetchedCongDistrictInfo[data.state]) {
          getCongDistrictInfo(data.state);
        }
      }
  }

  render() {
  	let {settings, data, collectionName, fetchedCongDistrictInfo} = this.props,
      {title, paragraphSettings, vizSettings} = settings;
      console.log(title, data)
    if (!data) { return null }
      console.log(title, paragraphSettings)

    return (
      <div className="data-block">
      	<h5 className="data-block__title">{title}</h5>
      	<div className="data-block__content">
	      	{ paragraphSettings && <DataBlockInfo settings={settings} data={data} collectionName={collectionName} /> }
          { vizSettings && <DataBlockViz settings={vizSettings} data={data} collectionName={collectionName}/> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedCongDistrictInfo: state.fetchedCongDistrictInfo
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    getCongDistrictInfo: (stAbbrev) => {
      dispatch(fetchCongDistrictInfo(stAbbrev))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DataBlock)

