export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="background-animate relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900  to-slate-800 p-24">
      {children}
    </div>
  )
}
