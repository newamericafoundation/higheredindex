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
          {({submitForm, values, addValue, removeValue}) => {
            console.log(submitForm, values)
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
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Sources</h5>
                  <div className="nested">
                    {!values.sources || !values.sources.length
                      ? <em>No sources have been added yet</em>
                      : values.sources.map((sources, i) => ( // Loop over the values however you'd like
                          <div key={i} className="admin__form__sub-field-container">
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Source Name</h5>
                              <Text field={['sources', i, 'name']} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Source URL</h5>
                              <Text field={['sources', i, 'url']} />
                            </div>
                            <button className="admin__form__sub-field__button" type="button" onClick={() => removeValue('sources', i)} >Remove Source</button>
                          </div>
                        ))}
                  </div>

                  <div>
                    <button className="admin__form__sub-field__button" type="button" onClick={() => addValue('sources', {})}>Add Source</button>
                  </div>
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