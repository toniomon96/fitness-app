# Omnexus — Developer Wiki

Welcome to the Omnexus engineering wiki. This is the central knowledge base for the development team.

## Quick Links

| Document | Description |
|---|---|
| [Roadmap](Roadmap) | 3-phase product roadmap (v1 → v2 → v3) |
| [Architecture](Architecture) | Tech stack, data flow, key files |
| [Contributing](Contributing) | Branching strategy, PR workflow, commit conventions |
| [Milestones](Milestones) | Current sprint goals and release targets |
| [Release Notes](Release-Notes) | Changelog by version |

## Project Overview

**Omnexus** is an AI-powered fitness coaching app for iOS, Android, and web.

- **Frontend**: React 19, Vite 6, TypeScript 5.7, Tailwind CSS 4, React Router v7
- **Backend**: Vercel serverless functions (Node 20), Anthropic Claude (`claude-sonnet-4-6`)
- **Database**: Supabase (PostgreSQL + pgvector + Realtime + Auth)
- **Native**: Capacitor v8 (iOS + Android)
- **Payments**: Stripe ($12.99/month premium tier)

## Status

- **Live URL**: https://fitness-app-ten-eta.vercel.app
- **Version**: 1.0.0
- **Tests**: 115/115 unit tests passing · Playwright E2E suite
- **Node**: 20.x LTS (pinned via `.nvmrc`)
