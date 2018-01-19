import React from 'react';
import { connect } from 'react-redux'

import DataBlockInfo from "./DataBlockInfo";
import DataBlockViz from "./DataBlockViz";
import DataBlockSectorSelector from "./DataBlockSectorSelector";

import { fetchCongDistrictInfo, setComparePopupSettings } from '../../actions.js';


class DataBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sector: props.collectionName == "states_schools" ? "all" : null,
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
    const { comparePopupSettings, setComparePopupSettings, data, collectionName, settings } = this.props;
    if (comparePopupSettings) {
      setComparePopupSettings(null)
    } else {
      if (collectionName === "states_schools") {
        this.setState({
          sector: this.state.sector ? "all" : null,
        })
        setComparePopupSettings({data: data.all, collection: collectionName, settings: settings.vizSettings })
      } else {
        setComparePopupSettings({data: data, collection: collectionName, settings: settings.vizSettings })
      }
    }
  }

  render() {
  	let {settings, data, collectionName, fetchedCongDistrictInfo, currProfile} = this.props,
      {title, sectorOptions, paragraphSettings, vizSettings, showCompareButton} = settings;

    const {sector} = this.state;

    let currData = data,
      showSectorSelector = false,
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

    return (
      <div className="data-block">
        <a className="data-block__anchor" id={title.toLowerCase().replace(/ /g, "-")} name={title.toLowerCase().replace(/ /g, "-")}></a>
        <div className="data-block__title-container">
      	  <h5 className="data-block__title">{title}</h5>
          {(showSectorSelector || showCompareButton) &&
            <div className="data-block__filter-container">
              {showSectorSelector &&
                <DataBlockSectorSelector sector={sector} sectorOptions={sectorOptions} changeFunction={this.changeSector.bind(this)} />
              }
              {showCompareButton &&
                <div className="data-block__compare-button" onClick={() => this.toggleComparePopup()}>Compare</div>
              }
            </div>
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
    currProfile: state.currProfile,
    fetchedCongDistrictInfo: state.fetchedCongDistrictInfo,
    comparePopupSettings: state.comparePopupSettings
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    getCongDistrictInfo: (stAbbrev) => {
      dispatch(fetchCongDistrictInfo(stAbbrev))
    },
    setComparePopupSettings: newPopupSettings => {
      dispatch(setComparePopupSettings(newPopupSettings))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataBlock)