const crypto = require('node:crypto');

const tasks = [
    {
        "id": crypto.randomUUID(),
        "name": "Tarea 1",
        "description": "Ensalada de Pasta",
        "date": "20/11/2023",
        "hour": "13:00"
    },
    {
        "id": crypto.randomUUID(),
        "name": "Tarea 2",
        "description": "Ensalada de Atún",
        "date": "28/11/2023",
        "hour": "12:00"
    },
    {
        "id": crypto.randomUUID(),
        "name": "Dormir",
        "description": "Empanada de Pasta",
        "date": "18/11/2023",
        "hour": "3:00"
    },
    {
        "id": crypto.randomUUID(),
        "name": "Dormir",
        "description": "mermelada de Pasta",
        "date": "11/11/2023",
        "hour": "22:00"
    }
]

module.exports = {
    tasks
}