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
    element.getElementsByClassName('fileElem')[0].addEventListener('change', handleFiles, false);

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

    function handleFiles(files) {
      if (files.target) {
        files = files.target.files;
      }
      files = [...files];
      files.forEach(uploadFile);
      files.forEach(previewFile);
    }

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      handleFiles(files);
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

  // navigation on registration page. Can be deleted after implementing logic

  $('.button-next').click(function () {
    const nextTabLinkEl = $('#nav-tab .active').closest('.nav-link').next('.nav-link')[0];
    const nextTab = new bootstrap.Tab(nextTabLinkEl);
    nextTab.show();

    if ($('.active').index() == 0) {
      $('.nav-prev').addClass('invisible');
    } else $('.nav-prev').removeClass('invisible');
  });

  $('.nav-prev').click(function () {
    const prevTabLinkEl = $('#nav-tab .active').closest('.nav-link').prev('.nav-link')[0];
    const prevTab = new bootstrap.Tab(prevTabLinkEl);
    prevTab.show();

    if ($('.active').index() == 0) {
      $('.nav-prev').addClass('invisible');
    } else $('.nav-prev').removeClass('invisible');
  });

  var triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab a'));
  triggerTabList.forEach(function (triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl);

    triggerEl.addEventListener('click', function (event) {
      event.preventDefault();
      tabTrigger.show();
      if ($('.active').index() == 0) {
        $('.nav-prev').addClass('invisible');
      } else $('.nav-prev').removeClass('invisible');
    });
  });
});
