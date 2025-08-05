import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <span className="text-xl">Welcome</span>
      <SignedIn>
        <button className="bg-red-600 text-white rounded-lg p-2 text-sm font-semibold text-center cursor-pointer">
          <a href="/dashboard">Dashboard</a>
        </button>
      </SignedIn>
      <SignedOut>
        <button className="bg-red-600 text-white rounded-lg p-2 text-sm font-semibold text-center cursor-pointer">
          <a href="/sign-up">Sign In</a>
        </button>
      </SignedOut>
    </div>
  );
};

export default LandingPage;
