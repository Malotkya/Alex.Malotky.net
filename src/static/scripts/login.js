export default function LogIn() {
    document.querySelector("form").addEventListener("submit", (event)=>{
        event.preventDefault();
        window.route(location.pathname, new FormData(event.target));
        return false;
    });
}