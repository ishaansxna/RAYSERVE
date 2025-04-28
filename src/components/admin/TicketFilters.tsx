
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketFiltersProps {
  onFilterChange: (type: string, value: string) => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <Select onValueChange={(value) => onFilterChange('status', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status 🔍" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tickets 📋</SelectItem>
          <SelectItem value="open">Open 🔔</SelectItem>
          <SelectItem value="in-progress">In Progress 🔧</SelectItem>
          <SelectItem value="resolved">Resolved ✅</SelectItem>
          <SelectItem value="closed">Closed 🔒</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('priority', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Priority ⚡" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities 📋</SelectItem>
          <SelectItem value="high">High Priority 🔴</SelectItem>
          <SelectItem value="medium">Medium Priority 🟡</SelectItem>
          <SelectItem value="low">Low Priority 🔵</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
