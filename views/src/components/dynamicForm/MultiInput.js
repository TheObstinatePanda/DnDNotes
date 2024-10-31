import React, { useState } from 'react';

function MultiInput({ name, label, values, onChange }) {
    const [inputValues, setInputValues] = useState(values ||['']);

    const handleChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
        onChange(name, newValues);
    };

    const handleAdd = () => {
        setInputValues([...inputValues, '']);
    };

    return (
        <div>
            <label>{label}</label>
            {inputValues.map((value, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={value}
                        onChange={(event) => handleChange(index, event)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAdd}>+</button>
        </div>
    );
}

export default MultiInput;