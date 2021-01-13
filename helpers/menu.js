const getMenu = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Principal', url: '' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráfica', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesa' },
                { titulo: 'Rxjs', url: 'rxjs' },

            ]
        },
        {
            titulo: 'Matenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }
    return menu;
}

module.exports = {
    getMenu
}