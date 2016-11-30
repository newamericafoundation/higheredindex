var athletes = [
  {
    'id': 'driulis-gonzalez',
    'name': 'Driulis González',
    'country': 'cu',
    'birth': '1973',
    'image': 'driulis-gonzalez.jpg',
    'cover': 'driulis-gonzalez-cover.jpg',
    'link': 'https://en.wikipedia.org/wiki/Driulis_González'
  },
  {
    'id': 'mark-huizinga',
    'name': 'Mark Huizinga',
    'country': 'nl',
    'birth': '1973',
    'image': 'mark-huizinga.jpg',
    'cover': 'mark-huizinga-cover.jpg',
    'link': 'https://en.wikipedia.org/wiki/Mark_Huizinga'
  },
  {
    'id': 'rishod-sobirov',
    'name': 'Rishod Sobirov',
    'country': 'uz',
    'birth': '1986',
    'image': 'rishod-sobirov.jpg',
    'cover': 'rishod-sobirov-cover.jpg',
    'link': 'https://en.wikipedia.org/wiki/Rishod_Sobirov'
  },
  {
    'id': 'ryoko-tani',
    'name': 'Ryoko Tani',
    'country': 'jp',
    'birth': '1975',
    'image': 'ryoko-tani.jpg',
    'cover': 'ryoko-tani-cover.jpg',
    'link': 'https://en.wikipedia.org/wiki/Ryoko_Tani'
  },
  {
    'id': 'teddy-riner',
    'name': 'Teddy Riner',
    'country': 'fr',
    'birth': '1989',
    'image': 'teddy-riner.jpg',
    'cover': 'teddy-riner-cover.jpg',
    'link': 'https://en.wikipedia.org/wiki/Teddy_Riner'
  }
];

var connection = new Mongo("localhost:27017");
var db = connection.getDB("test");
print("connecting!");

db.athletes.drop();
db.athletes.insert(athletes);