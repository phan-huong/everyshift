function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function get_local_user_data() {
    return JSON.parse(localStorage.getItem("userData"));
}

export {
    isEmptyObject,
    get_local_user_data
}