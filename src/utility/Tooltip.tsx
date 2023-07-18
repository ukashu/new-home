export default function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute left-20 z-[1000] scale-0 rounded p-2 text-xs text-white backdrop-blur transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  )
}
