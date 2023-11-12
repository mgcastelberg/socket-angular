export class Usuario {

  public nombre: string;

  constructor( nombre: string | null  ){
    this.nombre = nombre !== null ? nombre : 'sin-nombre';
  }

}
