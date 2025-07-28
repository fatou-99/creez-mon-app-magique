# Portail Banque - Monorepo

## Project info

**URL**: https://lovable.dev/projects/1cbe8a25-64ce-43cf-98f6-b46ace8a6b98

## Structure du projet

Ce projet utilise Nx et pnpm pour gérer un monorepo avec microservices.

```
├── apps/
│   └── portal/          # Application principale (portail banque)
├── packages/
│   ├── shared-types/    # Types et schémas Zod partagés
│   └── shared-ui/       # Composants UI partagés
└── nx.json              # Configuration Nx
```

## Commandes de développement

### Installation
```bash
# Installer pnpm si pas déjà fait
npm install -g pnpm

# Installer les dépendances
pnpm install
```

### Développement
```bash
# Démarrer le portail principal
pnpm nx dev portal

# Démarrer tous les projets en mode dev
pnpm nx run-many --target=dev --all
```

### Build
```bash
# Build le portail
pnpm nx build portal

# Build tous les packages
pnpm nx run-many --target=build --all
```

### Ajouter des projets
```bash
# Nouveau microservice
pnpm nx generate @nx/react:app nom-du-service

# Nouvelle librairie partagée
pnpm nx generate @nx/react:library nom-de-la-lib --directory=packages
```

## Technologies utilisées

- **Nx**: Monorepo management
- **pnpm**: Package manager  
- **React + Vite**: Frontend
- **TypeScript**: Type safety
- **Zod**: Validation des formulaires
- **shadcn-ui**: Composants UI
- **Tailwind CSS**: Styling

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1cbe8a25-64ce-43cf-98f6-b46ace8a6b98) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
