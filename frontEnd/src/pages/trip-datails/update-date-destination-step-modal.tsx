import { format } from "date-fns";
import { Calendar, MapPin, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface UpdateDestinationModalProps {
  closeUpdateDestination: () => void;
}

export function UpdateDestinationModal({
  closeUpdateDestination,
}: UpdateDestinationModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destination, setDestination] = useState(``);
  const { tripId } = useParams();
  const [eventStartEndDates, setEventStartEndDate] = useState<
    DateRange | undefined
  >();

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeOpenDatePicker() {
    return setIsDatePickerOpen(false);
  }

  async function UpdateDataDesti(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventStartEndDates?.from || !eventStartEndDates.to) {
      return;
    }

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartEndDates?.from.toISOString(),
      ends_at: eventStartEndDates?.to.toISOString(),
    });
    window.document.location.reload();
  }

  const displayedDate =
    eventStartEndDates && eventStartEndDates.from && eventStartEndDates.to
      ? format(eventStartEndDates.from, "d' de 'LLL")
          .concat(` até `)
          .concat(format(eventStartEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar data e local</h2>
            <button type="button">
              <X
                className="size-5 text-zinc-400"
                onClick={closeUpdateDestination}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Editar data e local da viagem
          </p>
        </div>
        <form className="space-y-2" onSubmit={UpdateDataDesti}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <input
              name="titleLink"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 w-full  outline-none"
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>

          <div
            onClick={openDatePicker}
            className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className=" text-lg text-zinc-400 w-48 flex-1">
              {displayedDate || `Quando?`}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="primary" size="full" type="submit">
              Alterar
            </Button>
          </div>
        </form>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>
                  <button type="button" onClick={closeOpenDatePicker}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartEndDates}
                onSelect={setEventStartEndDate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
