//関数定義を管理

//urlというデータを取得できればJSON形式に変換して返す
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
    });
}

//urlというデータを取得できればJSON形式に変換して返す
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
    });
};

//与えられるurlはそれぞれの関数の引数によって異なる