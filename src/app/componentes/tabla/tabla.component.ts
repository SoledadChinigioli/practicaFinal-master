import { DataApiService } from './../../servicios/data-api.service';
import { Persona } from './../../entidad/persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  personas: Persona []=[];
  isLogged=true;
  persona:Persona;

  nombreFormControl = new FormControl("", [Validators.required]);
  apellidoFormControl = new FormControl("", [Validators.required]);
  dniFormControl = new FormControl("", [Validators.required]);
 
  
  constructor(private servicio: DataApiService, private router: Router, private modalService: NgbModal ) { }


  

  ngOnInit() {
  this.getAll();
  }



  getAll() {
    this.servicio.getAll().subscribe(data => {
      this.personas = data;
      console.log(this.personas);
    });
  }

  delete(id: number) {
    const opcion = confirm('¿Está seguro que deseas confirmar el evento?');
    if (opcion === true) {
      this.servicio.delete(id).subscribe(data => {
        console.log(data);
        alert('Registro Eliminado');
        this.personas = this.personas.filter(personaValida => personaValida.id != id);
        // location.reload();
      });
    }
  }
  // Agregar
  agregar(idPersona: number) {
     this.router.navigate(['persona/']);
  }
  // ACTUALIZAR
  // update(idPersona: number) {
  //   this.router.navigate(['persona/' + idPersona]);
  // }

  open(editModal, i) {
    //this.modalContent = content;
    this.persona = i
    this.modalService.open(editModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  confirmarEdit(persona:Persona, editModal){
    this.servicio.put(persona.id, this.persona).subscribe(data => {
      this.persona = data;
      this.modalService.dismissAll();
    });
  }

  
}
