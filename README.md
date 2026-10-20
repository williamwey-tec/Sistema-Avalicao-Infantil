# AvaliaInfantil

Protótipo front-end para demonstrar telas e interações de um sistema de apoio à avaliação diagnóstica na Educação Infantil.

## Estado atual

A versão existente é uma aplicação estática executada no navegador. Ela usa dados fictícios mantidos em JavaScript e não possui backend, banco de dados, autenticação real ou geração real de PDF.

As interações disponíveis continuam sendo simulações de interface, incluindo:

- seleção de perfil e entrada no protótipo;
- navegação entre painel, turmas, avaliação, alunos, resultados e modelos;
- seleção de aluno e respostas da avaliação;
- cadastro simulado de aluno;
- mensagens de confirmação para ações simuladas.

## Tecnologias existentes

- HTML5;
- CSS3;
- JavaScript sem frameworks ou dependências externas.

## Estrutura real

```text
Sistema-Avalicao-Infantil/
├── app/                          # Estrutura documental das camadas futuras
│   ├── Controllers/             # Entrada HTTP (a implementar)
│   ├── Services/                # Casos de uso e regras (a implementar)
│   ├── Repositories/            # Persistência (a implementar)
│   ├── Models/                  # Objetos de domínio opcionais (a implementar)
│   └── Views/                   # Templates PHP futuros
│       ├── layouts/
│       ├── turmas/
│       ├── modelos/
│       ├── avaliacoes/
│       └── resultados/
├── bootstrap/                    # Inicialização futura, documentada
├── config/                       # Configuração futura, documentada
├── database/                     # Modelagem e scripts futuros, documentados
├── public/                       # Camada de apresentação executada no navegador
│   ├── index.html                # Estrutura das telas do protótipo
│   └── assets/
│       ├── css/
│       │   └── style.css         # Identidade visual, layout e componentes
│       └── js/
│           ├── mock-data.js      # Dados fictícios usados pela demonstração
│           ├── renderers.js      # Montagem das listas, tabelas e alertas
│           ├── evaluation.js     # Interações do preenchimento da avaliação
│           ├── session.js        # Perfil, entrada, saída e navegação
│           └── ui.js             # Modal, cadastro simulado e notificações
├── tests/                        # Testes futuros, documentados
├── Planejamento_MVP_AvaliaInfantil_Arquitetura_Camadas.md
└── README.md
```

Apenas `public/` contém código executável. As demais pastas possuem somente arquivos `README.md` que documentam responsabilidades e limites para uma implementação futura; não há componentes de backend, banco ou testes implementados.

## Como executar

A forma mais simples é abrir `public/index.html` em um navegador moderno.

Opcionalmente, a pasta `public/` pode ser servida por qualquer servidor HTTP estático. Por exemplo, em um ambiente que já tenha Python instalado:

```bash
cd public
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

Não é necessário configurar XAMPP, PHP ou MySQL para executar a versão atual.

## Relação com o planejamento arquitetural

O arquivo `Planejamento_MVP_AvaliaInfantil_Arquitetura_Camadas.md` registra uma arquitetura futura em camadas para a evolução do MVP. No estado atual, somente a camada de apresentação está implementada; as demais camadas possuem apenas documentação de preparação.

Quando houver implementação funcional aprovada, o projeto poderá incorporar gradualmente as camadas de aplicação/controle, negócio/serviços e persistência descritas no planejamento. Essa evolução futura poderá incluir PHP, MySQL e configuração de uma raiz pública adequada, mas nenhum desses elementos faz parte do código atual.

## Observações

- Todos os nomes e dados exibidos são fictícios.
- Login, salvamento, finalização, relatórios e cadastros são apenas demonstrações visuais.
- O protótipo não deve ser usado com dados reais de crianças.
