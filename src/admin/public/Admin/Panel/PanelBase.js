const PanelBase = function(url, target){
    this.html = document.createElement("div");

    this.button = document.createElement("button");
    this.button.innerText = url;
    this.button.addEventListener("click", ()=>{
        target.innerHTML = "";
        target.appendChild(this.html);
    });

    this.url = url;
};

PanelBase.prototype.show = function(){
    this.button.click();
};

PanelBase.prototype.get = function(data) {
    let uri = "";
    if(typeof data == "object") {
        uri = "?";
        let andSymbol = false;
        for(let attribute in data){
            if(andSymbol)
                uri += "&";
            uri += attribute + "=" + encodeURIComponent(data[attribute]);
            if(!andSymbol)
                andSymbol = true;
        }
    }

    return new Promise((res,rej)=>{
        fetch("./Admin/" + url + uri).then(response=>{
            if(res.ok) {
                return response.json();;
            } else {
                rej(new Error("Bad Response"));
            }
        }).then(body => {
            res(body);
        }).catch(e=>{
            rej(e);
        });
    });
};

PanelBase.prototype.post = function(data){
    let body = new FormData();
    for(let attribute in data){
        body.append(attribute, data[attribute]);
    }

    return new Promise((res,rej)=>{
        fetch("/Admin/" + this.url, {
            method: "POST",
            body: body
        }).then(response=>{
            if(res.ok) {
                return response.json();
            } else {
                rej(new Error("Bad Response"));
            }
        }).then(body=>{
            res(body);
        }).catch(e=>{
            rej(e);
        })
    });
};

PanelBase.prototype.delete = function(data) {
    return new Promise((res,rej)=>{
        fetch("/Admin/" + this.url, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(data)
        }).then(response=>{
            if(res.ok) {
                return response.json();
            } else {
                rej(new Error("Bad Response"));
            }
        }).then(body=>{
            res(body);
        }).catch(e=>{
            rej(e);
        })
    });
};

export default PanelBase;
