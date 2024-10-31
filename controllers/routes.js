const express = require('express');
const router = express.Router();
const controller = require('./controller');

const handleRequest = (action) => async (req, res) => {
    const table = req.params.table;
    const name = req.params.name;
    const data = req.body;

    try {
        let result;
        switch (action) {
            case 'get':
                result = await controller.get(table);
                break;
            case 'getByName':
                result = await controller.getBy.name(table, name);
                break;
            case 'post':
                result = await controller.post(table, data);
                break;
            case 'put':
                result = await controller.post(table, name, data);
                break;
            case 'remove':
                result = await controller.remove(table, name);
                break;
            default:
                throw new Error('Invalid action');
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/:table', handleRequest('get'));
router.get('/:table/:name', handleRequest('getByName'));
router.post('/:table', handleRequest('post'));
router.put('/:table/:id', handleRequest('update'));
router.delete('/:table/:id', handleRequest('remove'));

module.exports = router;