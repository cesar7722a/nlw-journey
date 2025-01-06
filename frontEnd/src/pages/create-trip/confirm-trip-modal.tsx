import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  closedopenConformTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  eventStartEndDates: DateRange | undefined;
  destination: string;
}

export function ConfirmTripModal({
  closedopenConformTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartEndDates,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventStartEndDates && eventStartEndDates.from && eventStartEndDates.to
      ? format(eventStartEndDates.from, "d' de 'LLL")
          .concat(` até `)
          .concat(format(eventStartEndDates.to, "d' de 'LLL"))
      : "Data não Disponível";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={closedopenConformTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              {destination.length != 0 ? destination : "Destino não Disponível"}
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">{displayedDate}</span>{" "}
            preencha seus dados a baixos
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação de viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
