const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center h-full">
      {children}
    </div>
  )
}

export default authLayout
