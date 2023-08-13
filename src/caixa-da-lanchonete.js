class CaixaDaLanchonete {

    static listaDeItens = [
        { nome: "cafe", descricao: "Café", valor: 3.00 },
        { nome: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50 },
        { nome: "suco", descricao: "Suco Natural", valor: 6.20 },
        { nome: "sanduiche", descricao: "Sanduíche", valor: 6.50 },
        { nome: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
        { nome: "salgado", descricao: "Salgado", valor: 7.25 },
        { nome: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        { nome: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
    ];

    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0

        const temItensCarrinho = this.carrinhoTemItens(itens)
        if(!temItensCarrinho) return 'Não há itens no carrinho de compra!'

        const temItemExtraSemPrincipal = this.checkItensExtra(itens)
        if(!temItemExtraSemPrincipal) return 'Item extra não pode ser pedido sem o principal'
        
        const temQuantidadeZero = this.checkQuantidade(itens)
        if(!temQuantidadeZero) return 'Quantidade inválida!'


        for(const itemCarrinho of itens){
            const [nome, quantidade] = itemCarrinho.split(',')

            const itemCadastrado = this.itemEstaCadastrado(nome)
            
            if(itemCadastrado){
                const quantidadeInt = parseInt(quantidade)
                total += itemCadastrado.valor * quantidadeInt
            } 
            else {
                return 'Item inválido!'
            }
        }


        switch(metodoDePagamento){
            case "debito": 
                total = this.pagarComDebito(total)
                break;

            case "credito": 
                total = this.pagarComCredito(total)
                break;

            case "dinheiro": 
                total = this.pagarComDinheiro(total)
                break;

            default: 
                return "Forma de pagamento inválida!"
        }


        const totalFormatado = this.formatarTotal(total)
        return totalFormatado
    }


    carrinhoTemItens(itens){
        if(itens == null || itens.length === 0){
            return false
        }
        return true
    }

    checkItensExtra(itens){
        for(const item of itens){

            const [nome] = item.split(',')

            if(nome === 'queijo'){
                const temSanduicheLista = this.temSanduiche(itens)

                if(!temSanduicheLista){
                    return false
                }
            }
            if(nome === 'chantily'){
                const temCafe = this.temCafe(itens)

                if(!temCafe) {
                    return false
                }
            }
        }
        return true
    }

    temSanduiche(itens){
        for(const item of itens){

            const [nome] = item.split(',')
            if(nome === 'sanduiche') return true
        }
        return false
    }

    temCafe(itens){
        for(const item of itens){

            const [nome] = item.split(',')
            if(nome === 'cafe') return true
        }
        return false
    }

    checkQuantidade(itens){
        for(const item of itens){
            const [ , quantidade] = item.split(',')
            if(quantidade === "0") {
                return false
            }
        }
        return true
    }


    itemEstaCadastrado(nome){
        return CaixaDaLanchonete.listaDeItens.find(cadastrado => cadastrado.nome === nome)
    }


    pagarComDebito(total){ 
        return total
    }

    pagarComCredito(total){ //3% de acrésimo
        return 103/100 * total
    }

    pagarComDinheiro(total){ //5% de desconto
        return 95/100 * total
    }

    formatarTotal(total){
        return 'R$ ' + total.toFixed(2).replace(".", ",")
    }
}


export { CaixaDaLanchonete };