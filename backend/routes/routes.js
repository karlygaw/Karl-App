const express = require('express');
const app = express(); // Создайте экземпляр Express приложения
const router = express.Router();
const userController = require('../src/user/userController');
const User = require('../src/user/userModel');

// После этого вы можете использовать userController
router.route('/user/create').post(userController.createUserControllerFn);

//router.route('/user/register').post(userController.createUserControllerFn);

router.get('/user-list', async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

//Маршрут для получения данных пользователя по id
router.get('/user/:_id', async (req, res) => {
    const _id = req.params._id;
    try {
        // 
        const user = await User.findOne({ _id }).exec();
        res.json(user);
        console.log('Durys')
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

//Используйте app.put() для настройки маршрута PUT-запроса
router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const user = await User.findOneAndUpdate({ id }, userData, { new: true });
        res.json(user);
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndDelete({ _id: id });

        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

module.exports = router;
