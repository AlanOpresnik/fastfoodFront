import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { ShoppingBagIcon, ShoppingBasketIcon, TruckIcon } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import { SwipeableDrawer, TextField } from '@mui/material';
import { AiOutlineShopping } from "react-icons/ai";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Link } from 'react-router-dom';

export default function DrawerCart() {
    initMercadoPago('APP_USR-abb87f17-339d-4968-b53c-1619fa01a190', {
        locale: 'es-AR',
    });
    const [open, setOpen] = React.useState(false);
    const [productsInCart, setProductsInCart] = React.useState([]);
    const { getUserCart, cart, userId, removeFromCart } = React.useContext(UserContext);
    const { getProducts, products, preferenceId, handleBuy } = React.useContext(ProductContext);
    const [quantityMap, setQuantityMap] = React.useState({}); // State to manage quantity of each product

    // Function to toggle the drawer
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Fetch products on component mount
    React.useEffect(() => {
        getProducts();
    }, []);

    // Update products in cart when products or cart changes
    React.useEffect(() => {
        const productsInCartIds = cart.map(cartItem => cartItem.productId);
        const productsInCart = products.filter(product => productsInCartIds.includes(product._id));
        setProductsInCart(productsInCart);
    }, [products, cart]);

    // Fetch user cart if userId exists
    React.useEffect(() => {
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




    const DrawerList = (
        <div className='w-[360px] md:w-[420px]' sx={{ position: "relative" }} role="presentation" onClick={toggleDrawer(true)}>
            <div className='flex relative w-full border-b font-semibold uppercase p-4'>
                <p>Mi Compra</p>
            </div>

            {productsInCart.length > 0 ? (
                <>
                    <List className='overflow-x-hidden'>
                        {productsInCart?.map((product) => (
                            <ListItem key={product._id} disablePadding>
                                <ListItem>
                                    <div className='flex flex-col'>
                                        <div className='flex w-[310px] relative'>
                                            <img className='max-w-[96px] max-h-[96px]' src={product.images[0].secure_url} />
                                            <div className='ml-2'>
                                                <p className='text-sm font-semibold'>{product.title}</p>
                                                <p className='text-xs'>{product.description}</p>
                                                <div className='flex justify-between items-center gap-6'>
                                                    <div className='flex relative mt-2 items-center border rounded-full max-w-[110px] justify-center px-12'>
                                                        <Button className='!rounded-full !text-[#6a6a6a]' size='small' onClick={(e) => handleQuantityChange(product._id, - 1)}>
                                                            <RemoveIcon fontSize='small' />
                                                        </Button>
                                                        {quantityMap[product._id] || 1}
                                                        <Button sx={{
                                                            width: '20px',
                                                            height: '30px',
                                                            borderRadius: '50%',
                                                            color: '#6a6a6a',
                                                            padding: '6px', // Ajusta el padding según sea necesario para cambiar el tamaño del icono
                                                        }} className='!w-[20px] !rounded-full !text-[#6a6a6a]' onClick={(e) => handleQuantityChange(product._id, + 1)}>

                                                            <AddIcon />
                                                        </Button>
                                                    </div>
                                                    <div className='relative top-1 right-[-20px]'>
                                                        <p className='text-sm font-semibold'>${product.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='px-0 ml-[-12px] pr-6 md:pl-2  md:pr-0'>
                                                <Button className='!text-black' onClick={(e) => removeFromCart(product._id)}>

                                                    <DeleteOutlineIcon />
                                                </Button>
                                            </div>

                                        </div>

                                    </div>
                                </ListItem>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <div className='flex flex-col  px-10'>

                            <div className='flex items-center gap-2'>
                                <TruckIcon />
                                <p className='text-sm'>Introducí tu CP y calculá el costo de envio.</p>
                            </div>
                            <div className='flex justify-between pt-6 pb-4 '>
                                <TextField size='small' />
                                <Button className='!bg-transparent !text-sm !ml-4 !text-black !border !border-black !rounded-full hover:!bg-black hover:!text-white' variant='outlined'>Calcular</Button>
                            </div>
                            <div className='flex justify-between py-4 text-sm border-b'>
                                <p>Subtotal</p>
                                <p>${total}</p>
                            </div>
                            <div className='flex justify-between py-4'>
                                <p className='text-xl font-semibold'>TOTAL:</p>
                                <p className='text-xl font-semibold'>${total}</p>
                            </div>
                        </div>
                        <ListItem>
                            <div className='w-full flex justify-center'>

                                <Link to={"/cart"} className=' text-white text-center  w-[300px] md:!relative !bg-[#111111] md:!w-[206px] lg:!w-[260px] xl:!w-[300px] !py-[0.54rem] !px-4 !rounded-full hover:!opacity-85  !transition-all' variant='contained'>
                                    Iniciar Compra
                                </Link>
                                {preferenceId && (
                                    <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                                )}
                            </div>
                        </ListItem>
                    </List>
                </>
            ) :
                <div className="flex flex-col justify-center items-center h-[90vh]" >
                    <AiOutlineShopping className='text-7xl' />
                    <p className='mt-1'>Tu carrito está vacío</p>
                </div>
            }


        </div>
    );

    return (
        <div className='relative mr-2'>
            <span className='absolute bg-black text-white right-0 top-[-10px] border p-[0.2rem] px-[0.4rem] rounded-full text-xs'>{productsInCart?.length}</span>
            <Button className='hover:!bg-transparent' sx={{ color: "black" }} onClick={toggleDrawer(true)}>
                <ShoppingBagIcon />
            </Button>
            <SwipeableDrawer className='hover:!bg-transparent' anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </SwipeableDrawer>
        </div>
    );
}