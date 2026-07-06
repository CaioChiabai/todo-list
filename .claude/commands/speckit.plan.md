---
description: Gera o plano de implementação (plan.md) e artefatos de design a partir da spec.
---

Contexto adicional do usuário: `$ARGUMENTS`

Faça:

1. Carregue a spec ativa (`docs/specs/spec.md`) e `.specify/memory/constitution.md`.
2. Carregue `.specify/templates/plan-template.md` e preencha Technical Context e Summary.
3. **Constitution Check** — avalie os 6 princípios. Se houver violação, justifique em
   *Complexity Tracking* ou reprojete. Portão obrigatório antes da Phase 0.
4. **Phase 0** → `docs/specs/research.md`: resolva incógnitas
   (Decision / Rationale / Alternatives).
5. **Phase 1** → gere:
   - `docs/specs/data-model.md` (entidades, campos, validações).
   - `docs/contracts/` (contratos de API: endpoints, request/response, status codes).
   - `docs/specs/quickstart.md` (como validar a feature ponta a ponta).
6. Reavalie o Constitution Check após o design.
7. NÃO gere `tasks.md` aqui (papel de `/speckit.tasks`). Relate os artefatos criados.
