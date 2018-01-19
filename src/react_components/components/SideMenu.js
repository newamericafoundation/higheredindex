import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'

import { toggleMenuExpansion } from '../../actions'
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
            <SvgIcon name='close' />
          }
        </a>
        <div className={containerClass}>
            <ul className="side-menu__menu">
                <li className="side-menu__menu-item"><Link to={'/'}>Home</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/#states'}>States</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/#institutions'}>Institutions</Link></li>
                <li className="side-menu__menu-item"><Link to={'/search/#indicators'}>Indicators</Link></li>
                <li className="side-menu__menu-item"><Link to={'/download'}>Download Dataset</Link></li>
                <li className="side-menu__menu-item"><Link to={'/api-documentation'}>API Documentation</Link></li>
                <li className="side-menu__menu-item"><Link to={'/methodology'}>Methodology</Link></li>
            </ul>
            <p className="side-menu__contact">For any questions or feedback related to this project, please send an email to communications@newamerica.org.</p>
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