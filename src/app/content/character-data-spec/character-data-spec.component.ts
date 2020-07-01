import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-character-data-spec',
  templateUrl: './character-data-spec.component.html',
  styleUrls: ['./character-data-spec.component.css']
})
export class CharacterDataSpecComponent implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
  }

}
