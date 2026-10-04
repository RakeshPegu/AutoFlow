// context/CreateKeyContext.tsx

"use client";

import { createContext, useContext, useState } from "react";

type CreateKeyContextType = {
  formOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const CreateKeyContext = createContext<CreateKeyContextType | undefined>(
  undefined
);

export function CreateKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <CreateKeyContext.Provider
      value={{
        formOpen,
        openForm,
        closeForm,
      }}
    >
      {children}
    </CreateKeyContext.Provider>
  );
}

export function useCreateKey() {
  const context = useContext(CreateKeyContext);

  if (!context) {
    throw new Error(
      "useCreateKey must be used inside CreateKeyProvider"
    );
  }

  return context;
}