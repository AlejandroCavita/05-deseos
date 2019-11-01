import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {


  @ViewChild( IonList, {static: false}) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

    borrarLista( lista: Lista ) {

      this.deseosService.borrarLista( lista );
    }

    async editarLista( lista: Lista ) {

      const alert = await this.alertController.create({
          header: 'Editar Lista',
          inputs: [
            {
              name: 'titulo',
              type: 'text',
              value: lista.titulo,
              placeholder: 'Nombre de la Lista'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancelar');
                this.lista.closeSlidingItems();

              }
            },
            {
              text: 'Actualizar',
              handler: (data) => {
                console.log(data, lista);

                if (data.titulo.lenght === 0) { return; }

                // Editar Lista
                lista.titulo = data.titulo;
                this.deseosService.guardarStorage();
                this.lista.closeSlidingItems();

              }
            }
          ]
        });

      await alert.present();
    }
}
