# Metodologia SPEC-DRIVEN Development

## O que é SDD?

**SPEC-DRIVEN Development (SDD)** é uma metodologia de desenvolvimento de software que prioriza a criação de especificações precisas e estruturadas como fonte de verdade antes de qualquer código ser escrito.

Diferente do "vibe coding" (codificação por intuição), o SDD estabelece contratos claros que guiam todo o processo de desenvolvimento.

## As 4 Fases do SDD

### Fase 1: SPECIFY (Especificar)

Captura o contexto do negócio, objetivos e critérios de sucesso.

**Documentos criados neste projeto:**

- `specs/constitution.md` — Regras, princípios e justificativas
- `specs/overview.md` — Visão geral e escopo do projeto
- `specs/architecture.md` — Decisões arquiteturais
- `specs/features/create-task.md` — Spec de cadastro de tarefas
- `specs/features/remove-task.md` — Spec de remoção de tarefas

### Fase 2: PLAN (Planejar)

Traduz as especificações em decisões arquiteturais.

**Decisões tomadas:**

- Arquitetura MVC
- API REST com 4 endpoints
- Armazenamento em memória (Array JavaScript)
- Frontend Vanilla (sem frameworks)

### Fase 3: TASKS (Tarefas)

Decompõe o plano em unidades de trabalho testáveis.

**Tarefas definidas:**

1. Inicializar projeto Node.js
2. Implementar Model (in-memory store)
3. Implementar Controller (lógica CRUD)
4. Implementar Routes (API REST)
5. Criar View (frontend premium)
6. Escrever testes com Jest
7. Configurar MKDocs
8. Deploy no Render
9. Deploy docs no GitHub Pages

### Fase 4: IMPLEMENT (Implementar)

Execução das tarefas sob as restrições definidas na Constituição.

Cada tarefa foi implementada seguindo rigorosamente:

- O padrão MVC definido na arquitetura
- As restrições da Constituição
- Os critérios de aceitação das feature specs

## SDD vs. Outras Metodologias

| Aspecto | SDD | TDD | Vibe Coding |
|:---|:---|:---|:---|
| **Ponto de partida** | Especificação formal | Teste unitário | Prompt informal |
| **Nível de abstração** | Alto (arquitetura + negócio) | Baixo (código) | Nenhum |
| **Rastreabilidade** | Total (spec → code) | Parcial (test → code) | Nenhuma |
| **Documentação** | Obrigatória | Opcional | Inexistente |
| **Qualidade** | Alta (contratos formais) | Alta (testes) | Variável |

## Benefícios do SDD Neste Projeto

1. **Clareza**: Qualquer desenvolvedor entende as decisões sem perguntar
2. **Rastreabilidade**: Cada feature tem uma spec que define exatamente o comportamento esperado
3. **Qualidade**: Os testes foram derivados diretamente das specs
4. **Documentação viva**: As specs estão versionadas junto com o código
