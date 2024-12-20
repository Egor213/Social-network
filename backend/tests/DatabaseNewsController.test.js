const fs = require('fs');
const path = require('path');
const db_news = require('../database/database_controllers/database_news_controller');

// Мокируем fs
jest.mock('fs');

const sample_data = {
    "news": [
      {
        "id": 1,
        "post": "Однажды диму спросили что находится в 13 строке и ...",
        "photo": "https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
      },
      {
        "id": 2,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 2,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 3,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 5,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 6,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 6,
        "post": "Однажды я решил устроить друзьям сюрприз и провести весь день, говоря только стихами. Сначала это было весело — каждый ответ был как маленький стих, и все смеялись. Но к середине дня друзья начали устало смотреть на меня, просили «говорить нормально», но я не сдавался. К вечеру я уже сам устал придумывать рифмы, но, как только они признали меня чемпионом стихов, понял, что всё было не зря!"
      },
      {
        "id": 1,
        "post": "<h1>Рысь — загадочный хищник</h1>\n  <p>Рысь — это средних размеров хищная кошка, обитающая в лесах Европы, Азии и Северной Америки. Она известна своей удивительной скрытностью и ловкостью. Эти кошки обладают острыми когтями, которые могут быть скрыты, что помогает им бесшумно передвигаться по лесу в поисках добычи.</p>\n\n  <p>Рысь имеет характерную внешность с небольшими кисточками на ушах и коротким хвостом. Она является отличным охотником и предпочитает охотиться на мелких млекопитающих, таких как зайцы и птицы. Эти кошки имеют уникальные способности: они могут прыгать на большие расстояния и легко взбираться на деревья.</p>\n\n  <p>Загадочность рыси заключена в ее умении оставаться почти незаметной для людей, несмотря на свою силу и ловкость. Однако, несмотря на свою скрытность, рыси редко становятся угрозой для людей. Они предпочитают держаться подальше от человеческих поселений и являются одиночными охотниками.</p>\n\n  <p>Сейчас рыси находятся под угрозой исчезновения в некоторых регионах, что связано с утратой среды обитания и браконьерством. Поэтому важно предпринимать меры для их защиты и сохранения этих удивительных животных для будущих поколений.</p>",
        "photo": "https://cdn1.ntv.com.tr/gorsel/SBaVa4221kSWXVSoFoqKuA.jpg?width=1000&mode=both&scale=both&v=1273828999000"
      },
      {
        "id": 8,
        "post": "<h1>Лиса — умный и ловкий хищник</h1>\n  <p>Лиса — это небольшая хищная млекопитающая, широко распространенная по всему миру, от лесов до пустынь. Ее отличает умение адаптироваться к различным условиям и находить пищу в самых разных средах обитания. Лиса известна своей хитростью и сообразительностью, что делает ее превосходным охотником.</p>\n  <p>Лиса имеет тонкое тело с пушистым хвостом и заостренными ушами. Ее рыжая шерсть делает ее легко узнаваемой, хотя она часто может маскироваться в окружающей среде, особенно в лесах и на полях. Эти животные охотятся на мелких млекопитающих, таких как кролики и мыши, но также могут питаться ягодами и насекомыми, что делает их всеядными.</p>\n  <p>Лиса обладает исключительными навыками выживания и приспособления к различным условиям. Она может добывать себе пищу в любых условиях, использует хитрость для того, чтобы избежать хищников, и благодаря своей ловкости всегда остается в поиске новых возможностей.</p>\n  <p>Несмотря на свою хитрость и коварство, лиса редко представляет угрозу для человека. Чаще всего эти животные избегают людей и ведут скрытный образ жизни. Однако, из-за утраты среды обитания и увеличения числа браконьеров, лиса также сталкивается с угрозой исчезновения в некоторых районах.</p>",
        "photo": "https://avatars.mds.yandex.net/get-entity_search/937587/919894064/S600xU_2x"
      },
      {
        "id": 1,
        "post": "С гитхаба норм сработало",
        "photo": "https://www.iguides.ru/upload/medialibrary/e97/e9743993e6cfc90eec7e04113cb4b529.jpg"
      }
    ]
}

let varible_data;

describe('DatabaseNewsController', () => {
 
    beforeEach(() => {
        fs.readFileSync.mockClear();
        fs.writeFileSync.mockClear();
    });

    test('getArrData test', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(sample_data));
        const result = db_news.getArrData();
        expect(result).toEqual(sample_data.news);
    });

    test('saveJsonData should return false on error', () => {
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('Permission denied');
        });
        const result = db_news.saveJsonData([]);
        expect(result).toBe(false);
    });

    test('saveJsonData should return true and modify sample_data', () => {
        fs.writeFileSync.mockImplementation(() => {});
        const result = db_news.saveJsonData({});
        expect(result).toBeTruthy();
    });

    test('addNews test', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(sample_data));
        fs.writeFileSync.mockImplementation((path, data) => {
            varible_data = JSON.parse(data);
        });
        const test_post = 'Test post'
        const result = db_news.addNews(1, test_post);
        expect(result).toBeTruthy();
        let test_data = sample_data
        test_data.news.push({
            id: 1,
            post: test_post
        })
        expect(varible_data).toStrictEqual(test_data)
    }) 
});