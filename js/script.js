jQuery(document).ready(function ($) {
  //switch off preloader
  function spinerOff() {
    $('#spinerWrap').addClass('d-none').removeClass('d-flex');
    $(document.body).removeClass('overflow-hidden');
  }

  spinerOff();

  // function for show password

  $('.toggle-password').click(function () {
    $(this).toggleClass('eye-slash');
    var input = $($(this).attr('toggle'));
    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });

  // ************************ Drag and drop ***************** //
  function dragsDocument(element) {
    let dropArea = element;
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover', 'mouseover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop', 'mouseout'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight(e) {
      dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
      dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;

      handleFiles(files);
    }

    function handleFiles(files) {
      files = [...files];
      files.forEach(uploadFile);
      files.forEach(previewFile);
    }

    function previewFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        let img = document.createElement('img');
        img.src = reader.result;
        dropArea.classList.add('full');

        element.querySelector('#gallery').innerHTML = `<img src="${img.src}">`;
      };
    }

    function uploadFile(file, i) {
      var url = 'https://api.cloudinary.com/';
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      formData.set('upload_preset', 'ujpu6gyk');
      formData.set('file', file);
      xhr.send(formData);
    }
  }
  let arr = Array.prototype.slice.call(document.getElementsByClassName('drop-area'));
  for (let i = 0; i < arr.length; i++) {
    dragsDocument(arr[i]);
  }

  $('.selectpicker').selectpicker();
});
