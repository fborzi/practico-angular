import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Empleado } from '../models/empleado';
import { EmpleadoServiceService } from '../services/empleado-service.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  formularioEmpleado!: FormGroup;
  listadoEmpleados: Empleado[] = [];



  constructor(private formBuilder : FormBuilder, private empleadoService: EmpleadoServiceService) { }

  ngOnInit(): void {
    this.formularioEmpleado = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required)
    });

    this.obtenerEmpleados();
    
    this.empleadoService.getRefreshRequired().subscribe(
      respuesta => {
        this.obtenerEmpleados();
      });

  }

  public obtenerEmpleados(){
    this.empleadoService.getEmpleados().subscribe(
      (res) => { this.listadoEmpleados = res; },
      (error : HttpErrorResponse) => {alert(error.message); }
    )
  }

  guardar(){
    var empleado = new Empleado();
    empleado.nombre = this.formularioEmpleado.get('nombre' )?.value
    empleado.apellido = this.formularioEmpleado.get('apellido')?.value
    
    this.empleadoService.crearEmpleado(empleado).subscribe(respuesta => {
      Swal.fire("Exito", "Se guardó correctamente", "success")
      this.formularioEmpleado.reset()
    },
      (error: HttpErrorResponse) => Swal.fire("Error", "Error", "error"))
    }



}
