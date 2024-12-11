/*
	retorna uma saída de acordo com os dados de treinamento
	fas o algorítimo aprender tipo operadores lógicos
*/

let config = {};
let Weights = [];
let Inputs = [];
let Targets = [];
let Epochs = 1;
let Activation = 'tanh';
let hiddenLayers = 2;
let hiddenNodes = 4;
let bias = 1;
let add = [];

//soma os valores de um array
function funcSum(arr=[]) {
	return arr.reduce((a, b) => a + b);
}

//fórmula para melhorar pesos
function gradientDescent(n=0) {
	return n * (1 - n);
}

//recebe um array de jsons com as entradas e as saídas 
function train(fit=[]) {
	for(let i=0; i<fit.length; i++) { //percorre esse array
		//verifica se as inputs e outputs não estão vazias e add nas variáveis globais
		if(fit[i].input) Inputs.push(fit[i].input); else Inputs.push([0]);
		if(fit[i].output) Targets.push(fit[i].output); else Targets.push([0]);
	}

	for(let i=0; i<Inputs.length; i++) { //percorre as entradas
		for(let j=0; j<Targets.length; j++) { //percorre as saídas
			if((Inputs[i][j]!=undefined)&&(Targets[i][j]!=undefined)) {
				feedForward(Inputs[i], Targets[i][j], Epochs, Activation, hiddenLayers, hiddenNodes);
				//console.log(`input: ${Inputs[i] } output: ${Targets[i][j]}, epoch: ${Epochs}, activation: ${Activation}, hiddenLayers: ${hiddenLayers}, hiddenNodes: ${hiddenNodes}`)
				//retorno 1: input: 0,0 output: 0, epoch: 1, activation: tanh, hiddenLayers: 2, hiddenNodes: 4
			}
		}
	}
}

function saveModel(path='./model.json') {
	const fs = require('fs');
	config.Weights = Weights;
	config.Activation = Activation;
	config.hiddenLayers = hiddenLayers;
	config.hiddenNodes = hiddenNodes;
	fs.writeFileSync(path, JSON.stringify(config));
}

function loadModel(path='./model.json') {
	const fs = require('fs');
	const data = fs.readFileSync(path, 'utf8');
	const json = JSON.parse(data);
	Weights = json.Weights;
	Activation = json.Activation;
	hiddenLayers = json.hiddenLayers;
	hiddenNodes = json.hiddenNodes;
}

//recebe a entrada ex: [1, 0]
function predict(inputs=[]) {
	let Outputs = [];
	// encontra a entrada do treino mais próxima da entrada da predição
	for(let i=0; i<Weights.length; i++) { //percorre o array com as entradas e pesos
		let Input = Weights[i].input; //pega a entrada do índice - ex: [0, 1]
		let diff = [];
		for(let j=0; j<inputs.length; j++) { //percorre as entradas recebidas
			diff.push(Math.abs(inputs[j] - Input[j]));
		}
		let reduce = diff.reduce((a, b) => Number(a+''+b)); //concatena os valores das subtrações
		add.push(reduce);
	}
	let search = inputs.reduce((a, b) => Number(a+''+b)); //concatena os valores recebidos 10
	let index = add.indexOf(search); //retorna o índice procurado

	let limit = 1;
	if(Targets[0]) limit = Targets[0].length;
	for(let i=0; i<limit; i++) {
		// usa os pesos da entrada do treino mais próximo
		let matrixHidden = Weights[index].weights;
		// sinapse das entradas com as ocultas
		let multiply = [];
		for(let j=0; j<inputs.length; j++) {
			for(let x=0; x<matrixHidden.length; x++) {
				for(let y=0; y<matrixHidden[x].length; y++) {
					multiply.push(inputs[j] * matrixHidden[x][y]);
				}
			}
		}
		let sum = funcSum(multiply);
		// função de ativação
		switch(Activation) {
			case 'tanh': output = parseFloat(tanh(sum)).toFixed(4); break;
			case 'sigmoid': output = parseFloat(sigmoid(sum)).toFixed(4); break;
			case 'relu': output = parseFloat(relu(sum)).toFixed(4); break;
			case 'leakyRelu': output = parseFloat(leakyRelu(sum)).toFixed(4); break;
			case 'binaryStep': output = parseFloat(binaryStep(sum)).toFixed(4); break;
			default: output = parseFloat(sigmoid(sum)).toFixed(4);
		}
		// constroi o array de saída
		Outputs.push(Number(output));
	}
	return Outputs;
}

