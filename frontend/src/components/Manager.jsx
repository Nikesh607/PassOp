import axios from 'axios';
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const navigate = useNavigate();
    const ref = useRef();
    const [sitename, setSitename] = useState('')
    const [username, setUsername] = useState('')
    const [sitepassword, setSitePassword] = useState('')
    const passwordref = useRef();
    const [ispasswordvisible, setIspasswordvisible] = useState(false)
    const [Credentials, setCredentials] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getCredentials = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/credentials`, {
                    withCredentials: true
                });

                if (response.data && Array.isArray(response.data.userdata)) {
                    console.log("Setting credentials from userdata array:", response.data.userdata);
                    setCredentials(response.data.userdata);
                } else {
                    console.error("API response doesn't have expected structure:", response.data);
                    setCredentials([]);
                }
            } catch (error) {
                console.error("Error fetching credentials:", error);
                setCredentials([]);
            }
        }
        getCredentials()
    }, [refresh])

    const showpassword = () => {
        if (!ispasswordvisible) {
            passwordref.current.type = "text"
        } else {
            passwordref.current.type = "password"
        }
        setIspasswordvisible(!ispasswordvisible)
    }

    const copytext = (text) => {
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = async (e) => {
        e.preventDefault()
        try {
            if (sitename.length > 3 && username.length > 3 && sitepassword.length > 3) {
                const credentialData = {
                    sitename,
                    username,
                    sitepassword
                };
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/addcredentials`, credentialData, {
                    withCredentials: true
                })
                setSitename('')
                setUsername('')
                setSitePassword('')

                toast('Password saved', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRefresh(!refresh)
            } else {
                console.error("password condition not meet");
                toast('Password not saved', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Credentials not submitted", error)
        }
    }

    const deletePassword = async (_id) => {
        const c = confirm("Do you really want to delete this Credential?")
        if (c) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/removecredentials/${_id}`, {
                    withCredentials: true
                })

                toast('Password deleted', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRefresh(!refresh)
            } catch (error) {
                console.error("credential not removed", error)
            }
        }

    }

    const handlelogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {
                withCredentials: true
            })
            toast('Successfully LoggedOut', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/', { replace: true })
        } catch (error) {
            console.error("loggedout unsuccessfull", error)
            
            navigate('/', { replace: true })
        }
    }


    const editPassword = async (id) => {
        try {
            const formdata = Credentials.filter(i => i._id === id)[0]
            setSitename(formdata.sitename)
            setUsername(formdata.username)
            setSitePassword(formdata.sitepassword)

            setCredentials(Credentials.filter(i => i._id !== id))
        } catch (error) {
            console.error("failed to update user credential")
        }
    }

    return (
        <div className='overflow-y-scroll'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className=" mycontainer md:px-32 md:py-5 px-2 py-2">
                <h1>
                    <div className="logo font-bold text-2xl text-center ">
                        <span className='text-green-500 font-bold'>&lt;</span>
                        <span>pass</span>
                        <span className='text-green-500 font-bold'>OP/&gt;</span>
                    </div>
                </h1>
                <p className='text-center text-green-900'>
                    Your own password manager:)
                </p>

                <form onSubmit={savePassword} className='flex flex-col items-center p-4 text-black md:gap-8 gap-3'>
                    <input
                        value={sitename}
                        placeholder='Enter site name'
                        className='rounded-full border border-green-500 w-full p-4 py-1 opacity-50'
                        onChange={(e) => {
                            setSitename(e.target.value)
                        }}
                        type="text" />
                    <div className="flex w-full justify-between items-center md:gap-x-10 flex-col md:flex-row gap-3">
                        <div className="md:w-[80%] w-full">
                            <input
                                value={username}
                                placeholder='Enter Username'
                                className='rounded-full border border-green-500 w-full p-4 py-1 opacity-50'
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                type="text" />
                        </div>
                        <div className="relative flex items-center w-full md:w-[40%]">
                            <input
                                value={sitepassword}
                                ref={passwordref}
                                placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1 opacity-70'
                                onChange={(e) => {
                                    setSitePassword(e.target.value)
                                }}
                                type="password" />
                            <span className='absolute right-2' onClick={showpassword}>{!ispasswordvisible ? (<svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>) : (<svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>)}
                            </span>
                        </div>
                    </div>
                    <input value='Save' type='submit' className='flex justify-center items-center gap-2 border border-green-700 bg-green-500 rounded-full w-fit px-5 py-2 hover:bg-green-400' />
                </form>
                <table className="table-auto w-full bg-green-700 text-white rounded-md mx-auto">
                    <thead>
                        <tr>
                            <th>Site Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-100 text-black border border-green-300'>
                        {!Array.isArray(Credentials) || Credentials.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No passwords available.
                                </td>
                            </tr>
                        ) : (
                            Credentials.map((item, index) => {
                                return <tr key={item._id || index}>
                                    <td className="border border-green-200 max-w-xs">
                                        <div className="break-all overflow-wrap flex justify-center items-center gap-3">
                                            <span>
                                                {item.sitename}
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={() => { copytext(item.sitename) }}>
                                                <IoCopy size={14} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border border-green-200 max-w-xs">
                                        <div className="break-all overflow-wrap flex justify-center items-center gap-3">
                                            <span>
                                                {item.username}
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <IoCopy size={14} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="border border-green-200 max-w-xs">
                                        <div className="break-all overflow-wrap flex justify-center items-center gap-3">
                                            <span>
                                                {item.sitepassword}
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={() => { copytext(item.sitepassword) }}>
                                                <IoCopy size={14} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className='border border-green-200 h-full md:min-w-32'>
                                        <div className='flex justify-center items-center gap-3 h-full w-full'>
                                            <span className='hover:cursor-pointer' onClick={() => { editPassword(item._id) }}>
                                                <BiSolidEditAlt />
                                            </span>
                                            <span className='hover:cursor-pointer' onClick={() => { deletePassword(item._id) }}>
                                                <AiFillDelete />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className="absolute right-60 top-20">
                <button className="logout w-20 text-black p-2 rounded-full border-2 border-green-600" onClick={handlelogout}>Logout</button>
            </div>
        </div>
    )
}

export default Manager