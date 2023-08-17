const cliente = require('../models/clientes');
const usuarios = require('../models/usuarios');
const vendedores = require('../models/vendedores')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ventas = require('../models/ventas');
const secret = process.env.JWT_SECRET
const expires = process.env.JWT_EXPIRE
//JWT_SECRET = '235fe06beb59e31f0a7f03edce80b19c7ad35b6bd4614f104f6ff9d4fc26f403481526'



exports.perfilCliente = async (req, res) => {
    try {
        console.log(req.id)
        const clienteLogeado = await cliente.findById({ '_id': req.id })
        // const ventasRealizadas = await ventas.find({cliente: clienteLogeado.email})
        // if (!ventasRealizadas) {
        //     res.render('perfil', {
        //         "perfilCliente": clienteLogeado,
        //     })
        // } else {
        //     res.render('perfil', {
        //         "perfilCliente": clienteLogeado,
        //         "ventas": ventasRealizadas
        //     })
        // }
        // <!-- <% if (ventas.length > 0) { %>
        //     <div class="card">
        //         <div class="card-header text-center">
        //             <h3>Tus compras</h3>
        //         </div>
        //         <div class="card-body">
        //             <ul>
        //                 <% ventas.forEach(venta => { %>
        //                     <li><%= venta.productosVenta[0].nombre %> - $<%= venta.totalVenta %></li>
        //                 <% }); %>
        //             </ul>
        //         </div>
        //     </div>
        // <% } %> -->
        res.render('perfil', {
            'perfilCliente': clienteLogeado
        })
    } catch (error) {
        console.log(error)
    }
}
