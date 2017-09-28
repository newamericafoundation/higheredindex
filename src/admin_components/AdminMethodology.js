import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchMethodology, updateMethodology } from '../actions';
import  AdminStatusBar  from './AdminStatusBar';
import RichTextEditor from 'react-rte';
import { Form, Text, Select, Textarea, NestedForm, FormError, submitForm } from 'react-form'


class AdminMethodology extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      richTextDescription: null
    }
  }

  componentWillMount() {
    const { sendFetchRequest} = this.props

    sendFetchRequest();
  }

  componentWillUpdate(nextProps) {
    console.log(this.state.richTextDescription)
    if (!this.state.richTextDescription && nextProps.fetchedMethodology) {
      this.setState({
        richTextDescription: RichTextEditor.createValueFromString(nextProps.fetchedMethodology, 'html')
      })
    }
  }

  onRichTextChange(value) {
    this.setState({
      richTextDescription: value
    });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string. 
      // This is here to demonstrate using `.toString()` but in a real app it 
      // would be better to avoid generating a string on each change. 
      this.props.onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const { updateStatus, submitHandler } = this.props
    const { richTextDescription } = this.state

    console.log(richTextDescription)
    if (richTextDescription) {
      return (
        <div>
          <AdminStatusBar status={updateStatus} />
          <div className="admin__form">
            <h1 className="admin__form__title">Edit Methodology</h1>
            <Link to={'/admin/'}>
              <h5 className="admin__form__main-link">Return to Admin Home</h5>
            </Link>
            
            <Form
              onSubmit={(values) => {
                
                values.text = this.state.richTextDescription.toString('html');
                console.log(values);
                submitHandler(values);
              }}
              // defaultValues={item}
            >
              {({submitForm, values, addValue, removeValue}) => {
                return (
                  <form onSubmit={submitForm}>
                    <div className="admin__form__field">
                      <h5 className="admin__form__field-label">Description</h5>
                      <RichTextEditor
                        value={this.state.richTextDescription}
                        onChange={this.onRichTextChange.bind(this)}
                      />
                    </div>

                    <button className="admin__form__button" type='submit'>Submit</button>
                  </form>
                )
              }}
            </Form>
            

          </div>
        </div>
      )
    } else {
      return <h1> Loading... </h1>
    }
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    updateStatus: state.indicatorUpdateStatus,
    fetchedMethodology: state.fetchedMethodology
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFetchRequest: () => {
      dispatch(fetchMethodology())
    },
    submitHandler: (value) => {
      dispatch(updateMethodology(value))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminMethodology)