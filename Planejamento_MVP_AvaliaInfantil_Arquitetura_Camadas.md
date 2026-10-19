# Planejamento Geral — MVP AvaliaInfantil

## 1. Visão geral

O **AvaliaInfantil** será um protótipo web funcional e simplificado para apoiar o processo de avaliação diagnóstica na Educação Infantil. O MVP deverá demonstrar o fluxo completo de **cadastro de turmas e alunos**, **criação de modelos avaliativos**, **aplicação das avaliações** e **visualização simplificada dos resultados**.

A avaliação tem finalidade de acompanhamento pedagógico, **não classificatória**. O sistema apoia o registro e a organização das informações, sem substituir a interpretação pedagógica dos profissionais.

> **Limite do projeto:** este documento descreve o escopo do MVP acadêmico, não o sistema completo previsto na documentação anterior.

## 2. Stack tecnológica definida

| Camada | Tecnologia | Responsabilidade |
|---|---|---|
| Frontend | HTML5 | Estrutura das páginas |
| Estilização | CSS3 | Layout e identidade visual |
| Interatividade | JavaScript | Manipulação da interface e requisições |
| Backend | PHP | Regras de negócio, validações e processamento |
| Banco de dados | MySQL | Armazenamento persistente |
| Ambiente local | XAMPP | Servidor Apache, PHP e serviço de banco de dados compatível |
| Versionamento | Git e GitHub | Controle de versões e colaboração |

**Não estão previstos neste MVP:** React, FastAPI, PostgreSQL e autenticação JWT.

## 3. Funcionalidades do MVP

### 3.1. Gerenciamento de turmas e alunos

- Cadastrar turmas.
- Listar e consultar turmas cadastradas.
- Cadastrar alunos e vinculá-los às respectivas turmas.
- Visualizar os alunos de cada turma.

### 3.2. Gerenciamento de modelos avaliativos

- Cadastrar modelos de avaliação diagnóstica.
- Configurar eixos/campos avaliativos e critérios (itens) de avaliação.
- Definir as opções de resposta dos critérios.
- Listar e consultar modelos cadastrados.
- Reutilizar o mesmo modelo em diversas turmas.
- **Impedir a atualização de modelos após a conclusão do cadastro.**
- **Permitir exclusão lógica de modelos que já foram utilizados:** o modelo passa a inativo e não pode ser selecionado para novas aplicações; avaliações, respostas e resultados históricos permanecem preservados.

### 3.3. Aplicação das avaliações

- Selecionar uma turma cadastrada.
- Selecionar um modelo avaliativo ativo.
- Exibir os alunos da turma e os critérios do modelo.
- Registrar as respostas de cada aluno.
- Salvar avaliações e respostas no banco de dados.
- Consultar avaliações previamente registradas.

### 3.4. Visualização dos resultados

- Consultar avaliações por turma.
- Visualizar os resultados individuais dos alunos.
- Apresentar resultados consolidados por turma.
- Exibir quantitativos e percentuais das respostas por critério avaliativo.
- Utilizar tabelas e indicadores simples, sem análises estatísticas avançadas.

## 4. Fluxo funcional principal

1. Cadastrar uma **turma** e os **alunos** associados.
2. Cadastrar e concluir um **modelo avaliativo** com critérios e opções de resposta.
3. Selecionar uma **turma** e um **modelo ativo** para iniciar uma avaliação.
4. Registrar e salvar as **respostas dos alunos**.
5. Consultar os **resultados individuais e consolidados** da avaliação.

O modelo avaliativo é compartilhável entre diferentes turmas, mas cada aplicação gera seus próprios registros de respostas e resultados.

## 5. Regras de negócio já definidas

| Regra | Definição |
|---|---|
| Reutilização | Um modelo de avaliação pode ser aplicado a diversas turmas. |
| Imutabilidade | Após a conclusão do cadastro, o modelo não poderá ser editado ou atualizado. |
| Exclusão de modelo utilizado | Exclusão **lógica**: o modelo torna-se inativo, sem apagar os dados históricos. |
| Disponibilidade | Modelos inativos não poderão ser usados em novas aplicações. |
| Preservação do histórico | Avaliações, respostas e resultados já registrados continuam associados ao modelo original. |
| Autenticação | Não haverá login, perfis ou controle de permissões nesta versão. |

**Pendente de definição:** comportamento da exclusão de modelos que **nunca** foram utilizados.

> A regra de exclusão lógica deve ser validada no backend PHP; não basta ocultar um modelo inativo na interface.

## 6. Arquitetura de software — decisão para o MVP

**Arquitetura escolhida: arquitetura em camadas, em uma única aplicação PHP (monólito).** Não implica microserviços, servidores separados ou obrigação de criar API REST. O objetivo é delimitar responsabilidades, facilitar testes e permitir evolução gradual.