function feedForward(inputs=[], target=0, epochs=1, activation='sigmoid', hidden=2, hiddenNodes=4) {
	// pesos das camadas ocultas
	let matrixHidden = [];
	for(let i=0; i<hidden; i++) { //linha da matriz
		let arrHidden = [];
		for(let j=0; j<hiddenNodes; j++) { //colunas da matriz
			arrHidden.push(0);
		}
		matrixHidden.push(arrHidden);
	}
	/*
		Ex: [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
	*/

	// backpropagation
	let stop = false;
	let output = 0;
	if(target!=0) {
		for(let i=1; i<=epochs; i++) {
			// sinapse das entradas com as ocultas
			let multiply = [];
			for(let j=0; j<inputs.length; j++) { //percorre as entradas
				for(let x=0; x<matrixHidden.length; x++) {
					for(let y=0; y<matrixHidden[x].length; y++) {
						multiply.push(inputs[j] * matrixHidden[x][y]); //multiplica a entrada com os pesos
					}
				}
			}
			// Ex: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]

			let sum = funcSum(multiply);
			// função de ativação
			switch(activation) {
				case 'tanh': output = parseFloat(tanh(sum)).toFixed(4); break;
				case 'sigmoid': output = parseFloat(sigmoid(sum)).toFixed(4); break;
				case 'relu': output = parseFloat(relu(sum)).toFixed(4); break;
				case 'leakyRelu': output = parseFloat(leakyRelu(sum)).toFixed(4); break;
				case 'binaryStep': output = parseFloat(binaryStep(sum)).toFixed(4); break;
				default: output = parseFloat(sigmoid(sum)).toFixed(4);
			}
			// taxa de erro
			let error = parseFloat(Math.abs(target - output)).toFixed(4);
			// corta o processamento quando encontra um valor próximo da busca
			if((error<=0.1)&&(stop==false)) {
				Weights.push({input: inputs, weights: matrixHidden});
				i=epochs+1;
				stop = true;
			}
			// atualização dos pesos
			for(let j=0; j<inputs.length; j++) {
				for(let x=0; x<matrixHidden.length; x++) {
					for(let y=0; y<matrixHidden[x].length; y++) {
						matrixHidden[x][y] += inputs[j] * gradientDescent(error);
					}
				}				
			}
		}
	}
	// usa o bias se não encontrou a busca
	if(stop==false) { //caso não tenha encontrado um valor próximo a busca
		if(output > target) { //se a saída encontrada for maior que a desejada
			for(let x=0; x<matrixHidden.length; x++) {
				for(let y=0; y<matrixHidden[x].length; y++) {
					matrixHidden[x][y] -= bias;
				}
			}			
		}else if(output < target) { //se a saída encontrada for menor que a desejada
			for(let x=0; x<matrixHidden.length; x++) {
				for(let y=0; y<matrixHidden[x].length; y++) {
					matrixHidden[x][y] += bias;
				}
			}			
		}
		Weights.push({input: inputs, weights: matrixHidden}); //salva a input e o peso mais provavél de acerto
	} 
}

// tangente hiperbólica: retorna valores entre -1 e 1
function tanh(n=0) { return Math.sinh(n) / Math.cosh(n); }
// função sigmóide: retorna valores entre 0 e 1
function sigmoid(n=0) { return 1 / (1 + Math.pow(Math.E, -n)); }
// unidade linear retificada (relu): retorna somente valores nulos e positivos
function relu(n=0) { return Math.max(n, 0); }
// unidade linear retificada com vazamento (leaky relu): retorna somente valores maiores que zero
function leakyRelu(n=0) { return Math.max(n, 0.01); }
// passo binário: retorna somente 0 ou 1
function binaryStep(n=0) { return (n >= 0) ? 1 : 0; }

train([
	{input: [0, 0], output: [0]},
	{input: [0, 1], output: [1]},
	{input: [1, 0], output: [1]},
	{input: [1, 1], output: [0]}
]);


console.log(`0 xor 0: ${predict([0, 0])}`);
console.log(`0 xor 1: ${predict([0, 1])}`);
console.log(`1 xor 0: ${predict([1, 0])}`);
console.log(`1 xor 1: ${predict([1, 1])}`); 
