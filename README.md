
# Simulador de Investimentos — Projeção de Juros Compostos

Este é um projeto prático de um microsserviço serverless de cálculo financeiro, desenvolvido com foco em arquiteturas modernas de nuvem, alta escalabilidade, custo zero utilizando o nível gratuito (Free Tier) e facilidade de integração. 

A aplicação realiza simulações exponenciais de rendimentos (juros compostos), utilizando taxas equivalentes mensais calculadas a partir de indicadores reais do mercado financeiro brasileiro (como a taxa Selic e o CDI).

---

## 🏗️ Arquitetura do Sistema

O projeto adota uma arquitetura desacoplada (Client-Server Architecture) composta por duas camadas principais:

1. **Front-end (Cliente):** Uma interface de usuário limpa, responsiva e estática construída utilizando **HTML5**, **CSS3** e **Vanilla JavaScript**. Ela gerencia o estado da aplicação localmente, realiza validações de dados, aplica máscaras dinâmicas de input e consome os serviços da nuvem nativamente via API `fetch()`.
2. **Back-end (Servidor/Nuvem):** Uma função serverless construída em **Node.js (versão 24.x)** hospedada no **AWS Lambda**. O ponto de entrada da aplicação é exposto diretamente na internet utilizando o recurso de **Function URL** da AWS com criptografia HTTPS ativa e políticas de segurança customizadas para controle de acesso.


```
File README.md successfully created.

[ Interface HTML/CSS/JS ] 
         │
         ▼ (Requisição HTTP POST com Payload JSON)
 [ Internet via HTTPS ]
         │
         ▼
 [ AWS Lambda Function URL ] ──► [ Função Node.js (Cálculo Financeiro) ]
                                          │
                                          ▼ (Logs de Execução)
                                  [ Amazon CloudWatch ]

```

---

## 🛠️ Detalhes Técnicos

### Camada de Computação em Nuvem (Back-end)

A lógica central de negócios foi implementada em um ambiente totalmente gerenciado pela AWS (Serverless). A escolha eliminou a necessidade de provisionamento, gerenciamento e manutenção de servidores virtuais (como instâncias EC2), reduzindo o overhead operacional e o custo para zero.

* **Serviço Utilizado:** AWS Lambda
* **Ambiente de Execução (Runtime):** Node.js 24.x
* **Mecanismo de Exposição:** Lambda Function URL (Modo de Invocação: `BUFFERED`)
* **Autenticação:** `NONE` (Acesso público controlado pelas regras internas de CORS)
* **Logs e Monitoramento:** Amazon CloudWatch Logs

#### Algoritmo de Cálculo (Juros Compostos)

A lógica de negócio baseia-se na equação matemática clássica de capitalização exponencial:

$$\ M = C \times (1 + i)^t \$$

Onde:

* $M$ representa o montante final acumulado.
* $C$ representa o capital inicial investido.
* $i$ é a taxa de juros expressa em formato decimal por período.
* $t$ representa o tempo total de investimento em meses.

A função também processa internamente o tratamento de erros em formato JSON e limpa os payloads para garantir integridade matemática de ponto flutuante utilizando `parseFloat()` e operadores nativos do JavaScript como `Math.pow()`.

---

## 🎨 Interface do Usuário (Front-end)

Desenvolvido para ser executado diretamente no navegador do cliente, o front-end consome a API REST assincronamente.

* **UX/UI moderno:** Estilização com conceitos modernos de design de interfaces (*Material Design*), utilizando tipografia limpa, estados de foco dinâmicos (`:focus`), sombras suaves para profundidade (`box-shadow`) e transições fluidas.
* **Máscaras em Tempo Real (Event Driven):** Captura de eventos via `oninput` com expressões regulares (`Regex`) que formatam dinamicamente a digitação do usuário. O capital é formatado instantaneamente no padrão monetário brasileiro (`R$ 0.000,00`) e a taxa exibe automaticamente o percentual (`0,00%`).
* **Tratamento de Payload:** Mecanismos de sanitização que removem os caracteres visuais inseridos pela máscara (`R$`, `.`, `,`, `%`) utilizando substituições por expressões regulares (`.replace(/\\D/g, "")`) antes de despachar a requisição para a nuvem.
* **Gerenciamento de Estados Visuais:** Caixas de alerta assíncronas baseadas em manipulação direta do DOM (`style.display`). Em cenários de sucesso, o resultado é formatado para moeda local através da API nativa do navegador `toLocaleString('pt-BR')`. Em cenários de falha na nuvem ou falta de rede, mensagens amigáveis contendo o erro exato retornado pelo servidor são injetadas dinamicamente na página.

---

## 📅 Metodologia de Gestão de Projeto (Kanban)

Para a concepção, codificação, deploy e entrega deste projeto em um ciclo rápido, foi empregada a metodologia ágil **Kanban**, focada na visualização e otimização do fluxo contínuo de trabalho. O quadro foi estruturado em 4 colunas principais para mapear o progresso do ciclo de vida das tarefas:

1. **Backlog:** Repositório central de demandas futuras (como empacotamento, documentação técnica e submissão final).
2. **Doing (Em Andamento):** Itens sendo ativamente desenvolvidos ou escritos no momento atual.
3. **Review (Revisão/Testes):** Etapa de garantia de qualidade (QA), onde testes integrados de ponta a ponta (E2E) e validações de CORS são executados antes da homologação final.
4. **Done (Concluído):** Tarefas finalizadas com sucesso ao longo da iteração (Levantamento de requisitos, codificação do back-end, provisionamento da infraestrutura cloud, estilização da interface e integração assíncrona).

```text
+-------------------+-------------------+-------------------+-------------------+
|      BACKLOG      |       DOING       |      REVIEW       |       DONE        |
+-------------------+-------------------+-------------------+-------------------+
| [ ] Submissão do  | [ ] Redação da    | [ ] Testes de     | [x] Requisitos    |
|     Projeto       |     Documentação  |     CORS e E2E    | [x] Lógica Node.js|
|                   |                   |                   | [x] Infra AWS     |
|                   |                   |                   | [x] Layout HTML   |
|                   |                   |                   | [x] Fetch e API   |
+-------------------+-------------------+-------------------+-------------------+

```

---
