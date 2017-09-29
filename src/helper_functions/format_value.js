let d3 = require("d3");

var formatTime = d3.timeFormat("%B %d, %Y");

export function formatValue(value, format) {
	let retVal;

	switch(format) {
		case "number":
			return d3.format(",")(value);
		case "number_with_decimal_1":
			return d3.format(",.1f")(value);
		case "number_with_decimal_2":
			return d3.format(",.2f")(value);
		case "number_per_ten_thousand":
			return d3.format(",.2f")(Number(value)*10000);
		case "integer":
			return Math.round(value);
		case "year":
			return value;
		case "price":
			return d3.format("$,.0f")(value);
		case "price_with_decimal_1":
			return d3.format("$,.1f")(value);
		case "price_with_decimal_2":
			return d3.format("$,.2f")(value);
		case "percent_no_multiply":
			return d3.format(".1f")(value) + "%";
		case "percent":
			return d3.format(".0%")(value);
		case "string":
			return value ? value.replace(/<\/?[^>]+(>|$)/g, "") : "";
		case "rank":
		    let s = ["th","st","nd","rd"];
			let v = value%100;
		    return value+(s[(v-20)%10]||s[v]||s[0]);
		case "date":
			return formatTime(new Date(value));
		case "link":
			return value;
	}
}

export function roundLegendAxisVal(value, format) {
	if (value >= 1000000000) {
		let roundedVal = Math.round(value/10000000)

        return setRoundedDecimalPlace(roundedVal, format) + " billion"
	} else if (value >= 1000000) {
	    let roundedVal = Math.round(value/10000)
	    return setRoundedDecimalPlace(roundedVal, format) + " million"
	} else {
		return formatValue(value, format)
	}
}

function setRoundedDecimalPlace(value, format) {
	let formattedVal
	if (value % 10 != 0) {
		format = format + "_with_decimal_2"
		formattedVal = formatValue(value/100, format)
	} else if (value % 100 != 0) {
		format = format + "_with_decimal_1"
		formattedVal = formatValue(value/100, format)
	} else {
		formattedVal = formatValue(value/100, format)
	}

	return formattedVal;
}