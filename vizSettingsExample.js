{
	title: /* the title for the section */,
	callOutBoxSettings: {
		type: /* "value"|"ranking" */,
		variables: [
			{variable:/* variable name in data sheet */, displayName:/* label for variable */, format: /* "price"|"number"|"string|"percent"|"year"  */},
			{variable:/* variable name in data sheet */, displayName:/* label for variable */, format: /* "price"|"number"|"string|"percent"|"year"  */},
		]
	}
	paragraphSettings: {
		textSections: [/* 'first text section @year' */, /* 'second text section' */, /* 'third text section' */, /* 'fourth text section' */, /* 'fifth text section' */, /* 'sixth text section' */],
		variables: [
			{variable:/* variable name in data sheet */, format: /* "price"|"number"|"string|"percent"|"year"  */},
			{variable:/* variable name in data sheet */, format: /* "price"|"number"|"string|"percent"|"year"  */},
			{variable:/* variable name in data sheet */, format: /* "price"|"number"|"string|"percent"|"year"  */},
			{variable:/* variable name in data sheet */, format: /* "price"|"number"|"string|"percent"|"year"  */},
			{variable:/* variable name in data sheet */, format: /* "price"|"number"|"string|"percent"|"year"  */},
		]
		source: /* text for sources section */,
		indicatorLink: /* path to indicator to link to */
	},
	vizSettings: {
		/* don't worry about this section */
	}
},

{
	title: "Enrollment by Student Type",
	callOutBoxSettings: {
		type: "value",
		variables: [
			{variable:"ugenroll", displayName:"Undergraduate Students Enrolled", format: "number"},
			{variable:"gradenroll", displayName:"Graduate Students Enrolled", format: "number"},
		]
	}
	paragraphSettings: {
		textSections: ['In @year ', ' enrolled ', ' undergraduate students and ', ' graduate students; ', ' full-time students and ', ' part-time-students;'],
		variables: [
			{variable:"name", format: "string"},
			{variable:"ugenroll", format: "number"},
			{variable:"gradenroll", format: "number"},
			{variable:"ftenroll", format: "number"},
			{variable:"ptenroll", format: "number"},
		],
		source: "IPEDS",
		indicatorLink: "pell-grants"
	},
	vizSettings: {
		chart1Settings: {
			type: "line-chart",
			yAxisLabel: "Students",
			variables: [
				{variable:"ugenroll", displayName:"Undergraduate", format: "number", color: colors.turquoise.light },
				{variable:"gradenroll", displayName:"Graduate", format: "number", color: colors.turquoise.dark},
				{variable:"ftenroll", displayName:"Full-time", format: "number", color: colors.purple.light},
				{variable:"ptenroll", displayName:"Part-time", format: "number", color: colors.purple.dark},
				{variable:"enroll", displayName:"Total", format: "number", color: colors.red.light},
			]
		}
	}
},