import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import ExpandableSearchBox from './ExpandableSearchBox.jsx';
import TopNavMenu from './TopNavMenu';

class TopNav extends React.Component {
    constructor(props) {
        super(props);

        this.handlerFunc = this.handleScroll.bind(this);

        this.state = {
          showDefault: true
        };
    }
    componentDidMount() {
        console.log("mounting!");
        window.addEventListener('scroll', this.handlerFunc);
    }

    componentWillUnmount() {
        console.log("unmounting!")
        window.removeEventListener('scroll', this.handlerFunc);
    }

    handleScroll(event) {
        // if (!this.isMounted()) {
        //     return;
        // }
        console.log("handling scroll!");
        if (this.state.showDefault) {
            if (event.srcElement.body.scrollTop > 325) {
                this.setState({
                  showDefault: false
                });
            }
        } else {
            if (event.srcElement.body.scrollTop <= 325) {
                this.setState({
                  showDefault: true
                });
            }
        }
    }

    render() {
    	return (
        	<nav className="top-nav">
                <TopNavMenu />
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
        );
    }
}

const mapStateToProps = (state) => {
  return {
    currProfileName: state.currProfile.name
  }
}

export default connect(mapStateToProps)(TopNav)