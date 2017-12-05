import React from 'react';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
const d3 = require("d3")

import SvgIcon from '../components/SvgIcon'
import Footer from '../components/Footer';
import { fetchDataInfo } from '../../actions'
import apiDocsSettings from '../../settings/apiDocsSettings.js';

const downloadDataFile = (collection) => {
   window.open('http://higheredindex-backend.newamerica.org/api/download_data/' + collection);
}

const downloadCodebookFile = (type) => {
   window.open('http://higheredindex-backend.newamerica.org/api/download_codebook/' + type);
}

class ApiDocsPage extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const { dataInfo, fetchLastUpdated } = this.props

    if (!dataInfo) {
      fetchLastUpdated();
    }
  }

  getLastUpdated(collection) {
    const { dataInfo } = this.props;
    let retVal = null;
    dataInfo.forEach((d) => {
      if (d.collection === collection) {
        if (d.last_updated) {
          retVal = d3.timeFormat("%B %d, %Y - %I:%M %p")(new Date(d.last_updated));
        }
        return;
      }
    })
    return retVal;
  }

  render() {
    const { dataInfo } = this.props;

    return (
      <div className="simple-page download-home-page">
        <Helmet>
          <title>Higher Ed Index | API Documentation</title>
        </Helmet>
        <div className="simple-page__overlay"></div>
        <div className="simple-page__content">
          <h5 className="simple-page__title">API Documentation</h5>
          <p className="download-home-page__description">Endpoint URL: <strong>http://higheredindex-backend.newamerica.org/api/</strong></p>
          <p className="download-home-page__description">Data used on this site are available via the API endpoints listed below. Institution files each contain header information for each school, including the school name and location, sector, and unique identifiers, and other pertinent institutional characteristics. The schools file contains information on graduation and retention rates, transfer rates, cost of attendance, endowments, share of students receiving aid and the average amount of aid received, as well as other miscellaneous data presented in that section. Student files contain information on total enrollment, enrollment by student level and attendance intensity, and enrollment breakdowns by race and nontraditional student factors. Loans files contain information on loan disbursements and recipients for each type of federal loan, repayment rates, and cohort default rates. Grants file contain information on recipients and disbursements of federal grant aid, including Pell grants,  and the share of students receiving Pell and other types of aid. Outcomes files contain information on post-graduation earnings, debt levels.</p>
          <p className="download-home-page__description">State, sector, and national-level data are each based on aggregations of school level data, based on the geographic location of the headquarters of the school. Codebooks include variable names, source materials, and definitions, as well as a detailed explanation of how institution level data were aggregated to the state level.</p>
          <p className="download-home-page__description">Collection options: 'states_grants', 'states_loans', 'states_outcomes', 'states_students', 'states_schools_all', 'states_schools_public4', 'states_schools_public2', 'states_schools_nonprofit', 'states_schools_forprofit', 'inst_grants', 'inst_loans', 'inst_outcomes', 'inst_students', 'inst_schools'</p>
          <table className="api-docs-page__table">
            <tr>
              <th>Method</th>
              <th>Endpoint Path</th>
              <th>Parameters</th>
              <th>Description</th>
            </tr>
            { apiDocsSettings.map((settingsObject) => {
              return (
                <tr className="api-docs-page__table__row">
                  <td className="api-docs-page__table__cell">{settingsObject.method}</td>
                  <td className="api-docs-page__table__cell">{settingsObject.path}</td>
                  <td className="api-docs-page__table__cell">{settingsObject.parameters}</td>
                  <td className="api-docs-page__table__cell">{settingsObject.description}</td>
                </tr>
              )
            })}
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dataInfo: state.dataInfo
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    fetchLastUpdated: () => {
      dispatch(fetchDataInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiDocsPage)