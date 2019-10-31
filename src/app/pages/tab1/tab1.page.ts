import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService,
               private router: Router,
               public alertController: AlertController ) {


  }

  async agregarLista() {

    const alert = await this.alertController.create({
        header: 'Nueva Lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre de la Lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          },
          {
            text: 'Agregar',
            handler: (data) => {
              console.log(data);

              if (data.titulo.lenght === 0) { return; }

              // Agregar Lista
              const idLista = this.deseosService.crearLista(data.titulo);

              this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);


            }
          }
        ]
      });

    await alert.present();
  }

  listaSeleccionada( lista: Lista ) {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
   }

}
