# Making a plan for making the front end display change

## Managing State with useState
Yes, you can manage this with useState. Each link can update the state to indicate which content should be displayed in the bcent div. You can also use useEffect to fetch data from the backend when the state changes.

## Component Structure
Your idea of building each container view as a different file to be imported and displayed is valid and standard. This approach promotes modularity and reusability.

## Example Implementation
Create Components for Each View

Create separate components for each view you want to display in the bcent div.

## Manage State and Fetch Data

Use useState to manage the current view and useEffect to fetch data when the view changes.
Example Code

`NavLinks.js`
```js
import React from 'react';

function NavLinks({ setView }) {
  return (
    <nav>
      <ul>
        <li onClick={() => setView('home')}>Home</li>
        <li onClick={() => setView('about')}>About</li>
        <li onClick={() => setView('contact')}>Contact</li>
      </ul>
    </nav>
  );
}

export default NavLinks;
```

`Home.js`
```js
import React, { useEffect, useState } from 'react';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/home')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {data ? <p>{data.content}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Home;
```

`About.js`
```js
import React, { useEffect, useState } from 'react';

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/about')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>About</h1>
      {data ? <p>{data.content}</p> : <p>Loading...</p>}
    </div>
  );
}

export default About;
```

`Contact.js`
```js
import React, { useEffect, useState } from 'react';

function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/contact')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Contact</h1>
      {data ? <p>{data.content}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Contact;
```

`App.js`
```js
import React, { useState } from 'react';
import './App.css';
import NavLinks from './NavLinks';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavLinks setView={setView} />
      </header>
      <main className="App-body">
        <div id="bcont">
          <div id="bleft">Left</div>
          <div id="bcent">
            {renderView()}
          </div>
          <div id="bright">Right</div>
        </div>
      </main>
    </div>
  );
}

export default App;
```

## Explanation

1. NavLinks Component: This component renders the navigation links and updates the view state when a link is clicked.
2. Home, About, Contact Components: These components fetch data from the backend when they are rendered and display the content.
3. App Component: This component manages the state of the current view and renders the appropriate component based on the state.

This approach ensures that your application is modular, maintainable, and responsive to user interactions

# Making a dynamic form component

Yes, you can create a dynamic form component in React that adapts to the needs of each component. This can be achieved by passing the form configuration (fields, labels, etc.) as props to the form component. This way, you can reuse the same form component for different tables with different input requirements.

## Step-by-Step Guide
1. Create a Dynamic Form Component: This component will render form inputs based on the configuration passed as props.
2. Create Configuration Objects: Define the configuration for each table (e.g., people, things).
3. Use the Dynamic Form Component: Use the form component in your other components and pass the appropriate configuration.

## Example Implementation
**`DynamicForm.js`**
```js
  import React, { useState } from 'react';

  function DynamicForm({ config, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        {config.fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  }

  export default DynamicForm;
```

**`Configuration Objects`**
Define the configuration for each table.

```js
  // config/peopleFormConfig.js
  export const peopleFormConfig = {
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'isNpc', label: 'Is NPC', type: 'checkbox' },
      { name: 'familyName', label: 'Family Name', type: 'text' },
      { name: 'relationships', label: 'Relationships', type: 'text' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
  };

  // config/thingsFormConfig.js
  export const thingsFormConfig = {
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'type', label: 'Type', type: 'text' },
      { name: 'isMagical', label: 'Is Magical', type: 'checkbox' },
      { name: 'owner', label: 'Owner', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
  };
```

**`People.js`**
Use the DynamicForm component and pass the peopleFormConfig.

```js
  import React from 'react';
  import DynamicForm from './DynamicForm';
  import { peopleFormConfig } from './config/peopleFormConfig';

  function People() {
    const handleSubmit = (formData) => {
      console.log('People form data:', formData);
      // Handle form submission (e.g., send data to the backend)
    };

    return (
      <div>
        <h1>People</h1>
        <DynamicForm config={peopleFormConfig} onSubmit={handleSubmit} />
      </div>
    );
  }

  export default People;
```

**`Things.js`**
Use the DynamicForm component and pass the thingsFormConfig.

```js
import React from 'react';
import DynamicForm from './DynamicForm';
import { thingsFormConfig } from './config/thingsFormConfig';

function Things() {
  const handleSubmit = (formData) => {
    console.log('Things form data:', formData);
    // Handle form submission (e.g., send data to the backend)
  };

  return (
    <div>
      <h1>Things</h1>
      <DynamicForm config={thingsFormConfig} onSubmit={handleSubmit} />
    </div>
  );
}

export default Things;
```

## Explanation

 - DynamicForm Component: This component renders form inputs based on the configuration passed as props. It manages form state and handles form submission.

 - Configuration Objects: Define the form fields, labels, and types for each table.
  
 - Use the DynamicForm Component: Use the DynamicForm component in your other components and pass the appropriate configuration.

