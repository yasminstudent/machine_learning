const brain = require('brain.js');

const net = new brain.recurrent.RNNTimeStep({
	inputSize: 2, //quantidade de valores de entrada
	outputSize: 2
});

net.train([
	[0, 1],
	[1, 2],
	[2, 3]
]);

const output = net.run([[0, 1], [1, 2]]);
console.log(output);
