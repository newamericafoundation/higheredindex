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
    const { dispatch, fetchedIndicatorSettings, id } = this.props

    if (id != "new") {
      dispatch(fetchProfile(id, "indicator"))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setIndicatorUpdateStatus("inactive"))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, fetchedIndicatorSettings, id } = nextProps

      if (id != "new") {
        dispatch(fetchProfile(id, "indicator"))
      }
    }
  }

  render() {
    const { fetchedIndicatorSettings, id, updateStatus } = this.props
    this.indicatorData = fetchedIndicatorSettings[id]

    if (this.indicatorData && !this.indicatorData.isFetching) {
      
      return (
        <div>
          <AdminStatusBar status={updateStatus} />
          <div className="admin__form">
            <h1 className="admin__form__title">Edit Indicator: {this.props.id}</h1>
            <Link to={'/admin/'}>
              <h5 className="admin__form__main-link">Return to Admin Home</h5>
            </Link>
            
            <AdminIndicatorEditorForm id={this.props.id} item={ this.indicatorData.data } action="update" />

          </div>
        </div>
      )
      
    }
    
    return <h1> Loading ... </h1>
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    fetchedIndicatorSettings: state.fetchedIndicatorSettings || {},
    updateStatus: state.indicatorUpdateStatus
  }
}


export default connect(mapStateToProps)(AdminIndicatorEditor)