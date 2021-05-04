import React, { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = (props) => {
    const [session, setSession] = useState([]);
    // console.log(session.sessions);
    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {props.children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
