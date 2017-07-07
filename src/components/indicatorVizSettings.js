import { colors } from './../helper_functions/colors.js';


export const indicatorList = [
	{ name: "Enrollment", path: "enrollment", type: "indicator" },
	{ name: "Direct Loans", path: "direct_loans", type: "indicator" },
	{ name: "FFEL Loans", path: "ffel_loans", type: "indicator" },
	{ name: "Graduate PLUS Loans", path: "grad_plus_loans", type: "indicator" },
	{ name: "Parent PLUS Loans", path: "parent_plus_loans", type: "indicator" },
	{ name: "Perkins Loans", path: "perkins_loans", type: "indicator" },
	{ name: "Three-year Repayment Rates", path: "three_year_repay", type: "indicator" },
	{ name: "Cohort Default Rates", path: "cohort_default", type: "indicator" },
	{ name: "Student Loans", path: "student_loans", type: "indicator" },
	{ name: "Pell Grants", path: "pell_grants", type: "indicator" },
	{ name: "Supplemental Educational Opportunity Grants", path: "seog", type: "indicator" },
	{ name: "TEACH Grants", path: "teach_grants", type: "indicator" },
	{ name: "Iraq and Afghanistan Service Grants", path: "iraq_afghanistan_grants", type: "indicator" },
	{ name: "Federal Work Study", path: "fed_work_study", type: "indicator" },
	{ name: "State and Local Aid", path: "state_local_aid", type: "indicator" },
	{ name: "Sticker Price", path: "sticker_price", type: "indicator" },
	{ name: "Net Price", path: "net_price", type: "indicator" },
	{ name: "Instructional Expenses", path: "instructional_expenses", type: "indicator" },
	{ name: "Graduation Rate", path: "grad_rate", type: "indicator" },
	{ name: "Endowment", path: "endowment", type: "indicator" },
	{ name: "90/10 Proportion", path: "9010_proportion", type: "indicator" },
	{ name: "SAT/ACT Average", path: "sat_act_average", type: "indicator" },
	{ name: "Historically Black Colleges and Universities", path: "hbcu", type: "indicator" },
	{ name: "Student Aid", path: "student_aid", type: "indicator" },
	{ name: "Postgraduate Earnings", path: "postgrad_earnings", type: "indicator" },
	{ name: "Student Loan Debt", path: "student_loan_debt", type: "indicator" },
]

export const indicatorVizSettings = {
	"enrollment": {
		title: "Enrollment",
		image: "../img/school.jpg",
		collection: "students",
		description: "The IPEDS Fall Enrollment (EF) count is a yearly headcount of an institution’s students who are: enrolled in courses for credit towards a degree or certificate; enrolled in courses as part of a vocational or occupational program (including at off-campus extension centers); and high school students taking regular college courses for credit. This indicator is a numerical value representing the number of students, and is also available according to student program type, including the numbers of full-time, part-time enrollment, graduate, and undergraduate students.",
		sources: [{ name: "NCES", url: "https://surveys.nces.ed.gov/ipeds/VisGlossaryPopup.aspx?idlink=802" }],
		filterCategories: [
			{
				label:"Category1",
				filters:[
					{variable:"value", displayName:"Value", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
					{variable:"value1", displayName:"Value1", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.blue.light, colors.blue.dark]},
					{variable:"value2", displayName:"Value2", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.red.light, colors.red.dark]},
				],
			},
			{
				label:"Category2",
				filters:[
					{variable:"value3", displayName:"Value3", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
					{variable:"value4", displayName:"Value4", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.blue.light, colors.blue.dark]},
				],
			},
			{
				label:"Category3",
				filters:[
					{variable:"value", displayName:"Value", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
				],
			},
		]
	}
}