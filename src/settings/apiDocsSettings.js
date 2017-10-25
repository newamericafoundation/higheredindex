const apiDocsSettings = [
	{
		method:"GET",
		path: "/state-list",
		parameters: "",
		description: "Returns list of names and IDs for all states"
	},
	{
		method:"GET",
		path: "/institution-list",
		parameters: "",
		description: "Returns list of names and IDs for all institutions"
	},
	{
		method:"GET",
		path: "/indicator-list",
		parameters: "",
		description: "Returns list of names and IDs for all indicators"
	},
	{
		method:"GET",
		path: "/data-info",
		parameters: "",
		description: "Returns last updated date-time for all state and institution data files"
	},
	{
		method:"GET",
		path: "/state/:id",
		parameters: "id - the state ID (i.e. 'california' or 'south_dakota')",
		description: "Returns all data for a given state ID"
	},
	{
		method:"GET",
		path: "/institution/:id",
		parameters: "id - the institution ID (i.e. 'stanford_university')",
		description: "Returns all data for a given institution ID"
	},
	{
		method:"GET",
		path: "/indicator/:id",
		parameters: "id - the indicator ID (i.e. 'enrollment' or 'direct-loans')",
		description: "Returns all indicator settings for a given indicator ID"
	},
	{
		method:"GET",
		path: "/full-collection/:collection",
		parameters: "collection - the collection ID (see list above for options)",
		description: "Returns data for all states for a given collection"
	},
	{
		method:"GET",
		path: "/us-data/:collection",
		parameters: "collection - the collection ID (see list above for options)",
		description: "Returns aggregated US data for a given collection"
	},
]

export default apiDocsSettings;