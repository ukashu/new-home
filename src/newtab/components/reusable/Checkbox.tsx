import { AiOutlineCheck } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"

export default function Checkbox(props: {
  state: boolean
  onClick: () => void
}) {
  return props.state ? (
    <div className="aspect-square h-full" onClick={props.onClick}>
      <AiOutlineCheck
        color="#e4e4e7"
        size="20"
        style={{ position: "absolute" }}
      />
    </div>
  ) : (
    <div className="aspect-square h-full" onClick={props.onClick}>
      <AiOutlineClose
        color="#4a4a4a"
        size="20"
        style={{ position: "absolute" }}
      />
    </div>
  )
}
