import React, { useState } from 'react';
import MultiInput from './MultiInput';

function DynamicForm({ config = { fields: [] }, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => { 
        const { name, type, checked, value } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]:fieldValue,
        });
    };

    //need to have multi inputs send back an array in curly brackets "{ }"
    const handleMultiChange = (name, values) => {
        setFormData({
            ...formData,
            [name]: values || [],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data: ', formData)
        onSubmit(formData);
    };

return (
    <form onSubmit={handleSubmit}>
        {config.fields.map((field) => (
            <div key={field.name}>
                {field.type === 'multi' ? (
                    <MultiInput
                        name={field.name}
                        label={field.label}
                        values={formData[field.name]}
                        onChange={handleMultiChange}
                    />
                ) : (
                    <>
                        <label>{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                        />
                    </>
                )}
            </div>
    ))}
        <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;