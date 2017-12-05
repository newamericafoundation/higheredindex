import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import SvgIcon from './SvgIcon'
import ExpandableSearchBox from './ExpandableSearchBox';

class TopNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBoxVisible: true
        }
    }

    componentDidMount() {
        console.log($(".listings-page"))
        if ($(".listings-page") != null && $(".listings-page").length > 0) {
            this.setState({
                searchBoxVisible: false
            })
        }
    }

    render() {
        const {topNavProfileNameShown} = this.props;

        let overrideSearchBoxVisibilityValue;

        let titleTextDecorator = topNavProfileNameShown ? <span className="top-nav__title__decorator">:</span> : "";
        if ($(".listings-page") != null && $(".listings-page").length > 0) {
            overrideSearchBoxVisibilityValue = false;
        } else {
            overrideSearchBoxVisibilityValue = true;
        }

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
                    {overrideSearchBoxVisibilityValue && <ExpandableSearchBox filter="all"/>}
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