import { DatePipe, Time } from "@angular/common";

export class jornadaLaboral {
    id: number = 0;
    fecha: string = '';
    fechaInicio: string = '';
    fechaFin: string = '';
    cantidadHoras: number = 0;
    empleado!: { id: number };
    tipoJornada!: {id : number};

    constructor(){}
}