/*
	Redes neurais recorrentes => focam na posição dos dados + do que no padrão
	São usadas quando a ordem e posição dos dados são mais importantes do que o dado em si
*/
const brain = require('brain.js');

const net = new brain.recurrent.RNN();

net.train([ //treinamento
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [0]},
	{input: [1, 0], output: [0]},
	{input: [1, 1], output: [1]}
]);

const output00 = parseFloat(net.run([0, 0])).toFixed(0);
const output01 = parseFloat(net.run([0, 1])).toFixed(0);
const output10 = parseFloat(net.run([1, 0])).toFixed(0);
const output11 = parseFloat(net.run([1, 1])).toFixed(0);

console.log(`0 and 0: ${output00}`);
console.log(`0 and 1: ${output01}`);
console.log(`1 and 0: ${output10}`);
console.log(`1 and 1: ${output11}`);
