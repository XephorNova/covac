import React from "react";
import SessionContextProvider from "./components/contexts/SessionContext";
import Filter from "./components/Filter";
import Results from "./components/Results";

const App = () => {
    return (
        <div>
            <SessionContextProvider>
                <Filter />
                <Results />
            </SessionContextProvider>
        </div>
    );
};

export default App;
