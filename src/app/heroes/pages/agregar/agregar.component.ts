import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HerosService } from '../../services/heros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius:20px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HerosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    if (this.router.url.includes("editar")) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroePorId(id))
        )
        .subscribe(heroe => {
          this.heroe = heroe;
        })
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnakbar("Registro actualizado")
      })
    }
    else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnakbar("Registro creado correctamente")
          this.router.navigate(['/heroes/editar', heroe.id])
      })
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(resp => { 
        if (!resp) return;
        
      if (this.heroe.id) {
            this.heroesService.borrarHeroe(this.heroe.id!)
              .subscribe(resp => {
                this.mostrarSnakbar("Registro borrado correctamente")
                this.router.navigate(['/heroes']);
              })
          }
      });

    
  }

  mostrarSnakbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500 
    });
  }
}
