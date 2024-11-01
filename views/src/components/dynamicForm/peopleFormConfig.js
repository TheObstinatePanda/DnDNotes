export const peopleFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'is_npc', label: 'Is this person an NPC?', type: 'checkbox' },
        { name: 'family', label: 'Family Name', type: 'text' },
        { name: 'orgs', label: 'Relationships with known Organizations', type: 'multi' },
        { name: 'relations', label: 'Relationships with known individuals or other families', type: 'multi' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}