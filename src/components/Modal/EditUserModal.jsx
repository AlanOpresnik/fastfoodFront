import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
export default function EditUserModal({ isOpen, closeModal, setIsOpen }) {
    const { user, updateUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: user.name,
        lastName: user.lastName,
        email: user.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsOpen(false)
    };

    

    

    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0  overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full  justify-center items-center gap-6 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className=' flex justify-end mb-2'>
                                        <button onClick={() => setIsOpen(false)}>

                                            <CloseIcon />
                                        </button>
                                    </div>
                                    <div className='flex flex-col items-center gap-6'>
                                        <img
                                            className="w-[70px]"
                                            src="https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg"
                                        />
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg mb-2 font-semibold leading-6 text-gray-900"
                                        >
                                            Modifcar Cuenta
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit} className=' col-span-2 rounded-xl  flex flex-col gap-6  px-6 py-6'>
                                            <TextField
                                                onChange={handleChange}
                                                value={formData.name}
                                                name='name'
                                                fullWidth
                                            />
                                            <TextField
                                                onChange={handleChange}
                                                value={formData.lastName}
                                                name='lastName'
                                                fullWidth
                                            />
                                            <TextField
                                                onChange={handleChange}
                                                value={formData.email}
                                                name='email'
                                                fullWidth
                                            />

                                            <div className='mt-12 right-0 flex justify-end'>
                                                <Button type='submit' variant='contained'>Confirmar Edicion</Button>
                                            </div>

                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}