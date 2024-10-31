export const defaultConfig = {
    fields: [
        { name: 'select', label: 'What type of note are we entering?', type: 'dropdown',
            options: [
                { value: 'event', label: 'Event' },
                { value: 'family', label: 'Family' },
                { value: 'organization', label: 'Organization' },
                { value: 'people', label: 'People' },
                { value: 'place', label: 'Place' },
                { value: 'thing', label: 'Thing' }
            ]
        }
    ]
};