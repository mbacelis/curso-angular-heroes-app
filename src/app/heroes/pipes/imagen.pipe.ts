import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: true //El pipe se ejecuta cuando el argumento cambia, en este caso el objeto siempre es el mismo aunque las propiedades cambien
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if (!heroe.id && !heroe.alt_img) {
      return `assets/no-image.png` 
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    }

    return `assets/heroes/${heroe.id}.jpg`;
  }
}
