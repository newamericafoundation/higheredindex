import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfile, setIndicatorUpdateStatus } from '../actions';
import AdminIndicatorEditorForm from './AdminIndicatorEditorForm';
import  AdminStatusBar  from './AdminStatusBar';

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
    const { fetchedIndicators, id, updateStatus } = this.props
    this.indicatorData = fetchedIndicators[id]

    if (this.indicatorData && !this.indicatorData.isFetching) {
      if (this.indicatorData.data) {
        return (
          <div>
            <Link to={'/admin/'}>
              <h5 className="admin-home__option__text">Return to Admin Home</h5>
            </Link>
            <AdminStatusBar status={updateStatus} />
            <AdminIndicatorEditorForm item={ this.indicatorData.data } />

          </div>
        )
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
    fetchedIndicators: state.fetchedIndicators || {},
    updateStatus: state.indicatorUpdateStatus
  }
}


export default connect(mapStateToProps)(AdminIndicatorEditor)