import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfile, setIndicatorUpdateStatus } from '../actions';
import AdminForm from './AdminForm';

class AdminIndicatorEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedIndicators, id } = this.props

    if (fetchedIndicators[id]) {
      this.indicatorData = fetchedIndicators[id];
      // dispatch(changeCurrProfile(id, this.indicatorData.name, "indicator"))
    } else {
      dispatch(fetchProfile(id, "indicator"))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setIndicatorUpdateStatus("inactive"))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedIndicators, id } = nextProps

      if (fetchedIndicators[id]) {
        this.indicatorData = fetchedIndicators[id]
        // dispatch(changeCurrProfile(id, this.indicatorData.name, "indicator"))
      } else {
        dispatch(fetchProfile(id, "indicator"))
      }
    }
  }

  render() {
    const { fetchedIndicators, id } = this.props
    this.indicatorData = fetchedIndicators[id]

    if (this.indicatorData && !this.indicatorData.isFetching) {
      if (this.indicatorData.data) {
        return <AdminForm item={ this.indicatorData.data } />
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


export default connect(mapStateToProps)(AdminIndicatorEditor)