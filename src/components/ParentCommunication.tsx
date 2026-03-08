'use client';

import { useEffect, useCallback } from 'react';

// Message types for communication between parent and iframe
interface ParentMessage {
  type: string;
  payload?: any;
  source: 'parent' | 'unimock';
}

interface ParentCommunicationProps {
  onMessage?: (message: ParentMessage) => void;
  parentOrigin?: string;
}

export const ParentCommunication: React.FC<ParentCommunicationProps> = ({
  onMessage,
  parentOrigin = 'http://localhost:3000',
}) => {
  // Send message to parent window
  const sendToParent = useCallback(
    (type: string, payload?: any) => {
      if (window.parent && window.parent !== window) {
        const message: ParentMessage = {
          type,
          payload,
          source: 'unimock',
        };
        window.parent.postMessage(message, parentOrigin);
      }
    },
    [parentOrigin]
  );

  // Listen for messages from parent
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin for security
      if (event.origin !== parentOrigin) {
        console.warn(`Rejected message from origin: ${event.origin}`);
        return;
      }

      const message = event.data as ParentMessage;

      // Validate message structure
      if (message && typeof message === 'object' && 'type' in message && 'source' in message) {
        if (message.source === 'parent') {
          console.log('Received message from parent:', message);
          onMessage?.(message);

          // Handle specific message types here
          switch (message.type) {
            case 'ping':
              sendToParent('pong', { received: message.payload });
              break;
            // Add more message handlers as needed
            default:
              break;
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Send ready message to parent
    sendToParent('ready', { timestamp: Date.now() });

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [parentOrigin, onMessage, sendToParent]);

  // This component doesn't render anything visible
  return null;
};

export default ParentCommunication;

