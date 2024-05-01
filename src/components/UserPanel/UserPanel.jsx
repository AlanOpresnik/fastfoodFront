import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Button, TextField } from '@mui/material'
import EditUserModal from '../Modal/EditUserModal'

const UserPanel = () => {
    const { user } = useContext(UserContext)
    const [userData, setUserData] = useState(user)

    let [isOpen, setIsOpen] = useState(false)
    const signOut = () => {
        setTimeout(() => {
            window.location.href = ''
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            
        }, 1000);
    }
    console.log(user)
    
    
    function closeModal() {
        setIsOpen(false)
    }
    
    
    const openModal = () => {
        setIsOpen(true)
    }
    
    
    useEffect(() => {
        setUserData(user);
    }, [user])
    
    return (
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl'>

            <aside className="" aria-label="Sidebar">
                <div className="px-3 py-4 rounded-xl overflow-y-auto shadow-xl bg-gray-50 dark:bg-gray-800">
                    <div className='flex w-full justify-center'>
                        <div className='flex flex-col items-center mb-6 border-b'>
                            <img className='rounded-full w-[100px] ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR504O6TXYAtC3ajXaZtGC9QlUHSU7Bdx6A3gV7mdovNQ&s' />
                            <p className='mt-4 text-lg font-semibold'>{userData.name}</p>
                            <p className='mt-4 text-sm pb-2'>{userData.email}</p>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Cuenta y perfil</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Compras y Ordenes</span>
                            </button>

                        </li>

                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                                    </path>
                                    <path
                                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
                                    </path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Mensajes</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                            </a>
                        </li>

                        <li>
                            <a href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 01-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span onClick={signOut} className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <form className=' col-span-2 rounded-xl shadow flex flex-col gap-6 border px-6 py-6'>
                <TextField

                    label="Nombre de usuario"
                    value={userData.name}
                    disabled={true}
                    fullWidth
                />
                <TextField
                    label="Apellido"
                    value={userData.lastName}
                    disabled={true}
                    fullWidth
                />
                <TextField
                    label="Correo electronico"
                    value={userData.email}
                    disabled={true}
                    fullWidth
                />

                <div className='mt-12 right-0 flex justify-end'>
                    <Button onClick={openModal} variant='contained'>Editar Usuario</Button>
                </div>

            </form>
            <EditUserModal closeModal={!isOpen} setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
    )
}

export default UserPanel