const brain = require('brain.js');

const net = new brain.recurrent.RNN(); // retorna um resultado exato do treinamento

net.train([
	[10, 20, 30]
]);

const output = net.run([10, 20]);
console.log(`o dado posterior a 10 e 20 é ${output}`);
