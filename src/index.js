import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import { sum, sub, mult, div, modulo} from './operaciones.js'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      valorInical: '0',
      arrayValor: [],
      arrayIncial: false,
      operacionPasada: ''
    }
  }
  //funcion para obtener las operaciones matematicas
  calculosOperaciones(operacion, a, b){
    if(operacion=='+'){
     return sum(a,b) 
    } else if(operacion=='-'){
      return sub(a,b)
    } else if(operacion=='*'){
      return mult(a,b)
    } else if(operacion=='/'){
      return div(a,b)
    } else if(operacion=='%'){
      return modulo(a,b)
    }
  }
  //funcion para optener las operaciones no matematicas
  handleOperation(operacion){
    let vInicial = this.state.valorInical   //valor que se mostrara en el display
    let vArrayValor = this.state.arrayValor   
    let vArrayIncial = this.state.arrayIncial   
    let pasarOperacion = this.state.operacionPasada

    //limpiara un valor
    if(operacion=='ce'){
      let ultimoValor = (vInicial.length - 1)
      vInicial = vInicial.substring(0, ultimoValor)
      //evitamos espacios que quede en blanco
      if(ultimoValor == ''){
        vInicial = '0'
      }
    }

    //limpiara toda la pantalla
    if(operacion=='c'){
      vInicial = '0'
      vArrayValor = []
      vArrayIncial = false
      location.reload()
    }

    //cambiar signo
    if(operacion=='+/-'){
      let resultado = this.calculosOperaciones(pasarOperacion, vArrayValor[0], parseInt(vInicial))
      vArrayValor = []
      vInicial = Math.sign(resultado.toString)
      pasarOperacion = ''
      vArrayIncial = true
    }
    
    //optener el resultado
    if(operacion=='='){
      let resultado = this.calculosOperaciones(pasarOperacion, vArrayValor[0], parseInt(vInicial))
      vArrayValor = []
      vInicial = resultado.toString()
      pasarOperacion = '='
      vArrayIncial = true
    } else{
      if((vArrayValor.length) == 1){
        let resultado = this.calculosOperaciones(pasarOperacion, vArrayValor[0], parseInt(vInicial))
        vArrayValor[0] = resultado
        vInicial = resultado.toString()
        vArrayIncial = true
        pasarOperacion = operacion
      } else{
        vArrayValor.push(parseInt(vInicial))
        vArrayIncial = true
        pasarOperacion = operacion
      }
    }

    //condicion de mostrar en la pantalla
    if((parseInt(vInicial)<0 || parseInt(vInicial)>999999999)){
      vInicial = 'ERROR'
      vArrayValor = []
      vArrayIncial = false
      alert('calculo ERROR, existe un numero negativo o se paso del limite establecido')
    }

    //mandamos los valores
    this.setState({
      valorInical:vInicial,
      arrayValor:vArrayValor,
      arrayIncial: vArrayIncial,
      operacionPasada: pasarOperacion
    })
  }

  añadirValor(valor){
    let vInicial = this.state.valorInical
    let vArrayIncial = this.state.arrayIncial

    //añadimos los valores numericos
    if(!vArrayIncial && (vInicial.length<9)){
      if(vInicial=='0'){
        vInicial = valor
      }else{
        vInicial += valor
      }
    }else if (vArrayIncial && (vInicial.length<9)){
      vArrayIncial = false
      vInicial = ''
      vInicial += valor
    }

    //mandamos los valores
    this.setState({
      valorInical:vInicial,
      arrayIncial: vArrayIncial,
    })
  }
    render() {
      return (
        <div>
          <div className="calculator">
          <div className="display"> {this.state.valorInical} </div>
            <div className="keys">
              <button className='style' onClick={this.handleOperation.bind(this, "c")}> c </button>
              <button className='style'>+/-</button>
              <button className='style' onClick={this.handleOperation.bind(this,"%")}> % </button>
              <button className='style' onClick={this.handleOperation.bind(this,"/")}> ÷ </button>
              <button onClick={this.añadirValor.bind(this,"7")} > 7 </button>
              <button onClick={this.añadirValor.bind(this,"8")}> 8 </button>
              <button onClick={this.añadirValor.bind(this,"9")}> 9 </button>
              <button className='style' onClick={this.handleOperation.bind(this,"*")}> x </button>
              <button onClick={this.añadirValor.bind(this,"4")}> 4 </button>
              <button onClick={this.añadirValor.bind(this,"5")}> 5 </button>
              <button onClick={this.añadirValor.bind(this,"6")}> 6 </button>
              <button className='style' onClick={this.handleOperation.bind(this,"-")}> - </button>
              <button onClick={this.añadirValor.bind(this,"1")}> 1 </button>
              <button onClick={this.añadirValor.bind(this,"2")}> 2 </button>
              <button onClick={this.añadirValor.bind(this,"3")}> 3 </button>
              <button className='style' onClick={this.handleOperation.bind(this,"+")}> + </button>
              <button className='style'></button>
              <button onClick={this.añadirValor.bind(this,"0")}> 0 </button>
              <button className='style'></button>
              <button className="style" onClick={this.handleOperation.bind(this,"=")}>=</button>
            </div> 
          </div>
        </div>
      );
    }
  }
  
ReactDOM.render(<App />, document.getElementById('root'))
