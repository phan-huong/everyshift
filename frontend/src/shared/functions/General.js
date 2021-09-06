function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function get_local_user_data() {
    return JSON.parse(localStorage.getItem("userData"));
}

function update_local_user_data(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

export {
    isEmptyObject,
    get_local_user_data,
    update_local_user_data
}