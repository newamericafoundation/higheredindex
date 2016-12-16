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
    const { dispatch, fetchedInsts, id } = this.props

    if (fetchedInsts[id]) {
      this.instData = fetchedInsts[id]
      dispatch(changeCurrProfile(id, this.instData.name, "institution"))
    } else {
      dispatch(fetchProfile(id, "institution"))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedInsts, id } = nextProps
      console.log(fetchedInsts);

      if (fetchedInsts[id]) {
        this.instData = fetchedInsts[id]
        dispatch(changeCurrProfile(id, this.instData.name, "institution"))
      } else {
        dispatch(fetchProfile(id, "institution"))
      }
    }
  }

  render() {
    const { fetchedInsts, id } = this.props
    this.instData = fetchedInsts[id]

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
    id: ownProps.params.id,
    fetchedInsts: state.fetchedInsts || {}
  }
}


export default connect(mapStateToProps)(InstPageContainer)