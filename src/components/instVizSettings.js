const instVizSettings = {
	"students": [
		{
			title: "Enrollment by Student Type",
			paragraphSettings: {
				textSections: ['In @year ', ' enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students;'],
				variables: ['name', 'ugenroll', 'gradenroll', 'ftenroll', 'ptenroll']
			},
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: "turquoise" },
						{variable:"gradenroll", displayName:"Graduate", format: "number", color: "green"},
						{variable:"ftenroll", displayName:"Full-time", format: "number", color: "orange"},
						{variable:"ptenroll", displayName:"Part-time", format: "number", color: "purple"},
						{variable:"enroll", displayName:"Total", format: "number", color: "red"},
					]
				}
			}
		},
		{
			title: "Enrollment by Race",
			paragraphSettings: {
				textSections: ['In @year, students at ', ' were ', '% white, ', '% black, ', '% Asian, ', '% Hispanic ', "% American Indian, ", "% Hawaiian or Pacific Islander, ", "% multiracial, and ", "% unknown"],
				variables: ['name', 'white', 'afam', 'asia', 'hisp', 'amin', 'nhpi', 'twoormore', 'unk']
			},
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"white", displayName:"White", format: "percent", color: "steelblue" },
						{variable:"afam", displayName:"Black", format: "percent", color: "purple"},
						{variable:"hisp", displayName:"Hispanic", format: "percent", color: "green"},
						{variable:"asia", displayName:"Asian", format: "percent", color: "purple"},
						{variable:"nhpi", displayName:"Hawaiian/Pacific Islander", format: "percent", color: "red"},
						{variable:"amin", displayName:"America Indian", format: "percent", color: "purple"},
						{variable:"twoormore", displayName:"Two or more", format: "percent", color: "orange"},
						{variable:"unk", displayName:"Unknown race", format: "percent", color: "blue"},
					]
				}
			}
		},
		{
			title: "Enrollment by Gender",
			paragraphSettings: {
				textSections: ["In @year, ", "% of student identified as male and ", "% as female at"],
				variables: ['fem', 'men']
			},
			vizSettings: {
				chart1Settings: {
					type: "bar-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"fem", displayName:"Female", format: "percent", color: "steelblue" },
						{variable:"men", displayName:"Male", format: "percent", color: "purple"},
					]
				}
			}
		},
		{
			title: "Enrollment by Financial Need",
			paragraphSettings: {
				textSections: ["In @year, ", " of students had taken out at least one federal student loan and ", " of students had ever received Pell Grants at "],
				variables: ['loan_ever', 'pell_ever', 'name']
			},
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						{variable:"loan_ever", displayName:"Took out at least one student loan", format: "percent", color: "turquoise" },
						{variable:"pell_ever", displayName:"Had ever received a Pell Grant", format: "percent", color: "green"},
					]
				}
			}
		},
		{
			title: "Enrollment by Non-traditional Students",
			paragraphSettings: {
				textSections: ["In @year, ", " of students were over the age of 24; ", " of students were the first in their families to go to college; ", " of students were married; ", " of students were veterans at "],
				variables: ['agege24', 'first_gen', 'married', 'veteran', 'name']
			},
			vizSettings: {
				chart1Settings: {
					type: "line-chart",
					yAxisLabel: "Students",
					variables: [
						// {variable:"agege24", displayName:"Adult", format: "number", color: "turquoise" },
						{variable:"first_gen", displayName:"First Generation", format: "percent", color: "green"},
						{variable:"married", displayName:"Married", format: "percent", color: "purple"},
						{variable:"veteran", displayName:"Veterans", format: "percent", color: "red"},
					]
				}
			}
		},
	],
	// "loans": [
	// 	{
	// 		title: "Loan Disbursements (Volume)",
	// 		paragraphSettings: {
	// 			textSections: ["", "disbursed", "in subsidized Stafford Loans to undergraduates;", "in unsubsidized Stafford Loans to undergraduates;", "in unsubsidized graduate Stafford Loans;", "in Graduate PLUS Loans;", "in Parent PLUS Loans; and", "in Perkins Loans to students in @year."],
	// 			variables: ['name', 'dlsubdisburse', 'dlsubdisburse', 'dlunsubgraddisburse', 'ptenroll']
	// 		},
	// 		vizSettings: {
	// 			chart1Settings: {
	// 				type: "line-chart",
	// 				yAxisLabel: "Students",
	// 				variables: [
	// 					{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: "turquoise" },
	// 					{variable:"gradenroll", displayName:"Graduate", format: "number", color: "green"},
	// 					{variable:"ftenroll", displayName:"Full-time", format: "number", color: "orange"},
	// 					{variable:"ptenroll", displayName:"Part-time", format: "number", color: "purple"},
	// 					{variable:"enroll", displayName:"Total", format: "number", color: "red"},
	// 				]
	// 			}
	// 		}
	// 	},
	// ]
}

export default instVizSettings;