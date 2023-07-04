

export default function Tick(props: { state: boolean, onClick: () => void }) {

  return (
    props.state ?
    
    <div className="h-[calc(100%-4px)] m-1 aspect-square flex justify-center" onClick={() => props.onClick()}>
      <svg viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.87498 10.175L2.19998 6.49999L0.974976 7.72499L5.87498 12.625L16.375 2.12499L15.15 0.899994L5.87498 10.175Z" fill="white"/>
      </svg>
    </div>
    :
    <div className="h-[calc(100%-4px)] m-1 aspect-square flex justify-center" onClick={() => props.onClick()}>
      <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.625 1.60875L11.3913 0.375L6.5 5.26625L1.60875 0.375L0.375 1.60875L5.26625 6.5L0.375 11.3913L1.60875 12.625L6.5 7.73375L11.3913 12.625L12.625 11.3913L7.73375 6.5L12.625 1.60875Z" fill="#606060"/>
      </svg>
    </div>

  )
}