conn = new Mongo();
db = conn.getDB("live_test");

sections = ["students"]

// nest year data

for (i = 0; i < sections.length; i++) {
	print("nesting " + sections[i]);
	nest(sections[i]);
}

function nest(collection) {
	cursor = db[collection].find();

	example = db[collection].findOne();
	originalKeys = Object.keys(example)
	keysToReplace = new Set();
	keysToUnset = {};

	regEx = new RegExp('_[0-9]{4}');

	originalKeys.map(function(key) {
		if (regEx.test(key)) {
			keysToReplace.add(key.replace(/_[0-9]{4}/i, ''));
			keysToUnset[key] = "";
		}
	})

	keyArray = Array.from(keysToReplace)

	while ( cursor.hasNext()) {
		curr = cursor.next();
		id = curr._id
		finalValObject = {}
		for (var i = 0; i < keyArray.length; i++) {
			var key = keyArray[i],
				values = {};

			for (var year = 2006; year < 2015; year++) {
				val = curr[key + "_" + year]


				if (!isNaN(val)) {
					values[year] = val;
				}
			}

			finalValObject[key] = values
		}

		db[collection].updateOne(
			{"_id": id},
			{ $set: finalValObject }
		);
	}

	//remove original/now obsolete year categories
	db[collection].updateMany({}, { $unset: keysToUnset })
}


