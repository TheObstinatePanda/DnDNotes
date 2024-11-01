export const orgFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'type', label: 'Organization Type', type: 'text' },
        { name: 'members', label: 'Organization Members', type: 'multi' },
        { name: 'relations', label: 'Relationships with known organizations, people, or families', type: 'multi' },
        { name: 'found_in', label: 'Location of Operation', type: 'multi' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}