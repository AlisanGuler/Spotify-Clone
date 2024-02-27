// api isteği atacak fonksiyonlar bu dosyada olacak



const options = {
    headers: {
        'X-RapidAPI-Key': '91d45926b7msh9bbec083ff4c6e2p125b7cjsn458126c39dae',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    },
};

// API işlemlerini yönetecek olan class

export default class API {
    //Kurucu method
    constructor() {
        this.songs = [];
    }
    //Türkiyedeki popüler müzikleri alır. 
    async getPopular() {
        const res = await fetch(
            "https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-TR&locale=tr", options
        )

        const data = await res.json();

        //Class'da tanımlanan songs değişkenine aktar
        this.songs = data.tracks

    }

    //aranan şarkıları al
    async searchMusic(query) {
        //api isteği at
        const res = await fetch(
            `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`, options)



        //gelen cevabı işle
        const data = await res.json()

        // Gelen CEvabın formatını değiş
        const formatted = data.tracks.hits.map((song) => {
            return song.track;
        });

        // gelen veriyi değişkene aktar
        this.songs = formatted;
    }

}
