export class Tarea{
    public id:number;
    public titulo:string;
    public descripcion:string;
    public estado:string;
    public dificultad:string;
    public creacion:string;
    public ultima_Edicion:string;
    public vencimiento:string;
    
    constructor(id:number,titulo: string,descripcion: string, estado: string, creacion: string, ultima_Edicion: string,vencimiento: string,dificultad: string){
        this.id = id ;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.creacion = creacion;
        this.ultima_Edicion = ultima_Edicion;
        this.vencimiento = vencimiento;
        this.dificultad = dificultad;
    }

}