import React from 'react';
import { connect } from 'react-redux';
import SvgIcon from './SvgIcon'
import Footer from './Footer';
import { fetchDataInfo } from '../actions'
import sectionSettings from '../settings/sectionSettings.js';
let d3 = require("d3")


const downloadFile = (collection) => {
   window.open('http://localhost:3000/api/download_data/' + collection);
}

class DownloadHomePage extends React.Component {
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
          console.log(retVal)
        }
        return;
      }
    })
    return retVal;
  }

  render() {
    const { dataInfo } = this.props;

    return (
      <div className="download-home-page">
        <div className="download-home-page__overlay"></div>
        <div className="download-home-page__content">
          <h5 className="download-home-page__title">Download Data</h5>
          <p className="download-home-page__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor at elit sed sodales. Maecenas volutpat diam ac enim tempus, nec fringilla purus interdum. Duis ut posuere sem. Curabitur lacinia neque rutrum augue dapibus fermentum. Phasellus ligula turpis, sagittis ut lacinia vel, consequat a nibh. In sodales varius consectetur. Praesent luctus eleifend quam in euismod. Ut gravida egestas feugiat. Morbi vestibulum euismod tincidunt. Proin consectetur ante at ipsum venenatis, sit amet sodales nunc accumsan. Sed nec libero a justo fermentum ornare vitae a leo. Ut blandit luctus ligula, porttitor luctus nisi cursus ac.</p>
          <div className="download-home-page__section-container">
            <div className="download-home-page__section">
              <div className="download-home-page__section__icon">
                <SvgIcon name='state' />
              </div>
           	  <h5 className="download-home-page__section__title">States</h5>
              <ul className="download-home-page__section__list">
                  {sectionSettings.states.map((section) => {
                    let lastUpdated = null;
                    if (dataInfo && dataInfo != "fetching") {
                      lastUpdated = this.getLastUpdated(section.collection);
                    }
                    return (
                      <li className="download-home-page__section__item" key={section.name}>
                        <h5 className="download-home-page__section__item__label">{section.name}</h5>
                        { lastUpdated && <h5 className="download-home-page__section__item__last-updated">{"Last Updated: " + lastUpdated}</h5> }
                        <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile(section.collection); }}>Data</h5>
                        <h5 className="download-home-page__section__item__text">Codebook</h5>
                      
                      </li>
                    )
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
                        <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile(section.collection); }}>Data</h5>
                        <h5 className="download-home-page__section__item__text">Codebook</h5>
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