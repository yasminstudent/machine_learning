const multivariateRegression = require('./multivariate-regression');

const config = {
    input: [[1, 2, 1], [2, 3, 1], [3, 4, 1]], 
    output: [2, 4, 6] // 1º + 2º - 3º
}

const regression = new multivariateRegression();
regression.train(config);

const result = regression.predict([[4, 5, 1], [5, 6, 1]]);
console.log(result);