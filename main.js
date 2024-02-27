import API from './scripts/api.js';
import UI from './scripts/ui.js';
//Class'ın örneğini oluştur
const api = new API();
const ui = new UI();
// sayfanın yüklnme olayını izle
document.addEventListener('DOMContentLoaded', async () => {

  // ekrana yüklenme gifi bas
  ui.renderLoader();

  //Api istek at
  await api.getPopular();


  //gelen verileri ekrana bas
  ui.renderCards(api.songs);
});

//Formun Gönderilme Olayını İzle

ui.form.addEventListener("submit", async (event) => {
  //Sayfayı yenilemeyi engelle
  event.preventDefault();

  //klimeye eriş
  const query = event.target.searchInput.value;

  // boşşa uyarı gönder 

  if (!query.trim()) return alert("lütfen aratilacak kelimeyi giriniz")
  //ekrana yükleniyor bas

  ui.renderLoader();
  //Başlığı güncelle

  ui.changeTitle(query + " icin sonuclar");

  //Api'dan şarkıları al
  await api.searchMusic(query);

  //şarkıları ekrana bas
  ui.renderCards(api.songs);
})

//Cardların tıklanma olayını izle
ui.list.addEventListener("click", (e) => {
  //Tıklanan eleman playBtn ise oynat
  if (e.target.id === "play-btn") {
    //tıklanılan karttaki şarkının bilgilerini al.
    const song = e.target.closest(".card").dataset;

    //Şarkıyı oynatma kısmını ekrana ver
    ui.renderPlayingInfo(song)
  }
})

//localden mode verisini al
const mode = localStorage.getItem("mode");
document.body.className = mode === "true" ? "dark" : "light";

ui.switch.checked = mode === "true";

//Switch değerinin değişimini izle
ui.switch.addEventListener("change", (e) => {
  // false açık mod
  //True gece modu

  const isDarkMode = e.target.checked;

  // Kullanıcının seçtiği değeri kaybetmemek için localde tutucaz
  localStorage.setItem("mode", isDarkMode);

  document.body.className = isDarkMode ? "dark" : "light";
})