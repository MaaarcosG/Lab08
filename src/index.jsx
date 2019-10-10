import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import {
  sum, sub, mult, div, modulo,
} from './operaciones';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valorInical: '0',
      arrayValor: [],
      arrayIncial: false,
      operacionPasada: '',
    };
  }

  // funcion para optener las operaciones no matematicas
  Operations(operacion) {
    let vInicial = this.state.valorInical; // valor que se mostrara en el display
    let vArrayValor = this.state.arrayValor;
    let vArrayIncial = this.state.arrayIncial;
    let pasarOperacion = this.state.operacionPasada;

    // limpiara un valor
    if (operacion === 'ce') {
      const ultimoValor = (vInicial.length - 1);
      vInicial = vInicial.substring(0, ultimoValor);
      // evitamos espacios que quede en blanco
      if (ultimoValor === '') {
        vInicial = '0';
      }
    }

    // limpiara toda la pantalla
    if (operacion === 'c') {
      vInicial = '0';
      vArrayValor = [];
      vArrayIncial = false;
      location.reload();
    }

    // cambiar signo
    if (operacion === '+/-') {
      const resultado = this.calculosOperaciones(
        pasarOperacion, vArrayValor[0], parseInt(vInicial, 0),
      );
      vArrayValor = [];
      vInicial = Math.sign(resultado.toString);
      pasarOperacion = '';
      vArrayIncial = true;
    }

    // optener el resultado
    if (operacion === '=') {
      const resultado = this.calculosOperaciones(
        pasarOperacion, vArrayValor[0], parseInt(vInicial, 0),
      );
      vArrayValor = [];
      vInicial = resultado.toString();
      pasarOperacion = '=';
      vArrayIncial = true;
    } else if ((vArrayValor.length) === 1) {
      const resultado = this.calculosOperaciones(
        pasarOperacion, vArrayValor[0], parseInt(vInicial, 0),
      );
      vArrayValor[0] = resultado;
      vInicial = resultado.toString();
      vArrayIncial = true;
      pasarOperacion = operacion;
    } else {
      vArrayValor.push(parseInt(vInicial, 0));
      vArrayIncial = true;
      pasarOperacion = operacion;
    }
    // condicion de mostrar en la pantalla
    if ((parseInt(vInicial, 0) < 0 || parseInt(vInicial, 0) > 999999999)) {
      vInicial = 'ERROR';
      vArrayValor = [];
      vArrayIncial = false;
      alert('calculo ERROR, existe un numero negativo o se paso del limite establecido');
    }

    // mandamos los valores
    this.setState({
      valorInical: vInicial,
      arrayValor: vArrayValor,
      arrayIncial: vArrayIncial,
      operacionPasada: pasarOperacion,
    });
  }

  añadirValor(valor) {
    let vInicial = this.state.valorInical;
    let vArrayIncial = this.state.arrayIncial;

    // añadimos los valores numericos
    if (!vArrayIncial && (vInicial.length < 9)) {
      if (vInicial === '0') {
        vInicial = valor;
      } else {
        vInicial += valor;
      }
    } else if (vArrayIncial && (vInicial.length < 9)) {
      vArrayIncial = false;
      vInicial = '';
      vInicial += valor;
    } else {
      vInicial = '.';
    }

    // mandamos los valores
    this.setState({
      valorInical: vInicial,
      arrayIncial: vArrayIncial,
    });
  }

  // funcion para obtener las operaciones matematicas
  calculosOperaciones(operacion, a, b) {
    if (operacion === '+') {
      return sum(a, b);
    } if (operacion === '-') {
      return sub(a, b);
    } if (operacion === '*') {
      return mult(a, b);
    } if (operacion === '/') {
      return div(a, b);
    } if (operacion === '%') {
      return modulo(a, b);
    }
    return 0;
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <div className="display">
            {this.state.valorInical}
          </div>
          <div className="keys">
            <button type="button" className="style" onClick={this.Operations.bind(this, 'c')}> c </button>
            <button type="button" className="style">+/-</button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '%')}> % </button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '/')}> ÷ </button>
            <button type="button" onClick={this.añadirValor.bind(this, '7')}> 7 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '8')}> 8 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '9')}> 9 </button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '*')}> x </button>
            <button type="button" onClick={this.añadirValor.bind(this, '4')}> 4 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '5')}> 5 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '6')}> 6 </button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '-')}> - </button>
            <button type="button" onClick={this.añadirValor.bind(this, '1')}> 1 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '2')}> 2 </button>
            <button type="button" onClick={this.añadirValor.bind(this, '3')}> 3 </button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '+')}> + </button>
            <button type="button" disabled className="style" />
            <button type="button" onClick={this.añadirValor.bind(this, '0')}> 0 </button>
            <button type="button" disabled className="style" onClick={this.añadirValor.bind(this, '.')}>.</button>
            <button type="button" className="style" onClick={this.Operations.bind(this, '=')}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
