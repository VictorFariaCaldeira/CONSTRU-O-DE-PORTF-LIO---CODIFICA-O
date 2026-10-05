/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Fecha o menu ao clicar */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   MODO CLARO / ESCURO
========================================= */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


/* =========================================
   TEXTO DIGITANDO
========================================= */

const typingElement =
    document.getElementById("typing");

const phrases = [
    "Desenvolvedor em formação",
    "Estudante de tecnologia",
    "Desenvolvedor Web",
    "Entusiasta de programação"
];

let phraseIndex = 0;

let characterIndex = 0;

let deleting = false;


function typingEffect() {

    const currentPhrase =
        phrases[phraseIndex];


    if (!deleting) {

        typingElement.textContent =
            currentPhrase.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentPhrase.length) {

            deleting = true;

            setTimeout(
                typingEffect,
                1800
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentPhrase.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            phraseIndex++;

            if (phraseIndex >= phrases.length) {
                phraseIndex = 0;
            }

        }

    }


    setTimeout(
        typingEffect,
        deleting ? 50 : 100
    );

}

typingEffect();


/* =========================================
   ANIMAÇÃO AO ROLAR
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-title, .about-container, .skills-box, .project-card, .github-container, .contact-container"
    );


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;


        if (elementTop < windowHeight - 80) {

            element.classList.add("active");

        }

    });

}


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalButton =
    document.getElementById("modalButton");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");


function openModal(title, text) {

    modalTitle.textContent = title;

    modalText.textContent = text;

    modal.classList.add("active");

}


function closeModalFunction() {

    modal.classList.remove("active");

}


closeModal.addEventListener(
    "click",
    closeModalFunction
);


modalButton.addEventListener(
    "click",
    closeModalFunction
);


modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeModalFunction();

        }

    }
);


/* ESC fecha o modal */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModalFunction();

        }

    }
);


/* =========================================
   MODAL - SOBRE
========================================= */

const aboutButton =
    document.getElementById("aboutButton");


aboutButton.addEventListener(
    "click",
    function () {

        openModal(
            "Sobre mim",
            "Sou estudante da área de tecnologia e estou desenvolvendo minhas habilidades em programação, desenvolvimento web, banco de dados e criação de projetos."
        );

    }
);


/* =========================================
   MODAL - PROJETOS
========================================= */

const projectButtons =
    document.querySelectorAll(
        ".project-button"
    );


projectButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const title =
                    button.getAttribute(
                        "data-title"
                    );

                const description =
                    button.getAttribute(
                        "data-description"
                    );


                openModal(
                    title,
                    description
                );

            }
        );

    }
);


/* =========================================
   MÁSCARA DE TELEFONE
========================================= */

const phoneInput =
    document.getElementById("phone");


phoneInput.addEventListener(
    "input",
    function (event) {

        let value =
            event.target.value;


        /* Remove tudo que não for número */

        value =
            value.replace(/\D/g, "");


        /* Limite de 11 números */

        if (value.length > 11) {

            value =
                value.substring(0, 11);

        }


        /* Celular */

        if (value.length > 10) {

            value =
                value.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

            value =
                value.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

        }

        /* Telefone fixo */

        else {

            value =
                value.replace(
                    /^(\d{2})(\d)/,
                    "($1) $2"
                );

            value =
                value.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

        }


        event.target.value = value;

    }
);


/* =========================================
   FORMULÁRIO
========================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        openModal(
            "Mensagem enviada!",
            "Obrigado, " +
            name +
            "! Seu formulário foi preenchido com sucesso."
        );


        contactForm.reset();

    }
);