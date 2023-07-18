import Tooltip from "~utility/Tooltip"

type Props = {
  websiteURL: string
}

export default function Shortcut(props: Props) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"))
    url.searchParams.set("pageUrl", u)
    url.searchParams.set("size", "26")
    return url.toString()
  }

  return (
    <Tooltip key={props.websiteURL} message={props.websiteURL}>
      <div
        onClick={() => window.open(props.websiteURL, "_self")}
        onMouseDown={(e) => e.button === 1 && window.open(props.websiteURL)}
        className="flex aspect-square h-[70px] cursor-pointer items-center justify-center rounded-lg bg-black text-slate-200">
        <img src={faviconURL(props.websiteURL)} />
      </div>
    </Tooltip>
  )
}
