import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkeleton from './skeletons/SideBarSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { User } from 'lucide-react'
const Sidebar = () => {

    const {users,getUsers,setSelectedUser,selectedUser,isUserLoading} = useChatStore()
    const {onlineUser} = useAuthStore()
    useEffect(() => {
      getUsers()
    }, [getUsers])

    if(isUserLoading) return <div><SideBarSkeleton/></div>
    

  return (
    <aside className=' h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-300 w-full p-5'>
            <div className='flex items-center gap-2'>
                <User className='size-6'/>
                <span className='font-medium hidden lg:block'>Contact</span>
            </div>

            {/* ToDo online filter user */}
            <div className='w-full py-3 overflow-y-auto'>
                {users.map((user) => (
                    <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
                    
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <img src={user.profilepic || "../../public/img/pexels-keira-burton-6146929.jpg"} alt={user.name}
                            className='size-12 object-cover rounded-full'
                            />
                            {onlineUser.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
                            )}
                        </div>

                        {/* user info-online visible */}
                        <div className='hidden lg:block text-left min-w-0'>
                            <div className='font-medium truncate'>{user.fullname}</div>
                            <div className='text-sm text-zinc-400'>
                                {onlineUser.includes(user._id) ? "online": "offline"}
                            </div>
                        </div>
                    </button>
                ))}

                
            </div>
        </div>
    </aside>
  )
}

export default Sidebar