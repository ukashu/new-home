import Tooltip from "~utility/Tooltip"

type Props = {
  websiteURL: string,
}

export default function Shortcut(props: Props) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "30");
    return url.toString();
  }

  return (
    <Tooltip key={props.websiteURL} message={props.websiteURL}>
      <div onClick={() => window.open(props.websiteURL, '_self')} onMouseDown={e => (e.button === 1) && window.open(props.websiteURL)} className="h-[80px] aspect-square text-slate-200 bg-black flex items-center justify-center rounded-lg cursor-pointer">
      <img src={faviconURL(props.websiteURL)}/>
      </div>
    </Tooltip>
  )
}