import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activuty-modal";
import { ImportantLink } from "./important-links";
import { Guests } from "./guests";
import { Activity } from "./activity";
import { DestinectionAndDateHeader } from "./destinetion-and-date-header";


export function TripDetailsPage() {

  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false)

  function openCreateActivityModal() {

    setIsCreateActivityModal(true)

  }

  function closeCreateActivityModal() {

    setIsCreateActivityModal(false)

  }


  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

      <DestinectionAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividade</h2>
            <button onClick={openCreateActivityModal}
              className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar Atividade
            </button>
          </div>

          <Activity />
        </div>


        <div className="w-80 space-y-6">
          <ImportantLink />

          <div className="w-full h-px bg-zinc-800" />
          <Guests />

        </div>

      </main>

      {
        isCreateActivityModal && (
          <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
        )
      }

    </div>
  )
}