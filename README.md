# App

GymPass style aoo.

# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [] Dever ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Dever ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

-[x] O usuário não deve poder se cadastras com um email duplicado;
-[] O usuário não pode fazer 2 check-ins no mesmo dia;
-[] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
-[] O check-in só pode ser validado até 20 minutos após ser criado;
-[] O check-in só pode ser validado por administradores;
-[] A academia só pode ser cadastrada por administradores;

## RFNs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT(JSON WebToken);