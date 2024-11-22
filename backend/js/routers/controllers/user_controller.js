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
        const data = db_users.getUserById(user_id).name;
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

    

    
    getNewNameFile(file_name) {
        const extension = file_name.split('.').pop();
        return `img${getMaxImageNumber('static/img') + 1}.${extension}`
    }

      storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'static/img'); 
        },
        filename: (req, file, cb) => {
            const file_name = file.originalname 
            cb(null, this.getNewNameFile(file_name)); 
        },
      });
    upload = multer({ storage: this.storage });

    uploadImg(req, res) {
        const email = req.query.email;
        const file_name = req.file.filename;
        if (!email || !req.file) {
            return res.status(400).json({ message: 'Email и file обязательны' });
        }
        const file_path = "/st2/img/" +  file_name;
        const result = db_users.setImgUser(email, file_path)
        if (result)
            res.status(200).json({path_img: result});
        else {
            const path_img = path.join(__dirname,'..','..','..', 'static/img/', file_name)
            if (fs.existsSync(path_img)) {
                try {
                    fs.unlinkSync(path_img);
                } catch (err) {}
            }
            res.status(404).json({error: "Не удалось установить фотографию!"});
        }
            
    } 
      
    
}

module.exports = new UserController();
