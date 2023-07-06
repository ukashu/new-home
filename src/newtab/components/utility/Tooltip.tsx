export default function Tooltip({ message, children }) {
  return (
  <div className="group relative flex">
      {children}
      <span className="absolute z-[1000] left-20 scale-0 transition-all rounded backdrop-blur p-2 text-xs text-white group-hover:scale-100">{message}</span>
  </div>
  )
}