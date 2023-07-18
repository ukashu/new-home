import React from "react"
import Icons from "~newtab/components/reusable/Icons"

type Props = {
  setIcon: (iconName: string) => void
  hideModal: () => void
}

export default function IconSelection(props: Props) {
  const icons = [
    "",
    "BOOK",
    "ABLETON",
    "MONEY",
    "CHAT",
    "DICE",
    "HEART",
    "LIGHTNING",
    "STOPWATCH",
    "TROPHY",
    "TOOLS",
    "CAMERA",
    "DUMBBELL",
    "COMPUTER",
    "CUSTOMERSERVICE",
    "PHONE"
  ]

  const renderIcons = () => {
    let iconElements = []
    for (let item in icons) {
      iconElements.push(
        <div
          key={icons[item]}
          onClick={() => {
            props.setIcon(icons[item])
            props.hideModal()
          }}
          className="hover:cursor-pointer">
          <Icons icon={icons[item] as any} />
        </div>
      )
    }
    return iconElements
  }

  return (
    <>
      <div
        className="absolute left-0 top-0 z-10 h-full w-full backdrop-blur-sm"
        onClick={props.hideModal}></div>
      <div className="absolute z-20 grid grid-cols-4 gap-1 overflow-hidden rounded-sm bg-zinc-200 p-1">
        {renderIcons()}
      </div>
    </>
  )
}
