
function GetDarkMode() {
    return !!window.localStorage.getItem("darkMode");
}
function SetDarkMode(mode) {
    if (mode) {
        window.localStorage.setItem("darkMode", "true");
        let css = document.getElementById("dark-mode-css");
        if (!css) {
            css = document.createElement("link");
            css.id = "dark-mode-css";
            css.rel = "stylesheet";
            document.head.appendChild(css);
        }
        css.href = "https://raw.githack.com/yt6983138/10CSS/main/css/10css.dark.css";
    } else {
        window.localStorage.removeItem("darkMode");
        let css = document.getElementById("dark-mode-css");
        if (!css) return;
        css.href = "";
    }
}

function Init() {
    SetDarkMode(GetDarkMode());
    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.querySelectorAll(".toggle-dark-mode-div");
        if (toggle.length > 0 && toggle[0].lastElementChild?.type === "checkbox") toggle[0].lastElementChild.checked = GetDarkMode();
    });
}
Init();
