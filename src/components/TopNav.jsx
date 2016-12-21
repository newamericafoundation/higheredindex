import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';

import ExpandableSearchBox from './ExpandableSearchBox.jsx';

class TopNav extends React.Component {
    constructor(props) {
        super(props);

        this.handlerFunc = this.handleScroll.bind(this);

        this.state = {
          showDefault: true
        };
    }
    componentDidMount() {
        $('.app-container').scroll(this.handlerFunc);
    }

    componentWillUnmount() {
        $('.app-container').off("scroll", this.handlerFunc);
    }

    handleScroll(event) {
        if (this.state.showDefault) {
            if ($(".profile-header__text").offset().top < 30) {
                this.setState({
                  showDefault: false
                });
            }
        } else {
            if ($(".profile-header__text").offset().top >= 30) {
                this.setState({
                  showDefault: true
                });
            }
        }
    }

    render() {
    	return (
            <header>
        	<nav className="top-nav">
        		<div className="top-nav__title">
                    <div className="top-nav__title__left">
            			<Link to="/">
            				<h3 className="top-nav__title__primary">Ed-Index</h3>
            			</Link>
                    </div>
                    { this.state.showDefault &&
                        <div className="top-nav__title__right">
                			<h3 className="top-nav__title__secondary">&nbsp;&nbsp;by&nbsp;&nbsp;</h3>
                			<a href="https://www.newamerica.org">
                				<h3 className="top-nav__title__primary">New America</h3>
                			</a>
                        </div>
                    }
                    { !this.state.showDefault &&
                        <div className="top-nav__title__right">
                            <h3 className="top-nav__title__primary">&nbsp;:&nbsp;<span className="turquoise">{this.props.currProfileName}</span></h3>
                        </div>
                    }
                   
        		</div>
        		<ExpandableSearchBox />
        	</nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    currProfileName: state.currProfile.name
  }
}

export default connect(mapStateToProps)(TopNav)