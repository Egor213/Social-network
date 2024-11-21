const path = require('path');
const db_users = require(path.join(__dirname, '..', '..', '..', 'database', 'database_controllers', 'database_users_controller'));
class UserController {
    renderUserNews(req, res) {
        const user_id = req.params.id;
        const data = db_users.getNewsFriends(user_id);
        if (data.length > 0) { 
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "Новости пользователя не найдены" });
        }
    }

    renderUserFriends(req, res) {
        const user_id = req.params.id;
        const data = db_users.getJSONFriendsUser(user_id);
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Друзья не найдены"});
    }

    getUserFriendsByEmailPaswd(req, res) {
        const email = req.query.email; // Извлекаем email из query
        const password = req.query.password; // Извлекаем password из query

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }
        const user = db_users.getUserByEmailPassword(email, password);
        const data = db_users.getJSONFriendsUser(user.id);
   
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Друзья не найдены"});
    }

    renderUserName(req, res) {
        const user_id = req.params.id;
        const data = db_users.getNameUser(user_id);
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Пользователь не найден"});
    }

    renderUserJSON(req, res) {
        const user_id = req.params.id;
        const data = db_users.getUserById(user_id);
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Пользователь не найден"});
    }
    changeParams(req, res) {
        const { id, ...data } = req.body;
        const change_param = db_users.changeParam(data, id);
        if (change_param)
            res.status(200).json(change_param);
        else
            res.status(404).json({error: "Данные не были изменены!"});
    }

    
    deleteFriendUser(req, res) {
        console.log(req.query)
        const email = req.query.email; // Извлекаем email из query
        const id_delete = req.query.id; // Извлекаем password из query

        if (!email || !id_delete) {
            return res.status(400).json({ message: 'Email и id_delete обязательны' });
        }
        const delFriend = db_users.deleteFriendUser(email, id_delete)
        if (delFriend)
            res.status(200).json({message: "Okey"});
        else
            res.status(404).json({error: "Данные не были изменены!"});
    }


}

module.exports = new UserController();
