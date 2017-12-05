import React from 'react';
import { connect } from 'react-redux';
import { colors } from "../../helper_functions/colors.js";
import { stateIdMappings } from "../../helper_functions/state_id_mappings.js";

import { fetchAllStatesData, fetchUsData, setComparePopupSettings } from '../../actions'
import SimpleChart from "../chart_modules/SimpleChart";
import SvgIcon from './SvgIcon'

class ComparePopup extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)
    this.collectionName = props.collection.replace("inst", "states")
    this.collectionName = this.collectionName == "states_schools" ? "states_schools_all" : this.collectionName

    this.chart1FilterList = props.settings.chart1Settings.variables;
    this.chart2FilterList = props.settings.chart2Settings ? props.settings.chart2Settings.variables : [];

    this.state = {
      currFilter: this.chart1FilterList[0],
      currChartSettings: props.settings.chart1Settings,
      additionalStateComparison: null
    }
  }

  componentWillMount() {
    const { fetchedAllStatesData, fetchedUsData } = this.props

    if (fetchedAllStatesData[this.collectionName]) {
      if (fetchedAllStatesData[this.collectionName] != "fetching") {
        this.statesData = fetchedAllStatesData[this.collectionName];
      }
    } else {
     this.props.fetchAllStatesData(this.collectionName)
    }

    if (fetchedUsData[this.collectionName]) {
      if (fetchedUsData[this.collectionName] != "fetching") {
        this.usData = fetchedUsData[this.collectionName];
      }
    } else {
      this.props.fetchUsData(this.collectionName)
    }

  }

  componentWillReceiveProps(nextProps) {
    const { fetchedUsData } = this.props

    console.log("in component will receive props")
    console.log(fetchedUsData, nextProps.fetchedUsData)

    if (nextProps.fetchedAllStatesData[this.collectionName] && nextProps.fetchedAllStatesData[this.collectionName] != "fetching") {
      this.statesData = nextProps.fetchedAllStatesData[this.collectionName];
    } 

    if (nextProps.fetchedUsData[this.collectionName] && nextProps.fetchedUsData[this.collectionName] != "fetching") {
      this.usData = nextProps.fetchedUsData[this.collectionName];
    } 
  }

  changeFilter(newFilter, newChartSettings) {
    this.setState({
      currFilter: newFilter,
      currChartSettings: newChartSettings,
    })
  }

  changeAdditionalStateSelector(newAdditionalState) {
    console.log(newAdditionalState)

    this.setState({
      additionalStateComparison: newAdditionalState
    })
  }

  renderChart() {
    const {settings, data, currProfile, fetchedUsData} = this.props;
    const {currChartSettings, currFilter, additionalStateComparison} = this.state;

    let vizVariables;

    if (!data[currFilter.variable]) { return <h5 className="data-block__viz__no-data-placeholder">There is no data for {currProfile.name} in this category</h5>; }

    let combinedData = {
      profile: data[currFilter.variable],
      us: this.usData[currFilter.variable]
    }

    if (currProfile.type === "institution") {
      console.log(data)
      let instState = data.state

      if (!instState) { return <h5 className="data-block__viz__no-data-placeholder">There is no state listed for {currProfile.name} in this category</h5>; }

      let currStateData = this.statesData.filter(d => d.state === instState)[0]

      console.log(this.statesData, instState, currStateData)

      combinedData.state = currStateData[currFilter.variable];

      vizVariables = [
        {variable: "profile", displayName: currProfile.name, format: currFilter.format, color: currFilter.color },
        {variable: "state", displayName: stateIdMappings[instState], format: currFilter.format, color: colors.grey.medium },
        {variable: "us", displayName: "US", format: currFilter.format, color: colors.grey.dark }
      ]
    } else {
      if (additionalStateComparison && additionalStateComparison !== "None") {
        let additionalStateData = this.statesData.filter(d => d.state === additionalStateComparison)[0]

        combinedData.additional_state = additionalStateData[currFilter.variable];

        vizVariables = [
          {variable: "profile", displayName: currProfile.name, format: currFilter.format, color: currFilter.color },
          {variable: "additional_state", displayName: stateIdMappings[additionalStateComparison], format: currFilter.format, color: colors.grey.medium },
          {variable: "us", displayName: "US", format: currFilter.format, color: colors.grey.dark }
        ]
      } else {
        vizVariables = [
          {variable: "profile", displayName: currProfile.name, format: currFilter.format, color: currFilter.color },
          {variable: "us", displayName: "US", format: currFilter.format, color: colors.grey.dark }
        ]
      }
    }

    console.log(combinedData)

    let chartSettingsObject = {
      chart1Settings: {
        type: currChartSettings.type === "bar-chart" ? "grouped-bar-chart" : currChartSettings.type,
        variables: vizVariables
      }
    }

    return <SimpleChart settings={chartSettingsObject} data={combinedData} />
  }

  render() {
    const {settings, data, currProfile, title, hideComparePopup} = this.props;
    const {currChartSettings, currFilter, additionalStateComparison} = this.state;

    console.log(this.usData)

    return (
      <div className="compare-popup">
        <a className="compare-popup__close-icon" onClick={hideComparePopup}>
          <SvgIcon name='close' />
        </a>
        <div className="compare-popup__contents">
          <div className="compare-popup__filter-list-container">
            <ul className="compare-popup__filter-list">
              {this.chart1FilterList.map(d => {
                let classList = "compare-popup__filter";
                classList += d.variable === currFilter.variable ? " active" : ""
                return <li key={d.variable} className={classList} onClick={() => this.changeFilter(d, settings.chart1Settings)}>{d.displayName}</li>
              })}
              {this.chart2FilterList.map(d => {
                let classList = "compare-popup__filter";
                classList += d.variable === currFilter.variable ? " active" : ""
                return <li key={d.variable} className={classList} onClick={() => this.changeFilter(d, settings.chart2Settings)}>{d.displayName}</li>
              })}
            </ul>
          </div>
          <div className="compare-popup__chart-container">
            <h5 className="compare-popup__chart-title">{currFilter.displayName}</h5>
            <div className="compare-popup__chart" key={currFilter.variable + "_" + additionalStateComparison}>
              {this.usData && this.statesData && this.renderChart()}
            </div>
            {currProfile.type === "state" && 
              <div className="compare-popup__additional-state-selector">
                <label className="compare-popup__additional-state-selector__label">Add additional state to comparison: </label>
                <div className="compare-popup__additional-state-selector__select">
                  <select ref="selectRef" onChange={() => this.changeAdditionalStateSelector(this.refs["selectRef"].value)}>
                    <option key={"none"} value={null}>None</option>
                    {Object.keys(stateIdMappings).filter(d => d != data.state).map((stateId, i) => {
                      return (
                        <option key={stateId} value={stateId}>{stateIdMappings[stateId]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currProfile: state.currProfile,
    fetchedAllStatesData: state.fetchedAllStatesData,
    fetchedUsData: state.fetchedUsData
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    fetchAllStatesData: (collection) => {
      dispatch(fetchAllStatesData(collection))
    },
    fetchUsData: (collection) => {
      dispatch(fetchUsData(collection))
    },
    hideComparePopup: () => {
      dispatch(setComparePopupSettings(null))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePopup)

