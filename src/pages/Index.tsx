
import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import DataVisualizer from '@/components/DataVisualizer';
import InstructionsAccordion from '@/components/InstructionsAccordion';
import { analyzeQuery, QueryResponse } from '@/services/mockAnalyticsService';
import { Toaster } from '@/components/ui/toaster';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Data Agent. Ask me complex analytical questions about your business data.',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QueryResponse | null>(null);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get response from mock analytics service
      const response = await analyzeQuery(content);
      setCurrentResponse(response);
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error analyzing query:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold text-center">AI Data Agent</h1>
      </header>
      
      <main className="flex flex-1 p-4 gap-4 max-h-[calc(100vh-8rem)] overflow-hidden">
        <div className="flex flex-col w-full lg:w-1/2 border rounded-lg overflow-hidden">
          <div className="border-b p-2 bg-muted/50">
            <h2 className="font-semibold">Chat Interface</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface 
              onSendMessage={handleSendMessage}
              messages={messages}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col w-1/2 border rounded-lg overflow-hidden">
          <div className="border-b p-2 bg-muted/50">
            <h2 className="font-semibold">Data Visualization</h2>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <DataVisualizer data={currentResponse || undefined} />
            
            {!currentResponse && (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ask a question to see data analysis</h3>
                  <p className="text-muted-foreground">
                    Try asking about revenue by region, customer trends, or growth analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile view for visualization */}
      {currentResponse && (
        <div className="lg:hidden p-4 border-t">
          <h2 className="font-semibold mb-2">Data Visualization</h2>
          <DataVisualizer data={currentResponse} />
        </div>
      )}
      
      <footer className="border-t p-4">
        <InstructionsAccordion />
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
