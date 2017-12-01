import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { Form, Text, Select, submitForm } from 'react-form'

import { updateIndicator } from '../../actions';
import { colors } from "../../helper_functions/colors.js";

class AdminIndicatorEditorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      richTextDescription: RichTextEditor.createValueFromString(props.item ? props.item.description : "", 'html')
    }
  }

  onRichTextChange(value) {
    this.setState({
      richTextDescription: value
    });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const { item, action } = this.props;
    let statusText;
    
    return (
      <div>
        <Form
          onSubmit={(values) => {
            if (!values || !values.name) {
              alert("Please provide a name for this indicator.")
              return;
            }
            if (values.rankingVariables) {
              values.rankingVariables.map((d, i) => {
                d.index = i;
                d.numBins = 5;
                d.scaleType = "quantize";
                d.customRange = [colors.white, colors[d.color].light, colors[d.color].dark];
                return d;
              })
            }
            values.description = this.state.richTextDescription.toString('html');
            if (!values.path) {
              values.path = this.props.id
            }
            this.props.submitHandler(values, action);
          }}
          defaultValues={item}
        >
          {({submitForm, values, addValue, removeValue}) => {
            return (
              <form onSubmit={submitForm}>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Name</h5>
                  <Text field='name' />
                </div>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Description</h5>
                  <RichTextEditor
                    value={this.state.richTextDescription}
                    onChange={this.onRichTextChange.bind(this)}
                  />
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
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Ranking Dashboard Settings</h5>
                  <div className="nested">
                    {!values.rankingVariables || !values.rankingVariables.length
                      ? <em>No variables have been added yet</em>
                      : values.rankingVariables.map((rankingVariables, i) => ( // Loop over the values however you'd like
                          <div key={i} className="admin__form__sub-field-container">
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Variable (CSV Field Name)</h5>
                              <Text field={['rankingVariables', i, 'variable']} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Display Name</h5>
                              <Text field={['rankingVariables', i, 'displayName']} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Category</h5>
                              <Text field={['rankingVariables', i, 'category']} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Format</h5>
                              <Select
                                field={['rankingVariables', i, 'format']}
                                options={[{
                                  label: 'Number (with commas)',
                                  value: 'number'
                                }, {
                                  label: 'Number (without commas)',
                                  value: 'year'
                                }, {
                                  label: 'Percent',
                                  value: 'percent'
                                }, {
                                  label: 'Price',
                                  value: 'price'
                                }, {
                                  label: 'Text',
                                  value: 'string'
                                }]} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Color</h5>
                              <Select
                                field={['rankingVariables', i, 'color']}
                                options={[{
                                  label: 'Turquoise',
                                  value: 'turquoise'
                                }, {
                                  label: 'Blue',
                                  value: 'blue'
                                }, {
                                  label: 'Purple',
                                  value: 'purple'
                                }, {
                                  label: 'Red',
                                  value: 'red'
                                }, {
                                  label: 'Orange',
                                  value: 'orange'
                                }, {
                                  label: 'Yellow',
                                  value: 'yellow'
                                }, {
                                  label: 'Brown',
                                  value: 'brown'
                                }, {
                                  label: 'Grey',
                                  value: 'grey'
                                }]} />
                            </div>
                            <div className="admin__form__sub-field">
                              <h5 className="admin__form__sub-field-label">Profile Section Anchor</h5>
                              <Text field={['rankingVariables', i, 'profile-anchor']} />
                            </div>
                            <button className="admin__form__sub-field__button" type="button" onClick={() => removeValue('rankingVariables', i)} >Remove Variable</button>
                          </div>
                        ))}
                  </div>
                  <div>
                    <button className="admin__form__sub-field__button" type="button" onClick={() => addValue('rankingVariables', {})}>Add Variable</button>
                  </div>
                </div>
                <button className="admin__form__button" type='submit'>Submit</button>
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