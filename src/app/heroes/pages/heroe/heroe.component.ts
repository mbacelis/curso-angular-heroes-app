import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroesService: HerosService
    ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => {
        this.heroe = heroe;
    })
  }
}
