const brain = require('brain.js');
const fs = require('fs');

const net = new brain.NeuralNetwork();

net.train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [1]},
	{input: [1, 0], output: [1]},
	{input: [1, 1], output: [0]}
]);

const json = net.toJSON(); //converte para o formato json
const path = './model-xor.json'; //caminho para salvar o modelo
fs.writeFileSync(path, JSON.stringify(json)); //escreve no arquivo o json
if(fs.existsSync(path)) console.log('modelo salvo com sucesso.'); //verifica se o modelo existe
