# Práctica 5. Objetos, clases e interfaces

### Clase Nota

La clase nota se encarga de crear un objeto que recoja los atributos título, cuerpo y color. Esta clase está compuesta por sus respectivos Getters y Setters y cuenta con dos métodos para imprimir el título y el cuerpo de la nota con el color que se le haya asignado.
- Clase:
  ```
  export class Nota {
  constructor(protected titulo: string, protected cuerpo: string,
    protected color: string) {}
  }
  ```
- Getters:
  ```
  getTitulo(): string {
    return this.titulo;
  }

  getCuerpo(): string {
    return this.cuerpo;
  }

  getColor(): string {
    return this.color;
  }
  ```
- Setters:
  ```
  setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  setCuerpo(cuerpo: string) {
    this.cuerpo = cuerpo;
  }

  setColor(color: string) {
    this.color = color;
  }
  ```
- Impresión:
```
  showTitulo(): void {
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
      default:
        console.log(chalk.red("No es un color válido"));
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
      default:
        console.log(chalk.red("No es un color válido"));
        break;
    }
  }
}
```
### Clase GestorNota

La clase GestorNota se encarga de implementar las funciones que los usuarios pueden llevar a cabo sobre las notas. Esta clase cuenta con un constructor vacío y con 5 métodos que se explicarán a continuación.
- addNota: este método se encarga de añadir una nueva nota a la base de datos, para ello recibe el nuevo objeto y el nombre de usuario como parámetros, a continuación utilizando los distintos métodos que proporciona la API síncrona para trabajar con ficheros de Node.js se comprueba la existencia de directorios, documentos y se escribe en un fichero .JSON.
  ```
  addNota(nota: Nota, usuario: string): void {
    const ruta: string = './src/database/' + usuario;
    const rutafichero: string = './src/database/' + usuario + '/' +
    nota.getTitulo() + '.json';

    if (fs.existsSync(ruta)) {
      console.log(chalk.green("Bienvenido de nuevo!"));
      if (fs.existsSync(rutafichero)) {
        console.log(chalk.red("El título de la nota ya ha sido usado"));
      } else {
        // eslint-disable-next-line max-len
        fs.writeFileSync(rutafichero, `{\n\t"titulo": "${nota.getTitulo()}",\n\t"cuerpo": "${nota.getCuerpo()}",\n\t"color": "${nota.getColor()}"\n}`);
        console.log(chalk.green("Nota agregada!"));
      }
    } else {
      console.log(chalk.green("Bienvenido, creando su directorio personal!"));
      fs.mkdirSync(ruta);
      // eslint-disable-next-line max-len
      fs.writeFileSync(rutafichero, `{\n\t"titulo": "${nota.getTitulo()}",\n\t"cuerpo": "${nota.getCuerpo()}",\n\t"color": "${nota.getColor()}"\n}`);
      console.log(chalk.green("Nota agregada!"));
    }
  }
  ```
- editNota: este método se encarga de editar una nota ya creada, para ello recibe como parámetros el usuario y el título de la nota, posteriormente se verifica que esta nota exista y se sobrescriben los datos antiguos por los nuevos que recibe el método.
  ```
    editNota(usuario: string, titulo: string, cuerpo: string, color: string) {
    const rutafichero: string = './src/database/' + usuario + '/' +
    titulo + '.json';

    if (fs.existsSync(rutafichero)) {
      // eslint-disable-next-line max-len
      fs.writeFileSync(rutafichero, `{\n\t"titulo": "${titulo}",\n\t"cuerpo": "${cuerpo}",\n\t"color": "${color}"\n}`);
      console.log(chalk.green("Nota modificada correctamente!"));
    } else {
      console.log(chalk.red("No se encontro la nota"));
    }
  }
  ```
- removeNota: este método se encarga de eliminar una nota recibiendo como parámetros el título de la misma y el usuario propietario, para ello se comprueba que la nota existe y utilizando la función **fs.rmSync** se elimina la nota seleccionada.
  ```
  removeNota(titulo: string, usuario: string): void {
    const rutafichero: string = './src/database/' + usuario + '/' +
    titulo + '.json';

    if (fs.existsSync(rutafichero)) {
      fs.rmSync(rutafichero);
      console.log(chalk.green("Nota eliminada!"));
    } else {
      console.log(chalk.red("No se ha encontrado ninguna nota con ese título"));
    }
  }
  ```
