import { Injectable } from '@angular/core';
declare const $: any;

const type = ['', 'info', 'success', 'warning', 'danger'];

const displayedMessages = new Set();

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  onCongrats(message) {
    message = (message === undefined) ? 'Congratulations! You have successfully completed this task.' : message;
    this.showNotification('Congratulations!', 'icon-coins', 'bottom','center', message, 'alert-primary');
  }

  onInformation(message) {
    message = (message === undefined) ? 'You have successfully completed this task.' : message;
    this.showNotification('Info!', 'icon-trophy', 'bottom','center', message, 'alert-info');
  }

  onSuccesfull(message) {
    message = (message === undefined) ? 'You have successfully completed this task.' : message;
    this.showNotification('Heads up!', 'icon-bell-55', 'bottom','center', message, 'alert-success');
  }

  onWarning(message) {
    message = (message === undefined) ? 'Something went wrong, please try again.' : message;
    this.showNotification('Warning!', 'icon-bulb-63', 'bottom','center', message, "alert-warning");
  }

  onError(message) {
    message = (message === undefined) ? 'Something went wrong, please try again.' : message;
    this.showNotification('Oh snap!', 'icon-support-17', 'bottom','center', message, "alert-danger");
  }

   addToSetTemporarily(element, duration) {
    displayedMessages.add(element);
    setTimeout(() => {
      displayedMessages.delete(element);
    }, duration);
  }

  showNotification(alert, icono, from, align, message, color) {

    if (displayedMessages.has(message)) {
      return;
    }

    this.addToSetTemporarily(message, 5000)

    $.notify({
      message: message,
      icon: icono,
    }, {
      type: type[color],
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div style="width: 50%"><alert class="alert-with-icon"><div role="alert" class="alert ' + color + ' alert-with-icon alert-dismissible" style="position: relative;"><span data-notify="icon" class="tim-icons ' + 
                icono + '"></span><button type="button" aria-label="Close" class="close custom-button" data-notify="dismiss"><span aria-hidden="true" class="visually-hidden">×</span><span class="sr-only visually-hidden">Close</span></button><!----><span><b>' +
                alert + ' - </b>' + message + ' </span></div><!----></alert> </div>',
    });
  
    $('[data-notify="dismiss"]').on('click', function(){
      $(this).closest('.notifyjs-wrapper').hide();
    });
  }

}
