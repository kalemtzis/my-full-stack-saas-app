interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex flex-col text-2xl md:text-4xl lg:text-6xl font-light 
                    bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500 
                    bg-clip-text text-transparent text-center">
      {title}
    </div>
  )
}

export default Header
