"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Avatar from "./Avatar";
import Button from "./Button";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  currentUser?: User | null;
}

interface FormProps extends Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  currentUser,
}) => {
  const registerModal = useRegisterModal();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();
  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comment/${postId}` : "/api/posts";
      await axios.post(url, { body });

      router.refresh();
      toast.success("Tweet created");
      setBody("");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar user={currentUser} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="flex flex-row justify-end mt-4">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label={isComment ? "Reply" : "Tweet"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-2xl font-bold text-center text-white">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
