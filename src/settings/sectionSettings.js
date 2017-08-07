const sectionSettings = {
	"states": [
		{name:"Schools", collection:"states_schools", dataDivision:"schools"}, 
		{name:"Students", collection:"states_students", dataDivision:"students"}, 
		{name:"Grants", collection:"states_grants", dataDivision:"grants"}, 
		{name:"Loans", collection:"states_loans", dataDivision:"loans"}, 
		{name:"Outcomes", collection:"states_outcomes", dataDivision:"outcomes"}
	],
	"institutions": [
		{name:"Overview", collection:"inst_schools", dataDivision:"schools"}, 
		{name:"Students", collection:"inst_students", dataDivision:"students"}, 
		{name:"Grants", collection:"inst_grants", dataDivision:"grants"}, 
		{name:"Loans", collection:"inst_loans", dataDivision:"loans"}, 
		{name:"Outcomes", collection:"inst_outcomes", dataDivision:"outcomes"}
	],
	"indicators": [
		{name:"About", dataDivision:"about"}, 
		{name:"Rankings", dataDivision:"rankings"}, 
		{name:"Trends", dataDivision:"trends"}, 
	]
};

export default sectionSettings;