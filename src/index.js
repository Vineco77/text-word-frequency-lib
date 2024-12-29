export function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo.trim()) return []
        const resultado = verificaPalavrasDuplicadas(paragrafo)

        return Object.keys(resultado).length > 0 ? [resultado] : []
        
    })    
    return contagem;
}

function extraiParagrafos(texto) {
  return texto.toLowerCase().split('\n');
}

 function limpaPlavras(palavra) {
        return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
 }

function verificaPalavrasDuplicadas(texto) {

    const listaPalavras = texto.split(' ');
    const resultado = {}
    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPlavras(palavra)
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;    
        }
    });
        return resultado    
}