const fs = require('fs');
const path = require('path');
const db_users = require('../database/database_controllers/database_users_controller');

// Мокируем fs
jest.mock('fs');

const sample_data = {
    "users": [
      {
        "id": 1,
        "name": "Egor",
        "date": "10.12.2000",
        "friends": [
          4,
          3,
          9,
          12,
          15,
          14
        ],
        "role": "Администратор",
        "status": "Активный",
        "email": "zamok7707@gmail.com",
        "img": "/st2/img/img14.png",
        "password": "root"
      },
      {
        "id": 2,
        "name": "Егорчик",
        "date": "16.05.2004",
        "friends": [
          3,
          5
        ],
        "role": "Пользователь",
        "status": "Активный",
        "email": "slavik2004@gmail.com",
        "img": "/st2/img/img2.jfif",
        "password": "root"
      },
      {
        "id": 3,
        "name": "Valeros",
        "date": "09.05.1996",
        "friends": [
          1,
          2,
          8
        ],
        "role": "Пользователь",
        "status": "Заблокированный",
        "email": "valeros@gmail.com",
        "img": "/st2/img/img3.jfif",
        "password": "root"
      }
    ]
  }

let varible_data;

describe('DatabaseUsersController', () => {
 
    beforeEach(() => {
        fs.readFileSync.mockClear();
        fs.writeFileSync.mockClear();
    });

    test('getArrData should return parsed JSON data', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(sample_data));
        const result = db_users.getArrData();
        expect(result).toEqual(sample_data.users);
    });

    test('getUser by email from database', () => {
        const user_data = sample_data.users[0]
        const result = db_users.getUserByEmail(user_data.email)
        expect(result).toEqual(user_data)
    })

    test('getUser by id from database', () => {
        const user_data = sample_data.users[0]
        const result = db_users.getUserById(user_data.id)
        expect(result).toEqual(user_data)
    })

    test('FAILED test getUser by id from database', () => {
        const result = db_users.getUserById(12312)
        expect(result).toBeFalsy()
    })

    test('id friends user', () => {
        const user = sample_data.users[0]
        const result = db_users.getIdFriendsUser(user.id)
        expect(result).toEqual(user.friends)
    })


    test('JSON data friends user', () => {
        const user = sample_data.users[0]
        const result = db_users.getJSONFriendsUser(user.id)
        let mass = []
        const user_friends = db_users.getIdFriendsUser(user.id)
        sample_data.users.forEach((user) => {
            if (user_friends.includes(user.id))
                mass.push(user)
        })
        expect(result).toEqual(mass)
    })

    test('saveJsonData should return false on error', () => {
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('Permission denied');
        });
        const result = db_users.saveJsonData([]);
        expect(result).toBe(false);
    });

    test('addNews should add new item to the news array', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(sample_data));
        fs.writeFileSync.mockImplementation((path, data) => {
          varible_data = JSON.parse(data);
        });
        const user = sample_data.users[0]
        const result = db_users.addFriendUser(user.email, 2);
        expect(result).toBeTruthy();
        expect(varible_data.users[0].friends).toContain(2)
    });

    test('saveJsonData should return true and modify sample_data', () => {
      const result = db_users.saveJsonData({});
      expect(result).toBeTruthy();
    });
    

    test("change param user", () => {
      fs.readFileSync.mockReturnValue(JSON.stringify(sample_data));
      fs.writeFileSync.mockImplementation((path, data) => {
        varible_data = JSON.parse(data);
      });
      const test_name = "Test"
      const img_path = db_users.changeParam({
        name: test_name
      }, 1)
      expect(varible_data.users[0].name).toBe(test_name)
      expect(img_path).toBeTruthy()
    })
});