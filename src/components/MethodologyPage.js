import React from 'react';
import { connect } from 'react-redux';
import SvgIcon from './SvgIcon'
import Footer from './Footer';
import { fetchMethodology } from '../actions'
import {Helmet} from "react-helmet";
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
        <Helmet>
          <title>Higher Ed Index | Methodology</title>
          <meta name="description" content="New America Higher Ed Index" />
          <meta name="twitter:card" content="New America Higher Ed Index" />
          <meta name="twitter:title" content="Higher Ed Index: Methodology" />
          <meta name="twitter:description" content="New America Higher Ed Index"/>
          <meta property="og:title" content="Higher Ed Index: Methodology" />
          <meta property="og:description" content="New America Higher Ed Index" />
        </Helmet>
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