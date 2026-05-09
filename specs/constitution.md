# Constituição do Projeto — TODO List

## 1. Propósito

Este documento define as regras, princípios e restrições que governam o desenvolvimento do projeto TODO List. Toda decisão arquitetural e tecnológica deve estar alinhada com os princípios aqui descritos.

---

## 2. Justificativas das Escolhas Tecnológicas

### 2.1 Arquitetura MVC (Model-View-Controller)

**Escolha**: Padrão arquitetural MVC.

**Justificativa**:
- **Separação de responsabilidades**: O Model encapsula os dados e regras de negócio, o Controller gerencia a lógica da aplicação, e a View cuida da apresentação. Isso facilita a manutenção e a evolução do código.
- **Testabilidade**: Cada camada pode ser testada isoladamente (testes unitários no Model, testes de integração no Controller/Routes).
- **Clareza para o desenvolvedor**: Qualquer desenvolvedor que entre no projeto sabe imediatamente onde encontrar cada tipo de lógica.
- **Padrão amplamente adotado**: MVC é ensinado em praticamente todos os cursos de engenharia de software e frameworks modernos (Express, Django, Spring, Rails) o adotam.

### 2.2 Mono-repo

**Escolha**: Todo o código (specs, backend, frontend, docs, CI/CD) em um único repositório.

**Justificativa**:
- **Simplicidade**: Para um projeto de escopo pequeno-médio, um mono-repo elimina a complexidade de gerenciar múltiplos repositórios, versionamento cruzado e deploys separados.
- **Coesão**: Specs, código e documentação evoluem juntos. Uma mudança em uma spec se reflete imediatamente no código e na documentação, sem necessidade de sincronizar repos.
- **Visibilidade**: O avaliador do projeto consegue ver todo o contexto (da especificação ao deploy) em um único lugar.

### 2.3 Node.js + Express

**Escolha**: Runtime Node.js com framework Express.

**Justificativa**:
- **Leveza**: Express é um framework minimalista (~2MB), ideal para APIs REST simples sem overhead desnecessário.
- **Ecossistema**: O npm possui a maior quantidade de pacotes disponíveis de qualquer ecossistema de linguagem.
- **JavaScript full-stack**: Usar JS no backend e no frontend permite reutilizar conhecimento e eventualmente compartilhar código (validações, tipos).
- **Deploy fácil**: Render, Vercel, Railway e Heroku suportam Node.js nativamente, com zero configuração extra.
- **Documentação abundante**: Express possui uma das documentações mais completas e comunidade mais ativa.

### 2.4 Armazenamento em Memória (Sem Banco de Dados)

**Escolha**: Array JavaScript em memória como store de dados.

**Justificativa**:
- **Requisito do projeto**: A especificação explicitamente define que não deve haver banco de dados persistente.
- **Simplicidade**: Elimina a necessidade de configurar, conectar e gerenciar um DBMS (PostgreSQL, MongoDB, etc.), drivers e ORMs.
- **Velocidade**: Operações em memória são ordens de grandeza mais rápidas que I/O de disco/rede.
- **Trade-off aceito**: Os dados são perdidos ao reiniciar o servidor. Isso é aceitável para o escopo deste projeto acadêmico.

### 2.5 Frontend Vanilla (HTML + CSS + JS)

**Escolha**: Frontend sem frameworks (React, Vue, Angular).

**Justificativa**:
- **Zero dependências de build**: Não há necessidade de Webpack, Babel, ou bundlers. O HTML é servido diretamente pelo Express.
- **Performance**: Sem overhead de Virtual DOM, hydration ou bundle JavaScript pesado.
- **Aprendizado**: Demonstra domínio das tecnologias fundamentais da web.
- **Escopo adequado**: Para uma aplicação TODO com 2 funcionalidades principais (cadastrar e remover), um framework SPA seria over-engineering.

### 2.6 Render (Hosting Gratuito)

**Escolha**: Render como plataforma de deploy.

**Justificativa**:
- **Free tier permanente**: Diferente do Railway (que removeu o free tier), Render oferece hospedagem gratuita indefinida para Web Services.
- **Deploy automático**: Integração nativa com GitHub — cada push na branch `main` dispara um novo deploy.
- **Suporte a Node.js**: Detecta automaticamente projetos Node.js e executa `npm install` + `npm start`.
- **HTTPS automático**: Certificado SSL gratuito incluído.

### 2.7 MKDocs + Material Theme

**Escolha**: MKDocs com tema Material para documentação.

**Justificativa**:
- **Padrão da indústria**: MKDocs é utilizado por projetos como FastAPI, Kubernetes e várias bibliotecas open-source.
- **Markdown-first**: Documentação escrita em Markdown puro, fácil de manter e versionar no Git.
- **Visual profissional**: O tema Material oferece busca instantânea, navegação lateral, modo escuro, e responsividade.
- **Deploy simples**: Um único comando (`mkdocs gh-deploy`) publica no GitHub Pages.

### 2.8 Jest (Testes)

**Escolha**: Framework Jest para testes.

**Justificativa**:
- **Zero configuração**: Jest funciona out-of-the-box com Node.js.
- **All-in-one**: Inclui assertion library, mocking, coverage e watch mode.
- **Padrão de mercado**: É o framework de testes mais utilizado no ecossistema JavaScript.

---

## 3. Princípios de Desenvolvimento

### 3.1 Regras Obrigatórias

1. **Todo código deve seguir o padrão MVC** — nenhuma lógica de negócio na View, nenhum acesso a dados no Controller.
2. **API RESTful** — endpoints devem seguir convenções REST (verbos HTTP corretos, status codes adequados).
3. **Código limpo** — funções pequenas, nomes descritivos, sem código duplicado.
4. **Documentação viva** — toda mudança no código deve ser refletida na documentação.
5. **Testes obrigatórios** — funcionalidades devem ter cobertura de testes.

### 3.2 Restrições

1. **NÃO** usar banco de dados persistente (SQLite, PostgreSQL, MongoDB, etc.).
2. **NÃO** usar frameworks frontend (React, Vue, Angular, Svelte).
3. **NÃO** hardcodar credenciais ou secrets no código.
4. **NÃO** committar `node_modules/` ou `site/` no repositório.

### 3.3 Convenções

- **Linguagem do código**: Inglês (variáveis, funções, comentários).
- **Linguagem da documentação**: Português (público-alvo brasileiro).
- **Nomenclatura**: camelCase para variáveis/funções, PascalCase para classes.
- **Indentação**: 2 espaços.
- **Strings**: Aspas simples (`'`) no JavaScript.

---

## 4. Critérios de Sucesso

| Critério | Métrica |
|:---|:---|
| Funcionalidades completas | CRUD de tarefas funcionando |
| Testes passando | 100% dos testes verdes |
| Deploy online | App acessível via URL pública |
| Documentação online | MKDocs acessível via GitHub Pages |
| Código no GitHub | Repositório público com histórico de commits |
| Metodologia SDD | Specs completas na pasta `specs/` |
