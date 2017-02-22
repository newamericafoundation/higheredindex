import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
import { fetchProfileList } from '../actions';
import SvgIcon from './SvgIcon';
import { sortAlpha } from "../helper_functions/sort_alpha.js";
var d3 = require("d3");

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.path;

const renderSuggestion = suggestion => {
  const iconType = suggestion.type == "state" ? 'map-marker' : 'institution';
  return (
    <div className="react-autosuggest__suggestion-div">
      <SvgIcon name={iconType} />
      <h5>{suggestion.name}</h5>
    </div>
  );

}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.filter);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    let filter = props.filter == null ? "all" : props.filter;
    console.log(filter)
    this.state = {
      value: '',
      suggestions: [],
      expanded: true,
      stList: props.stList,
      instList: props.instList,
      filter: filter,
      currList: []
    };

  }

  componentWillMount() {
    const { dispatch, stList, instList, filter } = this.props
    
    if (stList.length == 0) {
      dispatch(fetchProfileList("state"))
    } else {
      if (filter == "states" || filter == "all") {
        let currList = this.getCurrList(filter, this.state);
        this.setState({
          currList: currList,
          suggestions: this.getSuggestions("", currList),
        })
      }
    }
    if (instList.length == 0) {
      dispatch(fetchProfileList("institution"))
    } else {
      if (filter == "institutions" || filter == "all") {
        let currList = this.getCurrList(filter, this.state);
        this.setState({
          currList: currList,
          suggestions: this.getSuggestions("", currList),
        })
      }
    }

    this.unlisten = browserHistory.listen(() => { 
        this.setState({
          value: '',
        });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    const { currList } = this.state;
    let suggestions = this.getSuggestions(value, currList);
    this.setState({
      suggestions: suggestions
    });

    if (this.props.suggestionsChangedCallback) {
      let counts = this.getSuggestionCounts(value, this.state);
      this.props.suggestionsChangedCallback(counts);
    }
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    const { currList } = this.state;
    this.setState({
      suggestions: this.getSuggestions("", currList)
    });
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    browserHistory.push('/' + suggestion.type + '/' + suggestionValue);
  }

  getSuggestions(value, list) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      if (this.props.alwaysRenderSuggestions) {
        return list
      } else {
        return [];
      }
    } else {
      return list.filter(listElem => 
        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
      );
    }
  }

  getCurrList(filter, listContainer) {
    const {stList, instList} = listContainer;
    console.log(" in get curr list, filter is ", filter)
    if (filter == "states") {
      return stList;
    } else if (filter == "institutions") {
      return instList;
    } else {
      let fullList = [...stList, ...instList]
      return fullList.sort(sortAlpha);
    }
  }

  getSuggestionCounts(value, listContainer) {
    const { stList, instList } = listContainer;
    console.log(stList, instList);
    return {
      "states": this.getSuggestions(value, stList).length,
      "institutions": this.getSuggestions(value, instList).length,
      "indicators": this.getSuggestions(value, stList).length,
    };
  }

  componentWillReceiveProps(nextProps) {
    let {stList, instList, currList} = this.state;
    console.log("in component will receive props");

    if (this.props.stList.length == 0 && nextProps.stList.length != 0) {
      this.updateListsInState("stList", nextProps);
    } else if (this.props.instList.length == 0 && nextProps.instList.length != 0) {
      this.updateListsInState("instList", nextProps);
    }

    console.log(this.props.filter, nextProps.filter);

    if (this.props.filter != nextProps.filter || currList.length == 0) {
      let currList = this.getCurrList(nextProps.filter, this.state);
      this.setState({
        filter: nextProps.filter,
        currList: currList,
        suggestions: this.getSuggestions("", currList),
      })
    }
    
  }

  updateListsInState(type, nextProps) {
    let { currList, filter } = this.state;

    if (type == "stList") {
      if (this.props.filter != nextProps.filter || currList.length == 0) {
        filter = nextProps.filter;
        currList = this.getCurrList(nextProps.filter, nextProps);
      }
      this.setState({
        stList: nextProps.stList,
        suggestions: this.getSuggestions("", currList),
        filter: filter,
        currList: currList
      })
    } else {
      if (this.props.filter != nextProps.filter || currList.length == 0) {
        filter = nextProps.filter;
        currList = this.getCurrList(nextProps.filter, nextProps);
      }
      this.setState({
        instList: nextProps.instList,
        suggestions: this.getSuggestions("", currList),
        filter: filter,
        currList: currList
      })
    }

    if (this.props.suggestionsChangedCallback) {
      console.log("calling get suggestion counts");
      let counts = this.getSuggestionCounts("", nextProps);
      this.props.suggestionsChangedCallback(counts);
    }
  }

  render() {
    const { value, suggestions } = this.state;
    let elementClass = this.props.expandable ? " expandable" : "";
    elementClass += this.props.expandable && !this.props.expanded ? " hidden" : "";

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange.bind(this)
    };

    console.log(this.state);

    let loading = this.props.instList.length == 0 && this.props.stList.length == 0
    // Finally, render it!
    return (
      <div className={"search-box" + elementClass}>
        {loading && 
          <div className='react-autosuggest__container'>
            <input type="text" className="search-box__loading-placeholder" disabled placeholder="Loading..."></input>
          </div>

        }
        {!loading &&
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            focusFirstSuggestion = {true}
            alwaysRenderSuggestions = {true}
            inputProps={inputProps}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stList: state.stList,
    instList: state.instList,
  }
}

export default connect(mapStateToProps)(SearchBox)