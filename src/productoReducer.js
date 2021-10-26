
export const productoReducer =(state = [], action)=>{

    switch (action.type) {
        case 'agregar':
            return [...state, action.payload];
    
        case 'eliminar':
            return state.filter(producto => producto.id !== action.payload)

        case 'editar':
            return state.map(producto => (producto.id === action.payload.id) ? action.payload : producto)
        default:
            return state;
    }


    
}