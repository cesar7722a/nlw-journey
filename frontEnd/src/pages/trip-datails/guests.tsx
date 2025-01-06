import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  nome: string | null;
  email: string;
  is_confirmed: boolean;
}

interface GuestProps {
  openAddConvidadosModal: () => void;
}

export function Guests({ openAddConvidadosModal }: GuestProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {participants.map((participant, index) => (
        <div
          key={participant.id}
          className="flex items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              {participant.nome ?? `Convidado ${index + 1}`}
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              {participant.email}
            </span>
          </div>
          {participant.is_confirmed ? (
            <CheckCircle2 className="text-green-400 size-5 shrink-0" />
          ) : (
            <CircleDashed className="text-zinc-400 size-5 shrink-0" />
          )}
        </div>
      ))}

      <Button variant="secondary" size="full" onClick={openAddConvidadosModal}>
        <UserCog className="size-5" />
        Adicionar Convidado
      </Button>
    </div>
  );
}
