new Vue({
  el: "#app",
  data: {
    running: false,
    hpPlayer: 100,
    curing: 0,
    danoPlayer: 0,
    danoMonster: 0,
    hpMonster: 100,
    widthMonster: 100,
    widthPlayer: 100,
    colorPlayer: "green",
    colorMonster: "green",
    playerWin: 0,
    logs: [],
  },
  methods: {
    iniciar() {
      this.running = true;
      this.playerWin = 0;
      this.colorMonster = "green";
      this.colorPlayer = "green";
      this.hpPlayer = 100;
      this.hpMonster = 100;
    },
    attack() {
      danoPlayer = Math.floor(Math.random() * 10);
      danoMonster = Math.floor(Math.random() * 13);
      this.hpPlayer -= danoMonster;
      this.hpMonster -= danoPlayer;
      this.registrarLog(
        `Jogador atingiu o monstro com ${danoPlayer} e o monstro atingiu o jogador com ${danoMonster}`
      );
    },
    cure() {
      if (this.hpPlayer < 90) {
        this.curing = Math.floor(Math.random() * 10);
        danoMonster = Math.floor(Math.random() * 10);
        danoCureContextMonster = danoMonster;
        this.hpPlayer = this.curing - this.danoMonster + this.hpPlayer;
        this.registrarLog(
          `Jogador se curou com ${this.curing} e o monstro atingiu o jogador com ${danoCureContextMonster}`
        );
      } else {
        alert("Você só pode se curar se tiver menos de 90 de vida");
      }
    },
    special() {
      danoPlayer = Math.floor(Math.random() * 15);
      danoMonster = Math.floor(Math.random() * 13);
      this.hpPlayer -= danoMonster;
      this.hpMonster -= danoPlayer;
      this.registrarLog(
        `Jogador atingiu o monstro com ${danoPlayer} e o monstro atingiu o jogador com ${danoMonster}`
      );
    },
    encerrar() {
      this.running = false;
      if (this.hpMonster <= 0) {
        this.hpMonster = 0;
      }
      if (this.hpPlayer <= 0) {
        this.hpPlayer = 0;
      }
      this.logs = [];
    },
    registrarLog(text) {
      this.logs.unshift({ text });
    },
  },
  watch: {
    hpPlayer: function (newWidth) {
      this.widthPlayer = newWidth + "%";
      if (newWidth < 20) {
        this.colorPlayer = "red";
      }
    },
    hpMonster: function (newWidth) {
      this.widthMonster = newWidth + "%";
      if (newWidth < 20) {
        this.colorMonster = "red";
      }
    },
    widthMonster: function () {
      if (this.hpMonster <= 0 && this.hpPlayer > 0) {
        this.playerWin = 1;
        this.encerrar();
      } else if (this.hpMonster >= 0 && this.hpPlayer <= 0) {
        this.playerWin = 2;
        this.encerrar();
      }
    },
  },
});
