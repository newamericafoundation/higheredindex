import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
import { fetchProfileList } from '../actions';
import SvgIcon from './SvgIcon';

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
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      expanded: true
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
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    browserHistory.push('/' + suggestion.type + '/' + suggestionValue);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const fullList = this.props.stList.concat(this.props.instList);
    return inputLength === 0 ? [] : fullList.filter(listElem => 
      listElem.name.toLowerCase().slice(0, inputLength) === inputValue
    );
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