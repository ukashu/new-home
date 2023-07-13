import React from 'react'

type Props = {
  text: string,
  color?: string
}

export default function PrettyText(props: Props) {
  return (
    <p style={{
      "backgroundImage": `radial-gradient(51.14% 51.14% at 50.23% 62.5%, ${props.color ? props.color : '#9A9A9A'} 0%, #8d8d8d 100%)`,
      "WebkitBackgroundClip": "text",
      "WebkitTextFillColor": "transparent",
      "backgroundClip": "text",
      'cursor': 'default'
    }}>{props.text}
    </p>
  )
}