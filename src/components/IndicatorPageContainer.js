import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile, fetchAllStatesData, fetchUsData } from '../actions'
import IndicatorPage from './IndicatorPage'
import NotFoundPage from './NotFoundPage';
import LoadingIcon from './LoadingIcon';
import { indicatorTrendsSettings } from '../settings/indicatorTrendsSettings';

import React from 'react';

class IndicatorPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedIndicatorSettings, fetchedAllStatesData, fetchedUsData, id } = this.props

    this.collection = indicatorTrendsSettings[id].collection

    if (fetchedIndicatorSettings[id]) {
      this.indicatorSettings = fetchedIndicatorSettings[id].data;
      dispatch(changeCurrProfile(id, this.indicatorSettings.name, "indicator"))
    } else {
      dispatch(fetchProfile(id, "indicator"))
    }

    if (fetchedAllStatesData[this.collection]) {
      this.statesData = fetchedAllStatesData[this.collection];
    } else {
      dispatch(fetchAllStatesData(this.collection))
    }

    if (fetchedUsData[this.collection]) {
      this.usData = fetchedUsData[this.collection];
    } else {
      dispatch(fetchUsData(this.collection))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedIndicatorSettings, fetchedAllStatesData, fetchedUsData, id } = nextProps

      console.log(this)

      this.collection = indicatorTrendsSettings[id].collection

      if (fetchedIndicatorSettings[id]) {
        this.indicatorSettings = fetchedIndicatorSettings[id]
        dispatch(changeCurrProfile(id, this.indicatorSettings.name, "indicator"))
      } else {
        dispatch(fetchProfile(id, "indicator"))
      }

      if (fetchedAllStatesData[this.collection]) {
        this.statesData = fetchedAllStatesData[this.collection];
      } else {
        dispatch(fetchAllStatesData(this.collection))
      }

      if (fetchedUsData[this.collection]) {
        this.usData = fetchedUsData[this.collection];
      } else {
        dispatch(fetchUsData(this.collection))
      }
    }
  }

  render() {
    const { fetchedIndicatorSettings, fetchedAllStatesData, fetchedUsData, id } = this.props
    this.indicatorSettings = fetchedIndicatorSettings[id]
    this.statesData = fetchedAllStatesData[this.collection];
    this.usData = fetchedUsData[this.collection];

    console.log(fetchedIndicatorSettings)
    console.log(fetchedAllStatesData)

    if (this.indicatorSettings && !this.indicatorSettings.isFetching && this.statesData && !this.statesData.isFetching && this.usData && !this.usData.isFetching) {
      if (this.indicatorSettings.data) {
        console.log("rendering indicator page")
        return <IndicatorPage indicatorSettings={ this.indicatorSettings.data } statesData={this.statesData} usData={this.usData}/>
      }
      else {
        return <NotFoundPage/>
      }
    } 
    
    return <LoadingIcon />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    fetchedIndicatorSettings: state.fetchedIndicatorSettings || {},
    fetchedAllStatesData: state.fetchedAllStatesData || {},
    fetchedUsData: state.fetchedUsData || {},
  }
}


export default connect(mapStateToProps)(IndicatorPageContainer)