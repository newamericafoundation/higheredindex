import React from 'react';
import { connect } from 'react-redux';
import SvgIcon from './SvgIcon'
import Footer from './Footer';
import { fetchMethodology } from '../actions'
let d3 = require("d3")


class MethodologyPage extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const { fetchedMethodology, fetchMethodologyText } = this.props

    if (!fetchedMethodology) {
      fetchMethodologyText();
    }
  }

  render() {
    const { fetchedMethodology } = this.props;

    return (
      <div className="simple-page">
        <div className="simple-page__overlay"></div>
        <div className="simple-page__content" >
          <h5 className="simple-page__title">Methodology</h5>
          <div className="simple-page__text" dangerouslySetInnerHTML={{__html: fetchedMethodology}}></div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedMethodology: state.fetchedMethodology
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    fetchMethodologyText: () => {
      dispatch(fetchMethodology())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MethodologyPage)