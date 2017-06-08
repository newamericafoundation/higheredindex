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
          <li className="admin-form__field">
            <h5 className="admin-form__field__label">Name</h5>
            <input className="admin-form__field__input" type="text" value={ this.state["name"] } onChange={ (evt) => { return this.inputChanged(evt, "name"); } }></input>
          </li>
          <li className="admin-form__field">
            <h5 className="admin-form__field__label">Path</h5>
            <input className="admin-form__field__input" type="text" value={ this.state["path"] } onChange={ (evt) => { return this.inputChanged(evt, "path"); } }></input>
          </li>
          <li className="admin-form__field">
            <h5 className="admin-form__field__label">Section</h5>
            <select className="admin-form__field__select" value={ this.state["section"] } onChange={ (evt) => { return this.inputChanged(evt, "section"); } }>
              <option>students</option>
              <option>loans</option>
              <option>outcomes</option>
              <option>grants</option>
              <option>schools</option>
            </select>
          </li>
          <li className="admin-form__field">
            <h5 className="admin-form__field__label">Description</h5>
            <input className="admin-form__field__input" type="text" value={ this.state["description"] } onChange={ (evt) => { return this.inputChanged(evt, "description"); } }></input>
          </li>
          

        </ul>
        <input type="submit" onClick={this.handleSubmit.bind(this)}></input>
        
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