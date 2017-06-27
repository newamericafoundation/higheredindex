'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfileList, setDataFileUploadStatus } from '../actions';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { indicatorList, fetchProfileList} = this.props;

    fetchProfileList("indicator")
  }

  render() {
    const { indicatorList, dataFileUploadStatus } = this.props;
    return (
      <div className="admin__home">
        <h1 className="admin__home__title">Admin Home</h1>
        <div className="admin__home__section">
          <h5 className="admin__home__heading">Data Upload</h5>
          <Link to={'/admin/data-upload/'}>
            <h5 className="admin__home__main-link">Upload New Data File</h5>
          </Link>
        </div>
        <hr></hr>
        <div className="admin__home__section">
          <h5 className="admin__home__heading">Edit Indicators</h5>
          <Link to={'/admin/indicators/new/'}>
            <h5 className="admin__home__main-link">Create New Indicator</h5>
          </Link>
          <ul className="admin__home__sub-link-list">
            {indicatorList.map((d, i) => {
              return (
                <li className="admin__home__sub-link-list-item">
                  <Link to={'/admin/indicators/' + d.path}>
                    <h5 className="admin__home__sub-link">{ d.name }</h5>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  console.log(state);
  return {
    indicatorList: state.indicatorList,
    dataFileUploadStatus: state.dataFileUploadStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchProfileList: (type) => {
        dispatch(fetchProfileList(type));
      },
      resetFileUploadStatus: () => {
        dispatch(setDataFileUploadStatus("inactive"));
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)