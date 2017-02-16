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


db.schools.find({}, { opeidstring: 1, school: 1 }).forEach(function(doc){ db.final.insert(doc); });

db.final.aggregate([{ $lookup: { from:"schools", localField:"opeidstring", foreignField:"opeidstring", as:"schools" }},{$project:{_id:0}},{ $unwind:"$schools" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"students", localField:"opeidstring", foreignField:"opeidstring", as:"students" }},{$project:{_id:0}},{ $unwind:"$students" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"loans", localField:"opeidstring", foreignField:"opeidstring", as:"loans" }},{$project:{_id:0}},{ $unwind:"$loans" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"grants", localField:"opeidstring", foreignField:"opeidstring", as:"grants" }},{$project:{_id:0}},{ $unwind:"$grants" },{ $out: "final"}]);
db.final.aggregate([{ $lookup: { from:"outcomes", localField:"opeidstring", foreignField:"opeidstring", as:"outcomes" }},{$project:{_id:0}},{ $unwind:"$outcomes" },{ $out: "final"}]);

 mongodump --db live_test
 mongorestore -h ds151909.mlab.com:51909 -d heroku_2l5qrfnd -u 'kjackson' -p 'theSEA!17' dump/live_test