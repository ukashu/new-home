import "~base.css"
import "~style.css"

export default function ShortcutElement(props) {
  function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "30");
    return url.toString();
  }

  return (
    <div className="h-[30px] text-slate-200 flex flex-row">
      <img src={faviconURL(props.name)}/> 
      <p>{props.name}</p>
      <button onClick={props.delete} className=" bg-red-800 p-2 flex items-center justify-center">DELETE</button>
    </div>
  )
}