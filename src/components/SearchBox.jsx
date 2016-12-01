import React from 'react';
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.path;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class SearchBox extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount() {
      this.loadData();
  }

  loadData() {
    console.log("loading data");
      // const query = this.props.location.query || {};
      const filter = {
        // priority: query.priority,
        // status: query.status,
      };
      $.ajax({
        url: 'http://localhost:3000/api/states',
        data: filter,
        dataType: 'json',
        cache: false,
        success: function loadDataSuccess(data) {
          console.log(data);
          this.fullList = data;
          this.setState({ suggestions: data });
        }.bind(this),
        error: function loadDataError(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    console.log("changed!");
    console.log(newValue);
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
    console.log(suggestion, suggestionValue);
    browserHistory.push('/state/' + suggestionValue);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.fullList.filter(listElem => 
      listElem.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange.bind(this)
    };

    // Finally, render it!
    return (
      <div className="search-box">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}