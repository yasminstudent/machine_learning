const KNN = require('ml-knn');
const CSV = require('./csv');
const csv = new CSV({
	separator: ';',
	input: ['SEXO', 'IDADE', 'PROFISSÃO', 'SALÁRIO'],
	output: ['DEVEDOR']
});

const historico = csv.csvToJSONInputOutput('./historico-credito.csv'); //arquivo com os dados de treinamento
let entradas = historico.input;
//transforma as entradas que estão em string em valores numéricos
for(let i=0; i<entradas.length; i++) {
	// SEXO
	if(entradas[i][0].toString().toUpperCase().trim()=='M') entradas[i][0] = 0;
	else entradas[i][0] = 1;
	//PROFISSÃO
	if(entradas[i][2].toString().trim()=='Vendedor(a)') entradas[i][2] = 0;
	if(entradas[i][2].toString().trim()=='Administrador(a)') entradas[i][2] = 1;
	if(entradas[i][2].toString().trim()=='Médico(a)') entradas[i][2] = 2;
	if(entradas[i][2].toString().trim()=='Engenheiro(a)') entradas[i][2] = 3;
	if(entradas[i][2].toString().trim()=='Advogado(a)') entradas[i][2] = 4;
}

let saidas = historico.output;
for(let i=0; i<saidas.length; i++) {
	// DEVEDOR
	if(saidas[i].toString().toUpperCase().trim()=='NÃO') saidas[i] = 0;
	else saidas[i] = 1;
}

const knn = new KNN(entradas, saidas, {k: 1}); //aqui já é passado os dados de treinamento

const dados = csv.csvToJSONInputOutput('./dados-credito.csv'); //arquivo com os dados que serão previstos
let predicoes = dados.input;
for(let i=0; i<predicoes.length; i++) { //transforma os valores de entrada em números
	// SEXO
	if(predicoes[i][0].toString().toUpperCase().trim()=='M') predicoes[i][0] = 0;
	else predicoes[i][0] = 1;
	//PROFISSÃO
	if(predicoes[i][2].toString().trim()=='Vendedor(a)') predicoes[i][2] = 0;
	if(predicoes[i][2].toString().trim()=='Administrador(a)') predicoes[i][2] = 1;
	if(predicoes[i][2].toString().trim()=='Médico(a)') predicoes[i][2] = 2;
	if(predicoes[i][2].toString().trim()=='Engenheiro(a)') predicoes[i][2] = 3;
	if(predicoes[i][2].toString().trim()=='Advogado(a)') predicoes[i][2] = 4;
}

let resultados = knn.predict(predicoes);
for(let i=0; i<resultados.length; i++) { //transforma a resposta em um valor STRING
	if(resultados[i]==0) resultados[i] = ['    NÃO'];
	else resultados[i] = ['    SIM'];
}

csv.insertOutput('./dados-credito.csv', resultados); //adiciona no arquivo os dados dos resultados
console.log('CSV atualizado com SUCESSO!');
