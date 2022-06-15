const get_ip = (device_type) => {
    let ip;
    switch (device_type) {
        case 'pc':
            ip = "http://127.0.0.1:9000";   // localhost
            break;
        case 'mobile':
            ip = "http://192.168.178.45:9000";  // IP of your PC on the same network with your mobile phone
            break;
        case 'vps':
            ip = "https://devway.work";
            break;
        default:
            ip = "http://10.0.2.2:9000";    // localhost on Android simulator devices
            break;
    }
    return ip;
} ;

const device_type = 'pc';

export { get_ip, device_type }