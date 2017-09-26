import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile, fetchDataInfo } from '../actions'
import StPage from './StPage'
import NotFoundPage from './NotFoundPage';
import LoadingIcon from './LoadingIcon';

import React from 'react';

class StPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, fetchedSts, id, dataInfo } = this.props

    if (fetchedSts[id]) {
      console.log(fetchedSts[id])
      this.stData = fetchedSts[id];
      dispatch(changeCurrProfile(id, this.stData.data.name, "state"))
    } else {
      dispatch(fetchProfile(id, "state"))
    }

    if (!dataInfo) {
      console.log("fetching data info")
      dispatch(fetchDataInfo())
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
    const { fetchedSts, id, dataInfo } = this.props
    this.stData = fetchedSts[id]

    if (this.stData && !this.stData.isFetching && dataInfo != "fetching") {
      if (this.stData.data) {
        return <StPage stData={ this.stData.data } />
      }
      else {
        return <NotFoundPage/>
      }
    } 
    
    return <LoadingIcon />
  }
}



const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.params.id)
  return {
    id: ownProps.params.id,
    fetchedSts: state.fetchedSts || {},
    dataInfo: state.dataInfo
  }
}


export default connect(mapStateToProps)(StPageContainer)