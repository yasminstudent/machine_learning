/*
    Prever valores com base em uma sequência

    Ex: x = 1, 2, 3
        y = 10, 20, ?

        ? -> prevê qual será o valor desse
*/
//Recebe os valores de x e y e calcula os produtos (multiplicação)
function produtos(x=[], y=[]){
    let temp = [];

    for(let i = 0; i < x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(y[i]));
    
    return temp;
}

//calcula os valores de x ao quadrado
function quadrados(x=[]){
    let temp = [];

    for(let i = 0; i < x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(x[i]));

    return temp;
}

//soma os valores de uma array
function somatorio(arr=[]){
    let temp = 0;

    for(let i = 0; i < arr.length; i++)
        temp += parseFloat(arr[i]);

    return temp;
}

//calcula a média dos valores de um array
function media(arr=[]){
    return somatorio(arr) / arr.length;
}

//recebe os valores de x, os valores de y, e o valor de x usado para predizer o de y
function resultados(x=[], y=[], p=0){
    const resultado1 = (somatorio(x) * somatorio(y)) / x.length;
    const resultado2 = (somatorio(x) * somatorio(x)) / x.length;
    const resultado3 = somatorio(produtos(x, y)) - resultado1;
    const resultado4 = resultado3 / (somatorio(quadrados(x)) - resultado2);
    const resultado5 = media(y) - (resultado4 * media(x));
    
    return ((resultado4 * p) + resultado5).toFixed(0);
}

//Função que faz a regressão
function regressaoLinear(eixoX=[], eixoY=[]){
    //tamanho dos arrays
    const tamX = eixoX.length;
    const tamY = eixoY.length;

    //pega os valores de x que já possuem valores de y
    const valX = eixoX.slice(0, tamY);
    const valY = eixoY;

    //pega quantos valores x tem a mais
    const dif = tamX - tamY;

    //verifica se é maior que 0 (caso contrário o cálculo não é necessário)
    if(dif > 0 ){
        let regressoes = [];

        for(let i = 0; i < dif; i++){
            //passa o arr de x que corresponde ao arr de y, o arr de y e o valor de x que ainda não tem y
            const temp = Number(resultados(valX, valY, eixoX[tamY+i]));
            regressoes.push(temp);
        }

        //concatena o arr de y + as regressões
        const novoY = valY.concat(regressoes);

        console.log(`eixo x: ${eixoX}\neixo y: ${novoY}`);
    }
}

regressaoLinear(
    [1, 2, 3, 4, 5],
    [15, 30, 45, 60]
)