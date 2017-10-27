import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { Link } from 'react-router';
const d3 = require("d3")

import SvgIcon from '../components/SvgIcon'
import Footer from '../components/Footer';
import { fetchDataInfo } from '../../actions'
import sectionSettings from '../../settings/sectionSettings.js';

const downloadDataFile = (collection) => {
   window.open('https://febp-backend.herokuapp.com/api/download_data/' + collection);
}

const downloadCodebookFile = (type) => {
   window.open('https://febp-backend.herokuapp.com/api/download_codebook/' + type);
}

class DownloadHomePage extends React.Component {
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
          <title>Higher Ed Index | Download Data</title>
          <meta name="description" content="New America Higher Ed Index" />
          <meta name="twitter:card" content="New America Higher Ed Index" />
          <meta name="twitter:title" content="Higher Ed Index: Download Data" />
          <meta name="twitter:description" content="New America Higher Ed Index"/>
          <meta property="og:title" content="Higher Ed Index: Download Data" />
          <meta property="og:description" content="New America Higher Ed Index" />
        </Helmet>
        <div className="simple-page__overlay"></div>
        <div className="simple-page__content">
          <h5 className="simple-page__title">Download Data</h5>
          <p className="download-home-page__description">Data used on this site are available for download. Institution files each contains header information for each school, including the school name and location, sector, and unique identifiers, and other pertinent institutional characteristics. The schools file contains information on graduation and retention rates, transfer rates, cost of attendance, endowments, share of students receiving aid and the average amount of aid received, as well as other miscellaneous data presented in that section. Student files contain information on total enrollment, enrollment by student level and attendance intensity, and enrollment breakdowns by race and nontraditional student factors. Loans files contain information on loan disbursements and recipients for each type of federal loan, repayment rates, and cohort default rates. Grants file contain information on recipients and disbursements of federal grant aid, including Pell grants,  and the share of students receiving Pell and other types of aid. Outcomes files contain information on post-graduation earnings, debt levels.</p>
          <p className="download-home-page__description">State, sector, and national-level data are each based on aggregations of school level data, based on the geographic location of the headquarters of the school. Codebooks include variable names, source materials, and definitions, as well as a detailed explanation of how institution level data were aggregated to the state level. For each data file, variable names are followed by an underscore and the year to which the data refers; for the codebooks, a star is used in place of the year.</p>
          <p className="download-home-page__description">For API documentation <Link to={'/api-documentation'}>click here</Link></p>
          <div className="download-home-page__section-container">
            <div className="download-home-page__section">
              <div className="download-home-page__section__icon">
                <SvgIcon name='state' />
              </div>
           	  <h5 className="download-home-page__section__title">States</h5>
              <ul className="download-home-page__section__list">
                  {sectionSettings.states.map((section) => {
                    if (section.collection == "states_schools") {
                      return (
                         <li className="download-home-page__section__item" key={section.name}>
                          <h5 className="download-home-page__section__item__label">{section.name}</h5>
                          <h5 className="download-home-page__section__item__text" onClick={() => { return downloadCodebookFile(section.dataDivision); }}>Codebook</h5>
                          <ul className="download-home-page__section__sub-list">
                            {section.subSections.map((subsection) => {
                              let lastUpdated = null;
                              if (dataInfo && dataInfo != "fetching") {
                                lastUpdated = this.getLastUpdated(subsection.collection);
                              }
                              return (
                                <li className="download-home-page__section__sub-list__item" key={subsection.name}>
                                  <h5 className="download-home-page__section__sub-list__item__label">{subsection.name}</h5>
                                  { lastUpdated && <h5 className="download-home-page__section__sub-list__item__last-updated">{"Last Updated: " + lastUpdated}</h5> }
                                  <h5 className="download-home-page__section__sub-list__item__text" onClick={() => { return downloadDataFile(subsection.collection); }}>Data</h5>
                                </li>
                              )
                            })}
                          </ul>
                        </li>
                      )
                    } else {
                      let lastUpdated = null;
                      if (dataInfo && dataInfo != "fetching") {
                        lastUpdated = this.getLastUpdated(section.collection);
                      }
                      return (
                        <li className="download-home-page__section__item" key={section.name}>
                          <h5 className="download-home-page__section__item__label">{section.name}</h5>
                          { lastUpdated && <h5 className="download-home-page__section__item__last-updated">{"Last Updated: " + lastUpdated}</h5> }
                          <h5 className="download-home-page__section__item__text" onClick={() => { return downloadDataFile(section.collection); }}>Data</h5>
                          <h5 className="download-home-page__section__item__text" onClick={() => { return downloadCodebookFile(section.dataDivision); }}>Codebook</h5>
                        </li>
                      )
                    }
                  })}
              </ul>
            </div>
            <div className="download-home-page__section">
              <div className="download-home-page__section__icon">
                <SvgIcon name='institution' />
              </div>
              <h5 className="download-home-page__section__title">Institutions</h5>
              <ul className="download-home-page__section__list">
                  {sectionSettings.institutions.map((section) => {
                    let lastUpdated = null;
                    if (dataInfo && dataInfo != "fetching") {
                      lastUpdated = this.getLastUpdated(section.collection);
                    }
                    return (
                      <li className="download-home-page__section__item" key={section.name}>
                        <h5 className="download-home-page__section__item__label">{section.name}</h5>
                        { lastUpdated && <h5 className="download-home-page__section__item__last-updated">{"Last Updated: " + lastUpdated}</h5> }
                        <h5 className="download-home-page__section__item__text" onClick={() => { return downloadDataFile(section.collection); }}>Data</h5>
                        <h5 className="download-home-page__section__item__text" onClick={() => { return downloadCodebookFile(section.dataDivision); }}>Codebook</h5>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadHomePage)