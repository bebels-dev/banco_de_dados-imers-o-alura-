// Seleciona o elemento HTML com a classe "card-container" e o armazena na variável 'cardconteiner'.
// Este será o local onde os cards das linguagens de programação serão inseridos.
const cardconteiner = document.getElementById("card-container");

// Declara uma variável 'dados' como um array vazio. 
// Esta variável será usada para armazenar os dados carregados do arquivo JSON.
let dados=[]; //usando let podemos modificar a variavel depois

// Define uma função assíncrona chamada 'iniciarbusca'.
// Funções assíncronas permitem o uso da palavra-chave 'await' para esperar por operações demoradas, como requisições de rede.
async function iniciarbusca() {
    // O bloco 'try...catch' é usado para tratamento de erros.
    // Se ocorrer um erro dentro do bloco 'try', o código dentro do bloco 'catch' será executado.
    try {
        // 'fetch' é usado para fazer uma requisição de rede para buscar o arquivo 'data.json'.
        // 'await' pausa a execução da função até que a promessa do 'fetch' seja resolvida (ou seja, a resposta do servidor chegue).
        let resposta = await fetch("data.json");
        // 'await resposta.json()' converte o corpo da resposta em um objeto JavaScript (neste caso, um array de objetos).
        // O resultado é armazenado na variável global 'dados'.
        dados = await resposta.json();
        // Não renderiza mais todos os cards ao iniciar.
        // Apenas garante que a mensagem de boas-vindas esteja visível.
        const welcomeMessage = document.getElementById("welcome-message");
        if (welcomeMessage) welcomeMessage.style.display = 'block';
    } catch (error) {
        // Se ocorrer um erro durante o 'fetch' ou a conversão para JSON, ele será capturado aqui.
        // 'console.error' exibe uma mensagem de erro no console do navegador, o que é útil para depuração.
        console.error("Erro ao buscar os dados:", error);
    }
}

// Define a função 'renderizarCards', que recebe um array de dados como parâmetro.
// Esta função é responsável por criar e exibir os cards na página.
function renderizarCards(dadosParaRenderizar) { //parametros são as repostas esperadas de dados externos 
    cardconteiner.innerHTML = ""; // Limpa o container antes de renderizar os cards
    const welcomeMessage = document.getElementById("welcome-message");
    const termoBusca = document.getElementById("busca").value.trim();

    if (dadosParaRenderizar.length === 0) {
        if (termoBusca !== "") {
            // Se houve uma busca mas sem resultados, mostra "Nenhum resultado"
            if (welcomeMessage) welcomeMessage.style.display = 'none';
            cardconteiner.innerHTML = `<div class="welcome-message"><h2>Nenhum resultado encontrado.</h2><p>Tente um termo de busca diferente.</p></div>`;
        } else {
            // Se a busca está vazia, mostra a mensagem de boas-vindas
            cardconteiner.innerHTML = `
            <div class="welcome-message" id="welcome-message">
                 <h2>Bem-vindo à Base de Conhecimento!</h2>
                 <p>Aqui você encontra informações sobre diversas linguagens de programação.<br>Comece a digitar no campo de busca acima para encontrar o que procura.</p>
                 <p>Navegue pelas linguagens abaixo ou use a busca. Ao clicar em <strong>saiba mais</strong> em um dos resultados, você acessa a documentação oficial.</p>
                 <p><strong>Linguagens disponíveis:</strong></p>
                 <ul class="language-list">
                     <li>JavaScript</li>
                     <li>Python</li>
                     <li>Java</li>
                     <li>C++</li>
                     <li>C#</li>
                     <li>PHP</li>
                     <li>TypeScript</li>
                     <li>SQL</li>
                     <li>Go</li>
                     <li>Rust</li>
                     <li>Swift</li>
                     <li>Kotlin</li>
                     <li>Ruby</li>
                     <li>Dart</li>
                 </ul>
             </div>
            `;
        }
        return;
    }

    // Esconde a mensagem de boas-vindas se houver cards para mostrar
    if (welcomeMessage) welcomeMessage.style.display = 'none'; 

    // Inicia um loop 'for...of' para percorrer cada objeto 'dado' dentro do array 'dados'.
    for (let dado of dadosParaRenderizar) {
        // Cria um novo elemento HTML '<article>' e o armazena na variável 'article'.
        let article = document.createElement("article");
        // Adiciona a classe CSS "card" ao elemento '<article>' recém-criado para aplicar os estilos.
        article.classList.add("card");
        // Define o conteúdo HTML interno do elemento '<article>' usando uma template string.
        article.innerHTML = `
            <h2>O que é ${dado.nome}?</h2>
            <p>${dado.descrição}</p>
            <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
        `;
        // Adiciona o elemento '<article>' recém-criado como um filho do 'cardconteiner', tornando-o visível na página.
        cardconteiner.appendChild(article);
    }
}

// Define a função 'buscar', que será chamada sempre que o usuário digitar no campo de busca.
function buscar() {
    const termoBusca = document.getElementById("busca").value.toLowerCase().trim();
    let resultado = [];

    if (termoBusca !== "") {
        resultado = dados.filter(dado => 
            dado.nome.toLowerCase().includes(termoBusca)
        );
    }
    
    renderizarCards(resultado);
}

// Adiciona um "ouvinte de evento" ao campo de busca.
// O evento 'input' é disparado toda vez que o texto no campo muda.
// Quando o evento ocorre, a função 'buscar' é chamada.
document.getElementById("busca").addEventListener("input", buscar);

// Chama a função 'iniciarbusca' assim que o script é carregado.
// Isso garante que os dados do 'data.json' sejam carregados e exibidos quando a página é aberta pela primeira vez.
iniciarbusca(); // Inicia a busca de dados quando a página carrega