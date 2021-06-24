const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models')

// Colecciones que estan permitidas en la busqueda
const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

// Funcion para buscar usuarios
const buscarUsuario = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino ); // TRUE

    if ( esMongoID ){
        const usuario = await Usuario.findById( termino );
        res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex}, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuario 
    });
}

// Funcion para buscar categorias
const buscarCategorias = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino ); // TRUE

    if ( esMongoID ){
        const categoria = await Categoria.findById( termino );
        res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regex, estado: true});

    res.json({
        results: categorias 
    });
}

// Funcion para buscar productos
const buscarProductos = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino ); // TRUE

    if ( esMongoID ){
        const producto = await Producto.findById( termino ).populate('categoria', ' nombre');
        res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ nombre: regex, estado: true})
                                    .populate('categoria', ' nombre');

    res.json({
        results: productos 
    });
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        default: 
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
        break;
    }
    
}


module.exports = {
    buscar
}