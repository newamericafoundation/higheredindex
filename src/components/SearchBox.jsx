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
  		console.log("in component will mount");
		const { dispatch, stList, indicatorList, instList, filter, suggestionsChangedCallback } = this.props;
		let newSuggestions = [],
			forceUpdate = false;

		if (stList.length == 0) {
			dispatch(fetchProfileList("state"))
		} else {
			if (filter == "states" || filter == "all") {
				newSuggestions = this.getSuggestions(this.state.value, this.props); 
			}
		}

		if (indicatorList.length == 0) {
			dispatch(fetchProfileList("indicator"))
		} else {
			if (filter == "indicators" || filter == "all") {
				newSuggestions = [...newSuggestions, ...this.getSuggestions(this.state.value, this.props)]; 
			}
		}

		if (instList.length == 0) {
			dispatch(fetchProfileList("institution"))
		} else {
			if (filter == "institutions" || filter == "all") {
				newSuggestions = [...newSuggestions, ...this.getSuggestions(this.state.value, this.props)]; 
			}
		}

		if (newSuggestions.length > 0 || forceUpdate) {
			if (suggestionsChangedCallback) {
		      let counts = this.getSuggestionCounts(this.state.value, this.props);
		      this.props.suggestionsChangedCallback(counts);
		    }
			this.setState({
				suggestions: newSuggestions
			})
		}


		// this.unlisten = browserHistory.listen(() => { 
		//     this.setState({
		//       value: '',
		//     });
		// });
	}

	componentWillReceiveProps(nextProps) {
		const { stList, indicatorList, instList, filter, suggestionsChangedCallback } = this.props;
		console.log("in component will receive props");
		let newSuggestions = [],
			updateCounts = false,
			updateState = false;

		if (stList != nextProps.stList || filter != nextProps.filter) {
			if (nextProps.filter == "states" || nextProps.filter == "all") {
				newSuggestions = this.getSuggestions(this.state.value, nextProps);
				updateState = true;
			}
			updateCounts = true;
		}

		if (indicatorList != nextProps.indicatorList || filter != nextProps.filter) {
			if (nextProps.filter == "indicators" || nextProps.filter == "all") {
				newSuggestions = [...newSuggestions, ...this.getSuggestions(this.state.value, nextProps)];
				updateState = true;
			}
			updateCounts = true;
		}

		if (instList != nextProps.instList || filter != nextProps.filter) {
			if (nextProps.filter == "institutions" || nextProps.filter == "all") {
				newSuggestions = [...newSuggestions, ...this.getSuggestions(this.state.value, nextProps)];
				updateState = true;
			}
			updateCounts = true;
		}

		if (updateCounts && suggestionsChangedCallback) {
	        let counts = this.getSuggestionCounts(this.state.value, nextProps);
	        this.props.suggestionsChangedCallback(counts);
	    }

		if (updateState) {
			this.setState({
				suggestions: newSuggestions
			})
		}
	}

  	render() {
  		console.log("rendering", this.props);
  		console.log(this.state);
  		const { value, suggestions } = this.state;
  		const { stList, indicatorList, instList, alwaysRenderSuggestions, expandable, expanded } = this.props;

  		const inputProps = {
	      placeholder: 'Search',
	      value,
	      onChange: this.onChange.bind(this)
	    };

	    let elementClass = expandable ? " expandable" : "";
    		elementClass += expandable && !expanded ? " hidden" : "";

	    let loading = stList.length == 0 && instList.length == 0;

	    let suggestionRenderer = alwaysRenderSuggestions ? this.renderSuggestion : this.renderSuggestionSimple;

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
	            renderSuggestion={suggestionRenderer}
	            focusFirstSuggestion = {true}
	            alwaysRenderSuggestions = {alwaysRenderSuggestions}
	            inputProps={inputProps}
	          />
	        }
	      </div>
	    );
	}

 //  	componentWillUnmount() {
	//     this.unlisten();
	// }


	onChange(event, { newValue }) {
		console.log("on change");
		this.setState({
	        value: newValue
	    });
	}

		// Autosuggest will call this function every time you need to update suggestions.
		// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
		console.log("onSuggestionsFetchRequested")
		if (this.props.suggestionsChangedCallback) {
	      let counts = this.getSuggestionCounts(value, this.props);
	      this.props.suggestionsChangedCallback(counts);
	    }

	    this.setState({
	      suggestions: this.getSuggestions(value, this.props)
	    });
	}

		// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
		console.log("onSuggestionsClearRequested")
	}

	onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
	    browserHistory.push('/' + suggestion.type + '/' + suggestionValue);
	}

	getSuggestions(value, propContainer) {
		console.log("getSuggestions")
		const inputValue = value.trim().toLowerCase();
	    const inputLength = inputValue.length;
	    const currList = this.getCurrList(propContainer);

	    return currList.filter(listElem => 
	        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
	    ).slice(0, 100);
	}

	getCurrList(propContainer) {
		const { filter, stList, indicatorList, instList } = propContainer;

		if (filter == "states") {
			return stList;
		} else if (filter == "institutions") {
			return instList;
		} else if (filter == "indicators") {
			return indicatorList;
		} else {
			return [...stList, ...indicatorList, ...instList];
		}
	}

	getSuggestionValue(suggestion) {
		console.log("getSuggestionValue")
		return suggestion.path
	}

	renderSuggestion(suggestion) {
	  const iconType = suggestion.type == "state" ? 'map-marker' : 'institution';
	  return (
	    <div className="react-autosuggest__suggestion-div">
	    	<div className="react-autosuggest__suggestion__label">
	      		<SvgIcon name={iconType} />
	      		<h5 className="react-autosuggest__suggestion__label__text">{suggestion.type}</h5>
	      	</div>
	      	<h5 className="react-autosuggest__suggestion__text">{suggestion.name}</h5>
	    </div>
	  );
	}

	renderSuggestionSimple(suggestion) {
	  let iconType;
	  if (suggestion.type == "state") { 
	  	iconType = 'map-marker'; 
	  } else if (suggestion.type == "institution") { 
	  	iconType = "institution";
	  } else {
	  	iconType = "bar-chart";
	  }
	  return (
	    <div className="react-autosuggest__suggestion-div">
	      <SvgIcon name={iconType} />
	      <h5 className="react-autosuggest__suggestion__text">{suggestion.name}</h5>
	    </div>
	  );

	}

	getSuggestionCounts(value, propContainer) {
		console.log("getSuggestionCounts")
		const inputValue = value.trim().toLowerCase();
	    const inputLength = inputValue.length;
	    const { stList, indicatorList, instList} = propContainer;
	    let counts = {};

	    counts.states = stList.filter(listElem => 
		        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
		    ).length;
	   	counts.institutions = instList.filter(listElem => 
		        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
		    ).length;
	   	counts.indicators = indicatorList.filter(listElem => 
		        listElem.name.toLowerCase().slice(0, inputLength) === inputValue
		    ).length;
	   	counts.all = counts.states + counts.institutions + counts.indicators;

	   	console.log("counts!", counts);

	    return counts;
	}
}


const mapStateToProps = (state) => {
	console.log(state);
  return {
    stList: state.stList,
    indicatorList: state.indicatorList,
    instList: state.instList,
  }
}

export default connect(mapStateToProps)(SearchBox)