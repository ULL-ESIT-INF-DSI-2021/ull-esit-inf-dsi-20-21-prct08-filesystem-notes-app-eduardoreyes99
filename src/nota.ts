import * as chalk from 'chalk';

type Color = "Rojo" | "Verde" | "Azul" | "Amarillo";

export class Nota {
  constructor(protected titulo: string, protected cuerpo: string,
    protected color: Color) {}

  getTitulo(): string {
    return this.titulo;
  }

  getCuerpo(): string {
    return this.cuerpo;
  }

  getColor(): Color {
    return this.color;
  }

  setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  setCuerpo(cuerpo: string) {
    this.cuerpo = cuerpo;
  }

  setColor(color: Color) {
    this.color = color;
  }

  showTitulo() {
    switch (this.color) {
      case "Rojo":
        console.log(chalk.red(this.titulo));
        break;
      case "Azul":
        console.log(chalk.blue(this.titulo));
      case "Verde":
        console.log(chalk.green(this.titulo));
        break;
      case "Amarillo":
        console.log(chalk.yellow(this.titulo));
        break;
    }
  }

  showCuerpo() {
    switch (this.color) {
      case "Rojo":
        console.log(chalk.red(this.cuerpo));
        break;
      case "Azul":
        console.log(chalk.blue(this.cuerpo));
      case "Verde":
        console.log(chalk.green(this.cuerpo));
        break;
      case "Amarillo":
        console.log(chalk.yellow(this.cuerpo));
        break;
    }
  }
}
