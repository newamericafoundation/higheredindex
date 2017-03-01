import { connect } from 'react-redux'
import { changeCurrProfile, fetchProfile } from '../actions'
import IndicatorPage from './IndicatorPage'
import NotFoundPage from './NotFoundPage';
import { indicatorVizSettings } from './indicatorVizSettings';

import React from 'react';

class IndicatorPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    if (indicatorVizSettings[id] && indicatorVizSettings[id].title) {
      dispatch(changeCurrProfile(id, indicatorVizSettings[id].title, "indicator"))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(changeCurrProfile(null))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      const { dispatch, id } = nextProps
      dispatch(changeCurrProfile(id, indicatorVizSettings[nextProps.id].title, "indicator"))
    }
  }

  render() {
    return <IndicatorPage settings={indicatorVizSettings[this.props.id]}/>
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    id:ownProps.params.id
  }
}

export default connect(mapStateToProps)(IndicatorPageContainer)