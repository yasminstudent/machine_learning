const Mind = require('node-mind');

const config = {
	iterations: 5000, //épocas de treinamento
	learningRate: .7, //taxa de aprendizagem
	activator: 'sigmoid' //função de ativação
	//as únicas funções disponíveis são: htan e sigmoid
	//sempre que os dados de treinamento seja 0 e 1, a função + indicada é a sigmoid
	//ela sempre retornara valores entre 0 e 1
};

const mind = new Mind(config);

//treinamento
mind.learn([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [0]},
	{input: [1, 0], output: [0]},
	{input: [1, 1], output: [1]}
]);

const output00 = parseFloat(mind.predict([0, 0])).toFixed(0);
const output01 = parseFloat(mind.predict([0, 1])).toFixed(0);
const output10 = parseFloat(mind.predict([1, 0])).toFixed(0);
const output11 = parseFloat(mind.predict([1, 1])).toFixed(0);

console.log(`0 and 0: ${output00}`);
console.log(`0 and 1: ${output01}`);
console.log(`1 and 0: ${output10}`);
console.log(`1 and 1: ${output11}`);
