export const orgFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'type', label: 'Organization Type', type: 'text' },
        { name: 'orgMembers', label: 'Organization Members', type: 'multi' },
        { name: 'relations', label: 'Relationships with known organizations, people, or families', type: 'multi' },
        { name: 'foundIn', label: 'Location of Operation', type: 'text' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}