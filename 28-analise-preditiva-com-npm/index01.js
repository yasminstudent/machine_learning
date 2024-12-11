const synaptic = require('synaptic');

const inputLayer = new synaptic.Layer(2); //quantidade de nós/entradas na camada
const outputLayer = new synaptic.Layer(1); //camada de sáida
//projeta a arquitetura da rede (diferencia a input da output)
inputLayer.project(outputLayer);

//aplica a arquitetura definida
const NeuralNetwork = new synaptic.Network({
	input: inputLayer,
	output: outputLayer
});

const learningRate = .5; //taxa de aprendizagem, quanto menor menos processamento
//laço que percorre as épocas de treinamento
for(let i=0; i<2000; i++) {
	NeuralNetwork.activate([0, 0]); //recebe os dados de entrada da fase de treinamento
	NeuralNetwork.propagate(learningRate, [0]); //taxa de aprendizagem e saída

	NeuralNetwork.activate([0, 1]);
	NeuralNetwork.propagate(learningRate, [0]);

	NeuralNetwork.activate([1, 0]);
	NeuralNetwork.propagate(learningRate, [0]);

	NeuralNetwork.activate([1, 1]);
	NeuralNetwork.propagate(learningRate, [1]);
}

const output00 = parseFloat(NeuralNetwork.activate([0, 0])).toFixed(0);
const output01 = parseFloat(NeuralNetwork.activate([0, 1])).toFixed(0);
const output10 = parseFloat(NeuralNetwork.activate([1, 0])).toFixed(0);
const output11 = parseFloat(NeuralNetwork.activate([1, 1])).toFixed(0);

console.log(`0 and 0: ${output00}`);
console.log(`0 and 1: ${output01}`);
console.log(`1 and 0: ${output10}`);
console.log(`1 and 1: ${output11}`);
