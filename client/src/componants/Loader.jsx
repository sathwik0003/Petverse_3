import React, { useEffect, useState } from 'react';
import './Loader.css';
import axios from 'axios';

const Loader = () => {
    const [catFact, setCatFact] = useState("Loading a fact...");

    useEffect(() => {
        axios.get('https://catfact.ninja/fact')
            .then(response => {
                setCatFact(response.data.fact);
            })
            .catch(error => {
                console.error('Error fetching cat fact:', error);
            });
    }, []);

    return (
        <div>
            <div id="preloader"></div>
            <div id="catfact">{catFact}</div>
        </div>
    );
}

export default Loader;
