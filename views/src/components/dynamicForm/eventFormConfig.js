export const eventFormConfig = {
    fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'persons_involved', label: 'Persons Invovled', type: 'multi' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'is_combat', label: 'Was this a combat?', type: 'checkbox' },
        { name: 'loot', label: 'Loot', type: 'multi' },
        { name: 'note', label: 'Note', type: 'textarea' },
    ]
}