import Index from './Panel/Index.js';

const Navbar = base => {
    let target = document.createElement("div");
    let navbar = document.createElement("nav");

    let test = new Index(target);
    navbar.appendChild(test.button);

    base.appendChild(navbar);
    base.appendChild(target);

    test.show();
    console.log(test);
};

export default test;
