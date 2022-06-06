import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ]  ],
    favoritos: this.fb.array( [
      [ 'Metal Gear'],
      [ 'Death Stranding'],
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required );

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  
  constructor( private fb: FormBuilder ) { }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
          && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

  borrar( elem:number ) {
    this.favoritosArr.removeAt(elem);
  }

  guardar() {

    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    //this.miFormulario.reset();

  }

}
