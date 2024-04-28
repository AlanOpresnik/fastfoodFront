import { Button, Card, CardContent } from '@mui/material'

import React, { useContext, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


import { motion } from 'framer-motion';
import { ProductContext } from '../context/ProductContext';
import { formatToDayMonthYear } from '../helpers/formatMonth';



export default function PaymentSuccess() {
    const orderId = localStorage.getItem('orderId');
    const {getOrderById,order} = useContext(ProductContext)

    const navigate = useNavigate();

    useEffect(() => {
        getOrderById(orderId);
    }, []);

    useEffect(() => {
        if (orderId === "" || orderId === undefined || orderId === null) {
            navigate(`/`);
            return null; // No renderizamos nada mientras redireccionamos
        }
    }, [])




    return (
        orderId === "" || orderId === undefined || orderId === null ? (
            <div className='h-[50vh] flex justify-center'>
                <p className='mt-12 h-full'>No hay un pedido realizado por usted</p>
            </div>
        ) : (

            <motion.div
                className="flex  flex-col min-h-screen py-10 items-center justify-center gap-4 md:py-0 md:gap-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="flex flex-col items-center justify-center gap-2 text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <motion.div
                        initial={{ rotate: -180, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <CheckCircleOutlineIcon fontSize='large' className="h-12 w-12 check text-green-500" />
                    </motion.div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Pago completado </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Tu orden ya fue procesada, todos los datos te llegaran al correo electronico</p>
                    </div>
                </motion.div>
                <Card className="w-full max-w-sm p-0">

                    <CardContent className="p-4 md:p-6">
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between'>
                                <p>Nombre del comprador</p>
                                <p className="text-right">{order.name}</p>
                            </div>

                            <div className='flex w-full justify-between mt-2 border-t pt-4'>
                                <p>DNI de orden</p>
                                <p className="text-right">{order.dni}</p>
                            </div>
                            <div className='flex w-full justify-between mt-2 border-t pt-4'>
                                <p>Fecha de compra</p>
                                <p className="text-right">{formatToDayMonthYear(order.created_At)}</p>
                            </div>
                        </div>
                        <div className="my-4 border-t" />
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between mt-2  '>
                                <p>Total</p>
                                <p className="text-right">${order.totalAmount}</p>
                            </div>
                        </div>
                        <div className="my-4 border-t" />
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between'>
                                <p>Metodo de pago</p>
                                <p className="text-right">{order.payment_method}</p>
                            </div>
                        </div>
                        <div className="my-4 border-t" />
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between'>
                                <p>Metodo de Envio</p>
                                <p className="text-right">{order.shipping_method}</p>
                            </div>
                        </div>
                        <div className="my-4 border-t" />
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between'>
                                <p>Codigo postal</p>
                                <p className="text-right">{order.cp}</p>
                            </div>
                        </div>
                        <div className="my-4 border-t" />
                        <div className=" gap-2 text-sm text-gray-500 md:grid-cols-2 md:text-base md:text-gray-500 dark:text-gray-400">
                            <div className='flex w-full justify-between'>
                                <p>Email</p>
                                <p className="text-right">{order.userEmail}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent className="flex justify-end w-full shadow p-4">
                        <Button sx={{
                            border: "1px solid gray"
                        }} className="ml-auto  shrink-0" variant="outline">
                            Imprimir Orden
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex flex-col mt-1 md:mt-[-10px] gap-2 min-[400px]:flex-row">
                    <Link
                        className="flex-1 inline-flex h-10 p-2 items-center justify-center rounded-md bg-gray-900 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        to="#"
                    >
                        Continuar comprando
                    </Link>

                </div>
                <p className="text-gray-500 dark:text-gray-400 text-center md:text-start">Por favor recordar que los pagos con Mercado pago pueden tener demoras en acreditarse en nuestro sistema</p>
            </motion.div>
        )

    )
}