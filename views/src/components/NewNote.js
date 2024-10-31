import React, { useState } from 'react';
import DynamicForm from './dynamicForm/DynamicForm';
import { formConfigMap } from './dynamicForm';

function NewNote() {
    const [selectedConfig, setSelectedConfig] = useState({ fields: [] });
    const [selectedTable, setSelectedTable] = useState();

    const handleDropChange = (event) => {
        const selectedValue = event.target.value;
        const newConfig = formConfigMap[selectedValue] || {};
        setSelectedTable(selectedValue);
        setSelectedConfig(newConfig);
    };

    const handleSubmit = (formData) => {
        console.log('Selected table: ', selectedTable);
        console.log('Form data', formData);

        // Format multi type fields as PostgreSQL array literals
        const formattedData = { ...formData };
        selectedConfig.fields.forEach(field => {
            if (field.type === 'multi' && Array.isArray(formattedData[field.name])) {
                formattedData[field.name] = `{${formattedData[field.name].map(item => `"${item.replace(/"/g, '\\"')}"`).join(',')}}`;
            }
        });

        console.log('Formatted Data: ', formattedData);

        fetch(`/${selectedTable}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setSelectedConfig({ fields: [] });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>New Note</h2>
            <select onChange={handleDropChange}>
                <option value="">Select Note Type</option>
                <option value="event">Event</option>
                <option value="family">Family</option>
                <option value="organization">Organization</option>
                <option value="person">Person</option>
                <option value="place">Place</option>
                <option value="thing">Thing</option>
            </select>
            <DynamicForm config={selectedConfig} onSubmit={handleSubmit} />
        </div>
    )
};

export default NewNote;