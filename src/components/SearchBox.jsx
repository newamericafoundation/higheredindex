import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
import { fetchProfileList } from '../actions';
import SvgIcon from './SvgIcon';
import { sortAlpha } from "../helper_functions/sort_alpha.js";
var d3 = require("d3");

class SearchBox extends React.Component {
  	constructor(props) {
  		super(props);

  		this.state = {
			value: '',
			suggestions: [],
			expanded: true,
	    };

  		console.log(props);
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

	componentWillReceiveProps(nextProps) {
		const { stList, instList, filter } = this.props;

		console.log("in component will receive props");
		let newSuggestions = [];

		if (stList != nextProps.stList || filter != nextProps.filter) {
			if (nextProps.filter == "states" || nextProps.filter == "all") {
				newSuggestions = nextProps.stList; 
			}
		}

		if (instList != nextProps.instList || filter != nextProps.filter) {
			if (nextProps.filter == "institutions" || nextProps.filter == "all") {
				newSuggestions = [...newSuggestions, ...nextProps.instList]; 
			}
		}

		console.log(newSuggestions);

		if (newSuggestions.length > 0) {
			this.setState({
				suggestions: newSuggestions
			})
		}
	}

  	render() {
  		console.log("rendering", this.props);
  		console.log(this.state);
  		const { value, suggestions } = this.state;
  		const { stList, instList } = this.props;

  		const inputProps = {
	      placeholder: 'Search',
	      value,
	      onChange: this.onChange.bind(this)
	    };

	    let elementClass = "";

	    let loading = stList.length == 0 && instList.length == 0;

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
	            getSuggestionValue={this.getSuggestionValue}
	            renderSuggestion={this.renderSuggestion}
	            focusFirstSuggestion = {true}
	            alwaysRenderSuggestions = {true}
	            inputProps={inputProps}
	          />
	        }
	      </div>
	    );
	}

  	componentWillUnmount() {
	    this.unlisten();
	}


	onChange(event, { newValue }) {
		console.log("on change");
	}

		// Autosuggest will call this function every time you need to update suggestions.
		// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
		console.log("onSuggestionsFetchRequested")
	}

		// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
		console.log("onSuggestionsClearRequested")
	}

	onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
		console.log("onSuggestionSelected")
	}

	getSuggestions(value, list) {
		console.log("getSuggestions")
	}

	getSuggestionValue(suggestion) {
		console.log("getSuggestionValue")
		return suggestion.path
	}

	renderSuggestion(suggestion) {
	  const iconType = suggestion.type == "state" ? 'map-marker' : 'institution';
	  return (
	    <div className="react-autosuggest__suggestion-div">
	      <SvgIcon name={iconType} />
	      <h5>{suggestion.name}</h5>
	    </div>
	  );

	}
}


const mapStateToProps = (state) => {
	console.log(state);
  return {
    stList: state.stList,
    instList: state.instList,
  }
}

export default connect(mapStateToProps)(SearchBox)