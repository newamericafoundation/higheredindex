import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateIndicator } from '../actions';

import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError, submitForm } from 'react-form'

class AdminIndicatorEditorForm extends React.Component {
  render() {
    const { item, action } = this.props;
    console.log(item)
    let statusText;
    
    return (
      <div>
        <Form
          onSubmit={(values) => {
            console.log(values);
            this.props.submitHandler(values, action);
          }}
          defaultValues={item}
        >
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Name</h5>
                  <Text field='name' />
                </div>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Path</h5>
                  <Text field='path'/>
                </div>
                <div className="admin__form__field">
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
                </div>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Description</h5>
                  <Textarea
                    field='description' />
                </div>
              
                <button className="admin__form__button" type='submit'>Submit</button>
                {action == "update" &&
                  <button className="admin__form__button" type='delete' onClick={() => { this.props.submitHandler(item, "delete"); }}>Delete Indicator</button>}
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
    submitHandler: (value, action) => {
      dispatch(updateIndicator(value, action))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminIndicatorEditorForm)