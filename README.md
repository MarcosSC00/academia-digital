# Academia-Digital 💪

Este é um projeto fullstack desenvolvido utilizando **Spring Boot**  no [backend]() e **ReactJS** no [frontend](). O objetivo do projeto é fornecer uma aplicação completa com uma **API RESTful** e uma interface de usuário moderna e responsiva, para o sistema de cadastro de uma academia.

## Design ✨

| ![](/ad-frontend/public/desktop-academia-photo.png) | ![](/ad-frontend/public/mobile-academia-photo.png) |
| --- | --- |

## Tecnologias Utilizadas 🛠️

| **Backend** | **Frontend** |
| --- | --- |
| Spring Boot | ReactJs |
| Spring Data JPA | React Router |
| H2 Data Base | Gerenciamento de estado. |
| Gradle | TailwindCss |
| Java 17 | Java Script |

## Funcionalidades Principais ⚙️

O sistema disponibiliza ao usuário as funções de um sistema CRUD, com as devidas regras de negócio, para as seguintes entidades relacionadas: `Aluno`, `Aula`, `Instrutor` e `AvaliacaoFisica`, veja nos diagramas a seguir:

## Diagrama de Classes

```mermaid
  classDiagram
    class Aluno {
        +String nome
        +Date dataDeNascimento
        +String telefone
        +String endereco
        +List~AvaliacaoFisica~ avaliacoesFisicas
        +List~Aula~ aulas
    }
    class AvaliacaoFisica {
        +Date dataDaAvaliacao
        +Double peso
        +Double altura
    }
    class Aula {
        +String nome
        +Date horario
        +String instrutor
    }
    class Instrutor {
        +String nome
        +String telefone
        +String email
        +List~String~ especialidades
        +List~Aula~ aulas
    }
    Aluno *-- AvaliacaoFisica : "avaliacoesFisicas"
    Aluno *-- Aula : "aulas"
    Aula --> Instrutor : "instrutor"

```

## Diagrama ORM

```mermaid
erDiagram
	ALUNO ||--|{ AVALIACAOFISICA : "avaliacao"
	ALUNO ||--|{ AULA : "aulas"
	AULA }|--|| INSTRUTOR : "aulas-instrutor"
```

## Contatos 📞

Caso tenha alguma sugestão sinta-se à vontade para contribuir com este projeto ou me contatar.
 - **email:** msilvachaves02@gmail.com
 - **celular:** (98) 98248-8698
