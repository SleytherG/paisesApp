import {Component, EventEmitter, Output, OnInit, Input} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.scss']
})
export class PaisInputComponent implements OnInit{

  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();
  termino: string = '';

  debouncer: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
      console.log('debouncer: ', valor);
    })
  }

  buscar() {
      this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino );
  }

}
