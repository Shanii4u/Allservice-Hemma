import React from 'react';
import Image from 'next/image';
import { Search } from './Search';

interface HeaderProps {
  onSearch: (query: string) => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">BookLUX</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <Search
          placeholder="Search booking or customer"
          onSearch={onSearch}
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="en">EN</option>
          <option value="sv">SV</option>
        </select>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}; 