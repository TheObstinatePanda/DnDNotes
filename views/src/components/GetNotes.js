import React, { useState, useEffect } from 'react';

function GetNotes({ table, columns }) {
    const [notes, setNotes]=useState([])

    useEffect(() => {
        // Fetch notes
        fetch(`/${table}`)
            .then(response => {
                if (!response.ok) {
                    console.log('response not ok')
                    throw new Error(`Http error! status: ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setNotes(data)
            })
            .catch(error => console.error('Error fetching notes: ', error));
    }, [table]);

    return (
        <div>
            {notes.map(note => (
                <div key={note.id} className="note">
                    <h3>{note.title || note.name}</h3>
                    <div className='note-content'>
                        {columns
                            .filter(column => column !== 'title' && column !== 'name')
                            .map(column => (
                                <p key={column}>{note[column]}</p>
                        ))}
                    </div>                    
                </div>
            ))}
        </div>
    );
}

export default GetNotes;