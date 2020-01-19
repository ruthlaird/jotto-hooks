import React from 'react';

const successContext = React.createContext();
 
// custom hook
// gets the context, checks if it exists and throws and error if it doesn't (tried to use it outside of a provider)
/**
 * @function useSuccess
 * @returns {array} successContext value, which is a state of [value, setter].
 */
function useSuccess() {

    const context = React.useContext(successContext);

    if(!context) {
        throw new Error('useSuccess must be used with a SuccessProvider')
    }

    return context;
}

// Provider. Functional component
/**
 * @function SuccessProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function SuccessProvider(props) {
    // create an internal state with default value of false
    const [success, setSuccess] = React.useState(false);

    // memoisation - don't recalculate if don't need to, 
    // if a function has the same inputs, don't bother recalculating the outputs, just return the existing outputs 
    // from previous iteration of the function
    const value = React.useMemo(() => [success, setSuccess], [success]);

    return <successContext.Provider value={value} {...props} />
}

export default { SuccessProvider, useSuccess };