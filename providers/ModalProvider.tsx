"use client";

import EditModal from "@/components/EditModal";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { User } from "@prisma/client";

type Props = {
  currentUser?: User | null;
};

const ModalProvider = ({ currentUser }: Props) => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <EditModal currentUser={currentUser} />
    </>
  );
};

export default ModalProvider;
