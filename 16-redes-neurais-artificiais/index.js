﻿let config = {};
let Weights = [];
let Inputs = [];
let Targets = [];
let Epochs = 1;
let Activation = 'tanh';
let hiddenLayers = 2;
let hiddenNodes = 4;
let bias = 1;
let add = [];

function funcSum(arr=[]) {
	return arr.reduce((a, b) => a + b);
}

function gradientDescent(n=0) {
	return n * (1 - n);
}

//Atualizando dados para ficarem entre 0 e 1
function updateArray(matrix=[]) {
	let resultMatrix = [];
	for(let i=0; i<matrix.length; i++) { //percorre as linhas da matriz
		let arr = matrix[i];
		let resultArray = [];
		for(let j=0; j<arr.length; j++) { //percorre a linha correspondente (que é um array)
			let element = arr[j]; //pega o elemento
			if(element==0) element = 0.01; //para não anular a multiplicação
			if(element>1) {
				let res = 0;
				if(element.toString().trim().indexOf('.')>0) { //verifica se é um número decimal (se tiver . (ponto) é pq é)
					let temp = element.toString().trim().split('.'); //transforma em array separado por .
					let str = temp[0].toString().trim(); //pega a parte inteira do número
					let len = str.length; //tamanho do número. Ex: N: 10 -> Tamanho: 2 
					let div = Number('1'.padEnd(len+1, '0')); 
					//concatena 1 com zeros (sendo que o número final terá o tamanho do número do elemento + 1)
					//Ex: N:10 -> Tamanho: 2; Div:100 -> Tamanho:3
					res = element / div; //dive os valores (desse modo o valor fica entre 0 e 1)
					resultArray.push(res);
				}else { //caso seja um valor inteiro
					let str = element.toString().trim();
					let len = str.length;
					let div = Number('1'.padEnd(len+1, '0'));
					res = element / div;
					resultArray.push(res);					
				}
			}else { //caso já esteja entre 0 e 1
				resultArray.push(element);
			}
		}
		resultMatrix.push(resultArray); //adiciona na nova matriz a nova linha
	}
	return resultMatrix; //retorna a nova matriz
}

function train(fit=[]) {
	for(let i=0; i<fit.length; i++) {
		if(fit[i].input) Inputs.push(fit[i].input); else Inputs.push([0]);
		if(fit[i].output) Targets.push(fit[i].output); else Targets.push([0]);
	}

	//chamada da função que atualiza os dados para ficarem entre 0 e 1
	Inputs = updateArray(Inputs); 
	Targets = updateArray(Targets);

	for(let i=0; i<Inputs.length; i++) {
		for(let j=0; j<Targets.length; j++) {
			if((Inputs[i][j]!=undefined)&&(Targets[i][j]!=undefined)) {
				feedForward(Inputs[i], Targets[i][j], Epochs, Activation, hiddenLayers, hiddenNodes);
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

function predict(inputs=[]) {
	inputs = updateArray([inputs]); //passa a matriz (por isso o array está entre [])
	inputs = inputs[0]; //pega apenas o array novamente
	let Outputs = [];
	// encontra a entrada do treino mais próxima da entrada da predição
	let diff = [];
	for(let i=0; i<Weights.length; i++) {
		let Input = Weights[i].input;
		let Sum = 0;
		for(let j=0; j<inputs.length; j++) {
			Sum += Math.abs(inputs[j] - Input[j]);
		}
		diff.push({index: i, value: Sum});
	}
	
	let min = Infinity;
	let index = 0;
	for(let i=0; i<diff.length; i++) {
		if(diff[i].value<min) {
			min = diff[i].value;
			index = diff[i].index;
		}
	}

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

function feedForward(inputs=[], target=0, epochs=1, activation='sigmoid', hidden=1, hiddenNodes=2) {
	// pesos das camadas ocultas
	let matrixHidden = [];
	for(let i=0; i<hidden; i++) {
		let arrHidden = [];
		for(let j=0; j<hiddenNodes; j++) {
			arrHidden.push(0);
		}
		matrixHidden.push(arrHidden);
	}

	// backpropagation
	let stop = false;
	let output = 0;
	if(target!=0) {
		for(let i=1; i<=epochs; i++) {
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
	if(stop==false) {
		if(output > target) {
			for(let x=0; x<matrixHidden.length; x++) {
				for(let y=0; y<matrixHidden[x].length; y++) {
					matrixHidden[x][y] -= bias;
				}
			}			
		}else if(output < target) {
			for(let x=0; x<matrixHidden.length; x++) {
				for(let y=0; y<matrixHidden[x].length; y++) {
					matrixHidden[x][y] += bias;
				}
			}			
		}
		Weights.push({input: inputs, weights: matrixHidden});
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

console.log(`0 xor 0: ${parseFloat(predict([0, 0])).toFixed(0)}`);
console.log(`0 xor 1: ${parseFloat(predict([0, 1])).toFixed(0)}`);
console.log(`1 xor 0: ${parseFloat(predict([1, 0])).toFixed(0)}`);
console.log(`1 xor 1: ${parseFloat(predict([1, 1])).toFixed(0)}`);
