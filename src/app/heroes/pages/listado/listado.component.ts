import { Component, OnInit } from '@angular/core';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  constructor(private heroesService: HerosService) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
      .subscribe(resp => {
        console.log(resp);
      });

  }

}
