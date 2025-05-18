import React, { createContext, useState, useContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: '',
        username: '',
        bio: ""
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;