| Camada | Responsabilidade | Exemplos no AvaliaInfantil | Restrições |
|---|---|---|---|
| **Apresentação** | Telas e interação | Páginas PHP/HTML, CSS, JavaScript; formulários de turmas, modelos e avaliações | Não executa SQL nem determina regras de exclusão/imutabilidade |
| **Aplicação / Controle** | Interpretar requisições HTTP, validar formato de entrada, chamar casos de uso/serviços e devolver resposta | `TurmaController`, `ModeloAvaliativoController`, `AvaliacaoController` | Evitar regras de domínio e consultas SQL diretas |
| **Negócio / Serviços** | Validar regras funcionais e coordenar operações do domínio | `ModeloAvaliativoService`, `AvaliacaoService`, `ResultadoService` | Não depender de HTML, superglobais PHP ou SQL embutido |
| **Persistência** | Consultas ao banco, transações e mapeamento de resultados | Repositórios PDO; conexão MySQL | Não decidir regras pedagógicas nem produzir HTML |

**Fluxo esperado:** navegador → controller → serviço → repositório (PDO) → MySQL; a resposta retorna pelas camadas até a interface. Modelos/entidades PHP podem representar os dados do domínio; não precisam constituir uma quinta camada obrigatória.

**Diretrizes:**
- PHP com **PDO**, consultas preparadas e transações para operações compostas, como salvar uma avaliação e suas respostas.
- Validar no servidor a seleção de modelos **ativos**, a **imutabilidade** dos modelos finalizados e a **exclusão lógica** dos modelos utilizados.
- Manter CSS/JavaScript estáticos na pasta pública; arquivos de configuração e conexão não devem ficar acessíveis diretamente pela URL.
- Não armazenar credenciais de banco no Git: disponibilizar um arquivo de exemplo e configurar as credenciais localmente.
- Evitar dados reais de crianças em protótipos, repositórios, prints e testes; usar dados fictícios. Ausência de login é restrição didática, **não** equivale a segurança adequada para produção.
- Não exigir framework, contêiner, filas, API REST independente ou injeção de dependências por contêiner neste MVP.

### 6.1. Princípios SOLID — aplicação proporcional ao MVP

| Princípio | Como aplicar no projeto | Cuidados |
|---|---|---|
| **S — Single Responsibility** | Separar apresentação, recepção da requisição, regras e SQL em classes/arquivos específicos | Não colocar toda a lógica em um único `index.php` ou controller |
| **O — Open/Closed** | Isolar políticas que possam mudar (por exemplo, consolidação das respostas) de modo que novas regras não obriguem a alterar múltiplos módulos | Não criar estratégias e interfaces antecipadamente para opções que não existem |
| **L — Liskov Substitution** | Caso haja herança ou implementações alternativas, garantir que substituições respeitem os mesmos contratos | Preferir composição à herança desnecessária; talvez não seja exigido diretamente no MVP |
| **I — Interface Segregation** | Se interfaces forem necessárias, criar contratos pequenos, focados na operação requerida | Não criar uma interface genérica com todos os métodos CRUD para tudo |
| **D — Dependency Inversion** | Evitar que a lógica de negócio dependa de detalhes de PDO; usar dependências injetadas e, quando justificável, contratos de repositório | Injeção por construtor manual basta; não é obrigatório ter interface para cada classe |

### 6.2. Padrões de projeto — sugestão, não obrigação

- **Service Layer:** útil para centralizar regras como ativação/desativação de modelos, aplicação de avaliações e consolidação de resultados.
- **Repository:** útil para isolar SQL e consultas específicas da aplicação; pode ser implementado com classes PHP simples e PDO.
- **Dependency Injection:** preferir passagem explícita de dependências no construtor, evitando conexões globais espalhadas.
- **MVC:** pode orientar a organização interna de apresentação e controllers, **mas a decisão arquitetural formal do MVP é em camadas**; não precisamos adotar um framework MVC.
- **Strategy, Factory e outros padrões:** adotar apenas se surgir variação real de comportamentos ou criação complexa de objetos.

### 6.3. Estrutura de diretórios e arquivos proposta

> **Estrutura-alvo sugerida**, não inventário do repositório existente. Deve ser adaptada após a inspeção do código atual. Os nomes de arquivos são exemplificativos; não representam arquivos já criados.

