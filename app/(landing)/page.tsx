'use client'
import { SignInButton, useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const LandingPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) redirect('/dashboard');

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="text-xl">
        Welcome
      </div>

      <SignInButton />
    </div>
  )
}

export default LandingPage
