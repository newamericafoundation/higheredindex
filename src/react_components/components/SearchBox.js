import React from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest';
const d3 = require("d3");

import { fetchProfileList } from '../../actions';
import SvgIcon from './SvgIcon';
import { sortAlpha } from "../../helper_functions/sort_alpha.js";

class SearchBox extends React.Component {
  	constructor(props) {
  		super(props);

  		this.state = {
			value: '',
			numSuggestions: 100,
			suggestions: [],
			expanded: true,
	    };
  	}

  	componentWillMount() {
		const { dispatch, stList, indicatorList, instList, suggestionsChangedCallback } = this.props;

		if (stList.length == 0) {
			dispatch(fetchProfileList("state"))
		}
		if (indicatorList.length == 0) {
			dispatch(fetchProfileList("indicator"))
		}
		if (instList.length == 0) {
			dispatch(fetchProfileList("institution"))
		}

		let initialSuggestions = this.getSuggestions('', this.props) 

		if (initialSuggestions.length > 0) {
			if (suggestionsChangedCallback) {
		      	let counts = this.getSuggestionCounts(this.state.value, this.props);
		      	suggestionsChangedCallback(counts);
		    }
			this.setState({
				suggestions: initialSuggestions
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const { stList, indicatorList, instList, filter, suggestionsChangedCallback } = this.props;
		
		let suggestions = this.state.suggestions,
			suggestionsUpdated = false;

		if (stList.length != nextProps.stList.length || instList.length != nextProps.instList.length || indicatorList.length != nextProps.indicatorList.length || filter != nextProps.filter) {
			suggestions = this.getSuggestions(this.state.value, nextProps);
			suggestionsUpdated = true;
		}

		console.log("testing!!!", this.subfiltersChanged(nextProps))

		if (!suggestionsUpdated && this.subfiltersChanged(nextProps)) {
			console.log("getting new suggestions!")
			console.log(suggestions.length)
			suggestions = this.getSuggestions(this.state.value, nextProps);
			console.log(suggestions.length)
			suggestionsUpdated = true;
		}

		if (suggestionsChangedCallback && suggestionsUpdated) {
	        let counts = this.getSuggestionCounts(this.state.value, nextProps);
	        suggestionsChangedCallback(counts);
	    }

		if (suggestionsUpdated) {
			this.setState({
				suggestions: suggestions
			})
		}
	}

	subfiltersChanged(nextProps) {
		const { yearSubfilters, sectorSubfilters, stateSubfilter} = this.props;

		if (yearSubfilters && (yearSubfilters.length != nextProps.yearSubfilters.length)) {
			return true;
		}
		if (sectorSubfilters && (sectorSubfilters.length != nextProps.sectorSubfilters.length)) {
			return true;
		}
		if (stateSubfilter && (stateSubfilter !== nextProps.stateSubfilter)) {
			return true;
		}

		return false;
	}

  	render() {
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
			            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
			            onSuggestionsClearRequested={() => {}}
			            getSuggestionValue={this.getSuggestionValue}
			            renderSuggestion={suggestionRenderer.bind(this)}
			            focusFirstSuggestion = {true}
			            alwaysRenderSuggestions = {alwaysRenderSuggestions}
			            inputProps={inputProps} />
		        }
	      	</div>
	    );
	}

	onChange(event, { newValue, method }) {
		if (method === "type" || method === "click") {
			this.setState({
		        value: newValue
		    });
		}
	}

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested(props) {
		const { value, customNumSuggestions } = props
		if (this.props.suggestionsChangedCallback) {
	      	let counts = this.getSuggestionCounts(value, this.props);
	      	this.props.suggestionsChangedCallback(counts);
	    }

	    this.setState({
	      	suggestions: this.getSuggestions(value, this.props, customNumSuggestions),
	      	numSuggestions: customNumSuggestions || 100
	    });
	}

	onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
		this.setState({
			value: '',
			expanded: false
		})
	    browserHistory.push('/' + suggestion.type + '/' + suggestionValue);
	}

	getSuggestions(value, propContainer, customNumSuggestions) {
		const inputValue = value.trim().toLowerCase();
	    const inputLength = inputValue.length;
	    const currList = this.getCurrList(propContainer);

	    let retList = currList.filter(listElem => {
	        return this.shouldShowSuggestion(propContainer, listElem, inputValue, inputLength)
	    });

	    return retList.sort(sortAlpha).sort((a, b) => {
	   		return a.name.toLowerCase().indexOf(inputValue) - b.name.toLowerCase().indexOf(inputValue);
	   	}).slice(0, customNumSuggestions || 100);
	}

