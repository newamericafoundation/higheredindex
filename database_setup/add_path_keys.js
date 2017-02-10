conn = new Mongo();
db = conn.getDB("live_test");
cursor = db.final_test.find();

// example = db.institutions.findOne();
// printjson( example );
// originalKeys = Object.keys(example)
// dedupedKeys = new Set();

// originalKeys.map(function(key) {
// 	dedupedKeys.add(key.replace(/_[0-9]{4}/i, ''));
// })

valList = []

db.final_test.updateMany( {}, { $rename: { "school": "name"}});

while ( cursor.hasNext()) {

	curr = cursor.next();
	name = curr.name
	id = curr._id
	// print(name)
	path = name.toLowerCase().replace(/ /g, "_").replace("&", "and").replace(/,/g, "").replace(/-/g, "_").replace(/'/g, "")
	if (valList.indexOf(path) === -1) {
		valList.push(path);
	} else {
		print(name)
		print(path)
	}

	db.final_test.updateOne(
		{"_id": id},
		{ $set: { path : path }}
	);

}


