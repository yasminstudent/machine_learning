module.exports = class multivariateRegression{
   
    train(config={}){
        this._config = {};

        if(config.input){
            const tempX = config.input;
            let concatX = [];

            //loop para percorrer cada linha da matriz
            for(let i = 0; i < tempX.length; i++){
                const temp = tempX[i].reduce((a, b) => a+''+b); //transforma em string e concatena os valores da linha
                concatX.push(temp); //adiciona nesse array (deixando assim um array simples)
            }
            this.X = concatX; //salva o array simples na variável x
        }
        else this.X = [[0, 0]];
        if(config.output) this.Y = config.output; else this.Y = [0];

        this._config.input = this.X;
        this._config.output = this.Y;
    }
    
    saveModel(path='./model.json'){
        const fs = require('fs');
        fs.writeFileSync(path, JSON.stringify(this._config));
    }

    loadModel(path='./model.json'){
        const fs = require('fs');
        const data = fs.readFileSync(path, 'utf8');
        const json = JSON.parse(data); 
        this.X = json.input; 
        this.Y = json.output;
    }

    produtos(x=[], y=[]){
        let temp = [];
        for(let i = 0; i < x.length; i++)
            temp.push(parseFloat(x[i]) * parseFloat(y[i]));
        return temp;
    }
    
    quadrados(x=[]){
        let temp = [];
        for(let i = 0; i < x.length; i++)
            temp.push(parseFloat(x[i]) * parseFloat(x[i]));
        return temp;
    }
    
    somatorio(arr=[]){
        let temp = 0;
        for(let i = 0; i < arr.length; i++)
            temp += parseFloat(arr[i]);
        return temp;
    }
    
    media(arr=[]){
        return this.somatorio(arr) / arr.length;
    }
    
    resultados(x=[], y=[], p=0){
        const resultado1 = (this.somatorio(x) * this.somatorio(y)) / x.length;
        const resultado2 = (this.somatorio(x) * this.somatorio(x)) / x.length;
        const resultado3 = this.somatorio(this.produtos(x, y)) - resultado1;
        const resultado4 = resultado3 / (this.somatorio(this.quadrados(x)) - resultado2);
        const resultado5 = this.media(y) - (resultado4 * this.media(x));
        
        return ((resultado4 * p) + resultado5).toFixed(0);
    }
    
    predict(p=[]){
        //olhar o código de cima para entender
        //é a mesma lógica para receber os nvos valores de x, dessa vez sem y
        const tempX = p;
        let concatX = [];

        for(let i = 0; i < tempX.length; i++){
            const temp = tempX[i].reduce((a, b) => a+''+b);
            concatX.push(temp);
        }
        p = concatX;

        let regressoes = [];
        for(let i = 0; i < p.length; i++){
            const temp = Number(this.resultados(this.X, this.Y, p[i]));
            regressoes.push(temp);
        }
        return regressoes;
    }

}