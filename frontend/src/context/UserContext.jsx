import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        username: '',
        bio: "",
        _id: '',
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export { UserContextProvider };