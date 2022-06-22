import { Injectable } from '@angular/core';
declare var $: any;

const type = ['', 'info', 'success', 'warning', 'danger'];

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  onSuccesfull(message) {
    // 1 --> azul
    // 2 --> verde
    // 3 --> naranja
    const color = 2;
    this.showNotification('Well done! --> ', 'tim-icons icon-bell-55', 'bottom','center', message, color);
  }

  onError(message) {
    // 1 --> azul
    // 2 --> verde
    // 3 --> naranja
    const color = 4;
    this.showNotification('Warning! --> ', 'tim-icons icon-alert-circle-exc', 'bottom','center', message, color);
  }

  showNotification(alert, icono, from, align, message, color) {

    $.notify({
      message: message,
      icon: icono,
    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" class="btn btn-neutral btn-icon btn-round mr-1" data-notify="dismiss">  <i class="tim-icons icon-simple-remove"></i></button>' +
        '<b><span data-notify="icon">{1}</span></b> ' +
        '<b>' + alert + '<span data-notify="message">{2}</span> </b>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  ngOnInit() {
  }



}
