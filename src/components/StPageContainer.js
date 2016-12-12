import { connect } from 'react-redux'
import { changeCurrSt, fetchSt } from '../actions'
import StPage from './StPage'
import NotFoundPage from './NotFoundPage';

import React from 'react';

class StPageContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.st = props.params.name;
    console.log("in constructor, this.props is ");
    console.log(props);

  }

  componentWillMount() {
    const { dispatch, fetchedSts, st } = this.props
    console.log(fetchedSts);

    if (fetchedSts[st]) {
      this.stData = fetchedSts[st]
    } else {
      console.log("dispatching fetch event");
      dispatch(fetchSt(st))
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("in will receive props")
    console.log(nextProps)
    if (nextProps.st != this.props.st) {
      const { dispatch, fetchedSts, st } = nextProps
      console.log(fetchedSts);

      if (fetchedSts[st]) {
        this.stData = fetchedSts[st]
        dispatch(changeCurrSt(st))
      } else {
        console.log("dispatching fetch event");
        dispatch(fetchSt(st))
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
  //     const { dispatch, selectedSubreddit } = nextProps
  //     dispatch(fetchPostsIfNeeded(selectedSubreddit))
  //   }
  // }

  // handleChange(nextSubreddit) {
  //   this.props.dispatch(selectSubreddit(nextSubreddit))
  // }

  // handleRefreshClick(e) {
  //   e.preventDefault()

  //   const { dispatch, selectedSubreddit } = this.props
  //   dispatch(invalidateSubreddit(selectedSubreddit))
  //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
  // }

  render() {
    console.log("in render, this.props is ");
    console.log(this.props);
    const { fetchedSts, st } = this.props
    this.stData = fetchedSts[st]
    console.log(this.stData);
    if (this.stData && !this.stData.isFetching) {
      if (this.stData.data) {
        return <StPage stData={ this.stData.data } />
      }
      else {
        return <NotFoundPage/>
      }
    } 
    
    return <h1> Loading ... </h1>
    
    // return (
    //   <div>
    //     { this.stData && this.stData.isFetching &&
    //       <h1> Loading... </h1>
    //     }
    //     { this.stData && this.stData.data &&
    //       <StPage stData={ this.stData.data } />
    //     }
    //     { this.stData && !this.stData.data &&
    //       <NotFoundPage/>
    //     }

    //   </div>
    // )
  //   const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
  //   return (
  //     <div>
  //       <Picker value={selectedSubreddit}
  //               onChange={this.handleChange}
  //               options={[ 'reactjs', 'frontend' ]} />
  //       <p>
  //         {lastUpdated &&
  //           <span>
  //             Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
  //             {' '}
  //           </span>
  //         }
  //         {!isFetching &&
  //           <a href='#'
  //              onClick={this.handleRefreshClick}>
  //             Refresh
  //           </a>
  //         }
  //       </p>
  //       {isFetching && posts.length === 0 &&
  //         <h2>Loading...</h2>
  //       }
  //       {!isFetching && posts.length === 0 &&
  //         <h2>Empty.</h2>
  //       }
  //       {posts.length > 0 &&
  //         <div style={{ opacity: isFetching ? 0.5 : 1 }}>
  //           <Posts posts={posts} />
  //         </div>
  //       }
  //     </div>
  //   )
  // }
  }
}



const mapStateToProps = (state, ownProps) => {
  console.log("in map state to props, state is ");
  console.log(state, ownProps);
  return {
    st: ownProps.params.name,
    fetchedSts: state.fetchedSts || {}
  }
}



export default connect(mapStateToProps)(StPageContainer)