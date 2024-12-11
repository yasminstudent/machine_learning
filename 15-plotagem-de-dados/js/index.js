function plot(type='scatter') {
	type = type.toString().toLowerCase().trim();

	let trace = {};
	if(type=='pie') { //gráfico de pizza
		trace = {
			values: [100, 200, 300, 400], //tamanho das fatias
			labels: ['título 1', 'título 2', 'título 3', 'título 4'], //legenda
			type: type
		};
	}else if(type=='bubble') { //gráfico de bolhas/bolas
		trace = {
			x: [1, 2, 3, 4], //eixo x
			y: [1, 2, 3, 4], //eixo y
			marker: {
				size: [10, 20, 30, 40] //raio das bolhas/bolas
			}
		};
	}else {
		trace = {
			x: [1, 2, 3, 4], //eixo x
			y: [1, 2, 3, 4], //eixo y
			type: type 
		};
	}
	if((type=='scatter')||(type=='bubble')) trace.mode = 'markers';
	if(type=='lines') trace.type = 'scatter';

	const data = [trace];
	//grafico é o id da div que exibirá o gráfico
	Plotly.newPlot('grafico', data, {}, {showSendToCloud: true});
}
