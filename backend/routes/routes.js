const express = require('express');
const app = express(); // Создайте экземпляр Express приложения
const router = express.Router();
const userController = require('../src/user/userController');
const User = require('../src/user/userModel');

// После этого вы можете использовать userController
router.route('/user/create').post(userController.createUserControllerFn);

router.get('/user', async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Маршрут для получения данных пользователя по имени
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Используйте MongoDB или другую базу данных для поиска пользователя по имени
        const user = await User.findOne({ id }).exec();
        res.json(user);
        console.log('Durys')
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Используйте app.put() для настройки маршрута PUT-запроса
app.put('/user/:id', async (req, res) => {
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

module.exports = router;
