import React from 'react';
import { connect } from 'react-redux'

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";
import DataBlockSectorSelector from "./DataBlockSectorSelector";
import { fetchCongDistrictInfo } from '../../actions.js';

const sectorOptions = {
  "all": "",
  "public2": "2-year public",
  "public4": "4-year public",
  "nonprofit": "private nonprofit",
  "forprofit": "private for-profit",
}

class DataBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sector: props.collectionName == "states_schools" ? "all" : null
    }
  }

  changeSector(newSector) {
    this.setState({
      sector: newSector
    })
  }

  componentWillMount() {
      const {getCongDistrictInfo, fetchedCongDistrictInfo, data, settings} = this.props;

      if (settings.vizSettings.chart1Settings.type == "state-map") {
        if (!fetchedCongDistrictInfo[data.state]) {
          getCongDistrictInfo(data.all.state);
        }
      }
  }

  render() {
  	let {settings, data, collectionName, fetchedCongDistrictInfo} = this.props,
      {title, paragraphSettings, vizSettings} = settings;

    const {sector} = this.state;

    let currData = data,
      showSectorSelector = false;

    if (sector) {
      if (vizSettings.chart1Settings.type == "table" || vizSettings.chart1Settings.type == "state-map") {
        currData = data ? data.all : null
      } else {
        currData = data ? data[sector] : null
        showSectorSelector = true
      }
    }

    if (!currData) { return null }

    return (
      <div className="data-block">
        <div className="data-block__title-container">
      	  <h5 className="data-block__title">{title}</h5>
          {showSectorSelector &&
            <DataBlockSectorSelector fullData={data} changeFunction={this.changeSector.bind(this)} />}
        </div>
      	<div className="data-block__content">
	      	{ paragraphSettings && <DataBlockInfo settings={settings} data={currData} collectionName={collectionName} sector={sector} /> }
          { vizSettings && <DataBlockViz settings={vizSettings} data={currData} collectionName={collectionName}/> }
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