'use strict';

import React from 'react';
import Dropzone from 'react-dropzone';


const Papa = require("papaparse");

import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { uploadDataFile, setDataFileUploadStatus } from '../actions';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError, submitForm } from 'react-form'


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

  render() {
    const { fileUploadStatus } = this.props;
    const { file } = this.state;

    console.log(fileUploadStatus)
    if (fileUploadStatus === 200) {
      browserHistory.push("/admin/")
    }

    let submitButtonClass = "admin__data-upload__submit";
    submitButtonClass += this.state.file ? "" : " disabled";

    let dropConfirmationClass = "admin__data-upload__confirmation";
    dropConfirmationClass += this.state.file ? "" : " disabled";

    console.log(submitForm);
    return (
      <div className="admin__data-upload">
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

                  <section>
                    <div className="dropzone">
                      <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
                        <p>Drop CSV data file here, or click to select file to upload.</p>
                      </Dropzone>
                    </div>
                    {file &&
                      <aside>
                        <h5>File to Upload</h5>
                        <p>{file.name} - {file.size} bytes</p>
                      </aside>
                    }
                  </section>

              
                <button type='submit' className={submitButtonClass}>Submit</button>
                {fileUploadStatus === "in progress" &&
                  <h5 className="admin__data-upload__status">uploading file...</h5>}
              </form>
            )
          }}
        </Form>
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