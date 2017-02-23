import { colors } from './../helper_functions/colors.js';

const indicatorVizSettings = {
	"enrollment": {
		title: "Enrollment",
		image: "../img/school.jpg",
		collection: "students",
		description: "The IPEDS Fall Enrollment (EF) count is a yearly headcount of an institution’s students who are: enrolled in courses for credit towards a degree or certificate; enrolled in courses as part of a vocational or occupational program (including at off-campus extension centers); and high school students taking regular college courses for credit. This indicator is a numerical value representing the number of students, and is also available according to student program type, including the numbers of full-time, part-time enrollment, graduate, and undergraduate students.",
		sources: [{ name: "NCES", url: "https://surveys.nces.ed.gov/ipeds/VisGlossaryPopup.aspx?idlink=802" }],
		filters: [
			{variable:"value", displayName:"Value", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
			{variable:"value1", displayName:"Value1", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.blue.light, colors.blue.dark]},
			{variable:"value2", displayName:"Value2", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.red.light, colors.red.dark]},
		],
	}
}

export default indicatorVizSettings;