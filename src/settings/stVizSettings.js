import { colors } from './../helper_functions/colors.js';

const stVizSettings = {
	"Schools" : [
		{
			title: "Institutional Breakdowns",
			callOutBoxSettings: null,
			paragraphSettings: null,
			source: "Federal Student Aid, College Scorecard",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "table",
					tableSettingsList: 
					[
						{
							headingLabels: ["Category", "Count"],
							variables: [
								{variable:"pub4yr", displayName:"Public Four-Year", format: "number" },
								{variable:"twoyrlesspublic", displayName:"Public Two-Year or Less", format: "number"},
								{variable:"nonprof4yr", displayName:"Non-Profit Four-Year", format: "number"},
								{variable:"forprofit", displayName:"For-Profit", format: "number"},
								{variable:"schools", displayName:"Total", format: "number", bold: true},
							],
						},
						{
							headingLabels: ["Category", "Count"],
							variables: [
								{variable:"degree", displayName:"Degree Granting", format: "number"},
								{variable:"hbcu", displayName:"HBCU", format: "number"},
							],
						}
					]
				}
			}
		},
		{
			title: "Sticker Price",
			callOutBoxSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "instateprice", displayName:"Rank among all states for lowest average in-state price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average in-district price was", ", the average in-state price was ", ", and the average out-of-state price was ", " at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"indistprice", format: "price" },
					{variable:"instateprice", format: "price"},
					{variable:"outstate", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "sticker-price",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Price",
					variables: [
						{variable:"indistprice", displayName:"In-district price", format: "price", color: colors.turquoise.light },
						{variable:"instateprice", displayName:"In-state price", format: "price", color: colors.turquoise.medium},
						{variable:"outstate", displayName:"Out-of-state price", format: "price", color: colors.turquoise.dark},
					]
				}
			}
		},
		{
			title: "Net Price",
			callOutBoxSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "netpriceinc", displayName:"Rank among all states for lowest net price for low-income students"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average cost of attendance after grant aid was ", ", and the average for low-income students was ", " at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"netprice", format: "price" },
					{variable:"netpriceinc", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "net-price",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Price",
					variables: [
						{variable:"netprice", displayName:"Net price", format: "price", color: colors.turquoise.light },
						{variable:"netpriceinc", displayName:"Net price for low-income students", format: "price", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Student Aid",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "fedaidperc", displayName:"Rank among all states for greatest share of students receiving federal grant aid"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average amount of federal aid received was ", ", and ", " of students received federal aid; and the average amount of total aid was ", ", and ", " of students received total aid at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"avefedaid", format: "price" },
					{variable:"fedaidperc", format: "percent"},
					{variable:"avetotaid", format: "price"},
					{variable:"totaidperc", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "student-aid",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"fedaidperc", displayName:"Percent receiving federal aid", format: "percent", color: colors.turquoise.dark },
						{variable:"totaidperc", displayName:"Percent receiving total aid", format: "percent", color: colors.purple.dark },
					]
				},
				chart2Settings: {
					type: "grouped-bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avefedaid", displayName:"Average federal aid", format: "price", color: colors.turquoise.light },
						{variable:"avetotaid", displayName:"Average total aid", format: "price", color: colors.purple.light },

					]
				},
				
			}
		},
		{
			title: "Graduation Rates",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "gradtot", displayName:"Rank among all states for highest graduation rate"},
				]
			},
			paragraphSettings: {
				textSections: [["", " of students graduated, and ", " of bachelor’s degree students graduated at ", " institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"gradtot", format: "percent" },
					{variable:"gradbach", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "graduation-rate",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"gradtot", displayName:"Graduation rate", format: "percent", color: colors.turquoise.light },
						{variable:"gradbach", displayName:"Bachelor's degree graduation rate", format: "percent", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Retention Rates",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "retrate", displayName:"Rank among all states for highest average retention rate"},
				]
			},
			paragraphSettings: {
				textSections: [["Retention rates averaged ", " at ", " institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"retrate", format: "percent" },
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "retention-rate",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"retrate", displayName:"Retention rate", format: "percent", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "Transfer Students",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "transfer", displayName:"Share of all students who transferred institutions", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of students at ", " institutions were transfer students."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"transfer", format: "percent" },
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"transfer", displayName:"Share of transfer students", format: "percent", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "SAT/ACT Average",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "sat_avg_all", displayName:"SAT/ACT average", format: "number"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, students enrolled at ", " institutions scored an SAT/ACT average of ", "."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"sat_avg_all", format: "number"},
				]
			},
			source: "IPEDS",
			indicatorLink: "sat-act-average",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"sat_avg_all", displayName:"SAT/ACT average", format: "number", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "Instructional Expenses",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "inexpfte", displayName:"Rank among all states for greatest average instructional expenses per full-time equivalent"},
				]
			},
			paragraphSettings: {
				textSections: [["Instructional expenses averaged ", " and tuition averaged ", " at ", " institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"inexpfte", format: "price" },
					{variable:"tuitfte", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "instructional-expenses",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"inexpfte", displayName:"Instructional expenses per FTE", format: "price", color: colors.turquoise.light},
						{variable:"tuitfte", displayName:"Tuition per FTE", format: "price", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Endowment",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "endowment", displayName:"Average endowment of state’s institutions", format: "price"},
				]
			},
			paragraphSettings: {
				textSections: [["Endowment averaged ", " at ", " institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"endowment", format: "price" },
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "endowment",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"endowment", displayName:"Endowment", format: "price", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "90/10 Proportion",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "prop_9010", displayName:"Share of state’s institutions which received over 90 percent of their revenue from federal sources", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of ", " institutions received over 90 percent of their revenue from federal sources, violating the 90/10 rule."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"prop_9010", format: "percent" },
					{variable:"name", format: "string"},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: "90-10-proportion",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"prop_9010", displayName:"90/10 proportion", format: "percent", color: colors.turquoise.light },
					]
				}
			}
		},
		// {
		// 	title: "Congressional Districts",
		// 	callOutBoxSettings: {
		// 		type: "value",
		// 		variables: [
		// 			{variable: "", displayName:"Average number of institutions per congressional district", format: "number"}, // add variable
		// 		]
		// 	},
		// 	paragraphSettings: {
		// 		textSections: [["In @year, there was an average of ", " institutions per congressional district in ", "."],
		// 		variables: [
		// 			{variable:"", format: "number" },  // add variable
		// 			{variable:"name", format: "string"},
		// 		]
		// 	},
		// 	source: "IPEDS",
		// 	indicatorLink: null,
		// 	vizSettings: {  // add congressional state map
		// 	}
		// },
		
	], 
	"Students": [
		{
			title: "Enrollment by Student Type",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "ugenroll", displayName:"Undergraduate enrollment", format: "number"},
					{variable: "enroll", displayName:"Total enrollment", format: "number"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " institutions enrolled ", " undergraduate students and ", " graduate students; of these ", " were full-time students and ", " were part-time students."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"ugenroll", format: "number"},
					{variable:"gradenroll", format: "number"},
					{variable:"ftenroll", format: "number"},
					{variable:"ptenroll", format: "number"},
				]
			},
			source: "IPEDS",
			indicatorLink: "enrollment",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: colors.turquoise.light },
						{variable:"gradenroll", displayName:"Graduate", format: "number", color: colors.turquoise.dark},
						{variable:"ftenroll", displayName:"Full-time", format: "number", color: colors.purple.light},
						{variable:"ptenroll", displayName:"Part-time", format: "number", color: colors.purple.dark},
						{variable:"enroll", displayName:"Total", format: "number", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Enrollment by Race",
			callOutBoxSettings: null,
			paragraphSettings: {
				textSections: [["In @year, students at ", " institutions were ", " white, ", " black, ", " Asian, ", " Hispanic, ", " American Indian, ", " Hawaiian or Pacific Islander, ", " multiracial, ", " international, and ", " unknown."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"white", format: "percent"},
					{variable:"afam", format: "percent"},
					{variable:"hisp", format: "percent"},
					{variable:"asia", format: "percent"},
					{variable:"nhpi", format: "percent"},
					{variable:"amin", format: "percent" },
					{variable:"twoormore", format: "percent"},
					{variable:"nonresident", format: "percent"},
					{variable:"unknown", format: "percent"},
				]
			},
			source: "IPEDS",
			indicatorLink: "enrollment",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"white", displayName:"White", format: "percent", color: colors.turquoise.light },
						{variable:"afam", displayName:"Black", format: "percent", color: colors.blue.light},
						{variable:"hisp", displayName:"Hispanic", format: "percent", color: colors.red.light},
						{variable:"asia", displayName:"Asian", format: "percent", color: colors.purple.light},
						{variable:"nhpi", displayName:"Hawaiian/Pacific Islander", format: "percent", color: colors.orange},
						{variable:"amin", displayName:"American Indian", format: "percent", color: colors.yellow},
						{variable:"twoormore", displayName:"Two or more", format: "percent", color: colors.brown},
						{variable:"nonresident", displayName:"International", format: "percent", color: colors.grey.medium},
						{variable:"unk", displayName:"Unknown race", format: "percent", color: colors.grey.light},
					]
				}
			}
		},
		{
			title: "Enrollment by Gender",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "men", displayName:"Male", format: "percent"},
					{variable: "fem", displayName:"Female", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of students identified as male and ", " as female at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"men", format: "percent" },
					{variable:"fem", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "enrollment",
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"men", displayName:"Male", format: "percent", color: colors.turquoise.light},
						{variable:"fem", displayName:"Female", format: "percent", color: colors.purple.light },
					]
				}
			}
		},
		{
			title: "Enrollment by Financial Need",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "loan_ever", displayName:"Ever borrowed federal loans", format: "percent"},
					{variable: "pell_ever", displayName:"Ever received a Pell Grant", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of students had taken out at least one federal student loan and ", " of students had ever received Pell Grants at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"loan_ever", format: "percent"},
					{variable:"pell_ever", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "enrollment",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"loan_ever", displayName:"Ever borrowed federal loans", format: "percent", color: colors.turquoise.light },
						{variable:"pell_ever", displayName:"Ever received Pell Grant", format: "percent", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Enrollment by Nontraditional Students",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "first_gen", displayName:"First generation", format: "percent"},
					{variable: "independent", displayName:"Independent", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of students were the first in their families to go to college; ", " of students were married; ", " of students were financially independent from their parents or other family; and ", " of students were veterans at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"first_gen", format: "percent" },
					{variable:"married", format: "percent"},
					{variable:"independent", format: "percent"},
					{variable:"veteran", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "enrollment",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"first_gen", displayName:"First generation", format: "percent", color: colors.turquoise.light},
						{variable:"married", displayName:"Married", format: "percent", color: colors.blue.light},
						{variable:"independent", displayName:"Independent", format: "percent", color: colors.red.light},
						{variable:"veteran", displayName:"Veterans", format: "percent", color: colors.purple.light},
					]
				}
			}
		},
	],
	"Grants": [
		// Federal Work-Study and SEOG need an * with the following, on this graphic and the next one: SEOG and Federal Work-Study are campus-based aid programs, dollars are distributed to selected schools who then allocate awards to students at their discretion. Other grants are available to students at all institutions.

		{
			title: "Grant Disbursments (Volume)",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "pelldisburse", displayName:"Pell Grant disbursements", format: "price"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions disbursed ", " in Pell Grants; ", " in Federal Supplemental Education Opportunity Grants; ", " in TEACH Grants; ", " in Iraq/Afghanistan Service Grants; and ", " in Federal Work-Study to students in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"pelldisburse", format: "price"},
					{variable:"seogdisburse", format: "price" },
					{variable:"teachdisburse", format: "price"},
					{variable:"iraqdisburse", format: "price"},
					{variable:"workdisburse", format: "price"},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Disbursements",
					variables: [
						{variable:"pelldisburse", displayName:"Pell Grants", format: "price", color: colors.turquoise.light },
						{variable:"seogdisburse", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.blue.light},
						{variable:"teachdisburse", displayName:"TEACH Grants", format: "price", color: colors.red.light},
						{variable:"iraqdisburse", displayName:"Iraq/Afghanistan Service Grants", format: "price", color: colors.purple.light},
						{variable:"workdisburse", displayName:"Federal Work-Study", format: "price", color: colors.yellow},
					]
				}
			}
		},
		{
			title: "Grant Recipients",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "pellrecip", displayName:"Pell Grant recipients", format:"number"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions awarded ", " Pell Grants; ", " Federal Supplemental Education Opportunity Grants; ", " TEACH Grants; ", " Iraq/Afghanistan Service Grants; and ", " Federal Work-Study awards in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"pellrecip", format: "number"},
					{variable:"seogrecip", format: "number" },
					{variable:"teachrecip", format: "number"},
					{variable:"iraqrecip", format: "number"},
					{variable:"workrecip", format: "number"},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Disbursements",
					variables: [
						{variable:"pellrecip", displayName:"Pell Grants", format: "price", color: colors.turquoise.light },
						{variable:"seogrecip", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.blue.light},
						{variable:"teachrecip", displayName:"TEACH Grants", format: "price", color: colors.red.light},
						{variable:"iraqrecip", displayName:"Iraq/Afghanistan Service Grants", format: "price", color: colors.purple.light},
						{variable:"workrecip", displayName:"Federal Work-Study", format: "price", color: colors.yellow},
					]
				}
			}
		},
		{
			title: "Pell Awards",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "avepell", displayName:"Average Pell award", format:"price"},
					{variable: "pellperc", displayName:"Percent Pell recipients", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average Pell Grant award was ", ", and ", " of students received awards at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"avepell", format: "price" },
					{variable:"pellperc", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "pell-grants",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"pellperc", displayName:"Percent receiving Pell Grants", format: "percent", color: colors.turquoise.dark },
					]
				},
				chart2Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avepell", displayName:"Average Pell Grant award", format: "price", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "State and Local Aid",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "avestatelocalaid", displayName:"Average amount of state and local aid", format:"price"},
					{variable: "statelocalaidperc", displayName:"Percent receiving state and local aid", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average amount of state and local aid awarded was ", ", and ", " of students received awards at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"avestatelocalaid", format: "price" },
					{variable:"statelocalaidperc", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "state-local-aid",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"statelocalaidperc", displayName:"Percent receiving state and local aid", format: "percent", color: colors.purple.dark },
					]
				},
				chart2Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avestatelocalaid", displayName:"Average state and local aid", format: "price", color: colors.purple.light },
					]
				}
			}
		},
	], 
	"Loans": [
		{
			title: "Loan Disbursements (Volume)",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "dltotaldisburse", displayName:"Total direct loan volume", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions disbursed ", " in subsidized Stafford Loans to undergraduates; ", " in unsubsidized Stafford Loans to undergraduates; ", " in unsubsidized graduate Stafford Loans; ", " in Graduate PLUS Loans; ", " in Parent PLUS Loans; and ", " in Perkins Loans to students in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"allsubdisburse", format: "price"},
					{variable:"allunsubdisburse", format: "price"},
					{variable:"perkdisburse", format: "price"},
					{variable:"dlsubgraddisburse", format: "price"},
					{variable:"allgraddisburse", format: "price"},
					{variable:"allparentdisburse", format: "price"},
					{variable:"alltotaldisburse", format: "price"},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"allsubdisburse", displayName:"Subsidized Stafford", format: "price", color: colors.turquoise.light},
						{variable:"allunsubdisburse", displayName:"Unsubsidized Stafford", format: "price", color: colors.turquoise.medium},
						{variable:"perkdisburse", displayName:"Perkins", format: "price", color: colors.turquoise.dark},
						{variable:"dlsubgraddisburse", displayName:"Graduate Stafford", format: "price", color: colors.blue.light},
						{variable:"allgraddisburse", displayName:"Graduate PLUS", format: "price", color: colors.blue.medium},
						{variable:"allparentdisburse", displayName:"Parent PLUS", format: "price", color: colors.purple.light}, 
						{variable:"alltotaldisburse", displayName:"Total", format: "price", color: colors.grey.dark}, 
					]
				}
			}
		},
		{
			title: "Loan Recipients",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "dltotalrecip", displayName:"Total direct loan recipients", format:"number"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions authorized ", " subsidized Stafford Loans to undergraduates; ", " unsubsidized Stafford Loans to undergraduates; ", " unsubsidized graduate Stafford Loans; ", " Graduate PLUS Loans; ", " Parent PLUS Loans; and ", " Perkins Loans in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"allsubrecip", format: "number"}, 
					{variable:"allunsubrecip", format: "number"}, 
					{variable:"perkrecip", format: "number"},
					{variable:"dlsubgradrecip", format: "number"},
					{variable:"allgradrecip", format: "number"}, 
					{variable:"allparentrecip", format: "number"}, 
					{variable:"alltotalrecip", format: "number"},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"allsubrecip", displayName:"Subsidized Stafford", format: "price", color: colors.turquoise.light }, 
						{variable:"allunsubrecip", displayName:"Unsubsidized Stafford", format: "price", color: colors.turquoise.medium},
						{variable:"perkrecip", displayName:"Perkins", format: "price", color: colors.turquoise.dark},
						{variable:"dlsubgradrecip", displayName:"Graduate Stafford", format: "price", color: colors.blue.light},
						{variable:"allgradrecip", displayName:"Graduate PLUS", format: "price", color: colors.blue.medium}, 
						{variable:"allparentrecip", displayName:"Parent PLUS", format: "price", color: colors.purple.light}, 
						{variable:"alltotalrecip", displayName:"Total", format: "price", color: colors.grey.dark}, 
					]
				}
			}
		},
		{
			title: "Repayment Rates by Gender",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "male_rpy_3yr_rt", displayName:"Male", format:"percent"},
					{variable: "female_rpy_3yr_rt", displayName:"Female", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for male students and ", " for female students at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"male_rpy_3yr_rt", format: "percent"},
					{variable:"female_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"male_rpy_3yr_rt", displayName:"Male", format: "percent", color: colors.turquoise.light },
						{variable:"female_rpy_3yr_rt", displayName:"Female", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Parental Education",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "firstgen_rpy_3yr_rt", displayName:"First generation", format:"percent"},
					{variable: "notfirstgen__rpy_3yr_rt", displayName:"Non-first generation", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for first-generation students and ", " for students with at least one parent who holds a college degree at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"firstgen_rpy_3yr_rt", format: "percent"},
					{variable:"notfirstgen__rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"firstgen_rpy_3yr_rt", displayName:"First generation", format: "percent", color: colors.turquoise.light },
						{variable:"notfirstgen__rpy_3yr_rt", displayName:"Non-first generation", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Pell Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "pell_rpy_3yr_rt", displayName:"Pell recipients", format:"percent"},
					{variable: "nopell_rpy_3yr_rt", displayName:"Non-Pell recipients", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for Pell Grant recipients and ", " for students who did not receive Pell Grants at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"pell_rpy_3yr_rt", format: "percent"},
					{variable:"nopell_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"pell_rpy_3yr_rt", displayName:"Received Pell Grant", format: "percent", color: colors.turquoise.light },
						{variable:"nopell_rpy_3yr_rt", displayName:"Did not receive Pell Grant", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Completion Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "compl_rpy_3yr_rt", displayName:"Completers", format:"percent"},
					{variable: "noncom_rpy_3yr_rt", displayName:"Students who withdrew", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for graduates and ", " for students who withdrew from ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"compl_rpy_3yr_rt", format: "percent"},
					{variable:"noncom_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"compl_rpy_3yr_rt", displayName:"Completed", format: "percent", color: colors.turquoise.light },
						{variable:"noncom_rpy_3yr_rt", displayName:"Withdrew", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Income",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "lo_inc_rpy_3yr_rt", displayName:"Low-income", format:"percent"},
					{variable: "md_inc_rpy_3yr_rt", displayName:"Middle-income", format:"percent"},
					{variable: "hi_inc_rpy_3yr_rt", displayName:"High-income", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for low-income students, ", " for middle-income students, and ", " for high-income students at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"lo_inc_rpy_3yr_rt", format: "percent"},
					{variable:"md_inc_rpy_3yr_rt", format: "percent"},
					{variable:"hi_inc_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"lo_inc_rpy_3yr_rt", displayName:"Low-income", format: "percent", color: colors.turquoise.light},
						{variable:"md_inc_rpy_3yr_rt", displayName:"Middle-income", format: "percent", color: colors.turquoise.medium},
						{variable:"hi_inc_rpy_3yr_rt", displayName:"High-income", format: "percent", color: colors.turquoise.dark},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Dependency Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "dep_rpy_3yr_rt", displayName:"Dependent", format:"percent"},
					{variable: "ind_rpy_3yr_rt", displayName:"Independent", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for dependent students and ", " for independent students at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"dep_rpy_3yr_rt", format: "percent"},
					{variable:"ind_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"dep_rpy_3yr_rt", displayName:"Dependent", format: "percent", color: colors.turquoise.light },
						{variable:"ind_rpy_3yr_rt", displayName:"Independent", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Cohort Default Rates",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "cdr3", displayName:"Three-year cohort default rate", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year cohort default rate was ", " and the two-year cohort default rate was ", " at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"cdr2", format: "percent"},
					{variable:"cdr3", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cohort-default-rates",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Default Rate",
					variables: [
						{variable:"cdr2", displayName:"Two-year default rates", format: "percent", color: colors.turquoise.light },
						{variable:"cdr3", displayName:"Three-year default rates", format: "percent", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Average Student Borrowing",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "avefedloan", displayName:"Average federal loan", format:"price"},
					{variable: "aveotherloan", displayName:"Average other loan", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average federal student loan was ", ", and ", " of students received federal student loans; and the average other loan was ", ", and ", " of students received other loans at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"avefedloan", format: "price"},
					{variable:"fedloanperc", format: "percent"},
					{variable:"aveotherloan", format: "price"},
					{variable:"otherloanperc", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "student-loans",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"fedloanperc", displayName:"Percent receiving federal loans", format: "percent", color: colors.turquoise.dark },
						{variable:"otherloanperc", displayName:"Percent receiving other loans", format: "percent", color: colors.purple.dark },
					]
				},
				chart2Settings: {
					type: "grouped-bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avefedloan", displayName:"Average federal loan", format: "price", color: colors.turquoise.light },
						{variable:"aveotherloan", displayName:"Average other loan", format: "price", color: colors.purple.light },

					]
				},
				
			}
		},
	], 
	"Outcomes" : [
		{
			title: "Median Earnings",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "md_earn_wne_p10", displayName:"Rank among all states for greatest 10-year median earnings"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, median earnings six years after enrolling in school were ", ", median earnings after eight years were ", ", and median earnings after 10 years were ", " for graduates of ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"md_earn_wne_p6", format: "price"},
					{variable:"md_earn_wne_p8", format: "price"},
					{variable:"md_earn_wne_p10", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"md_earn_wne_p6", displayName:"6-year", format: "price", color: colors.turquoise.light },
						{variable:"md_earn_wne_p8", displayName:"8-year", format: "price", color: colors.turquoise.medium},
						{variable:"md_earn_wne_p10", displayName:"10-year", format: "price", color: colors.turquoise.dark},
					]
				}
			}
		},
		{
			title: "Mean Earnings by Gender",
			callOutBoxSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "", displayName:"Rank among all states for smallest difference between 10-year median earnings of men and women"},  // add variable
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the mean earnings 10 years after enrolling in school were ", " for men and ", " for women at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"mn_earn_wne_male1_p10", format: "price"},
					{variable:"mn_earn_wne_male0_p10", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"mn_earn_wne_male1_p10", displayName:"Male", format: "price", color: colors.turquoise.light},
						{variable:"mn_earn_wne_male0_p10", displayName:"Female", format: "price", color: colors.purple.light},
						{variable:"mn_earn_wne_p10", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Mean Earnings by Dependency Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "mn_earn_wne_indep0_p10", displayName:"Dependent", format:"price"},
					{variable: "mn_earn_wne_indep1_p10", displayName:"Independent", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the mean earnings 10 years after enrolling in school were ", " for independent graduates and ", " for dependent graduates of ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"mn_earn_wne_indep0_p10", format: "price"},
					{variable:"mn_earn_wne_indep1_p10", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"mn_earn_wne_indep0_p10", displayName:"Dependent", format: "price", color: colors.turquoise.light},
						{variable:"mn_earn_wne_indep1_p10", displayName:"Independent", format: "price", color: colors.purple.light},
						{variable:"mn_earn_wne_p10", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Share Earning Over $25,000",
			callOutBoxSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "gt_25k_p10", displayName:"Rank among all states for greatest share of students earning more than $25,000 per year"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the share of former students of ", " institutions earning over $25,000 was ", " seven years after entry, ", " eight years after entry, ", " nine years after entry, and ", " 10 years after initially enrolling in school."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"gt_25k_p7", format: "percent"},
					{variable:"gt_25k_p8", format: "percent"},
					{variable:"gt_25k_p9", format: "percent"},
					{variable:"gt_25k_p10", format: "percent"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"gt_25k_p7", displayName:"7 years out", format: "percent", color: colors.turquoise.light},
						{variable:"gt_25k_p8", displayName:"8 years out", format: "percent", color: colors.turquoise.medium},
						{variable:"gt_25k_p9", displayName:"9 years out", format: "percent", color: colors.turquoise.dark},
						{variable:"gt_25k_p10", displayName:"10 years out", format: "percent", color: colors.black},
					]
				}
			}
		},
		{
			title: "Median Debt by Completion Status",
			callOutBoxSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "grad_debt_mdn", displayName:"Rank among all states for lowest median debt among completers"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for graduates and ", " for students who withdrew from ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"grad_debt_mdn", format: "price"},
					{variable:"wdraw_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"grad_debt_mdn", displayName:"Completed", format: "price", color: colors.turquoise.light},
						{variable:"wdraw_debt_mdn", displayName:"Withdrew", format: "price", color: colors.purple.light},
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Median Debt by Gender",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "male_debt_mdn", displayName:"Male", format:"price"},
					{variable: "female_debt_mdn", displayName:"Female", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for male students and ", " for female students at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"male_debt_mdn", format: "price"},
					{variable:"female_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"male_debt_mdn", displayName:"Male", format: "price", color: colors.turquoise.light},
						{variable:"female_debt_mdn", displayName:"Female", format: "price", color: colors.purple.light},
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Median Debt by Parental Education",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "firstgen_debt_mdn", displayName:"First generation", format:"price"},
					{variable: "notfirstgen_debt_mdn", displayName:"Non-first generation", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for first-generation students and ", " for students whose parents held a college degree at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"firstgen_debt_mdn", format: "price"},
					{variable:"notfirstgen_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"firstgen_debt_mdn", displayName:"First generation", format: "price", color: colors.turquoise.light},
						{variable:"notfirstgen_debt_mdn", displayName:"Non-first generation ", format: "price", color: colors.purple.light},
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Median Debt by Pell Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "pell_debt_mdn", displayName:"Pell recipients", format:"price"},
					{variable: "nopell_debt_mdn", displayName:"Non-Pell recipients", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for students who received Pell Grants and ", " for students who did not receive Pell Grants at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"pell_debt_mdn", format: "price"},
					{variable:"nopell_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"pell_debt_mdn", displayName:"Received Pell Grant", format: "price", color: colors.turquoise.light},
						{variable:"nopell_debt_mdn", displayName:"Did not receive Pell Grant", format: "price", color: colors.purple.light},
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Median Debt by Income",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "lo_inc_debt_mdn", displayName:"Low-income", format:"price"},
					{variable: "md_inc_debt_mdn", displayName:"Middle-income", format:"price"},
					{variable: "hi_inc_debt_mdn", displayName:"High-income", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for students from low-income backgrounds, ", " for students from middle-income backgrounds, and ", " for students from high-income backgrounds of ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"lo_inc_debt_mdn", format: "price"},
					{variable:"md_inc_debt_mdn", format: "price"},
					{variable:"hi_inc_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"lo_inc_debt_mdn", displayName:"Low-income", format: "price", color: colors.turquoise.light},
						{variable:"md_inc_debt_mdn", displayName:"Middle-income", format: "price", color: colors.turquoise.medium},
						{variable:"hi_inc_debt_mdn", displayName:"High-income", format: "price", color: colors.turquoise.dark},	
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
		{
			title: "Median Debt by Dependency Status",
			callOutBoxSettings: {
				type: "value",
				variables: [
					{variable: "dep_debt_mdn", displayName:"Dependent", format:"price"},
					{variable: "ind_debt_mdn", displayName:"Independent", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the median debt was ", " for dependent students and ", " for independent students at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"dep_debt_mdn", format: "price"},
					{variable:"ind_debt_mdn", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cumulative-loan-debt",
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"dep_debt_mdn", displayName:"Dependent", format: "price", color: colors.turquoise.light},
						{variable:"ind_debt_mdn", displayName:"Independent", format: "price", color: colors.purple.light},
						{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
					]
				}
			}
		},
	]
}

export default stVizSettings;