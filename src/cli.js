import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from '../helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';


const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const {texto, destino} = options;

        if (!texto || !destino) {
            console.error(chalk.red('error: favor inserir caminho de origem e destino'));
            program.help();
            return
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino)
            console.log(chalk.green('texto processado com sucesso'));
            
        } catch (error) {
            console.log('Ocorreu um erro no processamento', error);
            
        }
    })

    program.parse();

function processaArquivo(texto, destino) {  
    fs.readFile(texto, 'utf-8', (error, texto) => {
        try {
            if (error) throw error
            const resultado = contaPalavras(texto)
            criaESalvaArquivo(resultado,destino)
        } catch (error) {
            console.log(trataErros(error));
        }
    
    
    })
}

function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras)
    
    fs.promises.writeFile(arquivoNovo, textoPalavras)
    .then(() => {
        console.log('Arquivo criado');
        
    })
    .catch((error) => {
        throw error
    })
    .finally(() => console.log('Operação finalizada')
)}


// async function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras= JSON.stringify(listaPalavras) 
//     try {
//       await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('arquivo criado');
//     } catch (error) {
//         throw error;
//     }
// }