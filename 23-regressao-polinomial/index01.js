const PolynomialRegression = require('ml-regression-polynomial');

const x = [1, 2, 3, 4, 5]; //eixo x (entradas)
const y = [10, 20, 30, 40, 50]; //eixo y (saídas)
const degree = 1; //padrão linear, por isso degree baixo

const regression = new PolynomialRegression(x, y, degree);

let output = regression.predict(6);
output = output.toFixed(0);
console.log(output);

/*
    Degree -> quanto mais alto, mais lento porém mas preciso, no entanto
    quando seu valor é alto ele só usa apenas o padrão dos valores de treinamento
    não se adaptando a um novo valor

    Quanto mais linear for a distribuição dos nossos dados, menor poderá ser o degree
*/