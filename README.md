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


{ "_id" : ObjectId("589cbabfe06094e737cedd13"), "opeidstring" : 103000, "school" : "Bishop State Community College", "schools" : { "_id" : ObjectId("589c8cde0b672faedb4faa75"), "" : 23, "opeidstring" : 103000, "school" : "Bishop State Community College", "unitid" : { "x" : 102030, "y" : 102030 }, "address" : "351 North Broad Street", "city" : "Mobile", "postal" : "AL", "zip" : "36603-5898", "sector" : 4, "level" : 2, "control" : 1, "degree" : 1, "hbcu" : 1, "longitud" : -88.056982, "latitude" : 30.693972, "maincampustype" : "Main-campus", "sat_avg_all_2013" : "NA", "hcm2_2013" : 0, "netprice_2014" : 5144, "netprice_2007" : 3655, "netprice_2008" : 3923, "netprice_2009" : 4349, "netprice_2010" : 2603, "netprice_2011" : "N/A", "netprice_2012" : 5318, "netpriceinc_2014" : 4764, "netpriceinc_2009" : 1723, "netpriceinc_2010" : 2160, "netpriceinc_2011" : "N/A", "netpriceinc_2012" : 5000, "indistprice_2006" : "N/A", "indistprice_2007" : "N/A", "indistprice_2008" : "N/A", "indistprice_2009" : "N/A", "indistprice_2010" : "N/A", "indistprice_2011" : "N/A", "indistprice_2012" : "N/A", "indistprice_2013" : "NA", "instateprice_2014" : 5760, "instateprice_2006" : "N/A", "instateprice_2007" : "N/A", "instateprice_2008" : "N/A", "instateprice_2009" : "N/A", "instateprice_2010" : "N/A", "instateprice_2011" : "N/A", "instateprice_2012" : "N/A", "instateprice_2013" : "NA", "outstateprice_2014" : 9150, "outstateprice_2006" : "N/A", "outstateprice_2007" : "N/A", "outstateprice_2008" : "N/A", "outstateprice_2009" : "N/A", "outstateprice_2010" : "N/A", "outstateprice_2011" : "N/A", "outstateprice_2012" : "N/A", "outstateprice_2013" : "NA", "gradbach_2014" : "NA", "gradbach_2006" : "N/A", "gradbach_2007" : "N/A", "gradbach_2008" : "N/A", "gradbach_2009" : "N/A", "gradbach_2010" : "N/A", "gradbach_2011" : "N/A", "gradbach_2012" : "N/A", "endowment_2014" : 150481, "endowment_2007" : "N/A", "endowment_2008" : "N/A", "endowment_2009" : "N/A", "endowment_2010" : "N/A", "endowment_2011" : "N/A", "endowment_2012" : "N/A", "endowment_2013" : "N/A", "transfer_2014" : 0.0949105914718019, "transfer_2006" : 0.09, "transfer_2007" : 0.1, "transfer_2008" : 0.12, "transfer_2009" : 0.11, "transfer_2010" : 0.11, "transfer_2011" : 0.11, "transfer_2012" : 0.09, "fedaidperc_2014" : 0.85, "fedaidperc_2006" : 0.810000002, "fedaidperc_2007" : 0.76, "fedaidperc_2008" : 0.71, "fedaidperc_2009" : 0.730000019, "fedaidperc_2010" : 0.78, "fedaidperc_2011" : 0.85000002, "fedaidperc_2012" : 0.89, "avetotaid_2014" : 5357, "avetotaid_2008" : 3910, "avetotaid_2009" : 4162, "avetotaid_2010" : 4764, "avetotaid_2011" : 5444, "avetotaid_2012" : 4685, "avefedaid_2014" : 4420, "avefedaid_2006" : 3453, "avefedaid_2007" : 3077, "avefedaid_2008" : 3528, "avefedaid_2009" : 4079, "avefedaid_2010" : 4520, "avefedaid_2011" : 5200, "avefedaid_2012" : 4290, "pellperc_2014" : 0.85, "pellperc_2008" : 0.7, "pellperc_2009" : 0.730000019, "pellperc_2010" : 0.78, "pellperc_2011" : 0.85, "pellperc_2012" : 0.89, "totalpellperc_2009" : 0.39, "totalpellperc_2010" : 0.48, "totalpellperc_2011" : 0.56, "totalpellperc_2012" : 0.61, "accredagency_2014" : "Southern Association of Colleges and Schools Commission on Colleges", "cost_2014" : 9955, "cost_2013" : 10059, "cost_2012" : 9987, "cost_2011" : 8731, "cost_2010" : 7317, "cost_2009" : 6497, "cost_2008" : "NA", "cost_2007" : "NA", "cost_2006" : "NA", "tuitfte_2014" : 1494, "tuitfte_2013" : 1494, "tuitfte_2012" : 1494, "tuitfte_2011" : 1494, "tuitfte_2010" : 1494, "tuitfte_2009" : 1494, "tuitfte_2008" : 1494, "tuitfte_2007" : 1494, "tuitfte_2006" : 1494, "inexpfte_2014" : 5895, "inexpfte_2013" : 5895, "inexpfte_2012" : 5895, "inexpfte_2011" : 5895, "inexpfte_2010" : 5895, "inexpfte_2009" : 5895, "inexpfte_2008" : 5895, "inexpfte_2007" : 5895, "inexpfte_2006" : 5895, "tuitionfee_prog_2014" : "NA", "tuitionfee_in_2014" : 4260, "tuitionfee_out_2014" : 7650, "tuitionfee_prog_2013" : "NA", "tuitionfee_in_2013" : 4200, "tuitionfee_out_2013" : 7530, "tuitionfee_prog_2012" : "NA", "tuitionfee_in_2012" : 4140, "tuitionfee_out_2012" : 7410, "tuitionfee_prog_2011" : "NA", "tuitionfee_in_2011" : 4080, "tuitionfee_out_2011" : 7290, "tuitionfee_prog_2010" : "NA", "tuitionfee_in_2010" : 3270, "tuitionfee_out_2010" : 5970, "tuitionfee_prog_2009" : "NA", "tuitionfee_in_2009" : 2700, "tuitionfee_out_2009" : 4830, "tuitionfee_prog_2008" : "NA", "tuitionfee_in_2008" : 2700, "tuitionfee_out_2008" : 4830, "tuitionfee_prog_2007" : "NA", "tuitionfee_in_2007" : 2700, "tuitionfee_out_2007" : 4830, "tuitionfee_in_2006" : 2160, "tuitionfee_out_2006" : 3864, "tuitionfee_prog_2006" : "NA", "hcm2_2014" : 0 }, "students" : { "_id" : ObjectId("589c8cba0b672faedb4f8db0"), "" : 23, "opeidstring" : 103000, "school" : "Bishop State Community College", "enroll_2014" : 3320, "gradenroll_2014" : "NA", "ugenroll_2014" : 3320, "ftenroll_2014" : 1442, "ptenroll_2014" : 1878, "enroll_2006" : 4070, "enroll_2007" : 2811, "enroll_2008" : 3215, "enroll_2009" : 3598, "enroll_2010" : 3598, "enroll_2011" : 3982, "enroll_2012" : 3702, "enroll_2013" : 3803, "ftenroll_2006" : 2035, "ftenroll_2007" : 1165, "ftenroll_2008" : 1314, "ftenroll_2009" : 1661, "ftenroll_2010" : 1661, "ftenroll_2011" : 1950, "ftenroll_2012" : 1958, "ftenroll_2013" : 2164, "gradenroll_2009" : "N/A", "gradenroll_2011" : "N/A", "gradenroll_2012" : 0, "gradenroll_2013" : 0, "ptenroll_2006" : 2035, "ptenroll_2007" : 1646, "ptenroll_2008" : 1901, "ptenroll_2009" : 1937, "ptenroll_2010" : 1937, "ptenroll_2011" : 2032, "ptenroll_2012" : 1744, "ptenroll_2013" : 1639, "white_2014" : 0.284939759036145, "white_2006" : 0.340000004, "white_2007" : 0.400000006, "white_2008" : 0.37, "white_2009" : 0.360000014, "white_2010" : 0.36, "white_2011" : 0.33, "white_2012" : 0.3, "afam_2014" : 0.63644578313253, "afam_2006" : 0.610000014, "afam_2007" : 0.540000022, "afam_2008" : 0.53, "afam_2009" : 0.569999993, "afam_2010" : 0.57, "afam_2011" : 0.61, "afam_2012" : 0.63, "asia_2014" : 0.016566265060241, "hisp_2014" : 0.0189759036144578, "hisp_2006" : 0.01, "hisp_2007" : 0.01, "hisp_2008" : 0.02, "hisp_2009" : 0.01, "hisp_2010" : 0.01, "hisp_2011" : 0.01, "hisp_2012" : 0.01, "amin_2014" : 0.00692771084337349, "amin_2006" : 0.01, "amin_2007" : 0.01, "amin_2008" : 0, "amin_2009" : 0, "amin_2010" : 0, "amin_2011" : 0.01, "amin_2012" : 0.01, "nhpi_2014" : 0.00210843373493976, "twoormore_2014" : 0.0120481927710843, "unk_2014" : 0.00451807228915663, "fem_2014" : 0.594578313253012, "fem_2006" : 0.680000007, "fem_2007" : 0.660000026, "fem_2008" : 0.67, "fem_2009" : 0.639999986, "fem_2010" : 0.64, "fem_2011" : 0.64, "fem_2012" : 0.64, "men_2014" : 0.405421686746988, "unitid" : 102030, "agege24_2014" : "NA", "agege24_2013" : "NA", "agege24_2012" : "NA", "agege24_2011" : "NA", "agege24_2010" : "NA", "agege24_2009" : "NA", "agege24_2008" : "NA", "agege24_2007" : "NA", "agege24_2006" : "NA", "veteran_2014" : 0.0070512821, "veteran_2013" : 0.0051531635, "veteran_2012" : 0.005851212, "veteran_2011" : 0.0078763127, "veteran_2010" : 0.0227864583, "veteran_2009" : 0.0314075223, "veteran_2008" : 0.0316820276, "veteran_2007" : 0.0304878049, "veteran_2006" : 0.0362416107, "married_2014" : 0.0887820513, "married_2013" : 0.1150873175, "married_2012" : 0.1220395653, "married_2011" : 0.1271878646, "married_2010" : 0.1376953125, "married_2009" : 0.1341605273, "married_2008" : 0.1347926267, "married_2007" : 0.1483739837, "married_2006" : 0.1498881432, "first_gen_2014" : 0.476635514, "first_gen_2013" : 0.4891651865, "first_gen_2012" : 0.5015437393, "first_gen_2011" : 0.5052742616, "first_gen_2010" : 0.5197472354, "first_gen_2009" : 0.525, "first_gen_2008" : 0.4928732183, "first_gen_2007" : 0.5059121622, "first_gen_2006" : 0.5136338342, "pell_ever_2014" : "NA", "pell_ever_2013" : "NA", "pell_ever_2012" : "NA", "pell_ever_2011" : "NA", "pell_ever_2010" : "NA", "pell_ever_2009" : "NA", "pell_ever_2008" : "NA", "pell_ever_2007" : "NA", "pell_ever_2006" : "NA", "loan_ever_2014" : "NA", "loan_ever_2013" : "NA", "loan_ever_2012" : "NA", "loan_ever_2011" : "NA", "loan_ever_2010" : "NA", "loan_ever_2009" : "NA", "loan_ever_2008" : "NA", "loan_ever_2007" : "NA", "loan_ever_2006" : "NA" } }
