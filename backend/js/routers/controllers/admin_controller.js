const path = require('path');
const db_users = require(path.join(__dirname, '..','..', '..', 'database', 'database_controllers', 'database_users_controller'));
class AdminController {
    renderMainPage(req, res) {
        const data = db_users.getAllUsers();
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Пользователи не найдены"});
    }

    getUser(req, res) {
        const email = req.query.email; // Извлекаем email из query
        const password = req.query.password; // Извлекаем password из query

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }
        const data = db_users.getUserByEmailPassword(email, password);
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Пользователь не найден"});
    }

    addUser(req, res) {
        const result = db_users.addUser(req.body)
        if (result)
            res.status(200).json({error: "Пользователь создан"});
        else
            res.status(400).json({error: "Пользователь уже существует!"});
    }
}

module.exports = new AdminController();
