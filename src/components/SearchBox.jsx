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
    console.log(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      expanded: true,
      stList: [],
      instList: [],
      filter: "all"
    };
  }

  componentWillMount() {
    const { dispatch, stList, instList } = this.props
    
    if (stList.length == 0) {
      dispatch(fetchProfileList("state"))
    }
    if (instList.length == 0) {
      dispatch(fetchProfileList("institution"))
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
    let suggestions = this.getSuggestions(value);
    this.setState({
      suggestions: suggestions
    });
    if (this.props.suggestionsChangedCallback) {
      let counts = this.countSuggestionTypes(suggestions);
      this.props.suggestionsChangedCallback(counts);
    }
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: this.getSuggestions("")
    });
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    browserHistory.push('/' + suggestion.type + '/' + suggestionValue);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const currList = this.getCurrList();

    if (inputLength === 0) {
      if (this.props.alwaysRenderSuggestions) {
        return currList
      } else {
        return [];
      }
    } else {
      return currList.filter(listElem => 
        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
      );
    }
  }

  getCurrList() {
    const {filter, stList, instList} = this.state;
    if (filter == "state") {
      return stList;
    } else if (filter == "institution") {
      return instList;
    } else {
      let fullList = [...stList, ...instList]
      return fullList.sort(sortAlpha);
    }
  }

  countSuggestionTypes(suggestions) {
    return d3.nest()
      .key((d) => { return d.type; })
      .rollup((v) => { return v.length; })
      .entries(suggestions);
  }

  componentWillReceiveProps(nextProps) {
    let {stList, instList} = this.state;
    let shouldUpdateState = false;

    if (stList.length == 0 && nextProps.stList.length != 0) {
      stList = nextProps.stList;
      shouldUpdateState = true;
    } else if (instList.length == 0 && nextProps.instList.length != 0) {
      instList = nextProps.instList;
      shouldUpdateState = true
    }

    if (shouldUpdateState) {
      this.setState({
        stList: stList,
        instList: instList,
        suggestions: this.getSuggestions("")
      })
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
    instList: state.instList
  }
}

export default connect(mapStateToProps)(SearchBox)