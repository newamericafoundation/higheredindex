import React from 'react';
import { connect } from 'react-redux'

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";
import DataBlockSectorSelector from "./DataBlockSectorSelector";
import ComparePopup from "./ComparePopup";

import { fetchCongDistrictInfo } from '../../actions.js';


class DataBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sector: props.collectionName == "states_schools" ? "all" : null,
      comparePopupVisible: false
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

  toggleComparePopup() {
    this.setState({
      comparePopupVisible: !this.state.comparePopupVisible
    })
  }

  render() {
  	let {settings, data, collectionName, fetchedCongDistrictInfo} = this.props,
      {title, sectorOptions, paragraphSettings, vizSettings} = settings;

    const {sector} = this.state;

    let currData = data,
      showSectorSelector = false,
      showCompareButton = false,
      compareButtonText;

    if (sector) {
      if (sectorOptions) {
        currData = data ? data[sector] : null
        showSectorSelector = true
      } else {
        currData = data ? data.all : null
      }
    }

    if (!currData) { return null }

    if (vizSettings.chart1Settings.type != "table" && vizSettings.chart1Settings.type != "state-map") {
      compareButtonText = this.state.comparePopupVisible ? "Close Comparison" : "Compare";
      showCompareButton = true;
    }

    

    return (
      <div className="data-block">
        <div className="data-block__title-container">
      	  <h5 className="data-block__title">{title}</h5>
          {(showSectorSelector || showCompareButton) &&
            <div className="data-block__filter-container">
              {showSectorSelector &&
                <DataBlockSectorSelector sectorOptions={sectorOptions} changeFunction={this.changeSector.bind(this)} />
              }
              {showCompareButton &&
                <div className="data-block__compare-button" onClick={() => this.toggleComparePopup()}>{compareButtonText}</div>
              }
            </div>
          }
          {this.state.comparePopupVisible &&
            <ComparePopup settings={vizSettings} data={currData} collection={collectionName} />
          }
        </div>
      	<div className="data-block__content">
	      	{ paragraphSettings && <DataBlockInfo settings={settings} data={currData} collectionName={collectionName} sectorOptions={sectorOptions} sector={sector} /> }
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