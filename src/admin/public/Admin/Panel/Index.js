import PanelBase from './PanelBase.js';

let Index = function(target){
    PanelBase.call(this, "Index", target);
    Object.setPrototypeOf(this, PanelBase.prototype);

    let textarea = document.createElement("textarea");
    let submit = document.createElement("button");

    submit.innerText = "Submit";
    submit.addEventListener("click", ()=>{
        this.commit(textarea.value);
    });

    this.html.appendChild(textarea);
    this.html.appendChild(submit);
};

Index.prototype.commit = function(string) {
    console.log(string);
};

export default Index;
