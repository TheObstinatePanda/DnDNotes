export const placeFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'type', label: 'Location Type', type: 'text' },
        { name: 'orgs', label: 'Organizations known to operate in this location', type: 'multi' },
        { name: 'ownedBy', label: 'Who owns this location?', type: 'text' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}