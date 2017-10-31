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
				suggestions: newSuggestions.sort(sortAlpha)
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const { stList, indicatorList, instList, filter, suggestionsChangedCallback } = this.props;
		
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
				suggestions: newSuggestions.sort(sortAlpha)
			})
		}
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
			            getSuggestionValue={this.getSuggestionValue}
			            renderSuggestion={suggestionRenderer.bind(this)}
			            renderSuggestionsContainer={this.renderSuggestionsContainer.bind(this)}
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

	    return currList.filter(listElem => {
	        return listElem && listElem.name ? listElem.name.toLowerCase().includes(inputValue) : null
	    }).sort((a, b) => {
	    	
	   		return a.name.toLowerCase().indexOf(inputValue) - b.name.toLowerCase().indexOf(inputValue);
	   	}).slice(0, customNumSuggestions || 100);
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
		    <div {... containerProps} ref="itemsContainer" className="react-autosuggest__suggestions-container">
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

	    counts.states = stList.filter(listElem => 
		        listElem && listElem.name && listElem.name.toLowerCase().includes(inputValue)
		    ).length;
	   	counts.institutions = instList.filter(listElem => 
		        listElem && listElem.name && listElem.name.toLowerCase().includes(inputValue)
		    ).length;
	   	counts.indicators = indicatorList.filter(listElem => 
		        listElem && listElem.name && listElem.name.toLowerCase().includes(inputValue)
		    ).length;
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