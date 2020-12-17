function openAlert(messageTrigger) {
  let timerInterval;
  Swal.fire({
    title: messageTrigger.title,
    html: messageTrigger.html,
    timer: messageTrigger.timer,
    icon: messageTrigger.icon,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: () => {
      //  Swal.showLoading();
      timerInterval = setInterval(() => {
        const content = Swal.getContent();
        if (content) {
          const b = content.querySelector("b");
          if (b) {
            b.textContent = Swal.getTimerLeft();
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

export { openAlert };
