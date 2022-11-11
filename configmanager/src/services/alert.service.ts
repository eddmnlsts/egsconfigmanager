import Swal from 'sweetalert2';

export class AlertService {


    alertConfirm(icon, title, message) {
        return Swal.fire({
            title: title,
            icon: icon,
            html: message,
            showCloseButton: false,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'gray',
          })
    }

    alert(icon, title, message) {
        return Swal.fire({
            title: title,
            icon: icon,
            html: message,
          })
    }

    alertMixin(timer, icon, title) {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: false,
            icon: icon,
            title: title,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }

    alertText(title, inputValue, showCancelButton, errorMessage) {
        return Swal.fire({
            title: title,
            input: 'password',
            inputLabel: '',
            inputValue: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            inputValidator: (value) => {
              if (value != inputValue) {
                return errorMessage;
              }
            }
        })
    }

}