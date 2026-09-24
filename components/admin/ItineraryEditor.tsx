"use client";

import { useState } from "react";
import { ItineraryDay } from "@/lib/types";
import { ChevronDown, ChevronUp, GripVertical, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";
import DynamicListInput from "./DynamicListInput";
import ImageGalleryUpload from "./ImageGalleryUpload";

interface Props {
  items: (string | ItineraryDay)[];
  onChange: (items: ItineraryDay[]) => void;
}

export default function ItineraryEditor({ items, onChange }: Props) {
  // Normalize items on load
  const normalizedItems: ItineraryDay[] = (items || []).map((item, idx) => {
    if (typeof item === "string") {
      return {
        id: `day-${Date.now()}-${idx}`,
        title: "",
        description: item,
        activities: [],
        images: [],
        note: ""
      };
    }
    return { ...item, id: item.id || `day-${Date.now()}-${idx}` };
  });

  const [expandedDayId, setExpandedDayId] = useState<string | null>(
    normalizedItems.length > 0 ? normalizedItems[0].id || null : null
  );

  const handleUpdateDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const newItems = [...normalizedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange(newItems);
  };

  const handleAddDay = () => {
    const newDay: ItineraryDay = {
      id: `day-${Date.now()}`,
      title: "",
      description: "",
      activities: [],
      images: [],
      note: ""
    };
    onChange([...normalizedItems, newDay]);
    setExpandedDayId(newDay.id!);
  };

  const handleRemoveDay = (index: number) => {
    if (confirm("Are you sure you want to remove this day?")) {
      const newItems = [...normalizedItems];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...normalizedItems];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    onChange(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === normalizedItems.length - 1) return;
    const newItems = [...normalizedItems];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {normalizedItems.map((day, index) => {
        const isExpanded = expandedDayId === day.id;
        
        return (
          <div key={day.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            {/* Header (Accordion Toggle) */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedDayId(isExpanded ? null : day.id!)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                <h4 className="font-semibold text-gray-900">Day {index + 1} {day.title ? `— ${day.title}` : ""}</h4>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }}
                  disabled={index === 0}
                  className="p-1.5 text-gray-500 hover:text-brand-600 disabled:opacity-30 transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }}
                  disabled={index === normalizedItems.length - 1}
                  className="p-1.5 text-gray-500 hover:text-brand-600 disabled:opacity-30 transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveDay(index); }}
                  className="p-1.5 text-gray-500 hover:text-red-600 transition-colors ml-2"
                  title="Delete Day"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="p-5 border-t border-gray-200 space-y-6">
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day Title</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleUpdateDay(index, "title", e.target.value)}
                      placeholder="e.g. Arrival & Night City Tour"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={day.description}
                      onChange={(e) => handleUpdateDay(index, "description", e.target.value)}
                      placeholder="Detailed description of the day's events..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <DynamicListInput
                      label="Activities"
                      items={day.activities || []}
                      onChange={(items) => handleUpdateDay(index, "activities", items)}
                      placeholder="e.g. Airport pickup and breakfast stop"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <ImageGalleryUpload
                      label="Photos for this Day"
                      items={day.images || []}
                      onChange={(items) => handleUpdateDay(index, "images", items)}
                      bucketName="packages"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                    <input
                      type="text"
                      value={day.note || ""}
                      onChange={(e) => handleUpdateDay(index, "note", e.target.value)}
                      placeholder="e.g. Petronas Twin Tower is a photo stop."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500 bg-green-50"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleAddDay}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-brand-500 hover:text-brand-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Day
      </button>
    </div>
  );
}
