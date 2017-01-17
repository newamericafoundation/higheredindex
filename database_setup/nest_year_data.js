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

keyArray = Array.from(originalKeys)

regEx = new RegExp('_[0-9]{4}');

while ( cursor.hasNext() ) {
	curr = cursor.next();
	id = curr._id
	print(id)
	for (var i = 0; i < keyArray.length; i++) {
		var key = keyArray[i];
		print(key);
		if (regEx.test(key)) {
			print("regex matched")
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