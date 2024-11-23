const fs = require('fs');
const { json } = require('body-parser');
const path = require('path');

class DatabaseNewsController {
    constructor(path_database) {
        this.path = path_database;
    }

    getArrData() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            const json_data = JSON.parse(data);
            return json_data['news'];
        } catch(e) {
            console.error("Ошибка при открытий JSON файла");
            return false;
        }
    }

    saveJsonData(json_data) {
        try {
            const data = {
                news: json_data
            }
            fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (err) {
            console.error('Ошибка при сохранении данных:', err);
            return false;
        }
    }


    addNews(id, post, img = null) {
        const data = this.getArrData();
        const newsItem = {
            id: id,
            post: post
        };
        if (img !== null) {
            newsItem.photo = img;
        }
        data.push(newsItem);
        return this.saveJsonData(data);
    }
    

    getAllNews() {
        return this.getArrData();
    }


}
module.exports = new DatabaseNewsController(path.join(__dirname, '..', 'database_json', 'news.json'));