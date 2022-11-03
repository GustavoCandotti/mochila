const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []  //busca os itens armazenados no local storage.

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => { //os dados chamamos de evento.
    evento.preventDefault() //interromper o comportamento, pois ele esta enviando os dados pra propria pagina.

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const existe = itens.find ( elemento => elemento.nome === nome.value )
    //Toda vez que eu preciso criar um grupo de elementos, um grupo de informações referentes aquele mesmo elemento, eu crio um objeto.
    const itemAtual = {
        "nome" : nome.value, 
        "quantidade" : quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens [itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)// é a função para inserir um elemento no array.
    }

    localStorage.setItem("itens", JSON.stringify(itens))//usamos JSON, pois o localStorage só permite guardarmos strings. Transformar o objeto em texto.

    nome.value = ""  //deixamos os campos vazios após escrever.
    quantidade.value = ""
})

function criaElemento(item) {
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade  //define ou retorna o conteúdo HTML de um elemento.
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem) 

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta ( id )  {
    const elementoBotao  =  document.createElement( "button" )
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener ("click", function( ){
        deletaElemento (this.parentNode, id)
    })

    return elementoBotao
}

function  deletaElemento (tag, id )  {
    tag.remove ( )

    itens.splice (itens.findIndex (elemento  =>  elemento.id === id) , 1)

    localStorage.setItem ("itens", JSON.stringify(itens))
}