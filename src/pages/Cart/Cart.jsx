import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Cart = () => {
    const [open, setOpen] = useState(false);
    const [productsInCart, setProductsInCart] = useState([]);
    const { getUserCart, cart, userId, removeFromCart } = useContext(UserContext);
    const { getProducts, products, handleRedirect } = useContext(ProductContext);
    const [quantityMap, setQuantityMap] = useState({}); // State to manage quantity of each product



    // Fetch products on component mount
    useEffect(() => {
        getProducts();
    }, []);

    // Update products in cart when products or cart changes
    useEffect(() => {
        const productsInCartIds = cart.map(cartItem => cartItem.productId);
        const productsInCart = products.filter(product => productsInCartIds.includes(product._id));
        setProductsInCart(productsInCart);
    }, [products, cart]);

    // Fetch user cart if userId exists
    useEffect(() => {
        if (userId && userId.userId) {
            getUserCart();
        }
    }, [userId]);

    // Calculate total price of products in cart
    const calculateTotal = () => {
        let totalPrice = 0;
        cart.forEach(cartItem => {
            const product = products.find(product => product._id === cartItem.productId);
            if (product) {
                totalPrice += product.price * (quantityMap[product._id] || 1);
            }
        });
        return totalPrice;
    };

    // Update total when cart or quantityMap changes
    const total = React.useMemo(() => calculateTotal(), [cart, quantityMap]);

    // Function to handle quantity change for a product
    const handleQuantityChange = (productId, increment) => {
        setQuantityMap(prevState => {
            const newQuantity = (prevState[productId] || 1) + increment;
            return {
                ...prevState,
                [productId]: Math.max(newQuantity, 1) // Ensure quantity doesn't go below 0
            };
        });
    };


    return (
        <div className="flex flex-col md:flex-row w-screen h-full px-0 md:px-14 py-7">

            {/* My Cart */}
            <div className="w-full flex flex-col h-fit gap-4 p-4 ">
                <p className="text-blue-900 text-xl font-extrabold">Mi Carrito</p>

                {/* Product */}
                {productsInCart?.map(product => (
                    <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
                        <div className="flex flex-col md:flex-row gap-3 justify-between">
                            {/* Product Information */}
                            <div className="flex flex-row gap-6 items-center">
                                <div className="w-28 h-28">
                                    <img className="w-full h-full" src={product.images[0].secure_url} alt="Product" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-lg text-gray-800 font-semibold">{product.title}</p>
                                    <p className="text-xs text-gray-600 font-semibold">Color: <span className="font-normal">{product.color}</span></p>
                                    <p className="text-xs text-gray-600 font-semibold">Size: <span className="font-normal">{product.tallas}</span></p>
                                </div>
                            </div>
                            {/* Price Information */}
                            <div className="self-center text-center">

                                <p className="text-gray-800 font-normal text-xl">${product.price}</p>
                            </div>
                            {/* Remove Product Icon */}
                            <div className="self-center">
                                <button onClick={(e) => removeFromCart(product._id)}>
                                    <svg height="24px" width="24px" id="Layer_1" style={{ enableBackground: "new 0 0 512 512" }} version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g>
                                            <path d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
                                            <g>
                                                <rect height="241" width="14" x="249" y="160" />
                                                <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                                                <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/* Product Quantity */}
                        <div className="flex flex-row self-center gap-1">
                            <button onClick={(e) => handleQuantityChange(product._id, - 1)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <p> {quantityMap[product._id] || 1}</p>
                            <button onClick={(e) => handleQuantityChange(product._id, + 1)} className="w-5 h-5 self-center rounded-full border border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* Purchase Resume */}
            <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
                <p className="text-blue-900 text-xl font-extrabold">Resumen de Compra</p>
                <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Subtotal ({productsInCart.length}) productos</p>
                        <p className="text-end font-bold">${total}</p>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Envio</p>
                        <div>
                            <p className="text-end font-bold">$3.900</p>
                            <p className="text-gray-600 text-sm font-normal">LLegara entre el 2 de mayo</p>
                        </div>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Cupon de Descuento</p>
                        <a className="text-gray-500 text-base underline" href="#">Agregar</a>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Total</p>
                        <div>
                            <p className="text-end font-bold">${total}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={(e) => handleRedirect(total, productsInCart)} to={'/cart/finishForm'} className="transition-colors text-center text-sm !bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full !text-white text-hover shadow-md">
                            Finalizar compra
                        </Button>
                        <Link to={'/'} className="transition-colors text-center text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                            Agregar mas Productos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart