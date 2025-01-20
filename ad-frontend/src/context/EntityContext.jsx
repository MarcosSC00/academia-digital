import { createContext, useContext, useState } from "react";

const EntityContext = createContext()

export function EntityProvider({ children }) {
    const [entity, setEntity] = useState(null)

    return (
        <EntityContext.Provider value={{entity, setEntity}}>
            {children}
        </EntityContext.Provider>
    )
}

export function useEntity(){
    return useContext(EntityContext)
}
