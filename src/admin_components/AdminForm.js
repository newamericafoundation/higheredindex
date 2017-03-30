import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateIndicator } from '../actions';

class AdminForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = Object.assign({}, props.item);
    
  }

  handleSubmit() {
    console.log("submitting!");
    console.log(this.state);
    this.props.submitHandler(this.state);
    
  }

  inputChanged(evt, key) {
    console.log("input changed");
    console.log(evt.target.value);
    console.log(key);

    this.setState({
      [key] : evt.target.value
    });

  }

  render() {
    const { item, updateStatus } = this.props;
    let statusText;
    if (updateStatus == 200) {
      statusText = "Successfully Updated";
    } else if (updateStatus == 500) {
      statusText = "Update Failed";
    } else {
      statusText = null;
    }
    return (
      <div className="admin-form">
        { statusText &&
          <h5 className="admin-form__status">{statusText}</h5>
        }
        <h5 className="admin-form__title">Edit Indicator</h5>
        <ul>
          {Object.keys(item).map((key, i) => {
            if (key != "_id" && key != "type") {
              return (
                <li className="admin-form__field" key={key}>
                  <h5 className="admin-form__field__label">{key}</h5>
                  <input 
                    className="admin-form__field__input" 
                    type="text" 
                    value={ this.state[key] } 
                    onChange={ (evt) => { return this.inputChanged(evt, key); } }>
                  </input>
                </li>
              )
            }
          })}
          <input type="submit" onClick={this.handleSubmit.bind(this)}></input>

        </ul>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    updateStatus: state.indicatorUpdateStatus
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (value) => {
      dispatch(updateIndicator(value))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)