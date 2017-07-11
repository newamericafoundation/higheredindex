'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setAdminLoginStatus } from '../actions';
import  AdminStatusBar  from './AdminStatusBar';

import { Form, Text, submitForm } from 'react-form'

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showStatusBanner: false
    };
  }

  render() {
    if (this.props.adminLoginStatus) {
      browserHistory.push('/admin/');
    }

    return (
      <div className="admin__login">
        {this.state.showStatusBanner && <AdminStatusBar status="incorrect password" />}
        <Form
          onSubmit={(values) => {
            if (values.password === process.env.ADMIN_PASS) {
              this.props.setAdminLoginStatus(true);
            } else {
              this.setState({
                showStatusBanner: true
              })
            }
          }}
        >
          {({submitForm, values, addValue, removeValue}) => {
            return (
              <form onSubmit={submitForm}>
                <div className="admin__form__field">
                  <h5 className="admin__form__field-label">Password</h5>
                  <Text field='password' />
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
    adminLoginStatus: state.adminLoginStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setAdminLoginStatus: (status) => {
        dispatch(setAdminLoginStatus(status));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)