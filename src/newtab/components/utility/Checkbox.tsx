export default function Checkbox(props: { state: boolean, onClick: () => void }) {

  return (
    props.state ?
    <div className='h-full aspect-square rounded-lg bg-red-600' onClick={props.onClick}>
    </div>
    :
    <div className='h-full aspect-square rounded-lg bg-slate-200' onClick={() => props.onClick()}></div>
  )
}