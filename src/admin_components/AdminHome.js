'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { indicatorVizSettings } from "../settings/indicatorVizSettings";
import { fetchProfileList, setDataFileUploadStatus, fetchDataInfo  } from '../actions';
const d3 = require("d3")

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchDataInfo} = this.props;

    fetchDataInfo()
  }

  render() {
    const { indicatorList, dataFileUploadStatus, dataInfo } = this.props;

    return (
      <div className="admin__home">
        <h1 className="admin__home__title">Admin Home</h1>
        <div className="admin__home__section">
          <h5 className="admin__home__heading">Data Upload</h5>
          <Link to={'/admin/data-upload/'}>
            <h5 className="admin__home__main-link">Upload New Data File</h5>
          </Link>
          { dataInfo && dataInfo != "fetching" && dataInfo.length > 0 &&
            <ul className="admin__home__data-info-container">
              {dataInfo.map((d, i) => {
                return (
                  <li key={i} className="admin__home__data-info">
                    <span className="admin__home__data-info__title">{d.collection}:</span>
                    {d.last_updated && <span className="admin__home__data-info__value">{d3.timeFormat("%B %d, %Y - %I:%M %p")(new Date(d.last_updated))}</span>}
                  </li>
                )
              })}
            </ul>
          }
        </div>
        <hr></hr>
        <div className="admin__home__section">
          <h5 className="admin__home__heading">Edit Indicators</h5>
          <ul className="admin__home__sub-link-list">
            {Object.keys(indicatorVizSettings).map((key) => {
              return (
                <li key={key} className="admin__home__sub-link-list-item">
                  <Link to={'/admin/indicators/' + key}>
                    <h5 className="admin__home__sub-link">{ key }</h5>
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
    dataFileUploadStatus: state.dataFileUploadStatus,
    dataInfo: state.dataInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchDataInfo: () => {
        dispatch(fetchDataInfo());
      },
      resetFileUploadStatus: () => {
        dispatch(setDataFileUploadStatus("inactive"));
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)