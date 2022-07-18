import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heros.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top:20px
    }
  `]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesService: HerosService) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
      });
    
  }

}
