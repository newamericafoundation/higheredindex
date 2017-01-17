const stVizSettings = [
	{
		title: "Enrollment by Student Type",
		paragraphSettings: {
			textSections: ['', ' institutions enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students; and ', ' adult education students in @year'],
			variables: ['name', 'data', 'other_data', 'data', 'other_data', 'data']
		},
		vizSettings: {
			type: "line-chart",
			yAxisLabel: "Students",
			variables: [
				{variable:"data", displayName:"Data", format: "string", color: "green" },
				{variable:"other_data", displayName:"Other Data", format: "string", color: "orange"},
			]

		}
	},
	// {
	// 	title: "Enrollment by Gender",
	// 	paragraphSettings: {
	// 		textSections: ['', ' institutions enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students; and ', ' adult education students in @year'],
	// 		variables: ['name', 'data', 'other_data', 'data', 'other_data', 'data']
	// 	},
	// 	vizSettings: {
	// 		type: "line-chart",
	// 		yAxisLabel: "Students",
	// 		variables: [
	// 			{variable:"data", displayName:"Data", format: "string", color: "steelblue" },
	// 			{variable:"other_data", displayName:"Other Data", format: "string", color: "purple"},
	// 		]

	// 	}
	// },
	// {
	// 	title: "Enrollment by Gender",
	// 	paragraphSettings: {
	// 		textSections: ['', ' institutions enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students; and ', ' adult education students in @year'],
	// 		variables: ['name', 'dem1', 'dem2', 'dem1', 'dem2', 'dem1']
	// 	},
	// 	vizSettings: {
	// 		type: "bar-chart",
	// 		yAxisLabel: "Students",
	// 		variables: [
	// 			{variable:"dem1", displayName:"Data", format: "string", color: "steelblue" },
	// 			{variable:"dem2", displayName:"Other Data", format: "string", color: "purple"},
	// 		]

	// 	}
	// },
]

export default stVizSettings;