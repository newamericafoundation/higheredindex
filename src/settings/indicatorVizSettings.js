import { colors } from './../helper_functions/colors.js';

export const indicatorList = [
	"enrollment":{ name: "Enrollment", type: "indicator" },
	"direct-loans":{ name: "Direct Loans", path: "direct_loans", type: "indicator" },
	"ffel-loans":{ name: "FFEL Loans", path: "ffel_loans", type: "indicator" },

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
		collection: "students",
		// filterCategories: [
		// 	{
		// 		label:"Category1",
		// 		filters:[
		// 			{variable:"value", displayName:"Value", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
		// 			{variable:"value1", displayName:"Value1", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.blue.light, colors.blue.dark]},
		// 			{variable:"value2", displayName:"Value2", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.red.light, colors.red.dark]},
		// 		],
		// 	},
		// 	{
		// 		label:"Category2",
		// 		filters:[
		// 			{variable:"value3", displayName:"Value3", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
		// 			{variable:"value4", displayName:"Value4", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.blue.light, colors.blue.dark]},
		// 		],
		// 	},
		// 	{
		// 		label:"Category3",
		// 		filters:[
		// 			{variable:"value", displayName:"Value", format:"number", scaleType:"quantize", numBins:5, customRange:[colors.white, colors.turquoise.light, colors.turquoise.dark]},
		// 		],
		// 	},
		// ]
	},
	"direct-loans": {
		collection: "students",
	},
	"ffel-loans": {
		collection: "students",
	},
	"campus-based-aid": {
		collection: "students",
	},
	"three-year-repayment-rates": {
		collection: "students",
	},
	"cohort-default-rates": {
		collection: "students",
	},
	"student-loans": {
		collection: "students",
	},
	"pell-grants": {
		collection: "students",
	},
	"teach-grants": {
		collection: "students",
	},
	"iraq-afghanistan-service-grants": {
		collection: "students",
	},
	"state-local-aid": {
		collection: "students",
	},
	"sticker-price": {
		collection: "students",
	},
	"net-price": {
		collection: "students",
	},
	"instructional-expenses": {
		collection: "students",
	},
	"retention-rate": {
		collection: "students",
	},
	"graduation-rate": {
		collection: "students",
	},
	"endowment": {
		collection: "students",
	},
	"90-10-proportion": {
		collection: "students",
	},
	"sat-act-average": {
		collection: "students",
	},
	"hcm2": {
		collection: "students",
	},
	"hbcu-msi": {
		collection: "students",
	},
	"student-aid": {
		collection: "students",
	},
	"postgraduate-earnings": {
		collection: "students",
	},
	"cumulative-loan-debt": {
		collection: "students",
	},
}