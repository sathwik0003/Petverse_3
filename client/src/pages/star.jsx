import React from "react";
import { FaStar } from "react-icons/fa";

const Star = () => {
    return (
        <>
            {[...Array(5)].map((star, index) => (
                <FaStar key={index} />
            ))}
        </>
    );
}

export default Star;
