import React from 'react'
import Icons from '~newtab/components/reusable/Icons'

type Props = {
  setIcon: (iconName: string) => void,
  hideModal: () => void
}

export default function IconSelection(props: Props) {
  const icons = ["", "BOOK", "ABLETON", "CALENDAR", "CHAT", "DICE", "HEART", "LIGHTNING", "STOPWATCH", "TROPHY", "TOOLS", "CAMERA", "DUMBBELL", "COMPUTER", "CUSTOMERSERVICE", "PHONE"]

  const renderIcons = () => {
    let iconElements = []
    for (let item in icons) {
      iconElements.push(<div onClick={() => {
        props.setIcon(icons[item])
        props.hideModal()
      }} className="hover:cursor-pointer"><Icons icon={icons[item] as any}/></div>)
    }
    return iconElements
  }

  return (
    <div className="absolute grid grid-cols-4 gap-1 rounded-sm p-1 bg-zinc-200 z-10 overflow-hidden">
      {renderIcons()}
    </div>
  )
}