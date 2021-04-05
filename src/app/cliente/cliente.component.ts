import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from "../models/response";
import { DialogComponent } from "./dialog/dialog.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Cliente } from '../models/cliente';
import { DeleteComponent } from '../shared/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  readonly width:string='300px';
  public list:any[];
  public columnas:string[] = ['Id','Nombre','Apellido','Ciudad', 'País', 'Teléfono', 'Acciones'];
  constructor(private service: ApiclienteService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  this.list=[]
  }
  

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.service.getClientes().subscribe(x => {
      this.list = x.data;
    });
  }

  editCliente(cliente: Cliente): void{
    const dialogref = this.dialog.open(DialogComponent,{
      width: this.width,
      data:cliente
    });
    dialogref.afterClosed().subscribe(() =>{
      this.getClientes();
    })
  }

  deleteCliente(cliente: Cliente): void{
    const dialogref = this.dialog.open(DeleteComponent,{
      width: this.width
    });
    dialogref.afterClosed().subscribe(result =>{
      if(result){
        this.service.deleteCliente(cliente.id).subscribe(response =>{
          if(response.exito === 1){
            this.getClientes();
            this.snackBar.open('Cliente eliminado con éxito', '',{ duration: 2000 });
          }
        })
      }
      
    })
  }

  OpenAdd():  void{
    const dialogref = this.dialog.open(DialogComponent,{
      width: this.width
    });
    dialogref.afterClosed().subscribe( () =>{ 
      this.getClientes();
    })
  }
}
