# Prompt de execução — Landing page Auréa

Use a skill **Landing Page** e suas referências canônicas: `01_MASTER_MODERN_WEB_EXPERIENCE.md`, `02_PREMIUM_LANDING_PAGE.md`, `14_CONVERSION_FOCUSED_PAGE.md` e `QA_CHECKLIST.md`.

## Tarefa

Criar e implementar uma landing page demonstrativa, premium e de alta conversão para **Auréa**, uma marca fictícia brasileira de medicina estética facial. A página deve ser imersiva, atual, editorial e memorável, com motion abundante porém coordenado. Toda a copy visível deve estar em português brasileiro.

## Estratégia

- Público: mulheres adultas que desejam suavizar sinais e melhorar a qualidade da pele sem perder a naturalidade da expressão.
- Oferta: avaliação estética individual para toxina botulínica, bioestimuladores, preenchimento facial e protocolos de skin quality.
- Proposta de valor: precisão clínica, escuta e naturalidade; valorizar sem uniformizar.
- Conversão única: **Agendar avaliação**, levando ao formulário real capturado pelo Netlify Forms.
- Objeções: medo de aparência artificial, dúvida sobre indicação, segurança, excesso de procedimentos e pressão comercial.
- Evidência: transparência de processo e avaliação individual. Não inventar depoimentos, títulos, números, certificações, endereços, profissionais ou resultados.

## Referência visual

Use o print fornecido apenas como referência de atmosfera: marfim, rosa sofisticado, tipografia editorial, profissional em consultório, organização clara dos tratamentos e convite para consulta. Não copie a marca, a profissional, o logotipo, o texto, o layout ou a composição exata.

Direção própria da Auréa:

- conceito: **expressão preservada sob uma luz precisa**;
- paleta: marfim `#F4EEE9`, papel `#FBF8F4`, ameixa `#5D2837`, rosa mineral `#BD7880`, concha `#E6C9C5`, tinta `#2B2020`;
- tipografia: Italiana para títulos e DM Sans para leitura;
- composição: editorial assimétrica, bordas finas, grande escala tipográfica, retrato fotográfico original e diagrama facial linear;
- evitar estética de spa genérico, dourado excessivo, cartões repetitivos, glassmorphism, gradientes de startup e depoimentos falsos.

## Motion

Crie uma gramática coerente de movimento:

1. hero com reveal por máscara da fotografia e entrada cinética das linhas do título;
2. parallax sutil da fotografia, sem scroll-jacking;
3. faixa editorial contínua;
4. blocos de tratamento revelados em sequência com pequena rotação e profundidade;
5. tipografia orbital ligada ao scroll no manifesto;
6. microinterações táteis em links, cards, FAQ e CTA;
7. intensidade reduzida no mobile e fallback completo para `prefers-reduced-motion`.

Use GSAP/ScrollTrigger somente nas sequências que exigem timeline e sincronização com scroll. Use CSS para feedbacks simples. Não anime o CTA continuamente.

## Arquitetura narrativa

1. aviso transparente de projeto demonstrativo;
2. hero com promessa, explicação, CTA e sinal de confiança;
3. faixa de posicionamento;
4. tratamentos com linguagem responsável;
5. manifesto visual sobre naturalidade e precisão;
6. jornada: escuta, plano individual e acompanhamento;
7. FAQ de objeções;
8. formulário de solicitação de avaliação;
9. rodapé com disclaimer de marca fictícia.

## Engenharia e qualidade

- React, TypeScript e Vite;
- HTML semântico, navegação por teclado, foco visível, labels persistentes e contraste adequado;
- responsivo em 360px, 768px, 1280px e telas largas;
- mídia com dimensões estáveis, sem overflow horizontal e sem layout shift evitável;
- SEO e Open Graph sem canonical fictícia;
- Netlify Forms com estados reais; não simular backend;
- executar build e lint; revisar visualmente desktop e mobile;
- publicar no Netlify e criar repositório GitHub somente porque isso foi expressamente autorizado pela usuária.

Implemente a página completa. Não entregue apenas wireframe ou plano. Se algum elemento ainda parecer template, redesenhe antes de concluir.
