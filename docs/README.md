## Visão Geral do Projeto

É uma aplicação web que integra **Vue.js** com **Magento 2**, focada em gerenciamento de e-commerce com as seguintes características principais:

## Arquitetura

1. **Frontend (Vue.js 3)**
   - Utiliza Vue 3 com Vuex para gerenciamento de estado
   - Implementa Vue Router para navegação
   - Possui uma estrutura organizada com:
     - Componentes reutilizáveis
     - Views para diferentes páginas
     - Serviços para comunicação com API
     - Layouts para estruturação da interface

## Funcionalidades Principais

1. **Dashboard e Relatórios**
   - Visualização de pedidos
   - Dashboard de clientes
   - Dashboard de produtos
   - Gráficos e análises (usando Chart.js)

2. **Gerenciamento de Dados**
   - Listagem de pedidos
   - Listagem de produtos
   - Gerenciamento de clientes
   - Exportação de dados (PDF, Excel, TXT)

3. **Autenticação e Segurança**
   - Sistema de login integrado com Magento 2
   - Gerenciamento de sessões
   - Proteção de rotas

## Tecnologias Utilizadas

1. **Frontend**
   - Vue.js 3
   - Vue Router
   - Vuex para gerenciamento de estado
   - Chart.js para visualizações
   - Axios para requisições HTTP
   - SASS/SCSS para estilização
   - TypeScript para tipagem
   - Bibliotecas de exportação (jsPDF, xlsx)

3. **Infraestrutura**
   - Docker para containerização
   - Docker Compose para configuração de serviços

## Estrutura de Arquivos

```
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── views/         # Páginas da aplicação
│   │   ├── services/      # Serviços de API
│   │   ├── store/         # Gerenciamento de estado
│   │   └── assets/        # Recursos estáticos
└── docker-compose.yml     # Configuração dos serviços
```

## Prettierrc

Configuração do arquivo `/frontend/.prettierrc` para garantir um código limpo, padronizado e fácil de ler.

O que cada opção faz:
- `"semi": true` — Sempre adiciona ponto e vírgula ao final das linhas.
- `"tabWidth": 4` — Usa 4 espaços por tabulação, deixando o código mais espaçado.
- `"printWidth": 100` — Quebra linhas que ultrapassarem 100 caracteres, melhorando a leitura.
- `"singleQuote": true` — Usa aspas simples em vez de duplas.
- `"trailingComma": "es5"` — Adiciona vírgula no final de objetos/arrays multi-linha (exceto em funções), facilitando adições futuras.
- `"bracketSpacing": true` — Adiciona espaço entre chaves em objetos (`{ exemplo: true }`).
- `"arrowParens": "avoid"` — Remove parênteses em arrow functions de um único parâmetro (`param => {}`).

### Resumo

Configuração para projetos **Vue.js** e ajuda na padronização do código.

Comando para formatar todos os arquivos do frontend de acordo com as regras:

```bash
npm run format
```
