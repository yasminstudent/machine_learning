let classe1 = '';
let classe2 = '';
let texto1  = '';
let texto2  = '';

//Exibe os dados cadastrados
function exibeCadastro() {
	document.getElementById('classe1').value = classe1.toString().trim();
	document.getElementById('classe2').value = classe1.toString().trim();

	document.getElementById('texto1').value = texto1.toString().trim();
	document.getElementById('texto2').value = texto2.toString().trim();
}

function cadastrar() {
	classe1 = document.getElementById('classe1').value.toString().trim();
	classe2 = document.getElementById('classe2').value.toString().trim();

	texto1 = document.getElementById('texto1').value.toString().trim();
	texto2 = document.getElementById('texto2').value.toString().trim();

	// tokenização
	const arr1 = texto1.split(' '); //transforma em array guardando cada palavra
	const arr2 = texto2.split(' ');

	for(let i=0; i<arr1.length; i++) {
		//variáveis do arquivo index.js
		//adiciona as entradas e as classes
		entradas.push(arr1[i].toString().trim());
		classes.push(classe1);
	}

	for(let i=0; i<arr2.length; i++) {
		entradas.push(arr2[i].toString().trim());
		classes.push(classe2);
	}

	//html
	let linhas =
	`
	<tr>
		<td>${classe1}</td>
		<td>${texto1}</td>
	</tr>
	<tr>
		<td>${classe2}</td>
		<td>${texto2}</td>
	</tr>
	`;

	document.getElementById('linhas').innerHTML = linhas;
}

function executar() {
	train({input: entradas, output: classes}); //treina o algorítimo

	const entrada = document.getElementById('entrada').value.toString().trim();
	// tokenização
	const arrEntrada = entrada.split(' '); //transforma em array guardando cada palavra
	let txtClasses = '';
	//laço para classificar cada palavra
	for(let i=0; i<arrEntrada.length; i++) {
		//função retorna o nome da classe
		txtClasses += predict(arrEntrada[i].toString().trim());
	}

	const qtdNome1 = txtClasses.split(classe1).length-1;
	const qtdNome2 = txtClasses.split(classe2).length-1;

	let resultado = classe1;
	if(qtdNome2 > qtdNome1) resultado = classe2;

	document.getElementById('resultado').innerHTML = ' - CLASSIFICAÇAO: ' + resultado;
}
