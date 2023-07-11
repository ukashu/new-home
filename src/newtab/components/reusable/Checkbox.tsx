import { AiOutlineCheck } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'

export default function Checkbox(props: { state: boolean, onClick: () => void }) {

  return (
    props.state ?
    <div className='h-full aspect-square' onClick={props.onClick}>
      <AiOutlineCheck color='red' size="20" style={{position: "absolute"}}/>
    </div>
    :
    <div className='h-full aspect-square' onClick={props.onClick}>
      <AiOutlineClose color='#4a4a4a' size="20" style={{position: "absolute"}}/>
    </div>
  )
}