const path = require('path');
const db_users = require(path.join(__dirname, '..', '..', '..', 'database', 'database_controllers', 'database_users_controller'));
const multer = require('multer');
const { dir } = require('console');
const fs = require('fs');


function getMaxImageNumber(directory) {
    const files = fs.readdirSync(directory);
    let maxNumber = 0;

    files.forEach((file) => {
        const match = file.match(/^img(\d+)\.\w+$/);
        if (match) {
            console.log('A')
            const number = parseInt(match[1], 10);
            if (number > maxNumber) {
                maxNumber = number;
            }
        }
    });
    
    return maxNumber;
}
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

    addFriendUser(req, res) {
        const email = req.query.email;
        const id_add = req.query.id; 
        if (!email || !id_add) {
            return res.status(400).json({ message: 'Email и id_add обязательны' });
        }
        const delFriend = db_users.addFriendUser(email, id_add)
        if (delFriend)
            res.status(200).json({message: "Okey"});
        else
            res.status(404).json({error: "Данные не были изменены!"});
    }

    deleteImgUser(req, res) {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: 'Email обязателен' });
        }
        const delImg = db_users.deleteImgUser(email)
        if (delImg)
            res.status(200).json({message: "Okey"});
        else
            res.status(404).json({error: "Не удалось удалить фотографию!"});
    }

    

    


      storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'static/img'); 
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.split('.').pop(); 
            const maxImageNumber = getMaxImageNumber('static/img');
            cb(null, `img${maxImageNumber + 1}.${extension}`); 
        },
      });
    upload = multer({ storage: this.storage });

    uploadImg(req, res) {
        const filePath = "../img_book/" +  req.file.filename;
        res.send(filePath);
    } 
      
    
}

module.exports = new UserController();
