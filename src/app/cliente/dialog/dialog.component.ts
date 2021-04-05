import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';
import { ApiclienteService } from 'src/app/services/apicliente.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public nombre:string='';
  ClienteForm = this.fb.group({
    nombre: [''],
    apellido:[''],
    ciudad:[''],
    pais:[''],
    telefono:['']
  });
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    private service: ApiclienteService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente) {
      if(this.cliente !== null){
        this.ClienteForm.controls['nombre'].setValue(cliente.nombre);
        this.ClienteForm.controls['apellido'].setValue(cliente.apellido);
        this.ClienteForm.controls['ciudad'].setValue(cliente.ciudad);
        this.ClienteForm.controls['pais'].setValue(cliente.pais);
        this.ClienteForm.controls['telefono'].setValue(cliente.telefono);
      }
     }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  editCliente(){
    const cliente: Cliente = {id:this.cliente.id,
      nombre: this.ClienteForm.controls['nombre'].value,
      apellido: this.ClienteForm.controls['apellido'].value,
      ciudad:this.ClienteForm.controls['ciudad'].value,
      pais: this.ClienteForm.controls['pais'].value,
      telefono: this.ClienteForm.controls['telefono'].value};

      this.service.editCliente(cliente).subscribe(response => {
        if (response.exito === 1) {
          this.snackBar.open('Cliente editado con éxito','',{duration: 2000});
          this.dialogRef.close();
        }
      });
  }
  
  addCliente() {
    const cliente: Cliente = {id:0,
                              nombre: this.ClienteForm.controls['nombre'].value,
                              apellido: this.ClienteForm.controls['apellido'].value,
                              ciudad:this.ClienteForm.controls['ciudad'].value,
                              pais: this.ClienteForm.controls['pais'].value,
                              telefono: this.ClienteForm.controls['telefono'].value};

    this.service.addCliente(cliente).subscribe(response => {
      if (response.exito === 1) {
        this.snackBar.open('Cliente insertado con éxito','',{duration: 2000});
        this.dialogRef.close();
      }
    });
  }
}
