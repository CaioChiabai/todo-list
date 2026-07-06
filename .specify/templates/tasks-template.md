# Tasks: [NOME DA FEATURE]

**Input**: Documentos de design de `specs/[###-nome-da-feature]/`
**Prerequisites**: plan.md (obrigatório), spec.md, data-model.md, contracts/

## Convenções

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência).
- Cada tarefa indica o caminho exato do arquivo.
- **Testes vêm antes da implementação** (Princípio IV — TDD).

## Phase 3.1: Setup

- [ ] T001 Verificar dependências e estrutura de diretórios.
- [ ] T002 [P] Configurar linting/convenções conforme a constituição.

## Phase 3.2: Tests First (TDD) ⚠️ ANTES da 3.3

- [ ] T003 [P] Teste unitário do Model em `tests/[...].test.js`.
- [ ] T004 [P] Teste de integração do endpoint em `tests/[...].test.js`.

*Os testes DEVEM falhar antes de qualquer implementação.*

## Phase 3.3: Core Implementation (só após os testes falharem)

- [ ] T005 [P] Model em `src/models/[...].js`.
- [ ] T006 Controller em `src/controllers/[...].js`.
- [ ] T007 Rotas em `src/routes/[...].js`.
- [ ] T008 View em `src/views/[...]`.

## Phase 3.4: Integration

- [ ] T009 Conectar rotas ao app em `src/app.js`.
- [ ] T010 Validar tratamento de erros e status codes.

## Phase 3.5: Polish

- [ ] T011 [P] Atualizar documentação (`docs/`, `specs/`).
- [ ] T012 Rodar `npm test` e confirmar cobertura verde.
- [ ] T013 Validar via `quickstart.md`.

## Dependencies

- Testes (3.2) antes da implementação (3.3).
- Model antes de Controller antes de Rotas.
- Implementação antes de Polish.

## Parallel Example

```
# Rodar juntos (arquivos independentes):
T003, T004  → escrever testes
T005        → implementar Model
```
