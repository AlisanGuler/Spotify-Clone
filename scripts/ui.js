// Arayüz DOM işlemleri

export default class UI {
    constructor() {
        this.list = document.getElementById("list")
        this.form = document.querySelector("#search-form");
        this.title = document.querySelector("#title");
        this.playArea = document.querySelector(".play-area");
        this.switch = document.querySelector("#switch");
    }

    //liste alanına yükleniyor basar
    renderLoader() {
        this.list.innerHTML = `
        
       <div class="container">
    <div class="plate">
        <div class="black">
            <div class="border">
                <div class="white">
                    <div class="center"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="player">
        <div class="rect"></div>
        <div class="circ"></div>
    </div>
</div>
        
`;
    }

    //ekrana kartları bas
    renderCards(songs) {
        //Gifi kaldır
        this.list.innerHTML = "";

        //dizideki her bir eleman için aşağıdaki fonksiyon çalışacak
        songs.forEach((song) => {
            //Elementi oluştur
            const div = document.createElement("div");

            //Class ekle
            div.className = "card";

            // inner html gir
            div.innerHTML = `
            <figure>
            <img
                src="${song.images.coverarthq}" />
            <div id="play">
                <i id="play-btn" class="bi bi-play-fill"></i>
            </div>
            </figure>

             <h4>${song.title}</h4>
             <p>${song.subtitle}</p>
            `
            // console.log(song)

            //4) data verileri ekle
            div.dataset.title = song.title;
            div.dataset.photo = song.images.coverarthq;
            div.dataset.url = song.hub?.actions[1].uri;

            // kartı html'e gönder
            this.list.appendChild(div);

        })
    }

    //Başlığı güncelleyen metot
    changeTitle(text) {
        this.title.innerText = text;
    }

    //Müzik oynatma kısmını ekrana ver
    renderPlayingInfo(song) {
        this.playArea.innerHTML = `
        <div>
          <img
            class="animate"
            src="${song.photo}"
          />
  
          <div>
            <p>Şuan Oynatılıyor...</p>
            <h3>${song.title}</h3>
          </div>
        </div>
  
        <audio controls autoplay src="${song.url}"></audio>
        `;
    }
}

