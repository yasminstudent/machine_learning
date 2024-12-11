//****** REDE NEURAL ***** */
/*
    X
     \
      \
        ( X * P                  )
        (       \                )
        (        \               ) 
        (         S(+) ---> F ---)-->
        (        /               )  
        (       /                )
        ( X * P                  )
      /
     /
    X

    () - circulo
    1 - Um neurônio recebe valores de entrada (X)
    2 - que são multiplicados por pesos inicialmente aleatórios (P)
    (conforme repete o processo, os pesos ficam + próximos do correto)
    3 - os produtos são somados na função somativa (S)
    4 - e passam pela função de ativação que formata o resultado (geralmente em valores entre 0 e 1)
    e isso se torna uma entrada para outro neurônio
*/
//Função que recebe um array com os valores de entrada x o peso e soma-os
//Função somativa
function funcSum(arr=[]){
    return arr.reduce((a, b) => a + b); //sendo a o elemento anterior e b o elemento posterior
}

//recebe o peso
function gradientDescent(n=0){
    return n * (1 - n);
}

//Funções de ativação:
//tangente hiperbólica: retorna valores entre -1 e 1
function tanh(n=0){ return Math.sinh(n) / Math.cosh(n); }
//sigmoíde: retorna valores entre o e 1
function sigmoid(n=0){ return 1 / (1 + Math.pow(Math.E, -n)); }
//unidade linear retificada (relu): retorna somente valores nulos e positivos
function relu(n=0){ return Math.max(n, 0); }
//unidade linear retificada com vazamento (leaky relu): retorna somente valores maiores do que zero
function leakyRelu(n=0){ return Math.max(n, 0.01) }
//passo binário: retorna somente 0 ou 1
function binaryStep(n=0){ return (n >= 0) ? 1 : 0; }


//função que recebe os valores de entrada, o valor desejado, a quantidade de épocas de treinamento e a função de ativação
//nesse exemplo usaremos valores de target > 0 ou menor ou igual a 1
function feedForward(inputs=[], target=0, epochs=1, activation='tanh'){
    //Verificando valor de target 
    if(target <= 0) target = 0.1;
    else if(target > 1) target = 1;

    //Variavel de peso
    let weights = [];

    //laço que determina o valor dos pesos
    for(let i = 0; i < inputs.length; i++){
        weights.push(Math.random());
    }

    //laço que inicia o processo dentro do circulo (a multiplicação, soma e formatação)
    for(let i = 0; i <= epochs; i++){
        //recebe o valor das entradas multiplicadas pelos pesos
        let multiply = [];

        for(let j = 0; j < inputs.length; j++){
            //valida se o valor não é negativo ou igual a zero (para não atrapalhar a multiplicação)
            if(inputs[j] <= 0) inputs[j] = 0.1;

            multiply.push(inputs[j] * weights[j]);
        }

        //passa os valores para a função somatória
        let sum = funcSum(multiply);

        let output = 0;

        //verfica a função de formatação e passa o valor da soma (sum)
        switch(activation){
            case 'tanh': output = parseFloat(tanh(sum)).toFixed(4); break;
            case 'sigmoid': output = parseFloat(sigmoid(sum)).toFixed(4); break;
            case 'relu': output = parseFloat(relu(sum)).toFixed(4); break;
            case 'leakyRelu': output = parseFloat(leakyRelu(sum)).toFixed(4); break;
            case 'binaryStep': output = parseFloat(binaryStep(sum)).toFixed(4); break;
            default: output = parseFloat(relu(sum)).toFixed(4); break;
        }
        
        //taxa de erro da época (valor esperado menos valor resultante)
        let error = parseFloat(Math.abs(target - output)).toFixed(4);

        //melhora os valores dos pesos
        for(let j = 0; j < inputs.length; j++){
            weights[j] += inputs[j] * gradientDescent(error);
        }

        let epoch = i.toString().padStart(5, '0');

        console.log(`Época: ${epoch} -- Taxa de erro: ${error} -- Saída: ${output}`);
    }
}

//executando o neurônio
feedForward([0], 0.1, 800, 'relu');
//entrada, saída esperada, número de épocas (rodadas do algorítimo) e função de ativação