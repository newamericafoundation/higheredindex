conn = new Mongo();
db = conn.getDB("test");
cursor = db.states.find();

example = db.states.findOne();
printjson( example );
originalKeys = Object.keys(example)
dedupedKeys = new Set();

// originalKeys.map(function(key) {
// 	dedupedKeys.add(key.replace(/_[0-9]{4}/i, ''));
// })
// print(dedupedKeys.size);

regEx = new RegExp('_[0-9]{4}');

while ( cursor.hasNext() ) {
	curr = cursor.next();
	id = curr._id

	for (let key of originalKeys) {
		if (regEx.test(key)) {
			variable = key.replace(/_[0-9]{4}/i, '');
			year = key.match(/[0-9]{4}/i);
			fullFieldRef = variable + "." + year;
			db.states.updateOne(
				{"_id": id},
				{ $set: { [fullFieldRef] : curr[key] },
				  $unset: { [key] : ""}
				}
			);
		}
	}

}