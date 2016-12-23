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
    const { dispatch, fetchedSts, id } = this.props

    if (fetchedSts[id]) {
      this.stData = fetchedSts[id];
      dispatch(changeCurrProfile(id, this.stData.data.name, "state"))
    } else {
      dispatch(fetchProfile(id, "state"))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedSts, id } = nextProps;

      if (fetchedSts[id]) {
        this.stData = fetchedSts[id]
        dispatch(changeCurrProfile(id, this.stData.name, "state"))
      } else {
        dispatch(fetchProfile(id, "state"))
      }
    }
  }

  render() {
    const { fetchedSts, id } = this.props
    this.stData = fetchedSts[id]

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
    id: ownProps.params.id,
    fetchedSts: state.fetchedSts || {}
  }
}


export default connect(mapStateToProps)(StPageContainer)