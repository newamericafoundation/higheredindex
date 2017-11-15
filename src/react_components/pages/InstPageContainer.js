import React from 'react';
import { connect } from 'react-redux'

import { changeCurrProfile, fetchProfile, fetchDataInfo } from '../../actions'
import InstPage from './InstPage'
import NotFoundPage from './NotFoundPage';
import LoadingIcon from '../components/LoadingIcon';

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
      dispatch(fetchDataInfo())
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedInsts, id } = nextProps

      if (fetchedInsts[id]) {
        this.instData = fetchedInsts[id]
        dispatch(changeCurrProfile(id, this.instData.data.name, "institution"))
      } else {
        dispatch(fetchProfile(id, "institution"))
      }
    }
  }

  render() {
    const { fetchedInsts, id, dataInfo } = this.props
    this.instData = fetchedInsts[id]

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