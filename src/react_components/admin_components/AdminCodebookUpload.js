import React from 'react';
import Dropzone from 'react-dropzone';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Form, Select } from 'react-form';
const Papa = require("papaparse");

import { uploadCodebookFile, setDataFileUploadStatus } from '../../actions';
import AdminStatusBar from './AdminStatusBar';
import { checkForVariables} from '../../helper_functions/process_uploaded_data.js';

class AdminCodebookUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: null,
      fileData: null,
      type: null,
      variableCheck: null
    }
  }

  onDrop(files) {
    const { type } = this.state;

    let reader = new FileReader();
    reader.onload = (e) => {
      let response = e.target.result;
      
      let data = Papa.parse(response, {
        header: true,
        dynamicTyping: true
      });

      let variableCheck = checkForVariables(data.data, type);
   
      this.setState({
        file: files[0],
        fileData: data.data,
        variableCheck: variableCheck
      })
    } 

    reader.readAsText(files[0]);
  }

  onChange({type}) {
    this.setState({
      type: type
    })
  }

  onSubmit(type) {
    const {uploadFile} = this.props;

    if (this.state.fileData) {
      uploadFile(type, this.state.fileData);
    }
  }

  componentWillUnmount() {
    this.props.resetFileUploadStatus();
  }

  render() {
    const { fileUploadStatus } = this.props;
    const { file, variableCheck } = this.state;

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
            onSubmit={({type}) => {
              if (!type) {
                alert("Please select a type");
              } else {
                console.log('Success!')
                this.onSubmit(type);
              }
            }}

            onChange={(internalState) => {
              this.onChange(internalState.values);
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <div className="admin__form__field">
                    <h5 className="admin__form__field-label">Type</h5>
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
      uploadFile: (type, file) => {
        dispatch(uploadCodebookFile(type, file));
      },
      resetFileUploadStatus: () => {
        dispatch(setDataFileUploadStatus("inactive"));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCodebookUpload)