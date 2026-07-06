---
description: Gera a lista de tarefas executáveis (tasks.md) a partir dos artefatos de design.
---

Faça:

1. Carregue da feature ativa: `docs/specs/plan.md` (obrigatório) e, se existirem,
   `data-model.md`, `docs/contracts/`, `spec.md`, `research.md`.
2. Carregue `.specify/templates/tasks-template.md`.
3. Derive tarefas numeradas (`T001`...):
   - Setup → **Testes (TDD)** → Implementação → Integração → Polish.
   - **Testes vêm antes da implementação** (Princípio IV da constituição).
   - Um contrato → uma tarefa de teste; uma entidade → uma tarefa de model.
   - Marque `[P]` tarefas em arquivos independentes (paralelizáveis).
   - Cada tarefa indica o caminho exato do arquivo.
4. Adicione a seção de dependências e um exemplo de execução paralela.
5. Salve em `docs/specs/tasks.md` e relate a contagem de tarefas.
