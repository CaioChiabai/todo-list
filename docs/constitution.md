# Constituição do Projeto

A Constituição define as regras, princípios e restrições que governam todo o desenvolvimento. Todas as decisões técnicas estão justificadas abaixo.

## Justificativas das Escolhas Tecnológicas

### Arquitetura MVC (Model-View-Controller)

**Por que MVC?**

- **Separação de responsabilidades**: Model cuida dos dados, Controller da lógica, View da apresentação
- **Testabilidade**: Cada camada pode ser testada isoladamente
- **Padrão amplamente adotado**: Express, Django, Spring, Rails — todos usam MVC
- **Clareza**: Qualquer desenvolvedor sabe onde encontrar cada tipo de lógica

### Mono-repo

**Por que um único repositório?**

- **Simplicidade**: Elimina complexidade de múltiplos repos para um projeto de escopo pequeno
- **Coesão**: Specs, código e documentação evoluem juntos
- **Visibilidade**: Todo o contexto (da especificação ao deploy) em um único lugar

### Node.js + Express

**Por que esta stack?**

- **Leveza**: Express é minimalista (~2MB), ideal para APIs simples
- **JavaScript full-stack**: Mesmo idioma no backend e frontend
- **Deploy fácil**: Suportado nativamente por Render, Vercel, Railway
- **Ecossistema**: npm possui a maior quantidade de pacotes do mercado

### Armazenamento em Memória

**Por que sem banco de dados?**

- **Requisito do projeto**: A especificação define explicitamente que não deve haver DB persistente
- **Simplicidade**: Sem necessidade de configurar DBMS, drivers ou ORMs
- **Velocidade**: Operações em memória são ordens de grandeza mais rápidas
- **Trade-off aceito**: Dados perdidos ao reiniciar o servidor

### Frontend Vanilla (HTML + CSS + JS)

**Por que sem frameworks?**

- **Zero dependências de build**: Sem Webpack, Babel ou bundlers
- **Performance**: Sem overhead de Virtual DOM ou hydration
- **Aprendizado**: Demonstra domínio das tecnologias fundamentais da web
- **Escopo adequado**: Para 3 funcionalidades, um framework SPA seria over-engineering

### Render (Hosting)

**Por que Render?**

- **Free tier permanente**: Hospedagem gratuita indefinida para Web Services
- **Deploy automático**: Integração nativa com GitHub
- **HTTPS automático**: Certificado SSL gratuito incluído
- **Suporte nativo a Node.js**: Detecta e configura automaticamente

### MKDocs + Material Theme

**Por que MKDocs?**

- **Padrão da indústria**: Usado por FastAPI, Kubernetes e outros projetos open-source
- **Markdown-first**: Fácil de manter e versionar no Git
- **Visual profissional**: Busca instantânea, navegação lateral, modo escuro
- **Deploy simples**: Um único comando publica no GitHub Pages

### Jest (Testes)

**Por que Jest?**

- **Zero configuração**: Funciona out-of-the-box com Node.js
- **All-in-one**: Assertion library, mocking, coverage e watch mode
- **Padrão de mercado**: Framework de testes mais utilizado em JavaScript

## Princípios de Desenvolvimento

### Regras Obrigatórias

1. Todo código segue o padrão MVC
2. API segue convenções RESTful
3. Código limpo: funções pequenas, nomes descritivos
4. Documentação viva: mudanças no código refletem na documentação
5. Testes obrigatórios para funcionalidades

### Restrições

1. **NÃO** usar banco de dados persistente
2. **NÃO** usar frameworks frontend (React, Vue, Angular)
3. **NÃO** hardcodar credenciais no código
4. **NÃO** commitar `node_modules/` ou `site/`

### Convenções

| Aspecto | Convenção |
|:---|:---|
| Linguagem do código | Inglês |
| Linguagem da documentação | Português |
| Nomenclatura variáveis | camelCase |
| Nomenclatura classes | PascalCase |
| Indentação | 2 espaços |
| Strings | Aspas simples |
