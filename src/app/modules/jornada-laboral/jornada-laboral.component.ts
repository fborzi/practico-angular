import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../models/empleado';
import { jornadaLaboral } from '../models/jornadaLaboral';
import { Turno } from '../models/turno';
import { EmpleadoServiceService } from '../services/empleado-service.service';
import { JornadaServiceService } from '../services/jornada-service.service';
import { TurnoService } from '../services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jornada-laboral',
  templateUrl: './jornada-laboral.component.html',
  styleUrls: ['./jornada-laboral.component.css']
})
export class JornadaLaboralComponent implements OnInit {

  formularioJornada!: FormGroup;
  jornadasLaborales: jornadaLaboral[] = [];
  listadoEmpleados: Empleado[] = [];
  listadoTurnos: Turno[] = [];
  empleado: number = 0;
  turno: number = 0;


  constructor(private fb: FormBuilder, private jornadaLaboralService: JornadaServiceService, private empleadoService: EmpleadoServiceService, private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.formularioJornada = this.fb.group({
      fecha: new FormControl('', Validators.required),
      horaIngreso: new FormControl('', Validators.required),
      horaSalida: new FormControl('', Validators.required),
      cantidadHoras: new FormControl('', Validators.required),
      empleado: new FormControl('', Validators.required),
      tipoJornada: new FormControl('', Validators.required)
    });


    this.obtenerJornadasLaborales();
    this.obtenerEmpleados();
    this.obtenerTurnos();

    this.jornadaLaboralService.getRefreshRequired().subscribe(
      respuesta => {
        this.obtenerJornadasLaborales();
      });


  }

  public obtenerTurnos() {
    this.turnoService.getTurnos().subscribe(
      (res) => { this.listadoTurnos = res; },
      (error: HttpErrorResponse) => { alert(error.message); }
    )
  }

  public obtenerEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (res) => { this.listadoEmpleados = res; },
      (error: HttpErrorResponse) => { alert(error.message); }
    )
  }

  public obtenerJornadasLaborales() {
    this.jornadaLaboralService.getJornadasLaborales().subscribe(
      (res) => { this.jornadasLaborales = res; },
      (error: HttpErrorResponse) => { alert(error.message); }
    )
  }

  guardar() {
    var jornada = new jornadaLaboral();

    jornada.fecha = this.formularioJornada.get('fecha')?.value;
    jornada.fechaInicio = this.formularioJornada.get('horaIngreso')?.value;
    jornada.fechaFin = this.formularioJornada.get('horaSalida')?.value;
    jornada.cantidadHoras = this.formularioJornada.get('cantidadHoras')?.value;
    jornada.tipoJornada = this.formularioJornada.get('tipoJornada')?.value;
    jornada.empleado = this.formularioJornada.get('empleado')?.value;

    const jornadaL : jornadaLaboral = 
    {
      "id": jornada.id,
        "tipoJornada":
        {
          "id": Number(jornada.tipoJornada)
        },
      "empleado":
        {
          "id": Number(jornada.empleado)
        },
        "fecha": jornada.fecha,
        "fechaInicio": jornada.fechaInicio,
        "fechaFin": jornada.fechaFin,
        "cantidadHoras": jornada.cantidadHoras
    }

    this.jornadaLaboralService.crearJornadaLaboral(jornadaL).subscribe(respuesta => {
      Swal.fire("Exito", "Se guardó correctamente", "success");
      this.formularioJornada.reset()
    },
      (error: HttpErrorResponse) => {Swal.fire("Error", error.error, "error")}
    )}
}
