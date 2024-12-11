function prever() {
	const idade = Number(document.getElementById('idade').value);
	const area = Number(document.getElementById('area').value);

	//json p/ treinamento
	const config = {
		input: [[10, 45], [20, 55], [15, 75], [30, 95]], //[idade, area]
		output: [104500, 205500, 157500, 309500] //preço
	}; 

	const regression = new multivariateRegression();
	regression.train(config);

	const result = regression.predict([[idade, area]])[0];

	plot(idade, area, result);
}

plot();
function plot(idade=0, area=0, result=0) {
	let trace = null;
	if(result>0) {
		//configuração p/ gráfico de bolas
		trace = {
			x: [10, 20, 15, 30, idade], //eixo x
			y: [104500, 205500, 157500, 309500, result], //eixo y
			mode: 'markers',
			marker: {
				size: [45, 55, 75, 95, area] //raio das bolas
			}
		};
	}else { //caso não tenha resultado (quando abrimos a página e não enviamos nenhum valor)
		trace = {
			x: [10, 20, 15, 30],
			y: [104500, 205500, 157500, 309500],
			mode: 'markers',
			marker: {
				size: [45, 55, 75, 95]
			}
		};
	}

	const data = [trace];
	Plotly.newPlot('grafico', data, {}, {showSendToCloud: true});
}
