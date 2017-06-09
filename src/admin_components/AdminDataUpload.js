'use strict';

import React from 'react';
import Dropzone from 'react-dropzone';


const Papa = require("papaparse");

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { uploadDataFile } from '../actions';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form'


class AdminDataUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.dataType);
    this.state = { 
      files: [] 
    }
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files
    });
  }

  onSubmit() {
    const {uploadFile} = this.props;

    var reader = new FileReader();
    reader.onload = function(e){
      let response = e.target.result;
      
      var data = Papa.parse(response, {
        header: true,
        dynamicTyping: true
      });

      uploadFile("states_students", data.data);

    };
    reader.readAsText(this.state.files[0]);
    
  }

  render() {
    const { dataType } = this.props;

    let submitButtonClass = "admin__data-upload__submit";
    submitButtonClass += this.state.files.length > 0 ? "" : " disabled";
    return (
      <div className="admin__data-upload">
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Text
            field='street'
            placeholder='Street'
          />
          <br />
          <Text
            field='city'
            placeholder='City'
          />
          <br />
          <Text
            field='state'
            placeholder='State'
          />
          <button type='submit'>Submit</button>
        </Form>
        <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
      <div className="{submitButtonClass}" onClick={this.onSubmit.bind(this)}>Upload</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dataType: ownProps.params.type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      uploadFile: (collection, file) => {
        dispatch(uploadDataFile(collection, file));
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminDataUpload)