'use strict';

import React from 'react';
import Dropzone from 'react-dropzone';


const Papa = require("papaparse");

import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { uploadDataFile, setDataFileUploadStatus } from '../actions';
import { Form, Select } from 'react-form';
import AdminStatusBar from './AdminStatusBar';



class AdminDataUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.dataType);
    this.state = { 
      file: null
    }
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      file: files[0]
    });
  }

  onSubmit(type, granularity) {
    const {uploadFile} = this.props;

    var reader = new FileReader();
    reader.onload = function(e){
      let response = e.target.result;
      
      var data = Papa.parse(response, {
        header: true,
        dynamicTyping: true
      });

      console.log(data);

      uploadFile(granularity + "_" + type, data.data);

    };
    reader.readAsText(this.state.file);
    
  }

  componentWillUnmount() {
    this.props.resetFileUploadStatus();
  }

  render() {
    const { fileUploadStatus } = this.props;
    const { file } = this.state;

    let submitButtonClass = "admin__form__button";
    submitButtonClass += this.state.file ? "" : " disabled";

    let dropConfirmationClass = "admin__data-upload__confirmation";
    dropConfirmationClass += this.state.file ? "" : " disabled";

    return (
      <div>
        <AdminStatusBar status={fileUploadStatus} />
        <div className="admin__form">
          <h1 className="admin__form__title">Upload Data File</h1>
          <Link to={'/admin/'}>
            <h5 className="admin__form__main-link">Return to Admin Home</h5>
          </Link>
          <Form
            onSubmit={({type, granularity}) => {
              
              if (!type && !granularity) {
                alert("Please select a data level and type");
              } else if (!type) {
                alert("Please select a data type");
              } else if (!granularity) {
                alert("Please select a data level");
              } else {
                console.log('Success!')
                this.onSubmit(type, granularity);
              }
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <div className="admin__form__field">
                    <h5 className="admin__form__field-label">Data Level</h5>
                    <Select
                      field='granularity'
                      options={[{
                        label: 'States',
                        value: 'states'
                      }, {
                        label: 'Institutions',
                        value: 'inst'
                      }]} />
                  </div>
                  <div className="admin__form__field">
                    <h5 className="admin__form__field-label">Data Type</h5>
                    <Select
                      field='type'
                      options={[{
                        label: 'Grants',
                        value: 'grants'
                      }, {
                        label: 'Loans',
                        value: 'loans'
                      }, {
                        label: 'Outcomes',
                        value: 'outcomes'
                      }, {
                        label: 'Schools',
                        value: 'schools'
                      }, {
                        label: 'Students',
                        value: 'students'
                      }]} />
                  </div>
                  <div className="admin__form__field">
                    <section>
                      <h5 className="admin__form__field-label">File Upload</h5>
                      <div className="dropzone admin__form__file-upload-conatiner">
                        <Dropzone className="dropzone admin__form__file-upload" onDrop={this.onDrop.bind(this)} multiple={false}>
                          <p>Drop CSV data file here, or click to select file to upload.</p>
                        </Dropzone>
                      </div>
                      {file &&
                        <aside>
                          <h5 className="admin__form__file-upload__status-heading">File to Upload</h5>
                          <p className="admin__form__file-upload__status">{file.name} - {file.size} bytes</p>
                        </aside>
                      }
                    </section>
                  </div>
                  <button type='submit' className={submitButtonClass}>Submit</button>
                </form>
              )
            }}
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fileUploadStatus: state.dataFileUploadStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      uploadFile: (collection, file) => {
        dispatch(uploadDataFile(collection, file));
      },
      resetFileUploadStatus: () => {
        dispatch(setDataFileUploadStatus("inactive"));
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminDataUpload)