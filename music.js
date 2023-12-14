class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

let musicList = [
  new Music("Paramparça", "Teoman", "1.jpg", "1.mp3"),
  new Music("Bir Derdim Var", "Mor ve Ötesi", "2.jpg", "2.mp3"),
  new Music("Her şeyi Yak", "Duman", "3.jpg", "3.mp3"),
];
