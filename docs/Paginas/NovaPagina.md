# Guia de Implementação de Novas Páginas

## 1. Estrutura de Arquivos

Para cada nova página, você precisará criar os seguintes arquivos:

```
frontend/
├── scss/
│   └── [nome-da-pagina]/
│       └── [NomeDaPagina].scss
├── src/
│   ├── views/
│   │   └── [nome-da-pagina]/
│   │       └── [NomeDaPagina].vue
│   ├── scripts/
│   │   └── [nome-da-pagina]/
│   │       └── [NomeDaPagina].ts
│   └── router/
│       └── index.ts (adicionar nova rota)
```

## 2. Passos de Implementação

### 2.1. Criar o Componente Vue

```vue
<!-- src/views/[nome-da-pagina]/[NomeDaPagina].vue -->
<template>
  <div class="[nome-da-pagina]-container">
    <!-- Conteúdo da página -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { use[NomeDaPagina] } from '@/scripts/[nome-da-pagina]/[NomeDaPagina]';

export default defineComponent({
  name: '[NomeDaPagina]',
  setup() {
    const { /* props e métodos */ } = use[NomeDaPagina]();
    return { /* props e métodos */ };
  }
});
</script>

<style lang="scss">
@use '../../../scss/[nome-da-pagina]/[NomeDaPagina].scss';
</style>
```

### 2.2. Criar o Script TypeScript

```typescript
// src/scripts/[nome-da-pagina]/[NomeDaPagina].ts
import { ref, onMounted } from 'vue';
import { magentoService } from '@/services/magentoService';

export function use[NomeDaPagina]() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref([]);

  const fetchData = async () => {
    try {
      loading.value = true;
      // Implementar lógica de busca
    } catch (err) {
      error.value = 'Erro ao carregar dados';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    loading,
    error,
    data,
    fetchData
  };
}
```

### 2.3. Criar o Arquivo SCSS

```scss
// scss/[nome-da-pagina]/[NomeDaPagina].scss
@use '../variables' as *;
@use '../mixins' as *;

.[nome-da-pagina]-container {
  padding: $spacing-xl;

  &__header {
    margin-bottom: $spacing-xl;
  }

  &__content {
    // Estilos do conteúdo
  }
}
```

### 2.4. Adicionar a Rota

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import [NomeDaPagina] from '@/views/[nome-da-pagina]/[NomeDaPagina].vue';

const routes = [
  {
    path: '/[nome-da-pagina]',
    name: '[NomeDaPagina]',
    component: [NomeDaPagina],
    meta: {
      requiresAuth: true
    }
  }
];
```

### 2.5. Adicionar ao Menu (se necessário)

```vue
<!-- src/layouts/MainLayout.vue -->
<template>
  <nav>
    <router-link to="/[nome-da-pagina]">
      <i class="fas fa-[icone]"></i>
      [Nome da Página]
    </router-link>
  </nav>
</template>
```

## 3. Boas Práticas

### 3.1. Variáveis SCSS

- Sempre use as variáveis definidas em `_variables.scss`
- Adicione novas variáveis quando necessário
- Mantenha a consistência com as variáveis existentes

### 3.2. Mixins

- Use os mixins existentes em `_mixins.scss`
- Crie novos mixins quando identificar padrões repetitivos
- Mantenha os mixins reutilizáveis e genéricos

### 3.3. Estrutura de Componentes

- Mantenha a separação de responsabilidades
- Use TypeScript para tipagem
- Implemente tratamento de erros
- Adicione estados de loading

### 3.4. Estilos

- Use a sintaxe moderna do Sass (`@use` em vez de `@import`)
- Mantenha a consistência com o design system
- Use as variáveis de cores, espaçamento e breakpoints
- Implemente responsividade

## 4. Exemplo de Implementação

Para implementar uma nova página "**Produtos**", você seguiria:

1. Criar os arquivos:
   - `frontend/scss/produtos/ProdutosList.scss`
   - `frontend/src/views/produtos/ProdutosList.vue`
   - `frontend/src/scripts/produtos/ProdutosList.ts`
2. Adicionar a rota em `router/index.ts`
3. Adicionar o link no menu em `MainLayout.vue`
4. Implementar a lógica de negócio
5. Estilizar seguindo o design system

## 5. Compilação e Testes

Após implementar:

1. Compile o projeto
2. Verifique se não há erros de compilação
3. Teste a funcionalidade
4. Verifique a responsividade
5. Teste os estados de loading e erro
