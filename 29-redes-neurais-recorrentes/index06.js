const brain = require('brain.js');

const net = new brain.recurrent.RNNTimeStep(); // retorna um resultado aproximado (maior do que o esperado)

net.train([
	[10, 20, 30]
]);

const output = net.run([10, 20]);
console.log(`o dado posterior a 10 e 20 é ${output}`); //retornou um valor real que arredondado fica 30