	shouldShowSuggestion(propContainer, suggestion, inputValue, inputLength) {
		const { yearSubfilters, sectorSubfilters, stateSubfilter } = propContainer
		let shouldShow = suggestion && suggestion.name ? suggestion.name.toLowerCase().includes(inputValue) : false
        if (suggestion.type == "institution" && yearSubfilters && sectorSubfilters && shouldShow) {
        	if (suggestion.sector) {
	        	let sectorSplitPieces = suggestion.sector.split(", ")
	    		shouldShow = (yearSubfilters.indexOf(sectorSplitPieces[1]) > -1) && (sectorSubfilters.indexOf(sectorSplitPieces[0]) > -1)
	    		if (shouldShow && stateSubfilter != "all") {
	    			shouldShow = stateSubfilter == suggestion.state
	    		}
	    	} else {
	    		shouldShow = false
	    	}
        }

        return shouldShow;
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

	getSuggestionValue(suggestion, a, b) {
		return suggestion.path
	}

	renderSuggestion(suggestion) {
	  	const {value} = this.state;

	  	const suggName = suggestion.name,
			valueIndex = suggestion.name.toLowerCase().indexOf(value);

	  	return (
		    <div className="react-autosuggest__suggestion-div">
		    	<div className="react-autosuggest__suggestion__label">
		      		<SvgIcon name={suggestion.type} />
		      		<h5 className="react-autosuggest__suggestion__label__text">{suggestion.type}</h5>
		      	</div>
		      	<h5 className="react-autosuggest__suggestion__text">
			      	{suggestion.name.slice(0, valueIndex)}
					<span className="highlighted">{suggestion.name.slice(valueIndex, valueIndex + value.length)}</span>
					{suggestion.name.slice(valueIndex + value.length, suggName.length)}
				</h5>
		    </div>
		);
	}

	renderSuggestionSimple(suggestion) {
		const {value} = this.state;

		const suggName = suggestion.name,
			valueIndex = suggestion.name.toLowerCase().indexOf(value);

		let iconType;
		if (suggestion.type == "state") { 
			iconType = 'state'; 
		} else if (suggestion.type == "institution") { 
			iconType = "institution";
		} else {
			iconType = "indicator";
		}
		return (
			<div className="react-autosuggest__suggestion-div">
			<SvgIcon name={iconType} />
			<h5 className="react-autosuggest__suggestion__text">
				{suggestion.name.slice(0, valueIndex)}
				<span className="highlighted">{suggestion.name.slice(valueIndex, valueIndex + value.length)}</span>
				{suggestion.name.slice(valueIndex + value.length, suggName.length)}
			</h5>
			</div>
		);
	}

	renderSuggestionsContainer({ containerProps, children }) {
	  	return (
		    <div {...containerProps} ref="itemsContainer" className="react-autosuggest__suggestions-container">
		      	{children}
		      	{this.props.alwaysRenderSuggestions && this.state.suggestions.length == this.state.numSuggestions &&
		      	<div className="react-autosuggest__load-more" onClick={() => { return this.loadMoreResults() }}>Load More Results</div>}
		    </div>
	  	);
	}

	loadMoreResults() {
		this.onSuggestionsFetchRequested({value:this.state.value, customNumSuggestions:this.state.numSuggestions + 100})
	}

	getSuggestionCounts(value, propContainer) {
		const inputValue = value.trim().toLowerCase();
	    const inputLength = inputValue.length;
	    const { stList, indicatorList, instList} = propContainer;
	    let counts = {};

	    counts.states = stList.filter(listElem => this.shouldShowSuggestion(propContainer, listElem, inputValue, inputLength)).length;
	   	counts.institutions = instList.filter(listElem => this.shouldShowSuggestion(propContainer, listElem, inputValue, inputLength)).length;
	   	counts.indicators = indicatorList.filter(listElem => this.shouldShowSuggestion(propContainer, listElem, inputValue, inputLength)).length;
	   	counts.all = counts.states + counts.institutions + counts.indicators;

	    return counts;
	}
}

const mapStateToProps = (state) => {
  	return {
	    stList: state.stList,
	    indicatorList: state.indicatorList,
	    instList: state.instList,
  	}
}

export default connect(mapStateToProps)(SearchBox)