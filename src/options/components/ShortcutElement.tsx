import "~base.css"
import "~style.css"

export default function ShortcutElement(props) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"))
    url.searchParams.set("pageUrl", u)
    url.searchParams.set("size", "30")
    return url.toString()
  }

  return (
    <div className="flex h-[30px] w-full flex-row items-center justify-between text-slate-200">
      <img src={faviconURL(props.name)} />
      <p>{props.name}</p>
      <button
        onClick={props.delete}
        className=" flex items-center justify-center bg-red-800 p-2">
        DELETE
      </button>
    </div>
  )
}
