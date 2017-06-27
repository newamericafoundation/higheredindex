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

  componentWillUnmount() {
    if (this.props.dataFileUploadStatus === 200) {
      this.props.resetFileUploadStatus();
    }
  }

  render() {
    const { indicatorList, dataFileUploadStatus } = this.props;
    return (
      <div className="admin-home">
        {dataFileUploadStatus === 200 && 
          <h5 className="admin-home__status-update">File Uploaded Successfully</h5>}

        <Link to={'/admin/data-upload/'}>
          <h5 className="admin-home__option__text">Upload New Data File</h5>
        </Link>
        <h5 className="admin-home__option-heading">Indicators</h5>
        <Link to={'/admin/indicators/new/'}>
          <h5 className="admin-home__option__text">Create New Indicator</h5>
        </Link>
        <ul className="admin-home__options-list">
          {indicatorList.map((d, i) => {
            return (
              <li className="admin-home__option">
                <Link to={'/admin/indicators/' + d.path}>
                  <h5 className="admin-home__option__text">{ d.name }</h5>
                </Link>
              </li>
            )
          })}
        </ul>
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