- listNotas: este método se encarga de listar todas las notas que tenga un usuario, para ello se guarda en un array de string el nombre de todas las notas que se encuentran en el directorio personal del usuario con **readdirSync** y posteriormente se lee el título de estas con **readFile** y se imprime en el color correspondiente utilizando **chalk**
  ```
  listNotas(usuario: string): void {
    const ruta: string = './src/database/' + usuario;

    if (existsSync(ruta)) {
      const aux: string[] = [];
      readdirSync(ruta).forEach((element) => {
        aux.push(element);
      });

      if (aux.length == 0) {
        console.log(chalk.red("El usuario no tiene notas"));
      } else {
        aux.forEach((nota) => {
          readFile(`./src/database/${usuario}/${nota}`, (err, data) => {
            if (err) {
              console.log(chalk.red("Error de lectura"));
            } else {
              const aux2 = JSON.parse(data.toString());
              if (aux2.color == "Rojo") {
                console.log(chalk.red(nota));
              } else if (aux2.color == "Azul") {
                console.log(chalk.blue(nota));
              } else if (aux2.color == "Verde") {
                console.log(chalk.green(nota));
              } else if (aux2.color == "Amarillo") {
                console.log(chalk.yellow(nota));
              }
            }
          });
        });
      }
    }
  }
  ```
- readNota: este método se encarga de imprimir el contenido de una nota, para ello el método recibe como parámetros el nombre de usuario y el título de la nota, a continuación se comprueba la existencia de la nota y mediante el uso de **readFile** y **JSON.parse** se imprime el contenido correspondiente al título y al cuerpo de la nota con el color establecido.
  ```
  readNota(usuario: string, titulo: string): void {
    if (existsSync(`./src/database/${usuario}/${titulo}.json`)) {
      readFile(`./src/database/${usuario}/${titulo}.json`, (err, data) => {
        if (err) {
          console.log(chalk.red("Error de lectura"));
        } else {
          const aux = JSON.parse(data.toString());
          switch (aux.color) {
            case 'Rojo':
              console.log(chalk.red(`\n${aux.titulo}\n${aux.cuerpo}\n`));
              break;
            case 'Azul':
              console.log(chalk.blue(`\n${aux.titulo}\n${aux.cuerpo}\n`));
              break;
            case 'Verde':
              console.log(chalk.green(`\n${aux.titulo}\n${aux.cuerpo}\n`));
              break;
            case 'Amarillo':
              console.log(chalk.yellow(`\n${aux.titulo}\n${aux.cuerpo}\n`));
              break;
          }
        }
      });
    } else {
      console.log(chalk.red('No existe esa nota'));
    }
  }
  ```
### Aplicación
En el fichero index.ts se lleva a cabo la configuración de la línea de comandos utilizando las funcionalidades ofrecidas por el paquete **yargs** de la que contará la aplicación, un ejemplo de comando puede ser Add:
```
yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
    typeof argv.body === 'string' && typeof argv.color === 'string') {
      const nuevaNota = new Nota(argv.title, argv.body, argv.color);
      const gestor = new GestorNota();
      gestor.addNota(nuevaNota, argv.user);
    } else {
      console.log(chalk.red('Argumentos no válidos'));
    }
  },
});
```

Cabe destacar que hay que incluir la siguiente línea al final del fichero para hacer funcional nuestro programa: `yargs.parse();`

### Conclusión

En esta práctica he aprendido a utilizar los paquetes yargs, chalks y la API síncrona de Node.js para gestión de ficheros para crear una aplicación interactiva que permita crear y eliminar ficheros en tiempo de ejecución, además se ha seguido el método de desarrollo TDD como viene siendo habitual y se ha incluido el cubrimiento de código utilizando GitHub Actions además de utilizar Sonar Cloud.

### Bibliografía

[Guión de la Práctica](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)

[Apuntes Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/)

[FS Documentation](https://nodejs.org/api/fs.html#fs_fs_existssync_path)

[Yargs](https://www.npmjs.com/package/yargs)