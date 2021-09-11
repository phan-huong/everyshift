const get_ip = (device_type) => {
    let ip;
    switch (device_type) {
        case 'pc':
            ip = "127.0.0.1";
            break;
        default:
            ip = "10.0.2.2";
            break;
    }
    return ip;
} ;

const device_type = 'pc';

export { get_ip, device_type }