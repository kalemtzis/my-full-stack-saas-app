import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto sm:px-10 px-5">
          <Link href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            aiPower
          </Link>

          <SignedIn>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center justify-center space-x-4">
              <Link href='/sign-up' className="nav-btn">
                <span className="text-white font-bold">Sign Up</span>
              </Link>
              <Link href="/sign-in" className="nav-btn">
                <span className="text-white font-bold">Log In</span>
              </Link>
            </div>
          </SignedOut>

          {/* Add some navigation links (e.g. Home, Contant...) */}
        </div>
      </div>
    </header>
  )
}

export default Navbar;