import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateIndicator } from '../actions';

import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError, submitForm } from 'react-form'

class AdminIndicatorEditorForm extends React.Component {
  render() {
    const { item } = this.props;
    console.log(item)
    let statusText;
    
    return (
      <div className="admin-form">
        
        <h5 className="admin-form__title">Edit Indicator: {item.name}</h5>
        <Form
          onSubmit={(values) => {
            console.log(values);
            this.props.submitHandler(values);
          }}
          defaultValues={item}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <h5 className="admin__form__field-label">Name</h5>
                <Text field='name' />
                <h5 className="admin__form__field-label">Path</h5>
                <Text field='path'/>
                <h5 className="admin__form__field-label">Section</h5>
                <Select
                  field='section'
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
                <h5 className="admin__form__field-label">Description</h5>
                <Textarea
                  field='description' />
              
                <button type='submit'>Submit</button>
              </form>
            )
          }}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (value) => {
      dispatch(updateIndicator(value))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminIndicatorEditorForm)