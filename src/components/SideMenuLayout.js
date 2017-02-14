import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import TopNav from './TopNav';
import SideMenu from './SideMenu';
import { toggleMenuExpansion } from '../actions'

class SideMenuLayout extends React.Component {
  render() {
    let contentClasses = "main-content";
    contentClasses += this.props.contentShifted ? " shifted" : "";
    return (
      <div className="app-container">
        <SideMenu />

        <div className={contentClasses}>
          {this.props.children}
        </div>
        <div className="main-content__overlay" onClick={this.props.clearSidemenu} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentShifted: state.menuExpanded
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    clearSidemenu: () => {
      console.log("clicked");
      dispatch(toggleMenuExpansion(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuLayout)