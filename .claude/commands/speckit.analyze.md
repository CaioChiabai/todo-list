---
description: Verifica consistência entre spec, plano, tarefas e a constituição antes da implementação.
---

Faça (análise **somente leitura** — não edite arquivos, apenas relate):

1. Carregue da feature ativa: `spec.md`, `plan.md`, `tasks.md` e
   `.specify/memory/constitution.md`.
2. Cheque:
   - **Cobertura**: todo Functional Requirement tem tarefa correspondente?
   - **Rastreabilidade**: toda tarefa mapeia para requisito/contrato/entidade?
   - **Consistência**: entidades, endpoints e nomes batem entre os documentos?
   - **Constituição**: algum artefato viola um princípio?
   - **Ambiguidade**: sobrou algum `[NEEDS CLARIFICATION]`?
3. Produza um relatório com achados por severidade (CRITICAL / HIGH / MEDIUM / LOW) e
   o comando recomendado para corrigir cada um.
4. Não altere nenhum arquivo.
