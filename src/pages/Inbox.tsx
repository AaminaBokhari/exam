import React, { useState } from 'react';
import { Search, Star, Inbox as InboxIcon, Send, Archive, Trash2 } from 'lucide-react';

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const mockEmails: Email[] = [
  {
    id: 1,
    from: 'Supplier Co.',
    subject: 'Re: Stock Update Required',
    preview: 'We noticed your inventory for iPhone 9 is running low...',
    date: '2024-03-15',
    read: false,
    starred: true
  },
  // Add more mock emails
];

export default function Inbox() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const toggleStar = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, starred: !email.starred } : email
    ));
  };

  const markAsRead = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white rounded-xl shadow-sm p-4">
          <button className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Compose
          </button>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg">
              <InboxIcon className="w-5 h-5" />
              <span>Inbox</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Star className="w-5 h-5" />
              <span>Starred</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Send className="w-5 h-5" />
              <span>Sent</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Archive className="w-5 h-5" />
              <span>Archive</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Trash2 className="w-5 h-5" />
              <span>Trash</span>
            </a>
          </nav>
        </div>

        <div className="col-span-2 bg-white rounded-xl shadow-sm">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => {
                setSelectedEmail(email);
                markAsRead(email.id);
              }}
              className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                !email.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className={`p-1 rounded-full hover:bg-gray-100 ${
                    email.starred ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <h3 className={`font-medium ${!email.read ? 'text-blue-600' : ''}`}>
                    {email.subject}
                  </h3>
                  <p className="text-sm text-gray-600">{email.from}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{email.preview}</p>
                </div>
                <span className="text-sm text-gray-500">{email.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}