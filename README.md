# Markdown Viewer - Notion Clone

A secure, Notion-like markdown conversation viewer built with Next.js 15, React 19, TypeScript, and Firebase Authentication.

## Features

- 🔐 **Firebase Authentication** - Secure email/password authentication
- 📝 **Markdown Visualization** - Beautiful rendering of markdown conversations with dialogue, feedback, and summaries
- 🔒 **User Isolation** - Each user can only access their own conversations
- 🎨 **Notion-Inspired UI** - Clean, modern interface similar to Notion
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Server-Side Security** - API routes verify user authentication before serving content
- 🚀 **Auto-Generated Examples** - New users automatically get 4 example conversations to explore

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Authentication:** Firebase Auth
- **Markdown:** react-markdown, remark-gfm, rehype-raw
- **Styling:** CSS with Tailwind directives
- **Metadata Parsing:** gray-matter

## Project Structure

```
speakeasy-react/
├── app/
│   ├── api/
│   │   └── conversations/
│   │       ├── route.ts              # List user's conversations
│   │       └── [id]/route.ts         # Get specific conversation
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx              # Login/Register page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx         # Login form component
│   │   │   ├── RegisterForm.tsx      # Registration form
│   │   │   └── ProtectedRoute.tsx    # Auth guard component
│   │   ├── Chat.tsx
│   │   ├── ConversationList.tsx      # Sidebar conversation list
│   │   ├── ConversationViewer.tsx    # Main content viewer
│   │   └── MarkdownMessage.tsx
│   ├── conversation/
│   │   └── [id]/
│   │       └── page.tsx              # Individual conversation page
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Firebase initialization
│   │   │   └── AuthContext.tsx       # Auth context provider
│   │   └── markdown.ts               # File system utilities
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout with auth provider
│   └── page.tsx                      # Home page (dashboard)
├── conversations/                     # User markdown files directory
│   └── {userId}/
│       └── *.md                      # User's conversation files
├── .env.local.example                # Environment variables template
├── FIREBASE_SETUP.md                 # Firebase setup instructions
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm or yarn
- A Firebase project (see setup guide)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd speakeasy-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   
   Quick summary:
   - Create a Firebase project
   - Enable Email/Password authentication
   - Get your web app credentials
   - Generate a service account key
   - Copy `.env.local.example` to `.env.local` and fill in your credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **Sign up for an account**
   
   Create a new account - you'll automatically get 4 example conversations to explore!

## Usage

### Automatic Example Conversations

When you sign up for a new account, the system automatically creates 4 example conversation files:

1. **Welcome to Your Viewer** - Introduction and features overview
2. **Learning React Hooks** - Technical discussion about React Hooks
3. **Project Planning Session** - Q4 2025 roadmap planning
4. **Debugging Firebase Auth** - Troubleshooting common Firebase issues

These examples demonstrate the conversation format and help you get started immediately!

### Creating Conversations

Conversations are stored as markdown files in the `conversations/{userId}/` directory structure. Each file should have the following format:

```markdown
---
title: Conversation Title
date: 2025-10-18T12:00:00Z
summary: Brief summary of the conversation
feedback: User feedback or notes
---

# Dialogue

## User
User's message here...

## Assistant
Assistant's response here...

## User
Follow-up question...

## Assistant
Follow-up response...
```

### Frontmatter Fields

- `title` - Conversation title (displayed in sidebar)
- `date` - ISO 8601 date string
- `summary` - High-level summary (displayed in summary section)
- `feedback` - User feedback or speaking notes (displayed in feedback section)

The main content after the frontmatter is treated as the dialogue.

### File Naming

Files should be named with `.md` extension. The filename (without extension) becomes the conversation ID:
- `welcome-conversation.md` → ID: `welcome-conversation`
- `2025-10-18-meeting.md` → ID: `2025-10-18-meeting`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Manually Generate Examples for Existing Users

If you want to add example conversations to an existing user:

```bash
# Using ts-node
npx ts-node scripts/generateExamples.ts <userId>

# Or get the userId from Firebase Console → Authentication → Users
```

## Authentication Flow

1. User visits the app
2. If not authenticated, redirected to `/auth/login`
3. User can login or register with email/password
4. **On signup:** Example conversations are automatically generated
5. After authentication, redirected to home page
6. Home page displays user's conversations
7. Clicking a conversation fetches it via API (with auth verification)
8. Logout button clears session and redirects to login

## Security

- **Client-side:** Firebase Auth manages user sessions
- **Server-side:** API routes verify JWT tokens using Firebase Admin SDK
- **Isolation:** Each user can only access files in `conversations/{their-userId}/`
- **Authorization:** Conversation access is verified before serving content

## Customization

### Styling

Edit `app/globals.css` to customize:
- Colors (CSS variables at the top)
- Typography
- Component styles
- Layout dimensions

### Conversation Structure

Modify `app/lib/markdown.ts` to change:
- File directory structure
- Frontmatter parsing
- Conversation data model

### UI Components

Components are in `app/components/`:
- `ConversationList.tsx` - Sidebar list
- `ConversationViewer.tsx` - Main content area
- Auth components in `app/components/auth/`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Docker

**Important:** Ensure all environment variables are configured in your deployment platform.

## Known Limitations

- Markdown files are read from filesystem (not ideal for serverless environments at scale)
- No markdown editing interface (view-only)
- No conversation search/filtering (yet)
- No real-time updates

## Future Enhancements

- [ ] Markdown editing capabilities
- [ ] Cloud storage integration (Firebase Storage/S3)
- [ ] Conversation search and filtering
- [ ] Tags and categories
- [ ] Export conversations
- [ ] Sharing conversations with other users
- [ ] Real-time collaboration
- [ ] Mobile app

## Troubleshooting

See the [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) troubleshooting section for common issues.

## License

ISC

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
