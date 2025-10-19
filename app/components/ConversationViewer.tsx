'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ConversationDetail {
  id: string;
  title: string;
  date: string;
  dialogue: string;
  feedback: string;
  summary: string;
  userId: string;
}

interface ConversationViewerProps {
  conversationId: string;
}

export default function ConversationViewer({ conversationId }: ConversationViewerProps) {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !conversationId) return;

    const fetchConversation = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/conversations/${conversationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch conversation');
        }

        const data = await response.json();
        setConversation(data.conversation);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [user, conversationId]);

  if (loading) {
    return (
      <div className="conversation-viewer loading">
        <div className="loading-spinner"></div>
        <p>Loading conversation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="conversation-viewer error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="conversation-viewer not-found">
        <h2>Conversation Not Found</h2>
        <p>The requested conversation does not exist or you don't have access to it.</p>
      </div>
    );
  }

  return (
    <div className="conversation-viewer">
      <header className="conversation-header">
        <h1>{conversation.title}</h1>
        <time>{new Date(conversation.date).toLocaleDateString()}</time>
      </header>

      {conversation.summary && (
        <section className="conversation-section summary">
          <h2>Summary</h2>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {conversation.summary}
            </ReactMarkdown>
          </div>
        </section>
      )}

      <section className="conversation-section dialogue">
        <h2>Dialogue</h2>
        <div className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {conversation.dialogue}
          </ReactMarkdown>
        </div>
      </section>

      {conversation.feedback && (
        <section className="conversation-section feedback">
          <h2>Feedback</h2>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {conversation.feedback}
            </ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}
