# 📚 Book Catalog Manager

Uma aplicação moderna de gerenciamento de biblioteca pessoal, desenvolvida para demonstrar proficiência em **React**, **TypeScript** e integração com **APIs REST**.

## 🚀 Tecnologias

Este projeto utiliza as ferramentas mais atuais do ecossistema Frontend:

* **React 18** (Vite como Build Tool)
* **TypeScript** (Tipagem estrita e interfaces)
* **Tailwind CSS v4** (Estilização via CSS-first engine)
* **Axios** (Consumo de API e interceptação de dados)
* **Lucide React** (Ícones)
* **CrudCrud API** (Persistência de dados em nuvem)

## ✨ Funcionalidades

* **CRUD Completo:** Listagem, Criação, Edição de status e Exclusão de livros.
* **Dashboard de Estatísticas:** Cálculo em tempo real de livros lidos e pendentes utilizando o método `.reduce()`.
* **Filtro Inteligente:** Busca dinâmica por título ou autor através de estado computado.
* **Interface Responsiva:** Design otimizado para dispositivos móveis e desktop.
* **Persistência:** Sincronização automática com banco de dados remoto.

## 🛠️ Instalação e Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/Li-code1/meu-catalogo-livros.git

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure a API:**
* Acesse [crudcrud.com](https://crudcrud.com).
* Copie sua URL única.
* No arquivo `src/App.tsx`, substitua a constante `API_URL` pela sua URL.


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```



## 🏗️ Estrutura de Arquivos

```text
src/
 ├── components/       # Componentes reutilizáveis (Form, List, Stats)
 ├── types.ts          # Definições de interfaces TypeScript
 ├── App.tsx           # Lógica principal e gerenciamento de estado
 ├── main.tsx          # Ponto de entrada da aplicação
 └── index.css         # Configuração Tailwind v4

```

## 🧠 Conceitos Aplicados

* **State Lifting:** Elevação de estado para o componente pai para sincronizar componentes irmãos.
* **Type-Only Imports:** Uso de `import type` para otimização de bundle conforme as regras de sintaxe modernas do TS.
* **Imutabilidade:** Manipulação de arrays e objetos utilizando `map`, `filter` e `spread operator` para garantir ciclos de renderização corretos no React.
* **Async/Await:** Tratamento de promessas e erros em requisições assíncronas.
*  O projeto utiliza Axios para integração com a API CrudCrud. Para contornar a expiração de 24h da API, implementei uma estratégia de Persistence Fallback com LocalStorage, garantindo que a aplicação permaneça 100% funcional mesmo em caso de falha na comunicação com o servidor externo.

---

### 📝 Licença

Este projeto foi desenvolvido para fins de estudo e prática. Sinta-se à vontade para clonar e evoluir!

---
