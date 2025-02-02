// import { createContext, useContext, useState } from "react";

// const NavBarContext = createContext();

// export const useNavbar = () => useContext(NavBarContext)

// export const NavbarProvider = ({children}) => {
//     const [updateTrigger, setUpdateTrigger] = useState(0)

//     const refreshNavbar = () => {
//         setUpdateTrigger(prev => prev + 1)
//     }
//     return(
//         <NavBarContext.Provider value={{updateTrigger, refreshNavbar}}>
//             {children}
//         </NavBarContext.Provider>
//     )
// }