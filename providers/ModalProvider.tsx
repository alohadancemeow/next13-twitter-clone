"use client";

import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

type Props = {};

const ModalProvider = (props: Props) => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default ModalProvider;
