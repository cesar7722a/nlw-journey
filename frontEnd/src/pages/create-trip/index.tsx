import { FormEvent, useState } from "react";
import { InvateGuestsModal } from "./invete-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [destination, setDestination] = useState(``);
  const [ownerName, setOwnerName] = useState(``);
  const [ownerEmail, setOwnerEmail] = useState(``);
  const [eventStartEndDates, setEventStartEndDate] = useState<
    DateRange | undefined
  >();

  const [emailToInvite, setEmailToInvite] = useState([`cesar@gmail.com.ao`]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closedGuestsModal() {
    setIsGuestModalOpen(false);
  }

  function openConformTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closedopenConformTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  async function addNewEmailToInvaite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get(`email`)?.toString();

    if (!email) {
      return;
    }

    if (emailToInvite.includes(email)) {
      return;
    }

    setEmailToInvite([...emailToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailRemove: string) {
    const newEmailList = emailToInvite.filter((e) => e !== emailRemove);
    setEmailToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventStartEndDates?.from || !eventStartEndDates.to) {
      return;
    }

    if (emailToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post(`/trips`, {
      destination,
      starts_at: eventStartEndDates?.from.toISOString(),
      ends_at: eventStartEndDates?.to.toISOString(),
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="max-w-3xl w-full px-6 space-y-10">
        <p className="text-zinc-300 text-lg">
          Convide seus amigos e planeje suas próximas viagem!
        </p>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            isGuestInputOpen={isGuestInputOpen}
            setDestination={setDestination}
            eventStartEndDates={eventStartEndDates}
            setEventStartEndDate={setEventStartEndDate}
          />
          {isGuestInputOpen && (
            <InviteGuestsStep
              emailToInvite={emailToInvite}
              openConformTripModal={openConformTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            politicas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestsModalOpen && (
        <InvateGuestsModal
          emailToInvite={emailToInvite}
          addNewEmailToInvaite={addNewEmailToInvaite}
          closedGuestsModal={closedGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closedopenConformTripModal={closedopenConformTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          eventStartEndDates={eventStartEndDates}
        />
      )}
    </div>
  );
}
