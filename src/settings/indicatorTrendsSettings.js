import { colors } from './../helper_functions/colors.js';

export const indicatorTrendsSettings = {
	"acg-and-smart-grants": {
		collection: "states_grants",
		trendsSettings: [
			{
				title: "ACG and SMART Grant Disbursments (Volume)",
				paragraphSettings: {
					textSections: [["U.S. institutions awarded ", " in Academic Competitiveness Grants and ", " in SMART Grants in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"acgdisburse", format: "price"},
						{variable:"smartdisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Disbursements",
						variables: [
							{variable:"acgdisburse", displayName:"Academic Competitiveness Grants", format: "price", color: colors.turquoise.light},
							{variable:"smartdisburse", displayName:"SMART Grants", format: "price", color: colors.blue.light},
						]
					}
				}
			},
			{
				title: "ACG and SMART Grant Recipients",
				paragraphSettings: {
					textSections: [["U.S. institutions awarded ", " Academic Competitiveness Grants and ", " SMART Grants in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"acgrecip", format: "number"},
						{variable:"smartrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Recipients",
						variables: [
							{variable:"acgrecip", displayName:"Academic Competitiveness Grants", format: "number", color: colors.turquoise.light},
							{variable:"smartrecip", displayName:"SMART Grants", format: "number", color: colors.blue.light},
						]
					}
				}
			}
		]
	},
	"enrollment": {
		collection: "states_students",
		trendsSettings: [
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
					textSections: [["In @year, U.S. institutions enrolled ", " undergraduate students and ", " graduate students; of these ", " were full-time students and ", " were part-time students."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"ugenroll", format: "number"},
						{variable:"gradenroll", format: "number"},
						{variable:"ftenroll", format: "number"},
						{variable:"ptenroll", format: "number"},
					]
				},
				source: "IPEDS",
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
					textSections: [["In @year, students at U.S institutions were ", " white, ", " black, ", " Hispanic, ", " Asian, ", " American Indian, ", " Hawaiian or Pacific Islander, ", " multiracial, ", " international, and ", " unknown."],
						["The following chart depicts trends over time."]],
					variables: [
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
					textSections: [["In @year, ", " of students identified as male and ", " as female at U.S institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"men", format: "percent" },
						{variable:"fem", format: "percent"},
					]
				},
				source: "IPEDS",
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
						{variable: "loan_ever", displayName:"Ever borrowed federal loans", format: "percent"},
						{variable: "pell_ever", displayName:"Ever received a Pell Grant", format: "percent"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, ", " of students had taken out at least one federal student loan and ", " of students had ever received Pell Grants at U.S institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"loan_ever", format: "percent"},
						{variable:"pell_ever", format: "percent"},
					]
				},
				source: "College Scorecard",
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
						{variable: "first_gen", displayName:"First generation", format: "percent"},
						{variable: "independent", displayName:"Independent", format: "percent"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, ", " of students were the first in their families to go to college; ", " of students were married; ", " of students were financially independent from their parents or other family; and ", " of students were veterans at U.S institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"first_gen", format: "percent" },
						{variable:"married", format: "percent"},
						{variable:"independent", format: "percent"},
						{variable:"veteran", format: "percent"},
					]
				},
				source: "College Scorecard",
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

		]
	},
	"federal-student-loans": {
		collection: "states_loans",
		trendsSettings: [
			{
				title: "Loan Disbursements (Volume)",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "alltotaldisburse", displayName:"Total direct loan volume", format:"price"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions disbursed ", " in subsidized Stafford Loans to undergraduates; ", " in unsubsidized Stafford Loans to undergraduates; ", " in unsubsidized graduate Stafford Loans; ", " in Graduate PLUS Loans; and ", " in Parent PLUS Loans to students in @year."],
						["The following chart depicts trends over time."]
						],
					variables: [
						{variable:"allsubdisburse", format: "price"},
						{variable:"allunsubdisburse", format: "price"},
						{variable:"allsubgraddisburse", format: "price"},
						{variable:"allgraddisburse", format: "price"},
						{variable:"allparentdisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					dividingLine: {year: 2010, text:"Prior to 2010, the Department of Education authorized loans through Direct Lending, and guaranteed loans from private lenders through the Family Federal Education Loan program. After 2010, all loans were made through direct lending. This graphic includes both FFEL and DL prior to 2010, and DL only after that point."},
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Students",
						variables: [
							{variable:"allsubdisburse", displayName:"Subsidized Stafford", format: "price", color: colors.turquoise.light},
							{variable:"allunsubdisburse", displayName:"Unsubsidized Stafford", format: "price", color: colors.turquoise.medium},
							{variable:"allsubgraddisburse", displayName:"Graduate Stafford", format: "price", color: colors.blue.light},
							{variable:"allgraddisburse", displayName:"Graduate PLUS", format: "price", color: colors.blue.medium},
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
					textSections: [["U.S. institutions authorized ", " subsidized Stafford Loans to undergraduates; ", " unsubsidized Stafford Loans to undergraduates; ", " unsubsidized graduate Stafford Loans; ", " Graduate PLUS Loans; and ", " Parent PLUS Loans in @year."],
						["The following chart depicts trends over time."]
						],
					variables: [
						{variable:"allsubrecip", format: "number"},
						{variable:"allunsubrecip", format: "number"},
						{variable:"allsubgradrecip", format: "number"},
						{variable:"allgradrecip", format: "number"},
						{variable:"allparentrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					dividingLine: {year: 2010, text:"Prior to 2010, the Department of Education authorized loans through Direct Lending, and guaranteed loans from private lenders through the Family Federal Education Loan program. After 2010, all loans were made through direct lending. This graphic includes both FFEL and DL prior to 2010, and DL only after that point."},
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Students",
						variables: [
							{variable:"allsubrecip", displayName:"Subsidized Stafford", format: "number", color: colors.turquoise.light},
							{variable:"allunsubrecip", displayName:"Unsubsidized Stafford", format: "number", color: colors.turquoise.medium},
							{variable:"allsubgradrecip", displayName:"Graduate Stafford", format: "number", color: colors.blue.light},
							{variable:"allgradrecip", displayName:"Graduate PLUS", format: "number", color: colors.blue.medium},
							{variable:"allparentrecip", displayName:"Parent PLUS", format: "number", color: colors.purple.light}, 
							{variable:"alltotalrecip", displayName:"Total", format: "number", color: colors.grey.dark}, 
						]
					}
				}
			},
		]
	},
	"campus-based-aid": {
		collection: "states_loans-states_grants",
		trendsSettings: [
			{
				title: "Campus-based Aid Disbursements (Volume)",
				paragraphSettings: {
					textSections: [["U.S. institutions disbursed ", " in Perkins Loans; ", " in Federal Supplemental Education Opportunity Grants; and ", " in Federal Work-Study to students in @year."],
						["The following chart depicts trends over time."]
						],
					variables: [
						{variable:"perkdisburse", format: "price"},
						{variable:"seogdisburse", format: "price"},
						{variable:"workdisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				indicatorLink: null,
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Students",
						variables: [
							{variable:"perkdisburse", displayName:"Perkins Loans", format: "price", color: colors.turquoise.light},
							{variable:"seogdisburse", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "price", color: colors.blue.light},
							{variable:"workdisburse", displayName:"Federal Work-Study", format: "price", color: colors.purple.light}, 
						]
					}
				}
			},
			{
				title: "Campus-based Aid Recipients",
				paragraphSettings: {
					textSections: [["U.S. institutions authorized ", " Perkins Loans; and awarded ", " Federal Supplemental Education Opportunity Grants and ", " Federal Work-Study awards in @year."],
						["The following chart depicts trends over time."]
						],
					variables: [
						{variable:"perkrecip", format: "number"},
						{variable:"seogrecip", format: "number"},
						{variable:"workrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				indicatorLink: null,
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Students",
						variables: [
							{variable:"perkrecip", displayName:"Perkins Loans", format: "number", color: colors.turquoise.light},
							{variable:"seogrecip", displayName:"Supplemental Educational Opportunity Grants (SEOG)", format: "number", color: colors.blue.light},
							{variable:"workrecip", displayName:"Federal Work-Study", format: "number", color: colors.purple.light}, 
						]
					}
				}
			},
		]
	},
	"three-year-repayment-rates": {
		collection: "states_loans",
		trendsSettings: [
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
					textSections: [["In @year, the three-year repayment rate was ", " for male students and ", " for female students at U.S institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"male_rpy_3yr_rt", format: "percent"},
						{variable:"female_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
					textSections: [["In @year, the three-year repayment rate was ", " for first-generation students and ", " for students with at least one parent who holds a college degree at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"firstgen_rpy_3yr_rt", format: "percent"},
						{variable:"notfirstgen_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
					textSections: [["In @year, the three-year repayment rate was ", " for Pell Grant recipients and ", " for students who did not receive Pell Grants at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"pell_rpy_3yr_rt", format: "percent"},
						{variable:"nopell_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
					textSections: [["In @year, the three-year repayment rate was ", " for graduates and ", " for students who withdrew from U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"compl_rpy_3yr_rt", format: "percent"},
						{variable:"noncom_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
					textSections: [["In @year, the three-year repayment rate was ", " for low-income students, ", " for middle-income students, and ", " for high-income students at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"lo_inc_rpy_3yr_rt", format: "percent"},
						{variable:"md_inc_rpy_3yr_rt", format: "percent"},
						{variable:"hi_inc_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
					textSections: [["In @year, the three-year repayment rate was ", " for dependent students and ", " for independent students at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"dep_rpy_3yr_rt", format: "percent"},
						{variable:"ind_rpy_3yr_rt", format: "percent"}
					]
				},
				source: "College Scorecard",
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
			}
		]
	},
	"cohort-default-rates": {
		collection: "states_loans",
		trendsSettings: [
			{
				title: "Cohort Default Rates",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "cdr3", displayName:"Three-year cohort default rate", format:"percent"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, the three-year cohort default rate was ", " at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"cdr3", format: "percent"},
					]
				},
				source: "College Scorecard",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Default Rate",
						variables: [
							{variable:"cdr3", displayName:"Three-year default rates", format: "percent", color: colors.purple.light},
						]
					}
				}
			}
		]
	},
	"student-loans": {
		collection: "states_loans",
		trendsSettings: [
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
					textSections: [["In @year, the average federal student loan was ", ", and ", " of students received federal student loans; and the average other loan was ", ", and ", " of students received other loans at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"avefedloan", format: "price"},
						{variable:"fedloanperc", format: "percent"},
						{variable:"aveotherloan", format: "price"},
						{variable:"otherloanperc", format: "percent"},
					]
				},
				source: "IPEDS",
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
		]
	},
	"pell-grants": {
		collection: "states_grants",
		trendsSettings: [
			{
				title: "Pell Disbursments (Volume)",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "pelldisburse", displayName:"Pell Grant disbursements", format: "price"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions disbursed ", " in Pell Grants to students in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"pelldisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Disbursements",
						variables: [
							{variable:"pelldisburse", displayName:"Pell Grants", format: "price", color: colors.turquoise.light},
						]
					}
				}
			},
			{
				title: "Pell Recipients",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "pellrecip", displayName:"pell Grant recipients", format: "number"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions awarded ", " Pell Grants in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"pellrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Recipients",
						variables: [
							{variable:"pellrecip", displayName:"Pell Grants", format: "number", color: colors.turquoise.light},
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
					textSections: [["In @year, the average Pell Grant award was ", ", and ", " of students received awards at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"avepell", format: "price" },
						{variable:"pellperc", format: "percent"},
					]
				},
				source: "IPEDS",
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
		]
	},
	"teach-grants": {
		collection: "states_grants",
		trendsSettings: [
			{
				title: "TEACH Grant Disbursments (Volume)",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "teachdisburse", displayName:"TEACH Grant disbursements", format: "price"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions disbursed ", " in TEACH Grants to students in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"teachdisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Disbursements",
						variables: [
							{variable:"teachdisburse", displayName:"TEACH Grants", format: "price", color: colors.turquoise.light},
						]
					}
				}
			},
			{
				title: "TEACH Grant Recipients",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "teachrecip", displayName:"TEACH Grant recipients", format: "number"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions awarded ", " TEACH Grants in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"teachrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Recipients",
						variables: [
							{variable:"teachrecip", displayName:"TEACH Grants", format: "number", color: colors.turquoise.light},
						]
					}
				}
			}
		]
	},
	"iraq-afghanistan-service-grants": {
		collection: "states_grants",
		trendsSettings: [
			{
				title: "Iraq and Afghanistan Service Grant Disbursments (Volume)",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "iraqdisburse", displayName:"Iraq and Afghanistan Service Grant disbursements", format: "price"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions disbursed ", " in Iraq/Afghanistan Service Grants to students in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"iraqdisburse", format: "price"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Disbursements",
						variables: [
							{variable:"iraqdisburse", displayName:"Iraq/Afghanistan Service Grants", format: "price", color: colors.turquoise.light},
						]
					}
				}
			},
			{
				title: "Iraq and Afghanistan Service Grant Recipients",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "iraqrecip", displayName:"Iraq and Afghanistan Service Grant recipients", format: "number"},
					]
				},
				paragraphSettings: {
					textSections: [["U.S. institutions awarded ", " Iraq/Afghanistan Service Grants in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"iraqrecip", format: "number"},
					]
				},
				source: "Federal Student Aid",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Recipients",
						variables: [
							{variable:"iraqrecip", displayName:"Iraq/Afghanistan Service Grants", format: "number", color: colors.turquoise.light},
						]
					}
				}
			}
		]
	},
	"state-local-aid": {
		collection: "states_grants",
		trendsSettings: [
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
					textSections: [["In @year, the average amount of state and local aid awarded was ", ", and ", " of students received awards at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"avestatelocalaid", format: "price" },
						{variable:"statelocalaidperc", format: "percent"},
					]
				},
				source: "IPEDS",
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
			}
		]
	},
	"sticker-price": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Sticker Price",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "instateprice", displayName:"In-state price", format:"price"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, the average in-district tuition was ", ", the average in-state tuition was ", ", and the average out-of-state tuition was ", " at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"indistprice", format: "price" },
						{variable:"instateprice", format: "price"},
						{variable:"outstateprice", format: "price"},
					]
				},
				source: "IPEDS",
				vizSettings: {
					chart1Settings: {
						type: "line-chart",
						yAxisLabel: "Price",
						variables: [
							{variable:"indistprice", displayName:"In-district", format: "price", color: colors.turquoise.light },
							{variable:"instateprice", displayName:"In-state", format: "price", color: colors.turquoise.medium},
							{variable:"outstateprice", displayName:"Out-of-state", format: "price", color: colors.turquoise.dark},
						]
					}
				}
			},
		]
	},
	"net-price": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Net Price",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "netpricepub", displayName:"Net Price for Public Institutions", format:"price"},
						{variable: "netpricepriv", displayName:"Net Price for Private Institutions", format:"price"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, the average cost of attendance after grant aid was ", " at public institutions and ", " at private institutions; and the average for low-income students was ", " at public institutions and ", " at private institutions in the U.S."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"netpricepub", format: "price" },
						{variable:"netpriceincpub", format: "price"},
						{variable:"netpricepriv", format: "price" },
						{variable:"netpriceincpriv", format: "price"},
					]
				},
				source: "IPEDS",
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
		]
	},
	"instructional-expenses": {
		collection: "states_schools_all",
	},
	"retention-rate": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Retention Rates",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "retrate", displayName:"Retention rate", format:"percent"},
					]
				},
				paragraphSettings: {
					textSections: [["Retention rates averaged ", " at U.S. institutions in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"retrate", format: "percent" },
					]
				},
				source: "IPEDS",
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
		]
	},
	"graduation-rate": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Graduation Rates",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "gradtot", displayName:"Graduation rate", format:"percent"},
						{variable: "gradbach", displayName:"Bachelor's graduation rate", format:"percent"},
					]
				},
				paragraphSettings: {
					textSections: [["", " of students graduated, and ", " of bachelor’s degree students graduated at U.S. institutions in @year."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"gradtot", format: "percent" },
						{variable:"gradbach", format: "percent"},
					]
				},
				source: "IPEDS",
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
		]
	},
	"endowment": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Endowment",
				calloutSettings: {
					type: "value",
					variables: [
						{variable: "endowment", displayName:"Total endowment of U.S. institutions", format: "price"},
					]
				},
				paragraphSettings: {
					textSections: [["The total combined endowment at U.S. institutions in @year was ", "."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"endowment", format: "price" },
					]
				},
				source: "IPEDS",
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
		]
	},
	"90-10-proportion": {
		collection: "states_schools_all",
	},
	"sat-act-average": {
		collection: "states_schools_all",
	},
	"hcm2": {
		collection: "states_schools_all",
	},
	"hbcu-msi": {
		collection: "states_schools_all",
	},
	"student-aid": {
		collection: "states_schools_all",
		trendsSettings: [
			{
				title: "Student Aid",
				calloutSettings: {
					type: "value",
					variables: [
						{variable:"avefedaid", displayName: "Average federal aid", format:"price"},
						{variable:"fedaidperc", displayName: "Percent receiving federal aid", format:"percent"},
					]
				},
				paragraphSettings: {
					textSections: [["In @year, the average amount of federal aid received was ", ", and ", " of students received federal aid; and the average amount of total aid was ", ", and ", " of students received total aid at U.S. institutions."],
						["The following chart depicts trends over time."]],
					variables: [
						{variable:"avefedaid", format: "price" },
						{variable:"fedaidperc", format: "percent"},
						{variable:"avetotaid", format: "price"},
						{variable:"totaidperc", format: "percent"},
					]
				},
				source: "IPEDS",
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
		]
	},
	"postgraduate-earnings": {
		collection: "states_outcomes",
		trendsSettings: [
			// {
			// 	title: "Median Earnings",
			// 	calloutSettings: {
			// 		type: "value",
			// 		variables: [
			// 			{variable:"md_earn_wne_p10", displayName: "10-year", format:"price"},
			// 			{variable:"md_earn_wne_p8", displayName: "8-year", format:"price"},
			// 			{variable:"md_earn_wne_p6", displayName: "6-year", format:"price"},
			// 		]
			// 	},
			// 	paragraphSettings: {
			// 		textSections: [["In @year, median earnings six years after enrolling in school were ", ", median earnings after eight years were ", ", and median earnings after 10 years were ", " for graduates of U.S. institutions."],
			// 			["The following chart depicts trends over time."]],
			// 		variables: [
			// 			{variable:"md_earn_wne_p6", format: "price"},
			// 			{variable:"md_earn_wne_p8", format: "price"},
			// 			{variable:"md_earn_wne_p10", format: "price"},
			// 		]
			// 	},
			// 	source: "College Scorecard",
			// 	vizSettings: {
			// 		chart1Settings: {
			// 			type: "line-chart",
			// 			yAxisLabel: "",
			// 			variables: [
			// 				{variable:"md_earn_wne_p6", displayName: "6-year", format: "price", color: colors.turquoise.light },
			// 				{variable:"md_earn_wne_p8", displayName: "8-year", format: "price", color: colors.turquoise.medium},
			// 				{variable:"md_earn_wne_p10", displayName: "10-year", format: "price", color: colors.turquoise.dark},
			// 			]
			// 		}
			// 	}
			// },
			// {
			// 	title: "Mean Earnings by Gender",
			// 	calloutSettings: {
			// 		type: "value",
			// 		variables: [
			// 			{variable:"mn_earn_wne_male1_p10", displayName: "Male", format:"price"},
			// 			{variable:"mn_earn_wne_male0_p10", displayName: "Female", format:"price"},
			// 		]
			// 	},
			// 	paragraphSettings: {
			// 		textSections: [["In @year, the mean earnings 10 years after enrolling in school were ", " for men and ", " for women at ", " institutions."],
			// 			["The following chart depicts trends over time."]],
			// 		variables: [
			// 			{variable:"mn_earn_wne_male1_p10", format: "price"},
			// 			{variable:"mn_earn_wne_male0_p10", format: "price"},
			// 		]
			// 	},
			// 	source: "College Scorecard",
			// 	vizSettings: {
			// 		chart1Settings: {
			// 			type: "line-chart",
			// 			yAxisLabel: "",
			// 			variables: [
			// 				{variable:"mn_earn_wne_male1_p10", displayName:"Male", format: "price", color: colors.turquoise.light},
			// 				{variable:"mn_earn_wne_male0_p10", displayName:"Female", format: "price", color: colors.purple.light},
			// 				{variable:"mn_earn_wne_p10", displayName:"Overall", format: "price", color: colors.grey.dark },
			// 			]
			// 		}
			// 	}
			// },
			// {
			// 	title: "Mean Earnings by Dependency Status",
			// 	calloutSettings: {
			// 		type: "value",
			// 		variables: [
			// 			{variable: "mn_earn_wne_indep0_p10", displayName:"Dependent", format:"price"},
			// 			{variable: "mn_earn_wne_indep1_p10", displayName:"Independent", format:"price"},
			// 		]
			// 	},
			// 	paragraphSettings: {
			// 		textSections: [["In @year, the mean earnings 10 years after enrolling in school were ", " for independent graduates and ", " for dependent graduates of U.S. institutions."],
			// 			["The following chart depicts trends over time."]],
			// 		variables: [
			// 			{variable:"mn_earn_wne_indep0_p10", format: "price"},
			// 			{variable:"mn_earn_wne_indep1_p10", format: "price"},
			// 		]
			// 	},
			// 	source: "College Scorecard",
			// 	vizSettings: {
			// 		chart1Settings: {
			// 			type: "line-chart",
			// 			yAxisLabel: "",
			// 			variables: [
			// 				{variable:"mn_earn_wne_indep0_p10", displayName:"Dependent", format: "price", color: colors.turquoise.light},
			// 				{variable:"mn_earn_wne_indep1_p10", displayName:"Independent", format: "price", color: colors.purple.light},
			// 				{variable:"mn_earn_wne_p10", displayName:"Overall", format: "price", color: colors.grey.dark },
			// 			]
			// 		}
			// 	}
			// },
			// {
			// 	title: "Share Earning Over $25,000",
			// 	calloutSettings: {
			// 		type: "value",
			// 		variables: [
			// 			{variable: "gt_25k_p10", displayName:"Share of students earning more than $25,000 per year", format: "percent"},
			// 		]
			// 	},
			// 	paragraphSettings: {
			// 		textSections: [["In @year, the share of former students of U.S. institutions earning over $25,000 was ", " seven years after entry, ", " eight years after entry, ", " nine years after entry, and ", " 10 years after initially enrolling in school."],
			// 			["The following chart depicts trends over time."]],
			// 		variables: [
			// 			{variable:"gt_25k_p7", format: "percent"},
			// 			{variable:"gt_25k_p8", format: "percent"},
			// 			{variable:"gt_25k_p9", format: "percent"},
			// 			{variable:"gt_25k_p10", format: "percent"},
			// 		]
			// 	},
			// 	source: "College Scorecard",
			// 	vizSettings: {
			// 		chart1Settings: {
			// 			type: "line-chart",
			// 			yAxisLabel: "",
			// 			variables: [
			// 				{variable:"gt_25k_p7", displayName:"7 years out", format: "percent", color: colors.turquoise.light},
			// 				{variable:"gt_25k_p8", displayName:"8 years out", format: "percent", color: colors.turquoise.medium},
			// 				{variable:"gt_25k_p9", displayName:"9 years out", format: "percent", color: colors.turquoise.dark},
			// 				{variable:"gt_25k_p10", displayName:"10 years out", format: "percent", color: colors.black},
			// 			]
			// 		}
			// 	}
			// },
		]
	},
	"cumulative-loan-debt": {
		collection: "states_loans",
	},
}
