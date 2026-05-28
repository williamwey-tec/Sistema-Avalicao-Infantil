# AvaliaInfantil

Sistema web para apoio ao registro, acompanhamento e consolidação de avaliações diagnósticas da Educação Infantil.

## Sobre o projeto

O **AvaliaInfantil** é um protótipo de aplicação web desenvolvido com o objetivo de digitalizar o processo de preenchimento, acompanhamento e consulta das avaliações diagnósticas realizadas na Educação Infantil.

A aplicação permite que diferentes perfis de usuários acessem funcionalidades específicas, como o preenchimento de avaliações por professores, o acompanhamento de turmas pela coordenação e direção, além da organização de alunos, turmas e modelos avaliativos.

O projeto foi desenvolvido como parte das atividades acadêmicas da disciplina de **Engenharia de Software III**, com foco na aplicação prática de conceitos de levantamento de requisitos, prototipação, organização de funcionalidades e desenvolvimento front-end.

## Objetivo

O objetivo do sistema é facilitar o registro digital das avaliações diagnósticas infantis, reduzindo o uso de documentos manuais e permitindo maior organização das informações pedagógicas.

A proposta busca apoiar escolas, professores, coordenadores e diretores no acompanhamento do desempenho dos alunos, oferecendo uma interface simples para preenchimento das avaliações e visualização dos resultados consolidados.

## Funcionalidades

- Tela de login com seleção de perfil de usuário;
- Painel inicial com indicadores gerais;
- Consulta de turmas vinculadas ao usuário;
- Registro de avaliações diagnósticas dos alunos;
- Opções de avaliação por item:
  - **A** — Atingido;
  - **EP** — Em Processo;
  - **NA** — Não Atingido;
- Visualização de resultados consolidados;
- Listagem e cadastro de alunos;
- Geração simulada de relatórios em PDF;
- Salvamento simulado de rascunhos;
- Finalização simulada de avaliações;
- Cadastro e visualização de modelos avaliativos;
- Interface adaptada conforme o perfil do usuário.

## Perfis de acesso

A aplicação considera três tipos principais de usuários:

### Professor

O professor acessa suas turmas, consulta seus alunos e realiza o preenchimento das avaliações diagnósticas.

### Coordenador

O coordenador acompanha as avaliações, visualiza dados consolidados, gerencia alunos e acessa os modelos de avaliação.

### Diretor

O diretor acompanha os resultados gerais, consulta informações das turmas e visualiza os dados consolidados da instituição.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando tecnologias básicas de front-end:

- **HTML5**
- **CSS3**
- **JavaScript**

Não há, nesta versão, integração com banco de dados ou back-end. Os dados utilizados na aplicação são simulados diretamente no arquivo JavaScript.

## Estrutura do projeto

```text
Front/
├── index.html
├── style.css
└── script.js
```

### Descrição dos arquivos

- `index.html`: estrutura principal da aplicação;
- `style.css`: estilos visuais, layout, cores, cards, tabelas e responsividade;
- `script.js`: lógica de navegação, dados simulados, controle de perfis, modais e interações da aplicação.

## Status do projeto

Este projeto encontra-se em fase de **protótipo front-end**.

A versão atual tem como foco a apresentação visual e funcional da aplicação, utilizando dados simulados para representar o comportamento esperado do sistema.

## Contexto acadêmico

Este projeto foi desenvolvido como parte de uma proposta de sistema para avaliação diagnóstica infantil, aplicando conceitos de Engenharia de Software, prototipação de interfaces e organização de requisitos funcionais.