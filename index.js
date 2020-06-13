const estadoIni = {esquerdo:{canibal: 3, missionario: 3}, direito: {canibal: 0, missionario: 0}, side:false};
const estadoFim   = {esquerdo:{canibal: 0, missionario: 0}, direito: {canibal: 3, missionario: 3}, side:true};

let arrayFinal = [];

createChildNodes = (parent) => {    
    let states = [];
    let state  = parent.state;
    let mis;
    let misAux = !state.side ? state.esquerdo.missionario : state.direito.missionario;
    let can;
    let canAux = !state.side ? state.esquerdo.canibal : state.direito.canibal;


    // lógica da profundidade
    if((canAux - 1) >= 0 && (misAux - 1) >= 0) {
        can = canAux - 1;
        mis = misAux - 1;
        states.push(!state.side ? {esquerdo:{canibal: can, missionario: mis}, direito:{canibal: 3-can, missionario: 3-mis}, side: true} : {esquerdo:{canibal: 3-can, missionario: 3-mis}, direito:{canibal: can, missionario: mis}, side: false});
    }
    if((canAux - 2) >= 0) {
        can = canAux - 2;
        mis = misAux;
        states.push(!state.side ? {esquerdo:{canibal: can, missionario: mis}, direito:{canibal: 3-can, missionario: 3-mis}, side: true} : {esquerdo:{canibal: 3-can, missionario: 3-mis}, direito:{canibal: can, missionario: mis}, side: false});
    }
    if((canAux - 1) >= 0) {
        can = canAux - 1;
        mis = misAux;
        states.push(!state.side ? {esquerdo:{canibal: can, missionario: mis}, direito:{canibal: 3-can, missionario: 3-mis}, side: true} : {esquerdo:{canibal: 3-can, missionario: 3-mis}, direito:{canibal: can, missionario: mis}, side: false});
    }
    if((misAux - 2) >= 0) {
        can = canAux;
        mis = misAux - 2;
        states.push(!state.side ? {esquerdo:{canibal: can, missionario: mis}, direito:{canibal: 3-can, missionario: 3-mis}, side: true} : {esquerdo:{canibal: 3-can, missionario: 3-mis}, direito:{canibal: can, missionario: mis}, side: false});
    }
    if((misAux - 1) >= 0) {
        can = canAux;
        mis = misAux - 1;
        states.push(!state.side ? {esquerdo:{canibal: can, missionario: mis}, direito:{canibal: 3-can, missionario: 3-mis}, side: true} : {esquerdo:{canibal: 3-can, missionario: 3-mis}, direito:{canibal: can, missionario: mis}, side: false});
    }

    //foreach pra cada estado do elemento
    states.forEach((elemento) => {
        if(validacao(elemento, arrayFinal)) {
            arrayFinal.push(elemento);
            parent.addFilho(getNode(elemento, parent));

        }
    });
}



validacao = (state, vetor) => {
    let canEsq = state.esquerdo.canibal;
    let canDir = state.direito.canibal;
    let misEsq = state.esquerdo.missionario;
    let misDir = state.direito.missionario;

    let existInVector = vetor.find((elemento) => {
        return (elemento.esquerdo.canibal == canEsq && elemento.esquerdo.missionario == misEsq && elemento.direito.canibal == canDir && elemento.direito.missionario == misDir && elemento.side == state.side);
    });
        
    return (existInVector == null && ((canEsq <= misEsq) || (canEsq - misEsq == canEsq)) && ((canDir <= misDir) || (canDir - misDir == canDir)));
}


function getNode(estado, pai) {
    let addFilho = node => { 
            filhos.push(node); 
        };

    let removerFilho = index => {
            filhos.splice(index, 1);
        };

    let filhos = [];
    return {state: estado, parent: pai, filhos, addFilho, removerFilho};
}

profun = node => {
    if(node.state.esquerdo.canibal == estadoFim.esquerdo.canibal && node.state.esquerdo.missionario == estadoFim.esquerdo.missionario){
        let aux = node;
        let answer = [];

        while(aux != null) {            
            aux && answer.push(aux);
            aux = aux.parent;
        }
        for(let i=(answer.length-1); i >= 0; i--) {
            aux = answer[i];
            aux && console.log("Lado do Barco: " + (aux.state.side ? "Direito":"Esquerdo") + "\nLado Esquerdo: ", aux.state.esquerdo, "Lado Direito: ", aux.state.direito, );
        }
        return 0;
    }

    createChildNodes(node);
    //console.log(node.state);

    if(node.filhos.length <= 0) {
        node = null;
    } else {
        while(node.filhos.length > 0){
            if(profun(node.filhos[0]) == 0){
                return 0;
            }
        }
    }
    return 1;
}

 start = _ => {
    let rootNode = getNode(estadoIni, false, null);
    arrayFinal = [rootNode.state];
    profun(rootNode);
}  