﻿class NeuralNetwork {
	constructor(params={}) {
		this.math = require('mathjs');
		this.input_nodes = 2;
		this.hidden_nodes = 4;
		this.output_nodes = 1;
		this.epochs = 50000;
		this.learning_rate = 0.5;
		this.activation = this.sigmoid;

		if(params.input_nodes) this.input_nodes = params.input_nodes;
		if(params.hidden_nodes) this.hidden_nodes = params.hidden_nodes;
		if(params.output_nodes) this.output_nodes = params.output_nodes;
		if(params.epochs) this.epochs = params.epochs;
		if(params.learning_rate) this.learning_rate = params.learning_rate;

		this.synapse0 = this.math.random([this.input_nodes, this.hidden_nodes], -1, 1);
		this.synapse1 = this.math.random([this.hidden_nodes, this.output_nodes], -1, 1);
	}

	gradientDescent(n=0) { return n * (1 - n); }

	sigmoid(x=0, derivative=false) {
		const fx = 1 / (1 + this.math.exp(-x));
		if(derivative) return this.gradientDescent(fx);
		return fx;
	}

	//recebe a entrada e a saída correspondente. Ex: [1, 1] e [0]
	train(input=[], target=[]) {
		for(let i=0; i<this.epochs; i++) {
			const input_layer = input;
			//multiplica a entrada com o peso e soma os resultados
			// e mapeia esse retorno passando pela função de ativação
			const hidden_layer = 
			this.math.multiply(input_layer, this.synapse0).map(v => this.activation(v, false));
			//multiplica o resultado com outro peso e passa novamente pela função de ativação
			const output_layer = 
			this.math.multiply(hidden_layer, this.synapse1).map(v => this.activation(v, false));

			const output_error = 
			this.math.subtract(target, output_layer); //taxa de erro

			//multiplica as taxas de erro com a saídas obtidas 
			const output_delta = 
			this.math.dotMultiply(output_error, output_layer.map(v => this.activation(v, true)));
			//multiplica o resultado anterior com o peso 1 e soma os resultados
			const hidden_error =
			this.math.multiply(output_delta, this.math.transpose(this.synapse1)); //transpose varia a ordem
			//multiplica o resultado anterior com o hidden_layer
			const hidden_delta =
			this.math.dotMultiply(hidden_error, hidden_layer.map(v => this.activation(v, true)));

			//atualização dos pesos
			this.synapse0 = 
			this.math.add(this.synapse0,
						  this.math.multiply(this.math.transpose(input_layer),
						  					 this.math.multiply(hidden_delta, this.learning_rate)));
			this.synapse1 = 
			this.math.add(this.synapse1,
						  this.math.multiply(this.math.transpose(hidden_layer),
						  					 this.math.multiply(output_delta, this.learning_rate)));
			if(i % 2000 == 0) //para não exibir tantos resultados
				console.log(`taxa de erro: ${this.math.mean(this.math.abs(output_error)).toFixed(8)}`);
		}
	}

	//recebe a entrada [1, 0]
	predict(input=[]) {
		const input_layer = input;
		//multiplica a entrada com o peso e soma os resultados
		// e mapeia esse retorno passando pela função de ativação
		const hidden_layer = 
		this.math.multiply(input_layer, this.synapse0).map(v => this.activation(v, false));
		//multiplica o resultado com outro peso e passa novamente pela função de ativação
		const output_layer =
		this.math.multiply(hidden_layer, this.synapse1).map(v => this.activation(v, false));
		return output_layer;
	}
}

const config = {
	input_nodes: 2,
	hidden_nodes: 4,
	output_nodes: 1,
	epochs: 100000,
	learning_rate: 0.5
};

const math = require('mathjs');
const net = new NeuralNetwork(config);
const input = math.matrix([[0, 0], [0, 1], [1, 0], [1, 1]]);
const target = math.matrix([[0], [1], [1], [0]]);
net.train(input, target);

console.log();

console.log(`0 xor 0: ${math.round(net.predict([0, 0])._data)}`);
console.log(`0 xor 1: ${math.round(net.predict([0, 1])._data)}`);
console.log(`1 xor 0: ${math.round(net.predict([1, 0])._data)}`);
console.log(`1 xor 1: ${math.round(net.predict([1, 1])._data)}`);
