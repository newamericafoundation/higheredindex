import React from 'react';
import { connect } from 'react-redux';
import { downloadDataFile } from '../actions';
import SvgIcon from './SvgIcon'


const downloadFile = (collection) => {
   window.open('http://localhost:3000/api/download_data/' + collection);
}

const DownloadHomePage = () => {

  return (
    <div className="download-home-page">
      <div className="download-home-page__overlay"></div>
      <div className="download-home-page__content">
        <h5 className="download-home-page__title">Download Data</h5>
        <p className="download-home-page__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor at elit sed sodales. Maecenas volutpat diam ac enim tempus, nec fringilla purus interdum. Duis ut posuere sem. Curabitur lacinia neque rutrum augue dapibus fermentum. Phasellus ligula turpis, sagittis ut lacinia vel, consequat a nibh. In sodales varius consectetur. Praesent luctus eleifend quam in euismod. Ut gravida egestas feugiat. Morbi vestibulum euismod tincidunt. Proin consectetur ante at ipsum venenatis, sit amet sodales nunc accumsan. Sed nec libero a justo fermentum ornare vitae a leo. Ut blandit luctus ligula, porttitor luctus nisi cursus ac.</p>
        <div className="download-home-page__section-container">
          <div className="download-home-page__section">
            <div className="download-home-page__section__icon">
              <SvgIcon name='map-marker' />
            </div>
         	  <h5 className="download-home-page__section__title">States</h5>
            <ul className="download-home-page__section__list">
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Grants</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("states_grants"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>

              </li>
              <li className="download-home-page__section__item"> 
                <h5 className="download-home-page__section__item__label">Loans</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("states_loans"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Outcomes</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("states_outcomes"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Schools</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("states_schools"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Students</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("states_students"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
            </ul>
          </div>
          <div className="download-home-page__section">
            <div className="download-home-page__section__icon">
              <SvgIcon name='institution' />
            </div>
            <h5 className="download-home-page__section__title">Institutions</h5>
            <ul className="download-home-page__section__list">
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Grants</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("inst_grants"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Loans</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("isnt_loans"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Outcomes</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("isnt_outcomes"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Schools</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("isnt_schools"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
              <li className="download-home-page__section__item">
                <h5 className="download-home-page__section__item__label">Students</h5>
                <h5 className="download-home-page__section__item__text" onClick={() => { return downloadFile("isnt_students"); }}>Data</h5>
                <h5 className="download-home-page__section__item__text">Codebook</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadHomePage;