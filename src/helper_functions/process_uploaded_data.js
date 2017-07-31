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