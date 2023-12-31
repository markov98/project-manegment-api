const router = require("express").Router();
const rolesService = require('../services/rolesService');
const { isAuth } = require("../middlewares/authMiddleware");

router.post('/add', isAuth, async (req, res) => {
    try {
        const { roleName, description } = req.body
        await rolesService.add(roleName, description);
        res.send('Role added');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.get('/get-all', async (req, res) => {
    try {
        res.json(await rolesService.getAll());
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        res.json(await rolesService.getById(id));
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        await rolesService.delete(id)
        res.json('Role deleted');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.patch('/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, description } = req.body;
        await rolesService.edit(id, roleName, description)
        res.json('Role Updated');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.patch('/:id/assign', isAuth, async (req, res) => {
    try {
        const roleId = req.params.id;
        const userId = req.user._id
        await rolesService.assignUser(roleId, userId)
        res.json('User Assigned');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

module.exports = router;