
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdAt: string;
  description: string;
}

interface TicketDetailsProps {
  ticket: Ticket;
}

const statusColors = {
  'open': 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  'resolved': 'bg-green-500',
  'closed': 'bg-gray-500'
};

const priorityColors = {
  'low': 'bg-blue-100 text-blue-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-red-100 text-red-800'
};

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ticket #{ticket.id}</span>
          <div className="flex gap-2">
            <Badge className={priorityColors[ticket.priority]}>
              {ticket.priority} Priority ⚡
            </Badge>
            <Badge className={statusColors[ticket.status]}>
              {ticket.status === 'in-progress' ? '🔧' : 
               ticket.status === 'resolved' ? '✅' : 
               ticket.status === 'closed' ? '🔒' : '🔔'} {ticket.status}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{ticket.title}</h3>
            <p className="text-gray-600">{ticket.description}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>👤 Assigned to: {ticket.assignedTo}</span>
            <span>📅 Created: {ticket.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
