import { colors } from './../helper_functions/colors.js';

const stVizSettings = {
	"Schools" : [
		{
			title: "Institutional Breakdowns",
			calloutSettings: null,
			paragraphSettings: null,
			source: "Federal Student Aid, College Scorecard",
			indicatorLink: null,
			showCompareButton: false,
			vizSettings: {
				chart1Settings: {
					type: "table",
					tableSettingsList: 
					[
						{
							headingLabels: ["Category", "Count"],
							variables: [
								{variable:"pub4yr", displayName:"4-Year Public", format: "number" },
								{variable:"twoyrlesspublic", displayName:"2-Year Public", format: "number"},
								{variable:"nonprofit", displayName:"Private Nonprofit", format: "number"},
								{variable:"forprofit", displayName:"Private For-Profit", format: "number"},
								{variable:"schools", displayName:"Total", format: "number", bold: true},
							],
						},
						{
							headingLabels: ["Category", "Count"],
							variables: [
								{variable:"degree", displayName:"Degree Granting", format: "number"},
								{variable:"hbcu", displayName:"Historically Black Colleges/Universities", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"pbi", displayName:"Predominantly Black Institutions", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"aanhi", displayName:"Alaska Native Native Hawaiian Serving Institutions", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"tribal", displayName:"Tribal Colleges/Universities", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"aanapii", displayName:"Asian American Native American Pacific Islander Serving Institutions", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"hsi", displayName:"Hispanic Serving Institutions", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"nanti", displayName:"Native American (Non-Tribal) Institutions", format: "number", linkTo: "/indicator/hbcu-msi"},
								{variable:"prop9010", displayName:"90/10 Proportion", format: "number", linkTo: "/indicator/90-10-proportion"},
							],
						}
					]
				}
			}
		},
		// {
		// 	title: "Sticker Price",
		// 	sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit", "forprofit": "Private For-Profit"},
		// 	calloutSettings: {
		// 		type: "ranking",
		// 		direction: "lowest",
		// 		variables: [
		// 			{variable: "instateprice", displayName:"Rank among all states for lowest average in-state tuition @sector"},
		// 		]
		// 	},
		// 	paragraphSettings: {
		// 		textSections: [["In @year, the average in-district tuition was ", ", the average in-state tuition was ", ", and the average out-of-state tuition was ", " at ", " @sector institutions."],
		// 			["The following chart depicts trends over time."]],
		// 		variables: [
		// 			{variable:"indistprice", format: "price" },
		// 			{variable:"instateprice", format: "price"},
		// 			{variable:"outstateprice", format: "price"},
		// 			{variable:"name", format: "string"},
		// 		]
		// 	},
		// 	source: "IPEDS",
		// 	indicatorLink: "sticker-price",
		// showCompareButton: true,	
		// vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Price",
		// 			variables: [
		// 				{variable:"indistprice", displayName:"In-district", format: "price", color: colors.turquoise.light },
		// 				{variable:"instateprice", displayName:"In-state", format: "price", color: colors.turquoise.medium},
		// 				{variable:"outstateprice", displayName:"Out-of-state", format: "price", color: colors.turquoise.dark},
		// 			]
		// 		}
		// 	}
		// },
		{
			title: "Net Price",
			calloutSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "netpriceincpub", displayName:"Rank among all states for lowest net price for low-income students at public institutions"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average cost of attendance after grant aid was ", " at public institutions and ", " at private institutions; and the average for low-income students was ", " at public institutions and ", " at private institutions in ", "."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"netpricepub", format: "price"},
					{variable:"netpricepriv", format: "price"},
					{variable:"netpriceincpub", format: "price"},
					{variable:"netpriceincpriv", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "net-price",
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Price",
					variables: [
						{variable:"netpricepub", displayName:"Public institutions", format: "price", color: colors.turquoise.light },
						{variable:"netpriceincpub", displayName:"Public institutions (low-income)", format: "price", color: colors.turquoise.medium },
						{variable:"netpricepriv", displayName:"Private institutions", format: "price", color: colors.purple.light},
						{variable:"netpriceincpriv", displayName:"Private institutions (low-income)", format: "price", color: colors.purple.medium},
					]
				}
			}
		},
		{
			title: "Student Aid",
			sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit", "forprofit": "Private For-Profit"},
			calloutSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "fedaidperc", displayName:"Rank among all states for greatest share of students receiving federal grant aid @sector"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the average amount of federal aid received was ", ", and ", " of students received federal aid; and the average amount of total aid was ", ", and ", " of students received total aid at ", " @sector institutions."],
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
			showCompareButton: true,
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
			sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit", "forprofit": "Private For-Profit"},
			calloutSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "gradtot", displayName:"Rank among all states for highest overall graduation rate @sector"},
				]
			},
			paragraphSettings: {
				textSections: [["", " of students graduated, and ", " of bachelor’s degree students graduated at ", " @sector institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"gradtot", format: "percent" },
					{variable:"gradbach", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "graduation-rate",
			showCompareButton: true,
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
			sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit", "forprofit": "Private For-Profit"},
			calloutSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "retrate", displayName:"Rank among all states for highest average retention rate @sector"},
				]
			},
			paragraphSettings: {
				textSections: [["Retention rates averaged ", " at ", " @sector institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"retrate", format: "percent" },
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "retention-rate",
			showCompareButton: true,
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
			sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit", "forprofit": "Private For-Profit"},
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "transfer", displayName:"Share of all students at who transferred institutions @sector", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of students at ", " @sector institutions were transfer students. (Unlike graduation rates, disclosure of transfer-out rates is not required under federal law, these are instead voluntarily reported by institutions.)"],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"transfer", format: "percent" },
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: null,
			showCompareButton: true,
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
			title: "Endowment",
			sectorOptions: { "all": "All Sectors", "public4": "4-Year Public", "public2": "2-Year Public", "nonprofit": "Private Nonprofit"},
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "endowment", displayName:"Total endowment of state’s institutions @sector", format: "price"},
				]
			},
			paragraphSettings: {
				textSections: [["Endowment totaled ", " at ", " @sector institutions in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"endowment", format: "price" },
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: "endowment",
			showCompareButton: false,
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
			title: "Congressional Districts",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "", displayName:"Average number of institutions per congressional district", format: "number"}, // add variable
				]
			},
			paragraphSettings: {
				textSections: [["There is an average of ", " institutions per congressional district in ", "."]],
				usesCongressionalDistrictAggregate: true,
				variables: [
					{congressionalDistrictAggregate: true},  // add variable
					{variable:"name", format: "string"},
				]
			},
			source: "IPEDS",
			indicatorLink: null,
			showCompareButton: false,
			vizSettings: {
				chart1Settings: {
					type: "state-map",
					variables: [
						{variable:"cngdstcd", displayName:"Congressional District", format: "number"},
					]
				}
			}
		},
	], 
	"Students": [
		{
			title: "Enrollment by Student Type",
			calloutSettings: {
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
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: colors.turquoise.light },
						{variable:"gradenroll", displayName:"Graduate", format: "number", color: colors.turquoise.dark},
						{variable:"ftenroll", displayName:"Full-time", format: "number", color: colors.purple.light},
						{variable:"ptenroll", displayName:"Part-time", format: "number", color: colors.purple.medium},
						{variable:"enroll", displayName:"Total", format: "number", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Enrollment by Race",
			calloutSettings: null,
			paragraphSettings: {
				textSections: [["In @year, students at ", " institutions were ", " white, ", " black, ", " Hispanic, ", " Asian, ", " American Indian, ", " Hawaiian or Pacific Islander, ", " multiracial, ", " international, and ", " unknown."],
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
					{variable:"unk", format: "percent"},
				]
			},
			source: "IPEDS",
			indicatorLink: "enrollment",
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"white", displayName:"White", format: "percent", color: colors.turquoise.light },
						{variable:"afam", displayName:"Black", format: "percent", color: colors.blue.light},
						{variable:"hisp", displayName:"Hispanic", format: "percent", color: colors.red.light},
						{variable:"asia", displayName:"Asian", format: "percent", color: colors.purple.light},
						{variable:"nhpi", displayName:"Hawaiian/Pacific Islander", format: "percent", color: colors.orange.light},
						{variable:"amin", displayName:"American Indian", format: "percent", color: colors.yellow.light},
						{variable:"twoormore", displayName:"Two or more", format: "percent", color: colors.brown.light},
						{variable:"nonresident", displayName:"International", format: "percent", color: colors.grey.medium},
						{variable:"unk", displayName:"Unknown race", format: "percent", color: colors.grey.light},
					]
				}
			}
		},
		{
			title: "Enrollment by Gender",
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "loan_ever", displayName:"Aid recipients who ever borrowed federal loans", format: "percent"},
					{variable: "pell_ever", displayName:"Aid recipients who ever received a Pell Grant", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of aid recipients had taken out at least one federal student loan and ", " of aid recipients had ever received Pell Grants at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"loan_ever", format: "percent"},
					{variable:"pell_ever", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "enrollment",
			showCompareButton: true,
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
			title: "Enrollment by Student Characteristics",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "first_gen", displayName:"First generation aid recipients", format: "percent"},
					{variable: "independent", displayName:"Independent aid recipients", format: "percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, ", " of aid recipients were the first in their families to go to college; ", " of aid recipients were married; ", " of aid recipients were financially independent from their parents or other family; and ", " of aid recipients were veterans at ", " institutions."],
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
			showCompareButton: true,
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
		{
			title: "Grant Disbursments (Volume)",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "pelldisburse", displayName:"Pell Grant disbursements", format: "price"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions disbursed ", " in ", "; ", " in ","; ", " in ","; ", " in ","; ", " in ","; ", " in ","; and ", " in ", " ", " to students in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"pelldisburse", format: "price"},
					{linkText:"Pell Grants", linkUrl:"/indicator/pell-grants"},
					{variable:"seogdisburse", format: "price" },
					{linkText:"Federal Supplemental Education Opportunity Grants", linkUrl:"/indicator/campus-based-aid"},
					{variable:"teachdisburse", format: "price"},
					{linkText:"TEACH Grants", linkUrl:"/indicator/teach-grants"},
					{variable:"iraqdisburse", format: "price"},
					{linkText:"Iraq/Afghanistan Service Grants", linkUrl:"/indicator/iraq-afghanistan-service-grants"},
					{variable:"acgdisburse", format: "price"},
					{linkText:"Academic Competitiveness Grants", linkUrl:"/indicator/acg-and-smart-grants"},
					{variable:"smartdisburse", format: "price"},
					{linkText:"SMART Grants", linkUrl:"/indicator/acg-and-smart-grants"},
					{variable:"workdisburse", format: "price"},
					{linkText:"Federal Work-Study", linkUrl:"/indicator/campus-based-aid"},
					{explainerText:"SEOG and Federal Work Study are campus-based aid programs. Dollars are distributed to selected schools, which then allocate awards to students at their discretion. Other grants are available to students at all institutions."},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Disbursements",
					variables: [
						{variable:"pelldisburse", displayName:"Pell Grants", format: "price", color: colors.turquoise.light },
						{variable:"seogdisburse", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.blue.light},
						{variable:"teachdisburse", displayName:"TEACH Grants", format: "price", color: colors.red.light},
						{variable:"iraqdisburse", displayName:"Iraq/Afghanistan Service Grants", format: "price", color: colors.purple.light},
						{variable:"acgdisburse", displayName:"Academic Competitiveness Grants", format: "price", color: colors.orange.light},
						{variable:"smartdisburse", displayName:"SMART Grants", format: "price", color: colors.brown.light},						
						{variable:"workdisburse", displayName:"Federal Work-Study", format: "price", color: colors.yellow.light},
					]
				}
			}
		},
		{
			title: "Grant Recipients",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "pellrecip", displayName:"Pell Grant recipients", format:"number"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions awarded ", " ","; ", " ","; ", " ","; ", " ","; ", " ","; ", " ","; and ", " ", " ", " awards in @year."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"pellrecip", format: "number"},
					{linkText:"Pell Grants", linkUrl:"/indicator/pell-grants"},
					{variable:"seogrecip", format: "number" },
					{linkText:"Federal Supplemental Education Opportunity Grants", linkUrl:"/indicator/campus-based-aid"},
					{variable:"teachrecip", format: "number"},
					{linkText:"TEACH Grants", linkUrl:"/indicator/teach-grants"},
					{variable:"iraqrecip", format: "number"},
					{linkText:"Iraq/Afghanistan Service Grants", linkUrl:"/indicator/iraq-afghanistan-service-grants"},
					{variable:"acgrecip", format: "number"},
					{linkText:"Academic Competitiveness Grants", linkUrl:"/indicator/acg-and-smart-grants"},
					{variable:"smartrecip", format: "number"},
					{linkText:"SMART Grants", linkUrl:"/indicator/acg-and-smart-grants"},
					{variable:"workrecip", format: "number"},
					{linkText:"Federal Work-Study", linkUrl:"/indicator/campus-based-aid"},
					{explainerText:"SEOG and Federal Work Study are campus-based aid programs. Dollars are distributed to selected schools, which then allocate awards to students at their discretion. Other grants are available to students at all institutions."},


				]
			},
			source: "Federal Student Aid",
			indicatorLink: null,
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Disbursements",
					variables: [
						{variable:"pellrecip", displayName:"Pell Grants", format: "number", color: colors.turquoise.light },
						{variable:"seogrecip", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "number", color: colors.blue.light},
						{variable:"teachrecip", displayName:"TEACH Grants", format: "number", color: colors.red.light},
						{variable:"iraqrecip", displayName:"Iraq/Afghanistan Service Grants", format: "number", color: colors.purple.light},
						{variable:"acgrecip", displayName:"Academic Competitiveness Grants", format: "number", color: colors.orange.light},
						{variable:"smartrecip", displayName:"SMART Grants", format: "number", color: colors.brown.light},
						{variable:"workrecip", displayName:"Federal Work-Study", format: "number", color: colors.yellow.light},
					]
				}
			}
		},
		{
			title: "Pell Awards",
			calloutSettings: {
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
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avepell", displayName:"Average Pell Grant award", format: "price", color: colors.turquoise.dark },
					]
				},
				chart2Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"pellperc", displayName:"Percent receiving Pell Grants", format: "percent", color: colors.turquoise.light },
					]
				}
			}
		},
		{
			title: "State and Local Aid",
			calloutSettings: {
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
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avestatelocalaid", displayName:"Average state and local aid", format: "price", color: colors.purple.dark },
					]
				},
				chart2Settings: {
					type: "bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"statelocalaidperc", displayName:"Percent receiving state and local aid", format: "percent", color: colors.purple.light },
					]
				}
			}
		},
	], 
	"Loans": [
		{
			title: "Loan Disbursements (Volume)",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "alltotaldisburse", displayName:"Total direct loan volume", format:"price"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions disbursed ", " in subsidized Stafford Loans to undergraduates; ", " in unsubsidized Stafford Loans to undergraduates and graduates; ", " in Graduate PLUS Loans; ", " in Parent PLUS Loans; and ", " in ", " ", " to students in @year."],
					["The following chart depicts trends over time."],
					],
				variables: [
					{variable:"name", format: "string"},
					{variable:"allsubdisburse", format: "price"},
					{variable:"allunsubdisburse", format: "price"},
					{variable:"allgraddisburse", format: "price"},
					{variable:"allparentdisburse", format: "price"},
					{variable:"perkdisburse", format: "price"},
					// {variable:"alltotaldisburse", format: "price"},
					{linkText:"Perkins Loans", linkUrl:"/indicator/campus-based-aid"},
					{explainerText: "Perkins Loans are a campus-based aid program, dollars are distributed to selected schools who then allocate awards to students at their discretion. Other loans are available to students at all institutions."},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: "federal-student-loans",
			showCompareButton: true,
			vizSettings: {
				dividingLine: {year: 2010, text:"Prior to 2010, the Department of Education authorized loans through Direct Lending, and guaranteed loans from private lenders through the Family Federal Education Loan program. After 2010, all loans were made through direct lending. This graphic includes both FFEL and DL prior to 2010, and DL only after that point."},
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"allsubdisburse", displayName:"Subsidized Stafford", format: "price", color: colors.turquoise.light},
						{variable:"allunsubdisburse", displayName:"Unsubsidized Stafford", format: "price", color: colors.turquoise.medium},
						{variable:"perkdisburse", displayName:"Perkins", format: "price", color: colors.blue.light},
						{variable:"allgraddisburse", displayName:"Graduate PLUS", format: "price", color: colors.red.light},
						{variable:"allparentdisburse", displayName:"Parent PLUS", format: "price", color: colors.purple.light}, 
						{variable:"alltotaldisburse", displayName:"Total", format: "price", color: colors.grey.dark}, 
					]
				}

			}
		},
		{
			title: "Loan Recipients",
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "alltotalrecip", displayName:"Total direct loan recipients", format:"number"},
				]
			},
			paragraphSettings: {
				textSections: [["", " institutions authorized ", " subsidized Stafford Loans to undergraduates; ", " unsubsidized Stafford Loans to undergraduates and graduates; ", " Graduate PLUS Loans; ", " Parent PLUS Loans; and ", " ", " ", " in @year."],
					["The following chart depicts trends over time."],
					],
				variables: [
					{variable:"name", format: "string"},
					{variable:"allsubrecip", format: "number"}, 
					{variable:"allunsubrecip", format: "number"},
					{variable:"allgradrecip", format: "number"}, 
					{variable:"allparentrecip", format: "number"}, 
					{variable:"perkrecip", format: "number"},
					// {variable:"alltotalrecip", format: "number"},
					{linkText:"Perkins Loans", linkUrl:"/indicator/campus-based-aid"},
					{explainerText: "Perkins Loans are a campus-based aid program, dollars are distributed to selected schools who then allocate awards to students at their discretion. Other loans are available to students at all institutions."},
				]
			},
			source: "Federal Student Aid",
			indicatorLink: "federal-student-loans",
			showCompareButton: true,
			vizSettings: {
				dividingLine: {year: 2010, text:"Prior to 2010, the Department of Education authorized loans through Direct Lending, and guaranteed loans from private lenders through the Family Federal Education Loan program. After 2010, all loans were made through direct lending. This graphic includes both FFEL and DL prior to 2010, and DL only after that point."},
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"allsubrecip", displayName:"Subsidized Stafford", format: "number", color: colors.turquoise.light }, 
						{variable:"allunsubrecip", displayName:"Unsubsidized Stafford", format: "number", color: colors.turquoise.medium},
						{variable:"perkrecip", displayName:"Perkins", format: "number", color: colors.blue.light},
						{variable:"allgradrecip", displayName:"Graduate PLUS", format: "number", color: colors.red.light}, 
						{variable:"allparentrecip", displayName:"Parent PLUS", format: "number", color: colors.purple.light}, 
						{variable:"alltotalrecip", displayName:"Total", format: "number", color: colors.grey.dark}, 
					]
				}
			}
		},
		{
			title: "Repayment Rates by Gender",
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "firstgen_rpy_3yr_rt", displayName:"First generation", format:"percent"},
					{variable: "notfirstgen_rpy_3yr_rt", displayName:"Non-first generation", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year repayment rate was ", " for first-generation students and ", " for students with at least one parent who holds a college degree at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"firstgen_rpy_3yr_rt", format: "percent"},
					{variable:"notfirstgen_rpy_3yr_rt", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "three-year-repayment-rates",
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Repayment Rate",
					variables: [
						{variable:"firstgen_rpy_3yr_rt", displayName:"First generation", format: "percent", color: colors.turquoise.light },
						{variable:"notfirstgen_rpy_3yr_rt", displayName:"Non-first generation", format: "percent", color: colors.purple.light},
						{variable:"rpy_3yr_rt", displayName:"Overall", format: "percent", color: colors.grey.dark},
					]
				}
			}
		},
		{
			title: "Repayment Rates by Pell Status",
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
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
			showCompareButton: true,
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
			calloutSettings: {
				type: "value",
				variables: [
					{variable: "cdr3", displayName:"Three-year cohort default rate", format:"percent"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the three-year cohort default rate was ", " at ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"cdr3", format: "percent"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "cohort-default-rates",
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Default Rate",
					variables: [
						{variable:"cdr3", displayName:"Three-year default rates", format: "percent", color: colors.purple.light},
					]
				}
			}
		},
		{
			title: "Average Student Borrowing",
			calloutSettings: {
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
			showCompareButton: true,
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
			title: "Mean Earnings",
			calloutSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "mn_earn_wne_p10", displayName:"Rank among all states for greatest 10-year mean earnings"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, mean earnings six years after enrolling in school were ", ", mean earnings after eight years were ", ", and mean earnings after 10 years were ", " for graduates of ", " institutions."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"mn_earn_wne_p6", format: "price"},
					{variable:"mn_earn_wne_p8", format: "price"},
					{variable:"mn_earn_wne_p10", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			showCompareButton: true,
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"mn_earn_wne_p6", displayName:"6-year", format: "price", color: colors.turquoise.light },
						{variable:"mn_earn_wne_p8", displayName:"8-year", format: "price", color: colors.turquoise.medium},
						{variable:"mn_earn_wne_p10", displayName:"10-year", format: "price", color: colors.turquoise.dark},
					]
				}
			}
		},
		{
			title: "Mean Earnings by Gender",
			calloutSettings: {
				type: "ranking",
				direction: "lowest",
				variables: [
					{variable: "", displayName:"Rank among all states for smallest difference between 10-year mean earnings of men and women"},  // add variable
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
			showCompareButton: true,
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
			calloutSettings: {
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
					{variable:"mn_earn_wne_indep1_p10", format: "price"},
					{variable:"mn_earn_wne_indep0_p10", format: "price"},
					{variable:"name", format: "string"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			showCompareButton: true,
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
			calloutSettings: {
				type: "ranking",
				direction: "highest",
				variables: [
					{variable: "gt_25k_p10", displayName:"Rank among all states for greatest share of students earning more than $25,000 per year"},
				]
			},
			paragraphSettings: {
				textSections: [["In @year, the share of former students of ", " institutions earning over $25,000 was ", " eight years after entry and ", " 10 years after initially enrolling in school."],
					["The following chart depicts trends over time."]],
				variables: [
					{variable:"name", format: "string"},
					{variable:"gt_25k_p8", format: "percent"},
					{variable:"gt_25k_p10", format: "percent"},
				]
			},
			source: "College Scorecard",
			indicatorLink: "postgraduate-earnings",
			showCompareButton: true,
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
	]
}

export default stVizSettings;
