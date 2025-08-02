'use client'
import { SignInButton, useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const LandingPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) redirect('/dashboard');

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">
        Welcome
      </div>

      <SignInButton />
    </div>
  )
}

export default LandingPage
