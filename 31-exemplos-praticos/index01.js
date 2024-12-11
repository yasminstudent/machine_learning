const CSV = require('./csv');
//output : nome da chavee de saída (localizada na primeira linha do arq testeCSV01.csv)
const csv = new CSV({separator: ';', output: ['output']});

const matrix = [[30], [40], [50]];
csv.insertOutput('./testeCSV01.csv', matrix);
console.log('CSV atualizado com SUCESSO!');
