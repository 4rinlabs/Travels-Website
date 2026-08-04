"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface Props {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function DynamicListInput({ label, items, onChange, placeholder }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || `Add ${label.toLowerCase()}...`}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-brand-50 text-brand-600 hover:bg-brand-100 px-4 py-2 rounded-md border border-brand-200 transition-colors flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
              <span className="text-gray-700 text-sm truncate max-w-[90%]">{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Remove item"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
