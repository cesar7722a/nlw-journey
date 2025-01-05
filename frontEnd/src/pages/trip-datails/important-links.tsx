import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

interface ImportantLinkProps {
  OpenCreateImportabtLinkModal: () => void;
}

export function ImportantLink({
  OpenCreateImportabtLinkModal,
}: ImportantLinkProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/18470001174y437848748y487438734t7843t48t484t843t478
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/18470001174y437848748y487438734t7843t48t484t843t478
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button
        variant="secondary"
        size="full"
        onClick={OpenCreateImportabtLinkModal}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
