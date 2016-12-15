import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile } from '../actions'
import StPage from './StPage'
import NotFoundPage from './NotFoundPage';

import React from 'react';

class StPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedSts, st } = this.props

    if (fetchedSts[st]) {
      this.stData = fetchedSts[st]
      dispatch(changeCurrProfile(st, "state"))
    } else {
      dispatch(fetchProfile(st, "state"))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.st != this.props.st) {
      const { dispatch, fetchedSts, st } = nextProps
      console.log(fetchedSts);

      if (fetchedSts[st]) {
        this.stData = fetchedSts[st]
        dispatch(changeCurrProfile(st, "state"))
      } else {
        dispatch(fetchProfile(st, "state"))
      }
    }
  }

  render() {
    const { fetchedSts, st } = this.props
    this.stData = fetchedSts[st]

    if (this.stData && !this.stData.isFetching) {
      if (this.stData.data) {
        return <StPage stData={ this.stData.data } />
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
    st: ownProps.params.name,
    fetchedSts: state.fetchedSts || {}
  }
}


export default connect(mapStateToProps)(StPageContainer)