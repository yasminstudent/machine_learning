const mlr = require('ml-regression-multivariate-linear');

const x = [[1], [2], [3], [4]]; //entradas
const y = [[9], [18], [27], [36]]; //saídas

//Quando outros valores além dos de x são usados para calcular o y a regressão é considerada linear
//Quando é usado somente valores de x a regressão é não linear

const regression = new mlr(x, y);

const result = regression.predict([5]);
let output = [];
for(let i=0; i<result.length; i++) {
	output.push(Number(parseFloat(result[i]).toFixed(0)));
}
console.log(output);
