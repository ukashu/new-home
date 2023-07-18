import { SiAbletonlive } from 'react-icons/si'
import {
  BsFillCalendarCheckFill,
  BsFillChatRightDotsFill,
  BsFillDice2Fill, 
  BsFillHeartPulseFill, 
  BsFillLightningFill, 
  BsFillStopwatchFill, 
  BsFillTrophyFill, 
  BsCameraReelsFill, 
  BsTools } from 'react-icons/bs'
import { FaBook, FaDumbbell } from 'react-icons/fa'
import { AiFillCustomerService, AiFillPhone } from 'react-icons/ai'
import { RiComputerFill, RiMoneyEuroBoxFill } from 'react-icons/ri'
import React from 'react'

type Props = {
  name?: string,
  icon: string
}

export default function Icons(props: Props) {

  switch (props.icon) {
    case 'BOOK':
      return (<FaBook size="2em" color="black"/>)
    case "ABLETON":
      return (<SiAbletonlive size="2em" color="black"/>)
    case "MONEY":
      return (<RiMoneyEuroBoxFill size="2em" color="black"/>)
    case "CHAT":
      return (<BsFillChatRightDotsFill size="2em" color="black"/>)
    case "DICE":
      return (<BsFillDice2Fill size="2em" color="black"/>)
    case "HEART":
      return (<BsFillHeartPulseFill size="2em" color="black"/>)
    case "LIGHTNING":
      return (<BsFillLightningFill size="2em" color="black"/>)
    case "STOPWATCH":
      return (<BsFillStopwatchFill size="2em" color="black"/>)
    case "TROPHY":
      return (<BsFillTrophyFill size="2em" color="black"/>)
    case "TOOLS":
      return (<BsTools size="2em" color="black"/>)
    case "CAMERA":
      return (<BsCameraReelsFill size="2em" color="black"/>)
    case "DUMBBELL":
      return (<FaDumbbell size="2em" color="black"/>)
    case "COMPUTER":
      return (<RiComputerFill size="2em" color="black"/>)
    case "CUSTOMERSERVICE":
      return (<AiFillCustomerService size="2em" color="black"/>)
    case "PHONE":
      return (<AiFillPhone size="2em" color="black"/>)
    default:
      return (<BsFillCalendarCheckFill size="2em" color="black"/>)
  }
}