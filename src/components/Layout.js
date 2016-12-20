import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import TopNav from './TopNav.jsx';
import SideMenu from './SideMenu';

class Layout extends React.Component {
  render() {
    console.log(this.props.contentShifted);
    let contentClasses = "main-content with-header";
    contentClasses += this.props.contentShifted ? " shifted" : "";
    return (
      <div className="app-container">
        <SideMenu />
        <TopNav />
        <div className={contentClasses}>{this.props.children}</div>
        <footer>
          <p>This is the Footer
          </p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentShifted: state.menuExpanded
  }
}

export default connect(mapStateToProps)(Layout)