import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile } from '../actions'
import InstPage from './InstPage'
import NotFoundPage from './NotFoundPage';

import React from 'react';

class InstPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedInsts, inst } = this.props

    if (fetchedInsts[inst]) {
      this.instData = fetchedInsts[inst]
      dispatch(changeCurrProfile(inst, "institution"))
    } else {
      dispatch(fetchProfile(inst, "institution"))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inst != this.props.inst) {
      const { dispatch, fetchedInsts, inst } = nextProps
      console.log(fetchedInsts);

      if (fetchedInsts[inst]) {
        this.instData = fetchedInsts[inst]
        dispatch(changeCurrProfile(inst, "institution"))
      } else {
        dispatch(fetchProfile(inst, "institution"))
      }
    }
  }

  render() {
    const { fetchedInsts, inst } = this.props
    this.instData = fetchedInsts[inst]

    if (this.instData && !this.instData.isFetching) {
      if (this.instData.data) {
        return <InstPage instData={ this.instData.data } />
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
    inst: ownProps.params.name,
    fetchedInsts: state.fetchedInsts || {}
  }
}


export default connect(mapStateToProps)(InstPageContainer)