const get_ip = (device_type) => {
    let ip;
    switch (device_type) {
        case 'pc':
            ip = "127.0.0.1";
            break;
        case 'vps':
            ip = "161.97.144.10";
            break;
        default:
            ip = "10.0.2.2";
            break;
    }
    return ip;
} ;

const device_type = 'vps';

exports.get_ip = get_ip;
exports.device_type = device_type;