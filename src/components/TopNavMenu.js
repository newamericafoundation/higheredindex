import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class TopNavMenu extends React.Component {
  constructor() {
    super();
    this.state = {
        expanded: false,
    };
  }
  componentWillMount() {
    this.unlisten = browserHistory.listen(() => { 
        this.setState({
            expanded: false
        });
    });
  }

   componentWillUnmount() {
        this.unlisten();
    }

  toggleExpand() {
    this.setState({
        expanded: !this.state.expanded
    });
  }
  render() {
    return (
        <div>
            { !this.state.expanded &&
              <a className="top-nav__menu-icon" onClick={this.toggleExpand.bind(this)}>Open</a>
            }
            { this.state.expanded &&
                <div className="top-nav__menu-container">
                    <a className="top-nav__menu-close-icon" onClick={this.toggleExpand.bind(this)}>Close</a>
                    <ul className="top-nav__menu">
                        <li className="top-nav__menu-item"><Link to={'/'}>Home</Link></li>
                        <li className="top-nav__menu-item"><Link to={'/search/states'}>States</Link></li>
                        <li className="top-nav__menu-item"><Link to={'/search/institutions'}>Institutions</Link></li>
                        <li className="top-nav__menu-item"><Link to={'/search/indicators'}>Indicators</Link></li>
                        <li className="top-nav__menu-item"><Link to={'/'}>Download Dataset</Link></li>
                        <li className="top-nav__menu-item"><Link to={'/'}>Methodology</Link></li>
                    </ul>
                </div>
            }
        </div>
    );
  }
}