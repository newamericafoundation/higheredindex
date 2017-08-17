const sectionSettings = {
	"national": [
		{name:"Schools", collection:"national_schools", dataDivision:"schools"}, 
		{name:"Students", collection:"national_students", dataDivision:"students"}, 
		{name:"Grants", collection:"national_grants", dataDivision:"grants"}, 
		{name:"Loans", collection:"national_loans", dataDivision:"loans"}, 
		{name:"Outcomes", collection:"national_outcomes", dataDivision:"outcomes"}
	],
	"states": [
		{name:"Schools", collection:"states_schools", dataDivision:"schools", subSections:[
			{name:"All Sectors", collection:"states_schools_all"},
			{name:"2-Year Public", collection:"states_schools_public2"},
			{name:"4-Year Public", collection:"states_schools_public4"},
			{name:"Private Nonprofit", collection:"states_schools_nonprofit"},
			{name:"Private For-Profit", collection:"states_schools_forprofit"},
		]}, 
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