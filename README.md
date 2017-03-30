Mongo

Loading data from csv into Mongo

- save file as Windows separated csv - regular csv will result in `fields cannot be identical: ' ' and ' ' error

from command line (not mongo shell)
mongoimport --db live_test --collection students --type csv --headerline --file data/ed-index-students.csv
mongoimport --db live_test --collection outcomes --type csv --headerline --file data/ed-index-outcomes.csv
mongoimport --db live_test --collection schools --type csv --headerline --file data/ed-index-schools.csv
mongoimport --db live_test --collection students --type csv --headerline --file data/ed-index-students.csv
mongoimport --db live_test --collection students --type csv --headerline --file data/ed-index-students.csv

to nest year data:
mongo ./database_setup/nest_year_data.js 


db.states_schools.find({}, { opeidstring: 1, school: 1 }).forEach(function(doc){ db.combined.insert(doc); });

db.final.aggregate([{ $lookup: { from:"states_schools", localField:"opeidstring", foreignField:"opeidstring", as:"schools" }},{$project:{_id:0}},{ $unwind:"$schools" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"students", localField:"opeidstring", foreignField:"opeidstring", as:"students" }},{$project:{_id:0}},{ $unwind:"$students" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"loans", localField:"opeidstring", foreignField:"opeidstring", as:"loans" }},{$project:{_id:0}},{ $unwind:"$loans" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"grants", localField:"opeidstring", foreignField:"opeidstring", as:"grants" }},{$project:{_id:0}},{ $unwind:"$grants" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"outcomes", localField:"opeidstring", foreignField:"opeidstring", as:"outcomes" }},{$project:{_id:0}},{ $unwind:"$outcomes" },{ $out: "final"}]);

 mongodump --db live_test
 mongorestore -h ds151909.mlab.com:51909 -d heroku_2l5qrfnd -u 'kjackson' -p '<password>' dump/live_test


States

Start Mongo Server: mongod

Import CSV Data:
mongoimport --db febp --collection states_students --type csv --headerline --file data/states/ed-index-students-states.csv
mongoimport --db febp --collection states_outcomes --type csv --headerline --file data/states/ed-index-outcomes-states.csv
mongoimport --db febp --collection states_schools --type csv --headerline --file data/states/ed-index-schools-states.csv
mongoimport --db febp --collection states_grants --type csv --headerline --file data/states/ed-index-grants-states.csv
mongoimport --db febp --collection states_loans --type csv --headerline --file data/states/ed-index-loans-states.csv

Nest year data:
mongo ./database_setup/nest_year_data.js 

Add entry for each state to combined collection
> use febp
> db.states_schools.find({}, { id: 1, state: 1 }).forEach(function(doc){ db.states_combined.insert(doc); });

Aggregate collections into combined collection
>
	db.states_combined.aggregate([{ $lookup: { from:"states_schools", localField:"id", foreignField:"id", as:"schools" }},{$project:{_id:0}},{ $unwind:"$schools" },{ $out: "states_combined"}]);
	db.states_combined.aggregate([{ $lookup: { from:"states_students", localField:"id", foreignField:"id", as:"students" }},{$project:{_id:0}},{ $unwind:"$students" },{ $out: "states_combined"}]);
	db.states_combined.aggregate([{ $lookup: { from:"states_loans", localField:"id", foreignField:"id", as:"loans" }},{$project:{_id:0}},{ $unwind:"$loans" },{ $out: "states_combined"}]);
	db.states_combined.aggregate([{ $lookup: { from:"states_grants", localField:"id", foreignField:"id", as:"grants" }},{$project:{_id:0}},{ $unwind:"$grants" },{ $out: "states_combined"}]);
	db.states_combined.aggregate([{ $lookup: { from:"states_outcomes", localField:"id", foreignField:"id", as:"outcomes" }},{$project:{_id:0}},{ $unwind:"$outcomes" },{ $out: "states_combined"}]);

Get Full State Names

mongo ./database_setup/get_full_state_names.js 

add path keys

mongo ./database_setup/add_path_keys.js 



Institutions

Start Mongo Server: mongod

Import CSV Data:
mongoimport --db febp --collection inst_students --type csv --headerline --file data/inst/ed-index-students-inst.csv
mongoimport --db febp --collection inst_outcomes --type csv --headerline --file data/inst/ed-index-outcomes-inst.csv
mongoimport --db febp --collection inst_schools --type csv --headerline --file data/inst/ed-index-schools-inst.csv
mongoimport --db febp --collection inst_grants --type csv --headerline --file data/inst/ed-index-grants-inst.csv
mongoimport --db febp --collection inst_loans --type csv --headerline --file data/inst/ed-index-loans-inst.csv

Nest year data:
mongo ./database_setup/nest_year_data.js 

Add entry for each state to combined collection
> use febp
> db.inst_grants.find({}, { unitid: 1, school: 1 }).forEach(function(doc){ db.inst_combined.insert(doc); });

Aggregate collections into combined collection
>
	db.inst_combined.aggregate([{ $lookup: { from:"inst_schools", localField:"unitid", foreignField:"unitid", as:"schools" }},{$project:{_unitid:0}},{ $unwind:"$schools" },{ $out: "inst_combined"}]);
	db.inst_combined.aggregate([{ $lookup: { from:"inst_students", localField:"unitid", foreignField:"unitid", as:"students" }},{$project:{_unitid:0}},{ $unwind:"$students" },{ $out: "inst_combined"}]);
	db.inst_combined.aggregate([{ $lookup: { from:"inst_loans", localField:"unitid", foreignField:"unitid", as:"loans" }},{$project:{_unitid:0}},{ $unwind:"$loans" },{ $out: "inst_combined"}]);
	db.inst_combined.aggregate([{ $lookup: { from:"inst_grants", localField:"unitid", foreignField:"unitid", as:"grants" }},{$project:{_unitid:0}},{ $unwind:"$grants" },{ $out: "inst_combined"}]);
	db.inst_combined.aggregate([{ $lookup: { from:"inst_outcomes", localField:"unitid", foreignField:"unitid", as:"outcomes" }},{$project:{_unitid:0}},{ $unwind:"$outcomes" },{ $out: "inst_combined"}]);

Rename "school" field to "name" and add path keys

mongo ./database_setup/add_path_keys.js 



Uploading to Production Database

mongodump --db febp

