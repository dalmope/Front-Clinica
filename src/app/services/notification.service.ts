import { Injectable } from '@angular/core';
declare var $: any;

const type = ['', 'info', 'success', 'warning', 'danger'];

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  onError(message) {
    // 1 --> azul
    // 2 --> verde
    // 3 --> naranja
    const color = 4;

    $.notify({
      icon: "block",
      message: message,

    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: 'bottom',
        align: 'right'
      },
      template:
        '<alert class="alert-with-icon" [type]="warning alert-with-icon" [dismissible]="true">' +
        '<span class="tim-icons icon-bulb-63" data-notify="icon"> </span>' +
        '<span> <b> Warning! ---- </b>  </span>' +
        '<span data-notify="message">{2}</span>'+
        '</alert>'
        

    });

  }

  showNotification(from, align) {


    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
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
