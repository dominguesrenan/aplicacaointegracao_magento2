# Aplicação Web Vue.js com Integração Magento 2

### Tecnologias Principais

Este é um projeto de integração com Magento 2 desenvolvido com as seguintes características:

- **Frontend:** Vue.js 3 + TypeScript + Prettier + ESLint
    - **Vue.js:** Framework para desenvolvimento de interfaces
    - **TypeScript:** Tipagem estática
    - **Prettier:** Formatação de código
    - **ESLint:** Análise de código
    - **Axios:** Comunicação com API
    - **Vuex:** Gerenciamento de estado
    - **Vue Router:** Roteamento
    - **SASS/SCSS:** Estilização
- **Gerenciamento de Estado:** Vuex 4
- **Roteamento:** Vue Router 4
- **Estilização:** SASS/SCSS
- **Comunicação:** Axios
- **Containerização:** Docker

### Estrutura do Projeto

- Organização modular com separação clara de responsabilidades
- Componentes reutilizáveis (ex: Alert.vue)
- Layouts definidos (MainLayout.vue)
- Views organizadas por funcionalidade (**dashboard**, **clientes** e **pedidos**)
- Serviço de integração com Magento 2 (`magentoService.ts`)

### Funcionalidades Principais:

- Autenticação de usuários
- Gestão de clientes
- Gestão de pedidos
- Dashboard administrativo
- Integração com API do Magento 2
- Sistema de alertas e notificações

### Configuração do Magento 2

A URL do Magento 2 está configurada no arquivo `vue.config.js` através do proxy do Webpack. Para alterar a URL:

1. Localize o arquivo `vue.config.js` em `frontend/vue.config.js`
2. Procure pela configuração do proxy no objeto `devServer`
3. Atualize o valor da propriedade `target` dentro do proxy `/rest`

Exemplo:
```javascript
proxy: {
    '/rest': {
        target: 'https://seu-magento.com.br',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/rest': '/rest' },
        logLevel: 'debug'
    }
}
```

Observações importantes:
- A URL deve incluir o protocolo (https://)
- O proxy está configurado para interceptar todas as requisições que começam com `/rest`
- O logLevel está configurado como 'debug' para facilitar o debug das requisições
- O `changeOrigin` está habilitado para permitir requisições cross-origin

### Características de Desenvolvimento:

- Containerização com Docker
- Configuração de ambiente de desenvolvimento e produção
- Sistema de build e deploy automatizado
- Linting e formatação de código configurados
- Suporte a TypeScript
- Build otimizado para produção

### Segurança e Melhores Práticas:

- Uso de TypeScript para tipagem estática
- Configuração de ESLint e Prettier
- Gerenciamento de dependências via npm
- Docker para ambiente consistente
- Separação clara de responsabilidades no código

### Integração com Magento 2

A integração com Magento 2 é feita através de um serviço dedicado (`magentoService.ts`), permitindo a comunicação com a API do Magento 2 para integração de clientes e pedidos.

### Documentação

- [Visão Geral do Projeto](docs/README.md)
- [Guia de Implementação de Novas Páginas](docs/Paginas/NovaPagina.md)
- [Configuração do Magento 2](#configuração-do-magento-2)

## Desenvolvido por

[**Renan Domingues**](https://www.linkedin.com/in/renan-domingues-4808b2172/)  
👨‍💻 Desenvolvedor Full Stack | Experiências em [Adobe Commerce](https://business.adobe.com/br/products/magento/magento-commerce.html)

[![GitHub](https://img.shields.io/badge/-renandomingues-181717?style=flat-square&logo=github&logoColor=white&link=https://github.com/renandomingues)](https://github.com/renandomingues)
[![LinkedIn](https://img.shields.io/badge/-Renan%20Domingues-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/renan-domingues-4808b2172/)](https://www.linkedin.com/in/renan-domingues-4808b2172/)
