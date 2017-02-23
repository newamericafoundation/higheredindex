import React from 'react';
import fetch from 'isomorphic-fetch';
var json2csv = require('json2csv');

const dbPath = process.env.NODE_ENV == 'production' ? 'https://febp-backend.herokuapp.com/api/data-download/' : 'http://localhost:3000/api/data-download/';

export default class DataDownload extends React.Component {
  downloadData(collection, type) {
    console.log("downloading data", collection, type);
    fetch(dbPath + collection + "/" + type)
      .then(response => { return response.json()})
      .then(json => {
        console.log("this is the json response")
        console.log(json);
        let fields = Object.keys(json[0]);

        console.log(fields);

        let csvString = json2csv({ data: json, fields: fields });

        console.log(csvString);
      })
  }
  render() {
    return (
    	<div className="data-download">
        <div className="data-download__section">
          <div className="data-download__section__label">
            <h5>States</h5>
          </div>
          <div className="data-download__section__content">
            <a className="data-download__link" onClick={() => this.downloadData("states", "grants")}>Grants</a>
            <a className="data-download__link" onClick={() => this.downloadData("states", "loans")}>Loans</a>
            <a className="data-download__link" onClick={() => this.downloadData("states", "schools")}>Schools</a>
            <a className="data-download__link" onClick={() => this.downloadData("states", "students")}>Students</a>
            <a className="data-download__link" onClick={() => this.downloadData("states", "outcomes")}>Outcomes</a>
          </div>
        </div>

        <div className="data-download__section">
          <div className="data-download__section__label">
            <h5>Institutions</h5>
          </div>
          <div className="data-download__section__content">
        		<a className="data-download__link" onClick={() => this.downloadData("institutions", "grants")}>Grants</a>
            <a className="data-download__link" onClick={() => this.downloadData("institutions", "loans")}>Loans</a>
            <a className="data-download__link" onClick={() => this.downloadData("institutions", "schools")}>Schools</a>
            <a className="data-download__link" onClick={() => this.downloadData("institutions", "students")}>Students</a>
            <a className="data-download__link" onClick={() => this.downloadData("institutions", "outcomes")}>Outcomes</a>
          </div>
        </div>
    	</div>
    )
  }
}