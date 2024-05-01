import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
export default function InicialModal() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    const { token } = useContext(UserContext)

    function closeModal() {
        setIsOpen(false)
    }

    const openModal = () => {
        if (token) {
            return
        }

        setTimeout(() => {
            setIsOpen(true)
        }, 3000);
    }

    useEffect(() => {
        openModal()
    }, [token])

    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        <button onClick={closeModal}>

                                        <CloseIcon/>
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
                                            Bienvenido a Nike
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm mb-6 text-gray-500">
                                            Para que tengas una mejor experiencia de usuario te recomendamos crear una cuenta, o Iniciar sesion si ya tenes una.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Crear una cuenta
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex ml-2 rounded-xl justify-center  border border-transparent border-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Iniciar sesion
                                        </button>
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