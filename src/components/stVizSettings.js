import { colors } from './../helper_functions/colors.js';

const instVizSettings = {
	"students": [
		// {
		// 	title: "Enrollment by Student Type",
		// 	paragraphSettings: {
		// 		textSections: ['In @year ', ' enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students;'],
		// 		variables: ['name', 'ugenroll', 'gradenroll', 'ftenroll', 'ptenroll']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: colors.turquoise.light },
		// 				{variable:"gradenroll", displayName:"Graduate", format: "number", color: colors.turquoise.dark},
		// 				{variable:"ftenroll", displayName:"Full-time", format: "number", color: colors.purple.light},
		// 				{variable:"ptenroll", displayName:"Part-time", format: "number", color: colors.purple.dark},
		// 				{variable:"enroll", displayName:"Total", format: "number", color: colors.red.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Enrollment by Race",
		// 	paragraphSettings: {
		// 		textSections: ['In @year, students at ', ' were ', '% white, ', '% black, ', '% Asian, ', '% Hispanic ', "% American Indian, ", "% Hawaiian or Pacific Islander, ", "% multiracial, and ", "% unknown"],
		// 		variables: ['name', 'white', 'afam', 'asia', 'hisp', 'amin', 'nhpi', 'twoormore', 'unk']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"white", displayName:"White", format: "percent", color: colors.turquoise.light },
		// 				{variable:"amin", displayName:"American Indian", format: "percent", color: colors.blue.light},
		// 				{variable:"afam", displayName:"Black", format: "percent", color: colors.red.light},
		// 				{variable:"asia", displayName:"Asian", format: "percent", color: colors.purple.light},
		// 				{variable:"hisp", displayName:"Hispanic", format: "percent", color: "orange"},
		// 				{variable:"nhpi", displayName:"Hawaiian/Pacific Islander", format: "percent", color: "yellow"},
		// 				{variable:"nonresident", displayName:"Nonresident Alien", format: "percent", color: "green"},
		// 				{variable:"twoormore", displayName:"Two or more", format: "percent", color: colors.grey.medium},
		// 				{variable:"unk", displayName:"Unknown race", format: "percent", color: "gold"},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Enrollment by Gender",
		// 	paragraphSettings: {
		// 		textSections: ["In @year, ", "% of student identified as male and ", "% as female at"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"men", displayName:"Male", format: "percent", color: colors.turquoise.light},
		// 				{variable:"fem", displayName:"Female", format: "percent", color: colors.purple.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Enrollment by Financial Need",
		// 	paragraphSettings: {
		// 		textSections: ["In @year, ", " of students had taken out at least one federal student loan and ", " of students had ever received Pell Grants at "],
		// 		variables: ['loan_ever', 'pell_ever', 'name']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"loan_ever", displayName:"Took out at least one student loan", format: "percent", color: colors.turquoise.light },
		// 				{variable:"pell_ever", displayName:"Had ever received a Pell Grant", format: "percent", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Enrollment by Non-traditional Students",
		// 	paragraphSettings: {
		// 		textSections: ["In @year, ", " of students were over the age of 24; ", " of students were the first in their families to go to college; ", " of students were married; ", " of students were veterans at "],
		// 		variables: ['agege24', 'first_gen', 'married', 'veteran', 'name']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"first_gen", displayName:"First Generation", format: "percent", color: colors.turquoise.light},
		// 				{variable:"married", displayName:"Married", format: "percent", color: colors.blue.light},
		// 				{variable:"dependent", displayName:"Dependent", format: "percent", color: colors.red.light},
		// 				{variable:"veteran", displayName:"Veterans", format: "percent", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
	],
	"loans": [
		// {
		// 	title: "Loan Disbursements (Volume)",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"dlsubdisburse", displayName:"Subsidized Stafford", format: "price", color: colors.turquoise.light },
		// 				{variable:"dlunsubdisburse", displayName:"Unsubsidized Stafford", format: "price", color: colors.turquoise.medium},
		// 				{variable:"dlunsubgraddisburse", displayName:"Graduate Stafford", format: "price", color: colors.turquoise.dark},
		// 				{variable:"dlparentdisburse", displayName:"Parent PLUS", format: "price", color: colors.blue.light},
		// 				{variable:"dlgraddisburse", displayName:"Graduate PLUS", format: "price", color: colors.red.light},
		// 				{variable:"perkdisburse", displayName:"Perkins", format: "price", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Loan Recipients",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Students",
		// 			variables: [
		// 				{variable:"dlsubrecip", displayName:"Subsidized Stafford", format: "number", color: colors.turquoise.light },
		// 				{variable:"dlunsubrecip", displayName:"Unsubsidized Stafford", format: "number", color: colors.turquoise.medium},
		// 				{variable:"dlunsubgradrecip", displayName:"Graduate Stafford", format: "number", color: colors.turquoise.dark},
		// 				{variable:"dlparentrecip", displayName:"Parent PLUS", format: "number", color: colors.blue.light},
		// 				{variable:"dlgradrecip", displayName:"Graduate PLUS", format: "number", color: colors.red.light},
		// 				{variable:"perkrecip", displayName:"Perkins", format: "number", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Gender",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"male_rpy_3yr_rt", displayName:"Male", format: "percent", color: colors.turquoise.light },
		// 				{variable:"female_rpy_3yr_rt", displayName:"Female", format: "percent", color: colors.purple.light},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Parental Education",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"firstgen_rpy_3yr_rt", displayName:"First Generation", format: "percent", color: colors.turquoise.light },
		// 				{variable:"notfirstgen__rpy_3yr_rt", displayName:"Not First Generation", format: "percent", color: colors.purple.light},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Pell Status",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"pell_rpy_3yr_rt", displayName:"Pell Recipients", format: "percent", color: colors.turquoise.light },
		// 				{variable:"nopell_rpy_3yr_rt", displayName:"Non-Pell", format: "percent", color: colors.purple.light},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Completion Status",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"compl_rpy_3yr_rt", displayName:"Completed", format: "percent", color: colors.turquoise.light },
		// 				{variable:"noncom_rpy_3yr_rt", displayName:"Withdrew", format: "percent", color: colors.purple.light},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Income",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"hi_inc_rpy_3yr_rt", displayName:"High-income", format: "percent", color: colors.turquoise.light },
		// 				{variable:"md_inc_rpy_3yr_rt", displayName:"Middle-income", format: "percent", color: colors.turquoise.medium},
		// 				{variable:"lo_inc_rpy_3yr_rt", displayName:"Low-income", format: "percent", color: colors.turquoise.dark},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Repayment Rates by Dependency",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"dep_rpy_3yr_rt", displayName:"Dependent", format: "percent", color: colors.turquoise.light },
		// 				{variable:"ind_rpy_3yr_rt", displayName:"Independent", format: "percent", color: colors.purple.light},
		// 				{variable:"rpy_3yr_rt", displayName:"Average", format: "percent", color: colors.grey.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Cohort Default Rates",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Default Rate",
		// 			variables: [
		// 				{variable:"cdr3", displayName:"Two-year default rates", format: "percent", color: colors.turquoise.light },
		// 				{variable:"cdr2", displayName:"Three-year default rates", format: "percent", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// // needs grouped bar chart
		// {
		// 	title: "Average Student Borrowing",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Repayment Rate",
		// 			variables: [
		// 				{variable:"avefedloan", displayName:"Average Federal Loan", format: "price", color: colors.turquoise.light },
		// 				{variable:"aveotherloan", displayName:"Average Other Loan", format: "price", color: colors.purple.light},
		// 			]
		// 		},
		// 		// chart2Settings: {
		// 		// 	type: "bar-chart",
		// 		// 	yAxisLabel: "Repayment Rate",
		// 		// 	variables: [
		// 		// 		{variable:"cdr3", displayName:"Two-year default rates", format: "percent", color: colors.turquoise.dark },
		// 		// 		{variable:"cdr2", displayName:"Three-year default rates", format: "percent", color: colors.purple.dark},
		// 		// 	]
		// 		// },
		// 	}
		// },
	],
	"grants": [
		// Federal work Study and SEOG need an * with the following, on this graphic and the next one: SEOG and Federal Work Study are campus-based aid programs, dollars are distributed to selected schools who then allocate awards to students at their discretion. Other grants are available to students at all institutions.

		// {
		// 	title: "Grant Disbursments (Volume)",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Disbursements",
		// 			variables: [
		// 				{variable:"pelldisburse", displayName:"Pell Grants", format: "price", color: colors.turquoise.light },
		// 				{variable:"seogdisburse", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.turquoise.medium},
		// 				{variable:"teachdisburse", displayName:"Teach Grants", format: "price", color: colors.blue.light},
		// 				{variable:"iraqdisburse", displayName:"Iraq/Afghanistan", format: "price", color: colors.red.light},
		// 				{variable:"workdisburse", displayName:"Federal Work Study", format: "price", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Grant Recipients",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Disbursements",
		// 			variables: [
		// 				{variable:"pellrecip", displayName:"Pell Grants", format: "price", color: colors.turquoise.light },
		// 				{variable:"seogrecip", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.turquoise.medium},
		// 				{variable:"teachrecip", displayName:"Teach Grants", format: "price", color: colors.blue.light},
		// 				{variable:"iraqrecip", displayName:"Iraq/Afghanistan", format: "price", color: colors.red.light},
		// 				{variable:"workrecip", displayName:"Federal Work Study", format: "price", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Pell Awards",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"pellperc", displayName:"Percent of Recipients", format: "percent", color: colors.turquoise.dark },
		// 			]
		// 		},
		// 		chart2Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"avepell", displayName:"Average Award", format: "price", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "State and Local Aid",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"statelocalaidperc", displayName:"Percent of Recipients", format: "percent", color: colors.turquoise.dark },
		// 			]
		// 		},
		// 		chart2Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"avestatelocalaid", displayName:"Average Award", format: "price", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
	], "schools" : [
		// {
		// 	title: "Institutional Breakdowns",
		// 	paragraphSettings: null,
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "table",
		// 			tableSettingsList: 
		// 			[
		// 				{
		// 					headingLabels: ["Category", "Count"],
		// 					variables: [
		// 						{variable:"public", displayName:"Public", format: "number" },
		// 						{variable:"nonprofit", displayName:"Non-Profit", format: "number"},
		// 						{variable:"forprofit", displayName:"For-Profit", format: "number"},
		// 						{variable:"fouryear", displayName:"Four-Year", format: "number"},
		// 						{variable:"twoyear", displayName:"Two-Year", format: "number"},
		// 						{variable:"lessthan2yr", displayName:"Less than Two-Year", format: "number"},
		// 						{variable:"pub4yr", displayName:"Public Four-Year", format: "number" },
		// 						{variable:"nonprof4yr", displayName:"Non-Profit Four-Year", format: "number"},
		// 						{variable:"twoyrlesspublic", displayName:"Public Two-Year or Less", format: "number"},
		// 						{variable:"degree", displayName:"Degree Granting", format: "number"},
		// 						{variable:"hbcu", displayName:"HBCU", format: "number"},
		// 						{variable:"schools", displayName:"Total", format: "number", bold: true},
		// 					],
		// 				},
		// 				{
		// 					headingLabels: ["Category", "Count"],
		// 					variables: [
		// 						{variable:"public", displayName:"Public", format: "number" },
		// 						{variable:"nonprofit", displayName:"Non-Profit", format: "number"},
		// 						{variable:"forprofit", displayName:"For-Profit", format: "number"},
		// 					],
		// 				}
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Sticker Price",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Price",
		// 			variables: [
		// 				{variable:"indistprice", displayName:"In-district price", format: "price", color: colors.turquoise.light },
		// 				{variable:"instateprice", displayName:"In-state price", format: "price", color: colors.turquoise.medium},
		// 				{variable:"outstate", displayName:"Out-of-state price", format: "price", color: colors.turquoise.dark},
		// 				{variable:"cost", displayName:"Sticker price", format: "price", color: colors.red.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Net Price by Income",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "Price",
		// 			variables: [
		// 				{variable:"netprice", displayName:"Net price", format: "price", color: colors.turquoise.light },
		// 				{variable:"netpriceinc", displayName:"Low-income net price", format: "price", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		{
			// need grouped bar chart
			title: "Student Aid",
			paragraphSettings: {
				textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
				variables: ['fem', 'men']
			},
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "",
					variables: [
						{variable:"fedaidperc", displayName:"Percent of Federal Aid Recipients", format: "percent", color: colors.turquoise.dark },
					]
				},
				chart2Settings: {
					type: "grouped-bar-chart",
					yAxisLabel: "",
					variables: [
						{variable:"avefedaid", displayName:"Average Federal Aid", format: "price", color: colors.turquoise.light },
						{variable:"avetotaid", displayName:"Average Total Aid", format: "price", color: colors.purple.light },

					]
				},
				
			}
		},
		// {
		// 	title: "Graduation Rates",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"gradtot", displayName:"Graduation rate", format: "percent", color: colors.turquoise.light },
		// 				{variable:"gradbach", displayName:"Bachelor's degree graduation rate", format: "percent", color: colors.purple.light},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Retention Rates",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"retrate", displayName:"Retention rate", format: "percent", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Transfer Students",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"transfer", displayName:"Share of transfer students", format: "percent", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "SAT/ACT Average",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"sat_avg_all", displayName:"SAT/ACT score", format: "number", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Instructional Expenses",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"inexpfte", displayName:"Instructional expenses per FTE", format: "price", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Endowment",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"endowment", displayName:"Endowment", format: "price", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "90/10 Proportion",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "bar-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"prop_9010", displayName:"90/10 proportion", format: "percent", color: colors.turquoise.light },
		// 			]
		// 		}
		// 	}
		// },
		// add state map with pinpoint for school
	], "outcomes" : [
		// {
		// 	title: "Median Earnings",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"md_earn_wne_p6", displayName:"6-year", format: "price", color: colors.turquoise.light },
		// 				{variable:"md_earn_wne_p8", displayName:"8-year", format: "price", color: colors.turquoise.medium},
		// 				{variable:"md_earn_wne_p10", displayName:"10-year", format: "price", color: colors.turquoise.dark},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Mean Earnings by Gender",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"mn_earn_wne_male0_p10", displayName:"Male", format: "price", color: colors.turquoise.light},
		// 				{variable:"mn_earn_wne_male1_p10", displayName:"Female", format: "price", color: colors.purple.light},
		// 				{variable:"mn_earn_wne_p10", displayName:"Average", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Mean Earnings by Dependency",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"mn_earn_wne_indep0_p10", displayName:"Dependent", format: "price", color: colors.turquoise.light},
		// 				{variable:"mn_earn_wne_indep1_p10", displayName:"Independent", format: "price", color: colors.purple.light},
		// 				{variable:"mn_earn_wne_p10", displayName:"Average", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Share Earning Over $25,000",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"gt_25k_p7", displayName:"7 Years Out", format: "percent", color: colors.turquoise.light },
		// 				{variable:"gt_25k_p8", displayName:"8 Years Out", format: "percent", color: colors.turquoise.medium},
		// 				{variable:"gt_25k_p9", displayName:"9 Years Out", format: "percent", color: colors.turquoise.dark},
		// 				{variable:"gt_25k_p10", displayName:"10 Years Out", format: "percent", color: colors.black},
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Completion Status",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"grad_debt_mdn", displayName:"Completed", format: "price", color: colors.turquoise.light},
		// 				{variable:"wdraw_debt_mdn", displayName:"Withdrew", format: "price", color: colors.purple.light},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Gender",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"male_debt_mdn", displayName:"Male", format: "price", color: colors.turquoise.light},
		// 				{variable:"female_debt_mdn", displayName:"Female", format: "price", color: colors.purple.light},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Parental Education",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"firstgen_debt_mdn", displayName:"First Generation", format: "price", color: colors.turquoise.light},
		// 				{variable:"notfirstgen_debt_mdn", displayName:"Not First Generation ", format: "price", color: colors.purple.light},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Pell Status",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"pell_debt_mdn", displayName:"Pell Recipients", format: "price", color: colors.turquoise.light},
		// 				{variable:"nopell_debt_mdn", displayName:"Non-Pell", format: "price", color: colors.purple.light},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Income",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"hi_imc_debt_mdn", displayName:"High-income", format: "price", color: colors.turquoise.light},
		// 				{variable:"md_imc_debt_mdn", displayName:"Medium-income", format: "price", color: colors.turquoise.medium},
		// 				{variable:"lo_inc_debt_mdn", displayName:"Low-income", format: "price", color: colors.turquoise.dark},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },
		// {
		// 	title: "Median Debt by Dependency",
		// 	paragraphSettings: {
		// 		textSections: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius urna tellus, vel mattis ligula convallis sollicitudin. Donec quis luctus justo, ac ultrices velit"],
		// 		variables: ['fem', 'men']
		// 	},
		// 	vizSettings: {
		// 		chart1Settings: {
		// 			type: "line-chart",
		// 			yAxisLabel: "",
		// 			variables: [
		// 				{variable:"dep_debt_mdn", displayName:"Dependent", format: "price", color: colors.turquoise.light},
		// 				{variable:"ind_debt_mdn", displayName:"Independent", format: "price", color: colors.purple.light},
		// 				{variable:"debt_mdn", displayName:"Overall", format: "price", color: colors.grey.dark },
		// 			]
		// 		}
		// 	}
		// },

	]
}

export default instVizSettings;