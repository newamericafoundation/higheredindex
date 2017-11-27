import React from 'react';
import Dropzone from 'react-dropzone';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Form, Select } from 'react-form';
const Papa = require("papaparse");

import { uploadDataFile, setDataFileUploadStatus } from '../../actions';
import AdminStatusBar from './AdminStatusBar';
import { checkForVariables} from '../../helper_functions/process_uploaded_data.js';

class AdminDataUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      file: null,
      fileData: null,
      type: null,
      granularity: null,
      sector: null,
      variableCheck: null
    }
  }

  onDrop(files) {
    const { type, granularity } = this.state;
    let reader = new FileReader();
    reader.onload = (e) => {
      let response = e.target.result;
      
      let data = Papa.parse(response, {
        header: true,
        dynamicTyping: true
      });

      let variableCheck = checkForVariables(data.data, type, granularity);

      this.setState({
        file: files[0],
        fileData: data.data,
        variableCheck: variableCheck
      })
    } 

    reader.readAsText(files[0]);
  }

  onChange({type, granularity, sector}) {
    console.log("changed!!!")
    this.setState({
      type: type,
      granularity: granularity, 
      sector: sector
    })
  }

  onSubmit(type, granularity, sector) {
    const {uploadFile} = this.props;

    if (this.state.fileData) {
      let collectionName = granularity + "_" + type;
      collectionName += collection_name == "states_schools" && sector ? "_" + sector : "";
      uploadFile(collectionName, this.state.fileData);
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
            onSubmit={({type, granularity, sector}) => {
              
              if (!type && !granularity) {
                alert("Please select a data level and type");
              } else if (!type) {
                alert("Please select a data type");
              } else if (!granularity) {
                alert("Please select a data level");
              } else {
                console.log('Success!')
                this.onSubmit(type, granularity, sector);
              }
            }}

            onChange={(internalState) => {
              console.log(internalState)
              this.onChange(internalState.values);
            }}
          >
            {({submitForm}) => {
              console.log("HELLOOOOOO")
              console.log(this.state)
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
                  { this.state.granularity == "states" && this.state.type == "schools" &&
                    <div className="admin__form__field">
                      <h5 className="admin__form__field-label">Sector</h5>
                      <Select
                        field='sector'
                        options={[{
                          label: 'All',
                          value: 'all'
                        }, {
                          label: 'Public 4 Year',
                          value: 'public4'
                        }, {
                          label: 'Public 2 Year',
                          value: 'public2'
                        }, {
                          label: 'Non-Profits',
                          value: 'nonprofit'
                        }, {
                          label: 'For-Profits',
                          value: 'forprofit'
                        }]} />
                    </div>
                  }
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
                      {variableCheck &&
                        <aside>
                          <h5 className="admin__form__file-upload__status-heading">Missing Variables</h5>
                          <ul className="admin__form__file-upload__variable-check">
                            {Array.from(variableCheck.missingVars).map((varName) => {
                                return <li key={varName} className="admin__form__file-upload__variable-check__value">{varName}</li>
                            })}
                          </ul>
                          <h5 className="admin__form__file-upload__status-heading">Unused Variables</h5>
                          <ul className="admin__form__file-upload__variable-check">
                            {Array.from(variableCheck.unusedVars).map((varName) => {
                                return <li key={varName} className="admin__form__file-upload__variable-check__value">{varName}</li>
                            })}
                          </ul>
                          <h5 className="admin__form__file-upload__status-heading">Full Variable List</h5>
                          <ul className="admin__form__file-upload__variable-check">
                            {Array.from(variableCheck.fullVarList).map((varName) => {
                                return <li key={varName} className="admin__form__file-upload__variable-check__value">{varName}</li>
                            })}
                          </ul>
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
      uploadFile: (collectionName, file) => {
        dispatch(uploadDataFile(collectionName, file));
      },
      resetFileUploadStatus: () => {
        dispatch(setDataFileUploadStatus("inactive"));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDataUpload)