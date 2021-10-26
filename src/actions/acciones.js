

export const accionAgregar = (producto) => ({
    type: 'agregar',
    payload: producto
});

export const accionEliminar = (idProducto) => ({
    type: 'eliminar',
    payload: idProducto

});

export const accionEditar = (producto) => ({
    type: 'editar',
    payload: producto
})