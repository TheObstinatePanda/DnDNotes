import React from 'react';

function NavLinks({ setView }) {
    return (
        <nav className = "Nav-links">
            <li onClick={() => setView('home')}>Home</li> 
            <li onClick={() => setView('newNote')}>New Note</li>
            <li onClick={() => setView('allNotes')}>All Notes</li>
            <li onClick={() => setView('events')}>Events</li>
            <li onClick={() => setView('people')}>People</li>
            <li onClick={() => setView('places')}>Places</li>
            <li onClick={() => setView('things')}>Things</li>
            <li onClick={() => setView('families')}>Families</li>
            <li onClick={() => setView('organizations')}>Organizations</li>
        </nav>
    );
}

export default NavLinks