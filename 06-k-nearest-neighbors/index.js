/*
    Classifica algo
*/
//recebe os valores de treinamento
let eixoX = [];
let eixoY = [];
let classe = [];

//recebe os valores para determinar a classe
let entradaX = 0;
let entradaY = 0;

//subtrai os valores de x pela entrada x
function subtracoesX(){
    let subtracoes = [];
    for(let i = 0; i < eixoX.length; i++){
        subtracoes[i] = eixoX[i] - entradaX;
    }
    return subtracoes;
}
//subtrai os valores de y pela entrada y
function subtracoesY(){
    let subtracoes = [];
    for(let i = 0; i < eixoY.length; i++){
        subtracoes[i] = eixoY[i] - entradaY;
    }
    return subtracoes;
}
//elava ao quadrado os resultados das subtrações de x
function quadradosX(){
    let subtracoes = subtracoesX();
    let quadrados = [];
    for(let i = 0; i<subtracoes.length; i++){
        quadrados[i] = subtracoes[i] * subtracoes[i];
    }
    return quadrados;
}
//elava ao quadrado os resultados das subtrações de y
function quadradosY(){
    let subtracoes = subtracoesY();
    let quadrados = [];
    for(let i = 0; i<subtracoes.length; i++){
        quadrados[i] = subtracoes[i] * subtracoes[i];
    }
    return quadrados;
}
//soma os resultados das potencias de x e y
function somaQuadrados(){
    let quadradoX = quadradosX();
    let quadradoY = quadradosY();
    let soma =[];
    for(let i = 0; i < quadradoX.length; i++){
        soma[i] = quadradoX[i] + quadradoY[i];
    }
    return soma;
}
//calcula a raiz quadrada do resultado da função anterior
function raizes(){
    let soma = somaQuadrados();
    let raizes = [];
    for(let i = 0; i < soma.length; i++){
        raizes[i] = Math.sqrt(soma[i]);
    }
    return raizes;
}

//recebe as entradas (x e y) e as saídas (class) e atribui nas variáveis globais
function train(config={}){
    if(config.x) eixoX = config.x; else eixoX = [0];
    if(config.y) eixoY = config.y; else eixoY = [0];
    if(config.class) classe = config.class; else classe = ''; 
}

//recebe as entradase retorna a classe pertencente delas
function predict(_entradaX=0, _entradaY=0){
    //atribui os parâmetros nas variáveis globais
    entradaX = _entradaX;
    entradaY = _entradaY;

    let classeEntrada = 0;
    const raiz = raizes();

    let indiceMenor = -1;
    let menor = Infinity; //infinito para que na primeira rodada do if a raiz[i] seja menor

    //percorre a raiz -> a raiz menor é que prediz qual é a classe
    for(let i = 0; i < raiz.length; i++){
        if(raiz[i] <= menor){
            menor = raiz[i];
            indiceMenor = i;
        }
    }

    classeEntrada = classe[indiceMenor];
    return classeEntrada;
}

//chama a função que treina o algorítimo
train({
    x: [1, 2, 30, 40],
    y: [3, 4, 50, 60],
    class: [1, 1, 2, 2]
});

console.log(predict(1, 3)); //retorna a classe que as entradas pertencem