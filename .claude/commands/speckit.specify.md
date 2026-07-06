---
description: Cria a especificação de uma feature (spec.md) a partir de uma descrição em linguagem natural.
---

A descrição da feature está em `$ARGUMENTS`.

Faça:

1. Determine o próximo número de feature examinando `docs/specs/` (ex: `001`, `002`).
   Para uma feature nova e isolada, crie `docs/specs/[###-slug]/`; para a feature
   principal deste projeto, os artefatos vivem diretamente em `docs/specs/`.
2. Carregue `.specify/templates/spec-template.md`.
3. Preencha a spec:
   - Foque no **QUÊ** e no **PORQUÊ**; nunca em stack, APIs ou estrutura de código.
   - Escreva User Stories com prioridade (`P1`, `P2`), Acceptance Scenarios
     (Given/When/Then), Edge Cases, Functional Requirements testáveis (`FR-001`...),
     Success Criteria (`SC-001`...) e Assumptions.
   - Marque toda ambiguidade com `[NEEDS CLARIFICATION: pergunta]`.
4. Rode o Review Checklist. Remova qualquer detalhe de implementação.
5. Salve o `spec.md` e relate o caminho e as pendências de clarificação.
