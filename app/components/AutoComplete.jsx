
import React, { useEffect, useState } from 'react';


import SuggestionList from './SuggestionList';

const AutoComplete = ({
    staticData,
    fetchSuggestions,
    placeholder="",
    customLoading= "Loading...",
    onSelect=()=>{},
    onBlur=()=>{},
    onFocus=()=>{},
    onChange=()=>{},
    customStyles={},
    dataKey="",
}) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(suggestions)

    const handleInputChange = (e) => {
        setInput(e.target.value);
        onChange(e.target.value);
    };

    const getSuggestions = async () => {
        setError(null);
        setLoading(true);
        try {
            let result;
            if (staticData) {
                result = staticData.filter((item) => {
                    return item.toLowerCase().includes(input.toLowerCase());
                });
            } else if (fetchSuggestions) {
                result = await fetchSuggestions(input);
            }
            setSuggestions(result);
        } catch (err) {
            setError("Failed to fetch suggestions");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (input.length > 1) {
            getSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [input]);
const handleSuggestionClick=(suggestion)=>{
    setInput(dataKey ? suggestion[dataKey]: dataKey);
    onSelect(suggestion);
    setSuggestions([]);

}
    return (
        <div className="container">
            <input
                type="text"
                style={customStyles}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                value={input}
                onChange={handleInputChange}
            />
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customLoading}</div>}
           
            {(suggestions.length > 0 || loading || error) &&  (
            <ul className="suggestions-list" >
            {error && <div className='error'>{error}</div>}
            {loading && <div className='loading'>{customLoading}</div>}
                <SuggestionList dataKey={dataKey}
                highlight={input}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
                />
            </ul> )}
           
        </div>
    );
};

export default AutoComplete;
