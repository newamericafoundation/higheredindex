import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { Form, submitForm } from 'react-form'

import { fetchMethodology, updateMethodology } from '../../actions';
import AdminStatusBar from './AdminStatusBar';

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
      this.props.onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const { updateStatus, submitHandler } = this.props
    const { richTextDescription } = this.state

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
            >
              {({values, addValue, removeValue}) => {
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