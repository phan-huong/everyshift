function isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

function get_local_user_data() {
    return JSON.parse(localStorage.getItem("userData"));
}

function update_local_user_data(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

function sort_by_date (arr) {
    arr.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });
    return arr;
}

export {
    isEmptyObject,
    get_local_user_data,
    update_local_user_data,
    sort_by_date
}