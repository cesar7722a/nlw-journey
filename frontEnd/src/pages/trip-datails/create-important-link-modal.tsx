import { Tag, X } from "lucide-react";
import { Button } from "../../components/button";

interface CreateImportantLinkModalProps {
  ClosedCreateImportabtLinkModal: () => void;
}

export function CreateImportantLinkModal({
  ClosedCreateImportabtLinkModal,
}: CreateImportantLinkModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar Atividade</h2>
            <button type="button">
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Todos convidados podem viasualizar as atividades
          </p>
        </div>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a Atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 w-48 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da  atividade"
                className="bg-transparent text-lg placeholder-zinc-400 flex-1 w-48 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="full"
              onClick={ClosedCreateImportabtLinkModal}
            >
              Cancelar
            </Button>
            <Button variant="primary" size="full">
              Criar Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
