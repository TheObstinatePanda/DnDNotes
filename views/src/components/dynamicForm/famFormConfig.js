export const famFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'status', label: 'Family Status', type: 'text' },
        { name: 'familyMembers', label: 'Family Members', type: 'multi' },
        { name: 'orgs', label: 'Relationships with known Organizations', type: 'multi' },
        { name: 'relations', label: 'Relationships with known individuals or other families', type: 'multi' },
        { name: 'livesIN', label: 'Location of Residence', type: 'text' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}