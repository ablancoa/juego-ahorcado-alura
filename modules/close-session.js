export function closeSession() {
    sessionStorage.removeItem('usuario');
    window.open('./index.html','_self')
}