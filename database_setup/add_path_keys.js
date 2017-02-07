conn = new Mongo();
db = conn.getDB("live");
cursor = db.institutions.find();

// example = db.institutions.findOne();
// printjson( example );
// originalKeys = Object.keys(example)
// dedupedKeys = new Set();

// originalKeys.map(function(key) {
// 	dedupedKeys.add(key.replace(/_[0-9]{4}/i, ''));
// })

valList = []

i = 0;
while ( cursor.hasNext() && i < 20 ) {
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
	

	db.institutions.updateOne(
		{"_id": id},
		{ $set: { path : path }}
	);
	// i++;

}