This approach allows you to create a flexible and reusable form component that can adapt to the needs of different tables.

## For multi-input requirements:

**Step-by-Step Guide**
1. Create a Custom Input Component: This component will handle an array of values and allow users to add new entries.
2. Update the Dynamic Form Component: Modify the DynamicForm component to handle the custom input component.
3. Update the Configuration Object: Define the custom input type in the configuration object.

## Example Implementation
**`MultiInput.js`**
Create a custom input component that handles an array of values.

```js
  import React, { useState } from 'react';

  function MultiInput({ name, label, values, onChange }) {
    const [inputValues, setInputValues] = useState(values || ['']);

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
```

**`DynamicForm.js`**
Update the DynamicForm component to handle the custom input component.

```js
  import React, { useState } from 'react';
  import MultiInput from './MultiInput';

  function DynamicForm({ config, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
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
                onChange={handleChange}
              />
            ) : (
              <>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
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
```

**`eventFormConfig.js`**
Update the configuration object to use the custom input type.

```js
export const eventFormConfig = {
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'personsInvolved', label: 'Persons Involved', type: 'multi' },
  ],
};
```

**`Event.js`**
Use the DynamicForm component and pass the eventFormConfig.

```js
  import React from 'react';
  import DynamicForm from './DynamicForm';
  import { eventFormConfig } from './config/eventFormConfig';

  function Event() {
    const handleSubmit = (formData) => {
      console.log('Event form data:', formData);
      // Handle form submission (e.g., send data to the backend)
    };

    return (
      <div>
        <h1>Event</h1>
        <DynamicForm config={eventFormConfig} onSubmit={handleSubmit} />
      </div>
    );
  }

  export default Event;
```

## Explanation
 - MultiInput Component: This component handles an array of values and allows users to add new entries. It manages the state of the array and calls the onChange callback to update the parent component's state.

 - DynamicForm Component: This component renders form inputs based on the configuration passed as props. It includes logic to handle the custom MultiInput component.
 
 - Configuration Object: The configuration object defines the custom input type (multi) for fields that need to handle multiple values.

 - Event Component: This component uses the DynamicForm component and passes the appropriate configuration.

 - This approach allows you to create a flexible and reusable form component that can adapt to the needs of different tables, including handling multiple values for specific fields.

## Setting up component to fetch notes

To create a component that maps all notes to individual Title-note pairs from a given table in your database, you can follow these steps:

Fetch Data from the Database: Use an API call to fetch the notes data from your database.

Store Data in State: Store the fetched data in the component's state.
Map Data to JSX: Map the notes data to individual Title-note pairs and render them.

## Step-by-Step Solution
Create a Component: Create a new component to fetch and display the notes.
Fetch Data from the Database: Use an API call to fetch the notes data.
Store Data in State: Store the fetched data in the component's state.
Map Data to JSX: Map the notes data to individual Title-note pairs and render them.

Example Component: NotesList.js

- Step 1: Create a Component
Create a new file NotesList.js and define the component.

- Step 2: Fetch Data from the Database
Use the useEffect hook to fetch the notes data when the component mounts.

- Step 3: Store Data in State
Use the useState hook to store the fetched data.

- Step 4: Map Data to JSX
Map the notes data to individual Title-note pairs and render them.

```js
import React, { useState, useEffect } from 'react';

function NotesList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch notes data from the database
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    return (
        <div>
            <h2>Notes</h2>
            {notes.map(note => (
                <div key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
}

export default NotesList;
```

Explanation
Fetch Data from the Database: The useEffect hook is used to fetch the notes data from the /api/notes endpoint when the component mounts.
Store Data in State: The useState hook is used to store the fetched notes data in the notes state variable.
Map Data to JSX: The notes array is mapped to individual Title-note pairs and rendered inside the return statement.
Summary
Create a Component: Create a new component NotesList to fetch and display the notes.
Fetch Data from the Database: Use the useEffect hook to fetch the notes data from the database.
Store Data in State: Use the useState hook to store the fetched notes data.
Map Data to JSX: Map the notes data to individual Title-note pairs and render them.
By following these steps, you can create a component that maps all notes to individual Title-note pairs from a given table in your database.


```js
import React, { useState } from 'react';
import DynamicForm from './dynamicForm/DynamicForm';
import { formConfigMap } from './dynamicForm';

function NewNote() {
    const [selectedConfig, setSelectedConfig] = useState({ fields: [] });
    const [selectedTable, setSelectedTable] = useState('');

    const handleDropChange = (event) => {
        const selectedValue = event.target.value;
        const newConfig = formConfigMap[selectedValue] || {};
        setSelectedConfig(newConfig);
        setSelectedTable(selectedValue);
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

        console.log('Formatted data', formattedData);

        fetch(`/api/${selectedTable}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(response => {
            if (!response.ok) {
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
    );
}

export default NewNote;
```