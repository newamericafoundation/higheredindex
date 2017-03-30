'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProfileList } from '../actions';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    
  }

  componentWillMount() {
    const { dispatch, indicatorList } = this.props;
    console.log(indicatorList);
    if (indicatorList.length == 0) {
        dispatch(fetchProfileList("indicator"))
    } else {
      
    }
  }

  render() {
    const { indicatorList } = this.props;
    return (
      <div className="admin-home">
        <h5 className="admin-home__option-heading">Indicators</h5>
        <ul className="admin-home__options-list">
          {indicatorList.map((d, i) => {
            return (
              <li className="admin-home__option">
                <Link to={'/admin/indicators/' + d.path}>
                  <h5 className="admin-home__option__text">{ d.name }</h5>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    indicatorList: state.indicatorList
  }
}


export default connect(mapStateToProps)(AdminHome)