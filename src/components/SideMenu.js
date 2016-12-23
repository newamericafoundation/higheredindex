import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'

import { toggleMenuExpansion } from '../actions'

import SvgIcon from './SvgIcon'

class SideMenu extends React.Component {
  componentWillMount() {
    this.unlisten = browserHistory.listen(() => { 
        this.props.loadUnloadHandler(false);
    });
  }

  componentWillUnmount() {
      this.unlisten();
  }

  // toggleExpand() {
  //   this.setState({
  //       expanded: !this.state.expanded
  //   });
  // }
  render() {
    const {expanded, clickHandler} = this.props;

    let containerClass = "side-menu__menu-container";
    containerClass += expanded ? " visible" : "";

    return (
      <div className="side-menu">
        <a className="side-menu__menu-icon" onClick={clickHandler}>
          { !expanded &&
            <SvgIcon name='menu-toggle' />
          }
          { expanded &&
            <SvgIcon name='students' />
          }
        </a>
        <div className={containerClass}>
            <ul className="side-menu__menu">
                <li className="side-menu__menu-item"><Link to={'/'}>Home</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/states'}>States</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/institutions'}>Institutions</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/indicators'}>Indicators</Link></li>
                <li className="side-menu__menu-item"><Link to={'/'}>Download Dataset</Link></li>
                <li className="side-menu__menu-item"><Link to={'/'}>Methodology</Link></li>
            </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expanded: state.menuExpanded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUnloadHandler: (value) => {
      dispatch(toggleMenuExpansion(value))
    },
    clickHandler: () => {
      dispatch(toggleMenuExpansion())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)