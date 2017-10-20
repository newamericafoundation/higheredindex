const sectionSettings = {
	"states": [
		{name:"Schools", collection:"states_schools", dataDivision:"schools", subtitle: "School-level data are collected and aggregated from the Integrated Postsecondary Education Data System (IPEDS), the Federal Student Aid office at the U.S. Department of Education, and the College Scorecard.",
			subSections:[
				{name:"All Sectors", collection:"states_schools_all"},
				{name:"2-Year Public", collection:"states_schools_public2"},
				{name:"4-Year Public", collection:"states_schools_public4"},
				{name:"Private Nonprofit", collection:"states_schools_nonprofit"},
				{name:"Private For-Profit", collection:"states_schools_forprofit"},
			]
		}, 
		{name:"Students", collection:"states_students", dataDivision:"students", subtitle: "Student-level data are collected and aggregated from the Integrated Postsecondary Education Data System (IPEDS) and the College Scorecard."}, 
		{name:"Grants", collection:"states_grants", dataDivision:"grants", subtitle: "Data on federal grants and other aid is collected and aggregated from the Integrated Postsecondary Education Data System (IPEDS) and the Federal Student Aid office at the U.S. Department of Education."}, 
		{name:"Loans", collection:"states_loans", dataDivision:"loans", subtitle: "Loan data are collected and aggregated from the Integrated Postsecondary Education Data System (IPEDS), the Federal Student Aid office at the U.S. Department of Education, and the College Scorecard."}, 
		{name:"Outcomes", collection:"states_outcomes", dataDivision:"outcomes", subtitle: "Outcome data are collected and aggregated from the College Scorecard."}
	],
	"institutions": [
		{name:"Overview", collection:"inst_schools", dataDivision:"schools", subtitle: "School-level data are collected from the Integrated Postsecondary Education Data System (IPEDS), the Federal Student Aid office at the U.S. Department of Education, and the College Scorecard."}, 
		{name:"Students", collection:"inst_students", dataDivision:"students", subtitle: "Student-level data are collected from the Integrated Postsecondary Education Data System (IPEDS) and the College Scorecard."}, 
		{name:"Grants", collection:"inst_grants", dataDivision:"grants", subtitle: "Data on federal grants and other aid is collected from the Integrated Postsecondary Education Data System (IPEDS) and the Federal Student Aid office at the U.S. Department of Education."}, 
		{name:"Loans", collection:"inst_loans", dataDivision:"loans", subtitle: "Loan data are collected from the Integrated Postsecondary Education Data System (IPEDS), the Federal Student Aid office at the U.S. Department of Education, and the College Scorecard."}, 
		{name:"Outcomes", collection:"inst_outcomes", dataDivision:"outcomes", subtitle: "Outcome data are collected from the College Scorecard."}
	]
};

export default sectionSettings;