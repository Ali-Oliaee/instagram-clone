export const defaultImage = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
// export const baseURL = 'http://127.0.0.1:8000/'
export const baseURL = 'http://192.168.16.188:8000/'
export const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : ''
