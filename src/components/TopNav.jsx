import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import SvgIcon from './SvgIcon'

import ExpandableSearchBox from './ExpandableSearchBox.jsx';

class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {topNavProfileNameShown} = this.props;
        let titleText = topNavProfileNameShown ? "Ed-Index :" : "Ed-Index";
    	return (
            <header>
        	<nav className="top-nav">
        		<div className="top-nav__title">
                    <div className="top-nav__title__left">
            			<Link to="/">
            				<h3 className="top-nav__title__primary">{ titleText }</h3>
            			</Link>
                    </div>
                    { !topNavProfileNameShown &&
                        <div className="top-nav__title__right">
                			<h3 className="top-nav__title__secondary">by</h3>
                			<a href="https://www.newamerica.org">
                				<h3 className="top-nav__title__primary"><SvgIcon name='new-america' /></h3>
                			</a>
                        </div>
                    }
                    { topNavProfileNameShown &&
                        <div className="top-nav__title__right">
                            <h3 className="top-nav__title__primary"><span className="turquoise">{this.props.currProfileName}</span></h3>
                        </div>
                    }
                   
        		</div>
        		<ExpandableSearchBox filter="all"/>
        	</nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    topNavProfileNameShown: state.topNavProfileNameShown,
    currProfileName: state.currProfile.name
  }
}

export default connect(mapStateToProps)(TopNav)