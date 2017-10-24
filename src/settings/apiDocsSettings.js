export const apiDocsSettings = [
	{
		method:"GET",
		path: "/state-list",
		description: "Returns list of names and IDs for all states"
	},
	{
		method:"GET",
		path: "/institution-list",
		description: "Returns list of names and IDs for all institutions"
	},
	{
		method:"GET",
		path: "/indicator-list",
		description: "Returns list of names and IDs for all indicators"
	},
	{
		method:"GET",
		path: "/data-info",
		description: "Returns last updated date-time for all state and institution data files"
	},
	{
		method:"GET",
		path: "/state/:id",
		description: "Returns all data for a given state ID"
	},
	{
		method:"GET",
		path: "/institution/:id",
		description: "Returns all data for a given institution ID"
	},
	{
		method:"GET",
		path: "/indicator/:id",
		description: "Returns all indicator settings for a given indicator ID"
	},
	{
		method:"GET",
		path: "/all-states-data/:collection",
		description: "Returns data for all states for a given collection"
	},
	{
		method:"GET",
		path: "/us-data/:collection",
		description: "Returns aggregated US data for a given collection"
	},

]

