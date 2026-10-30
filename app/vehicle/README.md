# QR de veículo — site estático (GitHub Pages)

Domínio: **https://sistemapontocerto.com.br**

## URL do QR

```
https://sistemapontocerto.com.br/app/vehicle/ABC1234
```

A placa `{plate}` vem na URL. Não existe pasta por placa — o JavaScript lê o path.

## Como funciona no GitHub Pages

| URL | Arquivo servido |
|-----|-----------------|
| `/app/vehicle/ABC1234` | `404.html` (path dinâmico) → `landing.js` extrai a placa |
| `/app/vehicle/` ou `/app/vehicle/index.html` | `app/vehicle/index.html` |

O `404.html` na raiz é **obrigatório** para rotas com placa no path.

## Arquivos

- `landing.js` — lógica compartilhada (placa, redirect Play Store / App Store)
- `index.html` — landing quando acessam `/app/vehicle/` sem placa
- `../../404.html` — entrada para `/app/vehicle/{plate}`

## App Links (já na raiz do repo)

- `/.well-known/assetlinks.json` — SHA-256 já preenchido
- `/.well-known/apple-app-site-association` — Team ID `7G848WTL6N` preenchido
- `/.nojekyll` — sem ele o GitHub Pages ignora a pasta `.well-known` (404)

## Pendente

1. **App Store ID** — em `landing.js`, trocar `APP_STORE` pela URL `https://apps.apple.com/br/app/idXXXXXXXXX` quando o app estiver publicado.
