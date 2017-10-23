import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile, fetchDataInfo } from '../actions'
import InstPage from './InstPage'
import NotFoundPage from './NotFoundPage';
import LoadingIcon from './LoadingIcon';

import React from 'react';

class InstPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedInsts, id, dataInfo } = this.props

    if (fetchedInsts[id]) {
      this.instData = fetchedInsts[id];
      dispatch(changeCurrProfile(id, this.instData.data.name, "institution"))
    } else {
      dispatch(fetchProfile(id, "institution"))
    }

    if (!dataInfo) {
      dispatch(fetchDataInfo)
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    console.log("in component will receive props")
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedInsts, id } = nextProps

      console.log("different id")

      if (fetchedInsts[id]) {
        console.log("already fetched")
        this.instData = fetchedInsts[id]
        console.log(this.instData, fetchedInsts)
        dispatch(changeCurrProfile(id, this.instData.data.name, "institution"))
      } else {
        dispatch(fetchProfile(id, "institution"))
      }
    }
  }

  render() {
    const { fetchedInsts, id, dataInfo } = this.props
    this.instData = fetchedInsts[id]

    console.log("in container render", this.instData, id)

    if (this.instData && !this.instData.isFetching && dataInfo != "fetching") {
      if (this.instData.data) {
        return <InstPage instData={ this.instData.data } />
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
    fetchedInsts: state.fetchedInsts || {},
    dataInfo: state.dataInfo
  }
}


export default connect(mapStateToProps)(InstPageContainer)