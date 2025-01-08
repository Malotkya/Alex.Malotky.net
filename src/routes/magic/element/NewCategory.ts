/** /routes/magic/element/NewCategory
 * 
 * @author Alex Malotky
 */
import { createElement as _ } from "@/util/Element";
import CategoryElement from "./Category";

/** New Category Element
 * 
 */
export default class NewCategoryElement extends HTMLElement {
    /** Create New Category
     * 
     * @param {string} name 
     */
    private create(name:string){
        this.parentElement!.insertBefore(new CategoryElement(name), this);
        this.dispatchEvent(new Event("input"));
    }

    /** Connected Callback
     * 
     */
    connectedCallback(){
        this.innerHTML = "";

        const header = document.createElement("h3");

        const input = document.createElement("input");
        input.placeholder = "Category Name";
        header.appendChild(input);

        const btnAdd = _("button", {type: "button"}, "Create Category");
        btnAdd.style.margin = "0 auto";
        btnAdd.style.display = "block";
        btnAdd.addEventListener("click", ()=>{
            this.create(input.value);
            input.value = "";
        }); 

        this.appendChild(header);
        this.appendChild(_("ul",
            _("li", {style: "list-style: none"}, 
                btnAdd
            )
        ));
    }
}

customElements.define("new-category-section", NewCategoryElement, {extends: "section"});