import Router from "../Router";

export default class NavBar{
    private _list: HTMLElement;

    constructor(target: string){
        this._list = document.querySelector(target);
        if(typeof this._list === "undefined")
            throw new Error("Unable to find NavBar!");
    }

    routeEvent(callback: EventListener){
        this._list.addEventListener("click", callback);
        let title = document.querySelector("#top-nav-title");
        if(title)
            title.addEventListener("click", callback);
    }

    add(router: Router){
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.className = "top-nav-item";
        link.href = router.href;
        link.textContent = router.title;
        item.appendChild(link);
        this._list.appendChild(item);
    }
}