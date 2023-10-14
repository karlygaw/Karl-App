const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        match: /[a-zA-Z].*/
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        match: /[a-zA-Z].*/
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Проверка валидности email
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'Некорректный формат email'
        }
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Проверка на число и длину 11
                return /^\d{11}$/.test(value);
            },
            message: 'Некорректный формат мобильного номера'
        }
    },
    gender: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15
    },
    rpwd: {
        type: String,
        validate: {
            validator: function(value) {
                // Проверка совпадения с полем "pwd"
                return value === this.pwd;
            },
            message: 'Пароли не совпадают'
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
