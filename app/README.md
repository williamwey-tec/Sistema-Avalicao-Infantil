# Camada interna da aplicação

Esta pasta está reservada para a futura implementação PHP descrita no planejamento arquitetural. No estado atual, ela contém apenas documentação e não participa da execução do protótipo.

## Subdiretórios

- `Controllers/`: entrada HTTP e coordenação das respostas.
- `Services/`: casos de uso e regras de negócio.
- `Repositories/`: acesso ao banco e transações.
- `Models/`: objetos de domínio, somente quando forem úteis.
- `Views/`: templates de apresentação gerados no servidor.

O fluxo futuro esperado é controller → service → repository. Views não devem consultar o banco, repositories não devem produzir HTML e controllers não devem concentrar regras de negócio.
