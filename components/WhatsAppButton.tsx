import { MessageCircle } from "lucide-react";

// Replace with the centre's real WhatsApp number (international format, no +)
const WHATSAPP_NUMBER = "20000000000";

export default function WhatsAppButton({
  label = "Chat with us on WhatsApp",
  message = "Hello Egyptos Centre! I'd like to ask about your services.",
}: {
  label?: string;
  message?: string;
}) {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
