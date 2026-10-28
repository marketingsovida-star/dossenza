import {MessageCircle} from "lucide-react";
import {PHARMA_WHATSAPP_BRAND,PHARMA_WHATSAPP_URL} from "@/lib/pharma-whatsapp";
export default function PharmaWhatsAppButton(){return <a href={PHARMA_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Fale com a ${PHARMA_WHATSAPP_BRAND} Pharma pelo WhatsApp`} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-110"><MessageCircle className="h-7 w-7" aria-hidden="true" /></a>;}