```text
Sistema-Avalicao-Infantil/
├── app/                              # Código PHP interno, fora da raiz web
│   ├── Controllers/                  # Entrada HTTP e coordenação de respostas
│   │   ├── TurmaController.php
│   │   ├── AlunoController.php
│   │   ├── ModeloAvaliativoController.php
│   │   ├── AvaliacaoController.php
│   │   └── ResultadoController.php
│   ├── Services/                     # Regras e fluxos de negócio
│   │   ├── TurmaService.php
│   │   ├── ModeloAvaliativoService.php
│   │   ├── AvaliacaoService.php
│   │   └── ResultadoService.php
│   ├── Repositories/                 # Persistência e queries PDO
│   │   ├── TurmaRepository.php
│   │   ├── AlunoRepository.php
│   │   ├── ModeloAvaliativoRepository.php
│   │   ├── AvaliacaoRepository.php
│   │   └── RespostaRepository.php
│   ├── Models/                       # Objetos de domínio, se úteis
│   │   ├── Turma.php
│   │   ├── Aluno.php
│   │   ├── ModeloAvaliativo.php
│   │   └── Avaliacao.php
│   └── Views/                        # Templates PHP de apresentação
│       ├── layouts/                  # Cabeçalho, rodapé e navegação
│       │   └── base.php
│       ├── turmas/                    # Listagem e formulário de turmas/alunos
│       ├── modelos/                   # Listagem, cadastro e detalhes dos modelos
│       ├── avaliacoes/               # Seleção e preenchimento da avaliação
│       └── resultados/               # Resultados individuais e consolidados
├── bootstrap/                        # Inicialização simples da aplicação
│   └── app.php                       # Carrega configuração e monta dependências
├── config/                           # Configurações não expostas ao navegador
│   └── database.example.php          # Exemplo sem senhas reais
├── database/
│   ├── schema.sql                     # Criação de tabelas, índices e FKs
│   └── seeds.sql                      # Dados de demonstração fictícios (opcional)
├── public/                            # ÚNICA raiz pública do Apache
│   ├── index.php                      # Ponto de entrada e roteamento simples
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       ├── app.js
│   │       ├── modelos.js
│   │       └── avaliacoes.js
│   └── .htaccess                     # Opcional: direcionamento de rotas
├── tests/                             # Testes de serviços/regras (estrutura futura)
│   ├── ModeloAvaliativoServiceTest.php
│   └── ResultadoServiceTest.php
├── .gitignore                         # Ignorar segredos e arquivos temporários
├── README.md                          # Instalação, execução XAMPP e equipe
└── Planejamento_MVP_AvaliaInfantil.md # Documento de planejamento
```

**Como utilizar essa estrutura no XAMPP:** idealmente configurar o Apache para servir somente `public/` (por exemplo, com VirtualHost/Alias), mantendo `app/` e `config/` inacessíveis por HTTP. Se a equipe optar por acesso simples via `htdocs/`, **revisar a configuração da raiz pública antes**; não expor toda a pasta do projeto por conveniência.

**Regras de dependência sugeridas:** `Controllers` chamam `Services`; `Services` chamam `Repositories`; `Repositories` usam PDO; `Views` exibem dados preparados. Objetos de `Models` podem ser utilizados nas camadas necessárias. Evitar que `Views` acessem diretamente o banco e que `Repositories` renderizem interface.

## 7. Entidades inicialmente consideradas para o banco de dados

| Entidade | Finalidade |
|---|---|
| Turmas | Informações das turmas cadastradas |
| Alunos | Dados dos alunos |
| Matrículas | Vínculo entre alunos e turmas |
| Modelos de avaliação | Modelos cadastrados e seu status ativo/inativo |
| Eixos avaliativos | Agrupamento de campos/áreas avaliadas |
| Critérios avaliativos | Itens vinculados a cada modelo/eixo |
| Opções de resposta | Alternativas disponíveis nos critérios |
| Avaliações | Aplicação de um modelo a uma turma |
| Respostas | Respostas dos alunos em cada avaliação |

**Status:** relação conceitual preliminar. Tabelas, chaves e relacionamentos serão validados antes de implementar o banco MySQL.

## 8. Fora do escopo do MVP

- Autenticação, login e recuperação de senhas.
- Perfis e permissões de Professor, Coordenador e Diretor.
- Cadastro e administração de funcionários.
- Gestão de múltiplas instituições.
- Geração, download e histórico de relatórios PDF.
- Dashboards avançados e análises estatísticas complexas.
- Integrações com sistemas externos.

Esses recursos poderão ser considerados em versões futuras, mas **não são requisitos desta primeira entrega**.

## 9. Etapas previstas de desenvolvimento

1. **Consolidação das regras de negócio:** confirmar comportamentos, restrições e fluxos.
2. **Modelagem do MySQL:** definir tabelas, atributos, chaves e integridade referencial.
3. **Detalhamento arquitetural:** validar com a equipe a proposta de camadas, dependências e organização de diretórios frente ao código existente.
4. **Implementação do backend PHP:** operações, validações e persistência.
5. **Implementação do frontend:** páginas e interações com HTML, CSS e JavaScript.
6. **Integração e testes:** verificar todo o fluxo e os cálculos de resultados.

## 10. Resultado esperado

Uma aplicação web executada localmente via **XAMPP**, com persistência de dados em **MySQL**, capaz de demonstrar um processo de avaliação diagnóstica infantil de ponta a ponta: da criação da turma e do modelo ao registro das respostas e à consulta de resultados.

O foco é entregar um **MVP funcional, organizado, testável e adequado ao contexto acadêmico**, sem antecipar a complexidade do sistema completo.

---

**Observação para a equipe:** este é um documento de **planejamento do MVP**. A decisão por **arquitetura em camadas** está registrada; a árvore de pastas, classes, padrões específicos e regras pendentes continuam **propostas para validação**, antes de refatorações ou implementação. Repositório de referência: https://github.com/williamwey-tec/Sistema-Avalicao-Infantil (não inspecionado na elaboração desta estrutura).
