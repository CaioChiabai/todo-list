# 📝 TODO List — SPEC-DRIVEN Development

Uma aplicação web de gerenciamento de tarefas construída com a metodologia **SPEC-DRIVEN Development (SDD)**, arquitetura **MVC**, e armazenamento em memória.

## 🚀 Demo

- **Aplicação**: [todo-list on Render](https://todo-list-caiochiabai.onrender.com)
- **Documentação**: [MKDocs on GitHub Pages](https://caiochiabai.github.io/todo-list)

## ✨ Funcionalidades

- ✅ Cadastrar tarefas com título, descrição e lembrete
- ❌ Remover tarefas
- 🔔 Lembretes visuais com destaque automático
- 🌗 Tema claro/escuro
- 📱 Interface responsiva

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)**:

```
src/
├── models/         → Dados em memória (Array)
├── views/          → Interface HTML/CSS/JS
├── controllers/    → Lógica de negócio
└── routes/         → Endpoints REST API
```

## 📋 SPEC-DRIVEN Development

Todas as especificações estão na pasta `specs/`:

- `constitution.md` — Regras e justificativas do projeto
- `overview.md` — Visão geral e escopo
- `architecture.md` — Decisões arquiteturais
- `features/` — Specs por funcionalidade

## 🛠️ Tecnologias

| Componente | Tecnologia |
|:---|:---|
| Backend | Node.js + Express |
| Frontend | HTML + CSS + JavaScript (Vanilla) |
| Armazenamento | In-memory (Array) |
| Testes | Jest + Supertest |
| Documentação | MKDocs + Material Theme |
| Hosting | Render (app) + GitHub Pages (docs) |

## 🏃 Rodando Localmente

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Rodar testes
npm test
```

Acesse `http://localhost:3000`

## 📖 Documentação

A documentação completa está disponível em: [https://caiochiabai.github.io/todo-list](https://caiochiabai.github.io/todo-list)

## 📄 Licença

MIT
