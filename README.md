Mongo

Loading data from csv into Mongo

- save file as Windows separated csv - regular csv will result in `fields cannot be identical: ' ' and ' ' error

from command line (not mongo shell)
- mongoimport --db test --collection institutions --type csv --headerline --file febp_higher_ed_sample.csv
