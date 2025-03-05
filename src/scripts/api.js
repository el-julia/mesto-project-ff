const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        authorization: '98e2ee8c-3458-4b67-a2fc-bc47b2fb0b6d',
        'Content-Type': 'application/json'
    }
}

//получаем карточки с сервера
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        })
};



const getusersinformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })

        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        })
};

// отправляем карточку на сервер
const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            link: link
        }),

        headers: config.headers
    })

        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        })

}

const updateEserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",

        body: JSON.stringify({
            name: name,
            about: about
        }),

        headers: config.headers

    })
}

const deletCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })

}

// лайкнуть карточку
const updateLikeCard = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        })

}




export { config, getInitialCards, getusersinformation, addNewCard, updateEserData, deletCard, updateLikeCard };