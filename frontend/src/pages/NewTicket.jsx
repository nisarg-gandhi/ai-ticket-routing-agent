import TicketForm from '../components/TicketForm';

export default function NewTicket() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Ticket</h1>
          <p className="text-gray-500 text-sm mt-1">Submit a new support ticket manually</p>
        </div>
      </div>
      
      <TicketForm />
    </div>
  );
}
