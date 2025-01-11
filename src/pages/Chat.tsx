import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'John Supplier',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
    lastMessage: 'I can help with that stock issue',
    online: true
  },
  // Add more mock contacts
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Hi, I noticed we're running low on iPhone stock",
    sender: 'user',
    timestamp: '10:00 AM'
  },
  {
    id: 2,
    text: "Yes, I can help with that. How many units do you need?",
    sender: 'other',
    timestamp: '10:02 AM'
  },
  // Add more mock messages
];

export default function Chat() {
  const [contacts] = useState<Contact[]>(mockContacts);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 h-[calc(100vh-8rem)]">
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex flex-col">
            {selectedContact && (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedContact.avatar}
                      alt={selectedContact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="font-medium">{selectedContact.name}</h2>
                      <p className="text-sm text-gray-500">
                        {selectedContact.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={sendMessage} className="p-4 border-t">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}