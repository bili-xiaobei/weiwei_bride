const cut = (publicColor) => {
    document.getElementsByTagName("body")[0].style.setProperty("--backgroundColor", publicColor);
};
export default cut;