import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile } from '../actions'
import IndicatorPage from './IndicatorPage'
import NotFoundPage from './NotFoundPage';

import React from 'react';

class IndicatorPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedIndicators, id } = this.props

    console.log(id)

    if (fetchedIndicators[id]) {
      this.indicatorData = fetchedIndicators[id].data;
      dispatch(changeCurrProfile(id, this.indicatorData.name, "indicator"))
    } else {
      dispatch(fetchProfile(id, "indicator"))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedIndicators, id } = nextProps

      if (fetchedIndicators[id]) {
        this.indicatorData = fetchedIndicators[id]
        dispatch(changeCurrProfile(id, this.indicatorData.name, "indicator"))
      } else {
        dispatch(fetchProfile(id, "indicator"))
      }
    }
  }

  render() {
    const { fetchedIndicators, id } = this.props
    this.indicatorData = fetchedIndicators[id]

    console.log(fetchedIndicators)
    console.log(this.indicatorData)

    if (this.indicatorData && !this.indicatorData.isFetching) {
      if (this.indicatorData.data) {
        console.log("rendering indicator page")
        return <IndicatorPage indicatorData={ this.indicatorData.data } />
      }
      else {
        return <NotFoundPage/>
      }
    } 
    
    return <h1> Loading ... </h1>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    fetchedIndicators: state.fetchedIndicators || {}
  }
}


export default connect(mapStateToProps)(IndicatorPageContainer)