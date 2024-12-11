const linearRegression = require('./linear-regression');

const regression = new linearRegression();
regression.loadModel('./models/model-regression.json');
const result = regression.predict([5, 6]);
console.log(result);