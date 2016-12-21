const stVizSettings = [
	{
		title: "Enrollment by Student Type",
		paragraphSettings: {
			textSections: ['', 'institutions enrolled', 'undergraduate students and', 'graduate students;', 'full-time students and', 'part-time-students; and', 'adult education students in @year'],
			variables: ['name', 'data', 'other_data', 'data', 'other_data', 'data']
		},
		vizSettings: {
			type: "line-chart",
			variables: [
				{variable:"data", displayName:"Data", format: "string", color: "#fff" },
				{variable:"other_data", displayName:"Other Data", format: "string", color: "#fff"},
			]

		}
	},
	{
		title: "Enrollment by Gender",
		paragraphSettings: {
			textSections: ['', 'institutions enrolled', 'undergraduate students and', 'graduate students;', 'full-time students and', 'part-time-students; and', 'adult education students in @year'],
			variables: ['name', 'data', 'other_data', 'data', 'other_data', 'data']
		},
		vizSettings: {
			type: "line-chart",
			variables: [
				{variable:"data", displayName:"Data", format: "string", color: "#fff" },
				{variable:"other_data", displayName:"Other Data", format: "string", color: "#fff"},
			]

		}
	}
]

export default stVizSettings;