/** App/Havbar/Html.ts
 * 
 * Contains functions to create HTMLELements
 * 
 * @author Alex Malotky
 */

/** Create Hamberget Button
 * 
 * @returns {HTMLElement}
 */
export function createHambergerButton(): HTMLElement{
    const button = document.createElement("button");
    button.id = "top-nav-button";

    for(let i=0; i<3; i++){
        button.appendChild(document.createElement("div"));
    }

    return button;
}

/** Create Menu List
 * 
 * @returns {HTMLElement}
 */
export function createMenuList(): HTMLElement{
    const list = document.createElement("ul");
    list.id = "top-nav-menu";
    return list;
}

/** Create Navigation Title
 * 
 * @param {string} title 
 * @returns {HTMLElement}
 */
export function createNavTitle(title: string): HTMLElement{
    const link = document.createElement("a");
    link.textContent = title;
    link.id = "top-nav-title";
    link.className = "top-nav-item";
    link.href = "/";
    return link;
}