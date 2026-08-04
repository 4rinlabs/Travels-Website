"use client";

import { useState, useRef, useEffect } from "react";
import { Plane, Search } from "lucide-react";
import { airports } from "@/lib/airports";

interface AirportAutocompleteProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  iconRotation?: string;
}

export default function AirportAutocomplete({ id, name, value, onChange, placeholder, iconRotation = "" }: AirportAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal query state with external value if it changes
  useEffect(() => {
    if (value && value !== query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAirports = airports.filter((airport) => {
    const searchStr = query.toLowerCase();
    return (
      airport.city.toLowerCase().includes(searchStr) ||
      airport.code.toLowerCase().includes(searchStr) ||
      airport.name.toLowerCase().includes(searchStr) ||
      airport.country.toLowerCase().includes(searchStr)
    );
  });

  const handleSelect = (airport: typeof airports[0]) => {
    const formattedValue = `${airport.city} (${airport.code})`;
    setQuery(formattedValue);
    onChange(formattedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Plane className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 ${iconRotation}`} />
      <input
        type="text"
        id={id}
        name={name}
        required
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2B67FF]/20 focus:border-[#2B67FF] outline-none transition-all"
        placeholder={placeholder}
        autoComplete="off"
      />

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredAirports.length > 0 ? (
            <ul className="py-2">
              {filteredAirports.map((airport) => (
                <li
                  key={airport.code}
                  onClick={() => handleSelect(airport)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 group-hover:text-[#2B67FF]">
                      {airport.city} <span className="font-normal text-gray-500">({airport.country})</span>
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px] md:max-w-[250px]">
                      {airport.name}
                    </span>
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600 group-hover:bg-[#2B67FF] group-hover:text-white transition-colors">
                    {airport.code}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
              <Search className="w-4 h-4" /> No airports found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
