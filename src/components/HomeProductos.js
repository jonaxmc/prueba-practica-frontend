import React, { useEffect, useReducer, useState } from 'react'
import { accionAgregar, accionEditar, accionEliminar } from '../actions/acciones';
import { useForm } from '../hooks/useForm';
import { productoReducer } from '../productoReducer';
import '../styles.css'



const init = () => {
    return JSON.parse(localStorage.getItem('productos')) || [];
}


export const HomeProductos = () => {

    const [editing, setEditing] = useState(false)
    const [idP, setIdP] = useState(0)
    const [productos, dispatch] = useReducer(productoReducer, [], init);

    const [{ nombreProducto }, handleInputChange, reset, update] = useForm({
        nombreProducto: ''
    });

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos))
    }, [productos])

    const handleDelete = (idProducto) => {
        dispatch(accionEliminar(idProducto));
    }

    const handleBotonEditar = (producto) => {
        setIdP(producto.id)
        update(producto.nombre)
        setEditing(true)

    }
  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombreProducto.trim().length <= 1) {
            return;
        }

        if(editing){
            const nuevoProducto2 = {
                id: idP,
                nombre: nombreProducto
            };
            dispatch(accionEditar(nuevoProducto2))
            setEditing(false)

        }else{

            const nuevoProducto = {
                id: new Date().getTime(),
                nombre: nombreProducto
            };
            dispatch(accionAgregar(nuevoProducto))
        }

        reset()

    }


    return (
        <div className="container">
            <h1>Productos</h1>
            <small>Número de productos: {productos.length}</small>
            <hr />
            <div className="row">
                <div className="col-5">
                   {
                       editing ? <h4>Editar Producto</h4>:<h4>Agregar Producto</h4>
                   }
                    
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombreProducto"
                            className="form-control"
                            placeholder="Agrega un producto..."
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={nombreProducto}
                        />

                    
                     
                                <div className="d-grid gap-2 d-md-block">
                                    <button className="btn btn-outline-primary mt-1" type="submit">Guardar</button>

                                </div>

                        


                    </form>
                </div>

                <div className="col-7">
                    <ul className="list-group list-group-flush">
                        {
                            productos.map((producto, i) => (
                                <li key={producto.id} className="list-group-item animate__animated animate__fadeIn">
                                    <p className="text-center textos">
                                        {i + 1}. {producto.nombre}
                                    </p>
                                    <div className="botones">
                                        
                                    <button className="btn btn-success" onClick={() => handleBotonEditar(producto)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>Eliminar</button>
                                        
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}
