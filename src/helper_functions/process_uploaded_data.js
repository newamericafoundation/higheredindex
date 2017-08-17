import instVizSettings from "../settings/instVizSettings";
import stVizSettings from "../settings/stVizSettings";
import sectionSettings from "../settings/sectionSettings";

const yearRegEx = new RegExp('_[0-9]{4}');

export function validateData(inputData) {
	console.log(inputData)
	let nonAlphaNumericRegEx = /\W+/g

	let columnNames = Object.keys(inputData[0]);
	let colsToChange = []
	columnNames.forEach((column) => {
		let forbiddenChars = column.match(nonAlphaNumericRegEx);
		if (forbiddenChars && forbiddenChars.length > 0) {
			colsToChange.push(column)
		}
	})

	console.log(colsToChange);

	if (colsToChange.length > 0) {
		inputData.map((d) => {
			colsToChange.forEach((colName) => {
				d = replaceKey(colName, colName.replace(nonAlphaNumericRegEx, "_"), d)
			})
		})
	}
	console.log(inputData)

	return inputData;
}

function replaceKey(oldKey, newKey, dataObject) {
	if (oldKey !== newKey && dataObject[oldKey]) {
	    Object.defineProperty(dataObject, newKey,
	        Object.getOwnPropertyDescriptor(dataObject, oldKey));
	    delete dataObject[oldKey];
	}
	return dataObject;
}


export function nestYears(inputData) {
	let regEx = new RegExp('_[0-9]{4}');
	let retArray = [];
	inputData.forEach((d) => {
		let currItem = {};
		for (let key of Object.keys(d)) {
			if (regEx.test(key)) {
				let keyWithoutYears = key.replace(/_[0-9]{4}/i, ''),
					year = key.match(/[0-9]{4}/i);

				if (!(keyWithoutYears in currItem)) {
					currItem[keyWithoutYears] = {};
				} 
				currItem[keyWithoutYears][year] = d[key];
			} else {
				if (key == "INSTNM" || key == "school") {
					currItem.name = d[key];
				} else {
					currItem[key] = d[key];
				}
			}
		}
		if (Object.keys(d).length > 1) {
			retArray.push(currItem);
		}
	})

	return retArray;
}

export function addFullStateNames(inputData) {
	var abbreviationMappings = {
		AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California", CO:"Colorado", CT:"Connecticut", DC:"District of Columbia", DE:"Delaware", FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana", IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Michigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York", NC:"North Carolina", ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", PR:"Puerto Rico", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota", TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia", WA:"Washington", WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming"
	}

	inputData.map((d) => {
		if (d.state) {
			d.state_abbrev = d.state;
			d.name = abbreviationMappings[d.state];
		}
	})

	return inputData;
}

export function addPathKeys(inputData) {
	inputData.map((d) => {
		if (d.name) {
			d.path = d.name.toLowerCase().replace(/ /g, "_").replace("&", "and").replace(/,/g, "").replace(/-/g, "_").replace(/'/g, "")
		}
	})

	return inputData;
}

export function processUploadedData(inputData) {
	console.log(inputData)
	console.log("nesting years", inputData.length)
	let nested = nestYears(inputData);
	console.log("adding full names", nested.length)
	let withFullStateNames = addFullStateNames(nested);
	console.log("adding paths", withFullStateNames.length)
	let withPathKeys = addPathKeys(withFullStateNames);
	console.log("finished", withPathKeys.length)

	return withPathKeys;
}

export function checkForVariables(inputData, type, granularity) {
	let sectionSettings = getSectionSettings(type, granularity);
	console.log(sectionSettings)
	
	let sampleDatapoint = inputData[0];

	let unusedVars = new Set(),
		fullVarList = new Set();

	Object.keys(sampleDatapoint).forEach((varName) => {
		if (varName != "school" && varName != "name" ) {
			unusedVars.add(varName.replace(yearRegEx, ""))
			fullVarList.add(varName.replace(yearRegEx, ""))
		}
	})

	let retObject = {
		missingVars: new Set(),
		unusedVars: unusedVars,
		fullVarList: fullVarList
	}


	sectionSettings.forEach((section) => {
		console.log(section)
		if (section.calloutSettings) {
			retObject = checkSettingsSection(section.calloutSettings.variables, retObject)
		}
		if (section.paragraphSettings) {
			retObject = checkSettingsSection(section.paragraphSettings.variables, retObject)
		}
		if (section.vizSettings && section.vizSettings.chart1Settings.variables) {
			retObject = checkSettingsSection(section.vizSettings.chart1Settings.variables, retObject)
			if (section.vizSettings.chart2Settings) {
				retObject = checkSettingsSection(section.vizSettings.chart2Settings.variables, retObject)
			}
		}
	})

	return retObject;
}

function getSectionSettings(type, granularity) {
	let sectionName;
	if (granularity == "states") {
		sectionName = type[0].toUpperCase() + type.slice(1)

		return stVizSettings[sectionName];
	} else {
		if (type == "schools") {
			sectionName = "Overview"
		} else {
			sectionName = type[0].toUpperCase() + type.slice(1)
		}
		return instVizSettings[sectionName];
	}
}

function checkSettingsSection(variableList, retObject) {
	let {missingVars, unusedVars, fullVarList} = retObject;

	variableList.forEach((variable) => {
		if (variable.variable) {
			let varName = variable.variable;
		
			if (fullVarList.has(varName)) {
				unusedVars.delete(varName)
			} else {
				if (varName != "name") {
					missingVars.add(varName);
				}
			}
		}
	})

	return retObject;
}

