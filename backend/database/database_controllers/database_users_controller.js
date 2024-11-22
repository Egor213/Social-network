const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');
const db_news = require(path.join(__dirname, 'database_news_controller'));
class DatabaseUsersController {
    constructor(path_database) {
        this.path = path_database;
    }

    getArrData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data['users'];
        } catch(e) {
            console.error("Ошибка при открытий JSON файла");
            return false;
        }
    }

    getUserByEmail(email) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].email == email) 
                return data[index];
        }
    }

    getAllUsers() {
        return this.getArrData();   
    }

    getUserById(id) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].id == id) 
                return data[index];
        }
        return false;
    }

    getUserByEmailPassword(email, password) {
        const data = this.getArrData();
        for (let index in data) {
            if (data[index].email == email && data[index].password == password) 
                return data[index];
        }
        return false;
    }

    getIdFriendsUser(id) {
        const user = this.getUserById(id);
        if (user)
            return user.friends;
        return false;
    }


    getJSONFriendsUser(id) {
        const data = this.getArrData();
        const id_friends = this.getIdFriendsUser(id);
        if (!id_friends)
            return false;
        const dest_json = [];
        for (let index in data) {
            if (id_friends.includes(data[index].id)) {
                dest_json.push(data[index])
            }
        }
        return dest_json;
    }


    getNewsFriends(id, email = '') {
        if (email) {
            const user = this.getUserByEmail(email)
            if (user)
                id = user.id
        }
        const friends = this.getIdFriendsUser(id);
        const temp_json = [];
        friends.push(parseInt(id))
        const all_news = db_news.getAllNews()
        for (let news of all_news) {
            if (friends.includes(news.id)) {
                let user = this.getUserById(news.id)
                news.name = user.name
                news.img = user.img
                news.email = user.email
                temp_json.push(news)
            }
        }
        temp_json.reverse()
        return temp_json;
    }

    saveJsonData(json_data) {
        try {
            const data = {
                users: json_data
            }
            fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (err) {
            console.error('Ошибка при сохранении данных:', err);
            return false;
        }
    }

    isValidDate(date_string) {
        const regex = /^\d{4}\-\d{2}\-\d{2}$/;
        if (!regex.test(date_string)) {
            return false;
        }

        const parts = date_string.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        if (month < 1 || month > 12)
            return false;
        const days_in_month = new Date(year, month, 0).getDate();
        return day > 0 && day <= days_in_month && year < 2024 && year > 1850;
    }

    changeParam(value_obj, id) { 
        if (!value_obj || !id) {
            console.error('Неверное значение value: ', value_obj, " id: ", id);
            return false;
        }
        const data = this.getArrData();
        for (let user of data) {
            if (user.id == id) {
                for (let key in value_obj) {
                    if (value_obj[key]) {
                        console.log(value_obj[key])
                        if (key === 'date')
                            if (this.isValidDate(value_obj[key]))
                                user[key] = this.convertDate(value_obj[key])
                            else
                                return false;
                        else
                            user[key] = value_obj[key]
                    }
                        
                }
                if (this.saveJsonData(data))
                    return true;
            }
        }
        return false
    }

    convertDate(dateStr) {
        const [year, month, day] = dateStr.split('-'); 
        return `${day}.${month}.${year}`; 
    }

    addUser(user) {
        if (this.getUserByEmail(user.email)) {
            return false; 
        }
        user.date = this.convertDate(user.date);
        const data = this.getArrData();
        const lastUser = data[data.length - 1]; 
        const newId = lastUser ? lastUser.id + 1 : 1;
        const newUser = { ...user, id: newId,  friends: [], role:'Пользователь', status:'Активный', img:null};
        data.push(newUser);
        return this.saveJsonData(data);
    }

    addFriendUser(email, id) {
        id = parseInt(id)
        const data = this.getArrData()
        for (let user of data) {
            if (user.email == email) {
                const has_user = this.getUserById(id)
                if (!has_user || user.friends.includes(id))
                    return false
                user.friends.push(id)
                return this.saveJsonData(data);
            }
        }
        return false;
    }

    hasImg(path_img) {
        return fs.existsSync(path_img); // Возвращает true, если файл существует, иначе false
      }

    deleteImgUser(email) {
        const data = this.getArrData();
        for (let user of data) {
            if (user.email == email) {
                const path_img = path.join(__dirname,'..','..', user.img.replace('st2', 'static'))
                if (!this.hasImg(path_img)) {
                    return false; 
                }
                try {
                    fs.unlinkSync(path_img);
                    user.img = null
                    return this.saveJsonData(data); 
                } catch (err) {
                    return false;
                }
            }
        }
    }
    


    deleteFriendUser(email, id_delete) {
        const data = this.getArrData()
        for (let user of data) {
            if (user.email == email) {
                user.friends = user.friends.filter(item => item != id_delete);
                return this.saveJsonData(data);
            }
        }
        return false;
    }

    setImgUser(email, img_path) {
        console.log(email)
        console.log(img_path)
        const data = this.getArrData()
        for (let user of data) {
            if (user.email == email) {
                user.img = img_path
                this.saveJsonData(data)
                return img_path
            }
        }
        return false;
    }
    
}
module.exports = new DatabaseUsersController(path.join(__dirname, '..', 'database_json', 'users.json'));