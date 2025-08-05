import { ArrowLeft } from "lucide-react";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center h-full">
      <button className="bg-red-600 text-white p-3 rounded-lg absolute top-1 left-1 hover:opacity-50 cursor-pointer">
        <div className="flex flex-row gap-2 items-center justify-center">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 " />
          <a href="/" className="max-sm:text-sm">
            Homepage
          </a>
        </div>
      </button>

      {children}
    </div>
  );
};

export default authLayout;
