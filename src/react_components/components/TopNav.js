import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import SvgIcon from './SvgIcon'
import ExpandableSearchBox from './ExpandableSearchBox';

class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {topNavProfileNameShown} = this.props;
        let titleTextDecorator = topNavProfileNameShown ? <span className="top-nav__title__decorator">:</span> : "";
    	return (
            <header>
            	<nav className="top-nav">
            		<div className="top-nav__title">
                        <div className="top-nav__title__left">
                			<div className="top-nav__title__primary"><Link to="/"><SvgIcon name='higher-ed-index' /></Link>{titleTextDecorator}</div>
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