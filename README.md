# Antes do Robô

Portal de apoio para professores aprenderem e ensinarem pensamento computacional, robótica e BBC micro:bit.

## Requisitos

- Node.js 22
- npm 10 ou superior

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Publicação na Vercel

1. Envie o projeto para um repositório GitHub.
2. Na Vercel, escolha **Add New → Project**.
3. Importe o repositório.
4. Confirme o framework **Next.js**.
5. Use Node.js 22.
6. Mantenha o comando de build padrão: `npm run build`.
7. Publique.

Não é necessário configurar diretório de saída: a Vercel reconhece a pasta `.next` produzida pelo Next.js.
