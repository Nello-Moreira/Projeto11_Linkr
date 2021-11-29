function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("linkrUser"));
}

function setLocalStorage(value) {
    localStorage.setItem("linkrUser", JSON.stringify(value));
}

export { getUserFromLocalStorage, setLocalStorage };
