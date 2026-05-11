# DocQuery 🚀

AI-powered document intelligence platform built using **Next.js**, **FastAPI**, **LangChain**, **PostgreSQL**, **PGVector**, **Redis**, and **OpenAI**.

Upload PDFs, chat with documents naturally, perform semantic search, and get contextual AI-powered answers using Retrieval-Augmented Generation (RAG).

---

# ✨ Features

- 📄 PDF Upload & Processing
- 💬 AI Chat with Documents
- 🔍 Semantic Search
- 🧠 Context-Aware Responses
- ⚡ Async Processing with Celery + Redis
- 📦 Vector Embeddings + Retrieval
- 🖥️ Modern SaaS-style UI
- 📱 Fully Responsive Frontend
- 🎨 Beautiful Landing Page
- 🧩 Component-Driven Architecture
- 🚀 Streaming-Ready Chat Architecture

---

# 🏗️ Tech Stack

## Frontend

- Next.js 16
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- React Query

## Backend

- FastAPI
- LangChain
- Celery
- Redis
- PostgreSQL
- PGVector
- ChromaDB

## AI / RAG

- OpenAI Embeddings
- Semantic Retrieval
- Chunking Pipeline
- Vector Search
- Retrieval-Augmented Generation (RAG)

---

# 🧠 System Architecture

```txt
User Upload
    ↓
FastAPI API
    ↓
PostgreSQL (metadata)
    ↓
Redis Queue
    ↓
Celery Worker Pipeline
    ↓
PDF Loading
    ↓
Chunking
    ↓
Embedding Generation
    ↓
Vector Storage (PGVector / ChromaDB)
    ↓
Semantic Retrieval
    ↓
LLM Response Generation
```

---

# ⚙️ Async Processing Pipeline

Instead of blocking the API request during PDF processing, DocQuery uses a distributed task pipeline powered by **Celery + Redis**.

The processing flow is split into chained tasks:

```txt
load_pdf_task
    ↓
create_chunks_task
    ↓
create_embeddings_task
    ↓
set_vector_store_task
```

### Why this architecture?

✅ Better scalability  
✅ Easier debugging  
✅ Progress tracking  
✅ Faster API responses  
✅ Distributed processing support  

---

# 🖥️ Frontend Architecture

The frontend is designed using isolated component boundaries and scalable route groups.

## Structure

```txt
app/
 ├── (marketing)/
 ├── (dashboard)/
 │    ├── dashboard/
 │    ├── documents/
 │    ├── chat/[documentId]/

components/
 ├── landing/
 ├── dashboard/
 ├── chat/
 ├── ui/
```

---

# 🎨 UI Highlights

- Modern AI SaaS aesthetic
- Glassmorphism-inspired UI
- Smooth animations
- Split-view document + chat layout
- Mobile responsive dashboard
- Minimal and scalable design system

---

# 📸 Product Screens

## Landing Page

- Premium SaaS-style landing page
- Animated hero section
- Feature highlights
- Pricing & testimonials

## Dashboard

- Document management
- Upload flow
- Progress tracking
- AI-ready document list

## Chat Interface

- PDF viewer
- Contextual AI chat
- Message streaming architecture
- Semantic retrieval pipeline

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/PriyanshGupta2002/docquery.git
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# 🔥 Run Development Server

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# 🔑 Environment Variables

Create:

```txt
.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 🧩 shadcn/ui Setup

Install required components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add accordion
npx shadcn@latest add sheet
npx shadcn@latest add textarea
npx shadcn@latest add input
npx shadcn@latest add dialog
```

---

# 📈 Current Features

## Completed

- [x] PDF Upload
- [x] Async Processing Pipeline
- [x] AI Chat Interface
- [x] Semantic Search
- [x] Modern Dashboard
- [x] Landing Page
- [x] Responsive UI
- [x] Celery + Redis Integration
- [x] Vector Search
- [x] Component-Driven Frontend

## In Progress

- [ ] Streaming AI Responses
- [ ] Source Citations
- [ ] Multi-document Querying
- [ ] Team Collaboration
- [ ] Authentication
- [ ] Retrieval Evaluation

---

# 🧠 Key Learnings

Building DocQuery taught me that AI products are not just about LLMs.

The real engineering happens in:

- infrastructure
- async systems
- retrieval quality
- frontend UX
- performance
- scalability
- trust & transparency

---

# ⭐ Future Improvements

- Source highlighting in PDFs
- Streaming token responses
- AI-generated summaries
- Shared workspaces
- Role-based access
- Search history
- Team collaboration

---

# 🤝 Contributions

Contributions, suggestions, and feedback are always welcome.

Feel free to fork the repo and open a PR.

---

# 📜 License

MIT License

---

# 👨‍💻 Author

### Priyansh Gupta

Building AI-powered systems & modern full-stack applications.

- GitHub: https://github.com/PriyanshGupta2002
- LinkedIn: https://www.linkedin.com/in/priyansh-gupta-9527ab215/

---

# 🌟 If you like the project

Consider giving the repository a star ⭐