module.exports = class linearRegression{
    //método train recebe um json com os valores de input e output e atribui as variáveis x e y
    train(config={}){

        this._config = {}; //json que recebe os valores de x e y

        if(config.input) this.X = config.input; else this.X = [0];
        if(config.output) this.Y = config.output; else this.Y = [0];

        this._config.input = this.X;
        this._config.output = this.Y;
    }

    //método saveModel recebe o caminho para escrever em um arquivo
    //um modelo de treinamento com base no json _config
    saveModel(path='./model.json'){
        const fs = require('fs');
        fs.writeFileSync(path, JSON.stringify(this._config));
    }

    //método loadModel recebe o caminho p/ ler um arquivo que possui um modelo de treinamento
    loadModel(path='./model.json'){
        const fs = require('fs');
        const data = fs.readFileSync(path, 'utf8'); //lendo o arquivo
        const json = JSON.parse(data); //transforma em json
        this.X = json.input; //salva nas variáveis os valores contidos no json
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
    
    //recebe os valores de entrada que não possumem saídas (p/ ele predizer)
    predict(p=[]){
        let regressoes = [];
        for(let i = 0; i < p.length; i++){
            const temp = Number(this.resultados(this.X, this.Y, p[i]));
            regressoes.push(temp);
        }
        return regressoes;
    }

}