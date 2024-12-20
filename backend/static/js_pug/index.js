
if (typeof API_URL !== 'undefined') {
    require("../../styles/nav_card_format.less")
    require("../../styles/users_page_friends.less")
    require("../../styles/users_page_news.less")
    require("../../styles/users_page_redact.less")
}



$(document).ready(() => {
    render_all_users()
})



function render_all_users() {
    $.get('/api/admin', function(response) {
        render_cards_users(response);
    });
}

function render_cards_users(users) {
    for (let index in users) {
        let user = `
            <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
                <div class="card m-2 w-100">
                    <div class="card-body">
                        <img src="${users[index]['img']}" alt="Фото пользователя" width="128" height="128" class="mb-2">
                        <h4 class="card-title">Пользователь ${users[index]['id']}</h2>
                        <p class="card-text">Имя: ${users[index]['name']}</p>
                        <p class="card-text">Дата рождения: ${users[index]['date']}</p>
                        <p class="card-text">email: ${users[index]['email']}</p>
                        <p class="card-text">Роль: ${users[index]['role']}</p>
                        <p class="card-text">Статус: ${users[index]['status']}</p>
                        <a class="btn btn-primary" href="/user/friends/${users[index]['id']}"'>Подробнее</a>
                    </div>
                </div>
            </div>
         `
        $('#users').append(user)
    }
}