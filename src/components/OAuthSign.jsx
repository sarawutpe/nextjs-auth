import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function OAuthSign() {
  return (
    <>
      <button
        className="flex items-center w-full mb-3 px-4 h-[52px] border border-slate-300 rounded-md transition-shadow duration-200 hover:shadow-[inset_0_0_0_150px_rgba(0,0,0,.1)]"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <div className="w-14">
          <Image
            src="/google.svg"
            width={20}
            height={20}
            alt="google provider"
          />
        </div>
        <span>Continue with Google</span>
      </button>
      <button
        className="flex items-center w-full mb-3 px-4 h-[52px] border border-slate-300 rounded-md transition-shadow duration-200 hover:shadow-[inset_0_0_0_150px_rgba(0,0,0,.1)]"
        onClick={() => signIn("azure-ad", { callbackUrl: "/dashboard" })}
      >
        <div className="w-14">
          <Image src="/azure.svg" width={20} height={20} alt="azure provider" />
        </div>
        <span>Continue with Microsoft</span>
      </button>
      <button
        className="flex items-center w-full mb-3 px-4 h-[52px] border border-slate-300 rounded-md transition-shadow duration-200 hover:shadow-[inset_0_0_0_150px_rgba(0,0,0,.1)]"
        onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
      >
        <div className="w-14">
          <Image src="/apple.svg" width={20} height={20} alt="apple provider" />
        </div>
        <span>Continue with Apple</span>
      </button>
    </>
  );
}
