const math = require('mathjs');
// mínimo (menor valor)
console.log('mínimo:', math.min([2, 1, 3]));
// máximo (maior valor)
console.log('máximo:', math.max([2, 1, 3]));
// soma (retorna 6)
console.log('soma:', math.sum([2, 1, 3]));
// média (retorna 2)
console.log('média:', math.mean([2, 1, 3]));
// mediana (número entre o maior e o menor -> 2)
console.log('mediana:', math.median([2, 1, 3]));
// produto (multiplicação)
console.log('produto:', math.prod([2, 1, 3]));
// quadrado (eleva cada elemento)
console.log('quadrado:', math.square([2, 1, 3]));
// cubo (eleva cada elemento)
console.log('cubo:', math.cube([2, 1, 3]));
// absoluto (valor positivo)
console.log('absoluto:', math.abs([-2, 1.5, -3]));
// variância
/*
	(2+4)/2=3
	(2-3)²=1
	(4-3)²=1
	(1+1)/2=1
*/
console.log('variância:', math.variance([2, 4], 'uncorrected'));
// variância com tendência
/*
	(2+4)/2=3
	(2-3)²=1
	(4-3)²=1
	(1+1)/3=0.67
*/
console.log('variância com tendência:', math.variance([2, 4], 'biased'));
// variância sem tendência
/*
	(2+4)/2=3
	(2-3)²=1
	(4-3)²=1
	(1+1)/1=2
*/
console.log('variância sem tendência:', math.variance([2, 4], 'unbiased'));
// desvio padrão: é a raíz quadrada da variância
console.log('desvio padrão:', math.std([2, 4], 'uncorrected'));
// desvio com tendência: é a raíz quadrada da variância com tendência
console.log('desvio com tendência:', math.std([2, 4], 'biased'));
// desvio sem tendência: é a raíz quadrada da variância sem tendência
console.log('desvio sem tendência:', math.std([2, 4], 'unbiased'));
// raíz quadrada
console.log('raíz quadrada:', math.sqrt([9, 81]));
// multiplicação convencional (1*4) e (2*3)
console.log('multiplicação convencional:', math.dotMultiply([1, 2], [4, 3]));
// multiplicação matricial: (1*2)+(2*3)=8
console.log('multiplicação matricial:', math.multiply([1, 2], [2, 3]));
// subtração 5 - 2 e 3 -1
console.log('subtração:', math.subtract([5, 3], [2, 1]));
// transposição [1, 3], [2, 4]
console.log('transposição:', math.transpose([[1, 2], [3, 4]]));
// seleção aleatória
console.log('seleção aleatória:', math.random([2, 2]));
// adição 3, 5
console.log('adição:', math.add([1, 2], [2, 3]));
// divisão 5, 4
console.log('divisão:', math.dotDivide([10, 12], [2, 3]));
// logaritmo
console.log('logaritmo:', math.log([10, 12]));
// logaritmo na base 2
console.log('logaritmo na base 2:', math.log2([10, 12]));
// aproximação para baixo
console.log('aproximação para baixo:', math.floor([1.2, 2.5, 3.9]));
// aproximação padrão
console.log('aproximação padrão:', math.round([1.2, 2.5, 3.9], 0));
// aproximação para cima
console.log('aproximação para cima:', math.ceil([1.2, 2.5, 3.9]));
// expressão
console.log('expressão:', math.evaluate('(2 + 3) * 2'));
// filtro
console.log('filtro:', math.filter([1, 2, 2, 3], new RegExp(2)));
