# Implementation Plan: [NOME DA FEATURE]

**Branch**: `[###-nome-da-feature]` | **Date**: [DATA] | **Spec**: [link para spec.md]
**Input**: Feature specification de `specs/[###-nome-da-feature]/spec.md`

## Summary

[Extraia da spec: requisito principal + abordagem técnica escolhida.]

## Technical Context

**Language/Version**: [ex: Node.js 20 / JavaScript ES2022]
**Primary Dependencies**: [ex: Express, uuid, cors]
**Storage**: [ex: array em memória — sem banco de dados (Princípio II)]
**Testing**: [ex: Jest + Supertest]
**Target Platform**: [ex: servidor Node.js + navegador]
**Project Type**: [single/web — determina a estrutura de diretórios]
**Performance Goals**: [ex: respostas de API < 200ms]
**Constraints**: [ex: sem persistência entre reinicializações]
**Scale/Scope**: [ex: usuário único, escopo acadêmico]

## Constitution Check

*PORTÃO: deve passar antes da Phase 0. Reavaliar após a Phase 1.*

| Princípio | Conforme? | Observação |
|:---|:---|:---|
| I. Arquitetura MVC | [ ] | Model/Controller/View separados? |
| II. Armazenamento em memória | [ ] | Sem banco de dados? |
| III. API RESTful | [ ] | Verbos e status codes corretos? |
| IV. Testes obrigatórios | [ ] | Testes planejados antes da implementação? |
| V. Frontend Vanilla | [ ] | Sem frameworks/build? |
| VI. Documentação viva | [ ] | Specs e docs atualizadas? |

**Violações**: [nenhuma | listar e justificar em Complexity Tracking].

## Project Structure

### Documentation (esta feature)

```
specs/[###-nome-da-feature]/
├── spec.md              # /specify
├── plan.md              # /plan (este arquivo)
├── research.md          # Phase 0 (se houver incógnitas)
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1
└── tasks.md             # /tasks
```

### Source Code (repositório)

```
src/
├── models/
├── controllers/
├── routes/
└── views/
tests/
```

## Phase 0: Outline & Research

1. Liste incógnitas do Technical Context.
2. Pesquise e consolide decisões em `research.md` (Decision / Rationale / Alternatives).

**Output**: `research.md` sem nenhum `[NEEDS CLARIFICATION]`.

## Phase 1: Design & Contracts

1. Extraia entidades → `data-model.md`.
2. Gere contratos de API → `contracts/`.
3. Derive cenários de teste dos user stories.
4. Escreva `quickstart.md` (como validar a feature ponta a ponta).

**Output**: `data-model.md`, `contracts/*`, `quickstart.md`.

## Phase 2: Task Planning Approach

*Descreve o que `/tasks` fará — NÃO execute aqui.*

- Derive tarefas dos contratos, entidades e user stories.
- Testes antes da implementação (Princípio IV).
- Marque `[P]` tarefas paralelizáveis (arquivos independentes).

## Complexity Tracking

*Preencher apenas se o Constitution Check tiver violações a justificar.*

| Violação | Por que necessária | Alternativa mais simples rejeitada porque |
|:---|:---|:---|
| | | |

## Progress Tracking

- [ ] Phase 0: Research completa
- [ ] Phase 1: Design completo
- [ ] Phase 2: Abordagem de tarefas descrita
- [ ] Constitution Check inicial: PASS
- [ ] Constitution Check pós-design: PASS
