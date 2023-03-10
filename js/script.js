if ($('table[data-height]').length) {
  $('table[data-height]').each(function () {
    let height =
      $(this).closest('.table-container').height() -
      $(this).closest('.table-container').find('.row').outerHeight(true) -
      32;
    if (window.innerHeight < $(this).closest('.table-container').height()) {
      height =
        window.innerHeight -
        $(this).closest('.table-container').find('.row').outerHeight(true) -
        32;
      if ($(this).hasClass('tree')) {
        height = height - 130;
      }
    }

    if ($(this).closest('.table-container').hasClass('pb-32')) {
      height = height - 130;
    }
    if ($(this).closest('.table-container').find('.search-wrap').length) {
      height = height - 70;
    }
    if (
      $(this).closest('.table-container').hasClass('border-left-before') &&
      window.innerWidth >= 1500
    ) {
      height = height + (window.innerWidth - 1500) * 0.35;
    } else if ($(this).closest('.table-container').hasClass('border-left-before')) height = height - 100;
    if (height <= 0) {
      height = '';
    }

    $(this).attr('data-height', height);
  });
}

if ($('table[data-tree-enable]').length) {
  $('table[data-tree-enable]').each(function () {
    if ($(this).hasClass('add-height')) {
      let height =
        $(this).closest('.table-container').height() -
        $(this).closest('.table-container').find('.row').outerHeight(true) -
        32;
      $(this).attr('data-height', height);
    }
    $(this)
      .bootstrapTable({
        onScrollBody: function () {
          if ($(this).find($('td .dropdown-toggle'))) {
            $('td select + button.show').prev('select').selectpicker('toggle');
          }
        },
      })
      .treegrid({
        initialState: 'collapsed',
      });

    $(document)
      .off('click', '.treegrid-collapsed, .treegrid-expanded')
      .on('click', '.treegrid-collapsed, .treegrid-expanded', function (e) {
        if ($(e.target).prop('tagName') == 'TD') {
          $($(e.target).closest('tr')).find('.treegrid-expander').trigger('click');
        }
      });
  });
}
jQuery(document).ready(function ($) {
  if ($('.table-datatable').length) {
    if ($('.table-datatable').hasClass('table-fixed')) {
      $('.table-fixed').DataTable({
        scrollY: function () {
          return `${$($(this).find('table')).attr('data-height')}px`;
        },
        paging: false,
        deferRender: true,
        scroller: true,
      });
    } else $('.table-datatable').DataTable();
  }
  $('table[data-toggle="table"]').on('scroll-body.bs.table', function () {
    if ($(this).find($('td .dropdown-toggle'))) {
      $('td select + button.show').prev('select').selectpicker('toggle');
    }
  });
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

  // function to move in next tab

  var elts = document.getElementsByClassName('text-code');
  Array.from(elts).forEach(function (elt) {
    elt.addEventListener('keyup', function (event) {
      if ((event.keyCode === 13 || elt.value.length == 1) && elt.nextElementSibling) {
        elt.nextElementSibling.focus();
      }
    });
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
    let url;

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
    }

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      handleFiles(files);
    }

    function previewFile(file, url) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        let img = document.createElement('img');
        img.src = reader.result;
        dropArea.classList.add('full');

        element.querySelector('.gallery').innerHTML = `<img src="${img.src}" data-url="${url}">`;
      };
    }

    function uploadFile(file, i) {
      // var url = 'https://api.cloudinary.com/v1_1/dlv7otqvk/image/upload';
      // var xhr = new XMLHttpRequest();
      // var formData = new FormData();
      // xhr.open('POST', url, true);
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // formData.set('upload_preset', 'ml_default');
      // formData.set('file', file);
      // xhr.send(formData);
      // xhr.onload = function () {
      //   var a = JSON.parse(xhr.response);
      //   url = a['url'];

      //   previewFile(file, url);
      // };

      if ($(dropArea).hasClass('open-cropper')) {
        UploadCrop(dropArea, file);
      } else {
        previewFile(file);
      }
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

  // initial for toggle menu
  function drawStuff() {
    if ($(window).width() < 992) {
      $('.asidebar').addClass('collapse').removeClass('fliph left sidebar');
      $('.asidebar').attr('id', 'navigation');
      $('.animated-hamburger').removeClass('open');
    } else if ($(window).width() >= 992) {
      $('.asidebar').addClass('no-anim');
      $('.asidebar').removeClass('collapse');
      $('.asidebar').addClass('sidebar left');
      $('.asidebar').attr('id', '');
      setTimeout(() => $('.asidebar').removeClass('no-anim'), 500);
    }
    $('.navbar-toggler-button').on('click', function () {
      $('.animated-hamburger').toggleClass('open');
    });
    $('#navigation').on('hidden.bs.collapse', function () {
      setTimeout(() => $('#navigation').removeClass('show'), 200);
    });
  }

  drawStuff();
  $(window).resize(function () {
    drawStuff();
  });

  // add vh for mobile (needs for responsive, when bar with url hidding)
  if ($(window).width() < 768) {
    (function init100vh() {
      function setHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      setHeight();
      window.addEventListener('resize', setHeight);
    })();
  }

  // main chart
  function mainChart() {
    let maxDay = 14;
    let datas = [
      { x: 0, y: 30, date: '1/1/22' },
      { x: 1, y: 18, date: '2/1/22' },
      { x: 2, y: 39, date: '3/1/22' },
      { x: 3, y: 70, date: '4/1/22' },
      { x: 4, y: 79, date: '5/1/22' },
      { x: 5, y: 65, date: '6/1/22' },
      { x: 6, y: 90, date: '7/1/22' },
      { x: 7, y: 30, date: '8/1/22' },
      { x: 8, y: 60, date: '9/1/22' },
      { x: 9, y: 60, date: '10/1/22' },
      { x: 10, y: 50, date: '11/1/22' },
      { x: 11, y: 79, date: '12/1/22' },
      { x: 12, y: 65, date: '13/1/22' },
      { x: 13, y: 90, date: '14/1/22' },
    ];

    var ctx = document.getElementById('mainChart').getContext('2d');

    const footer = tooltipItems => {
      console.log(tooltipItems[0].label);
      return `${labels1[tooltipItems[0].label % 7]}, ${tooltipItems[0].raw.date}`;
    };

    const title = tooltipItems => {
      return '$' + tooltipItems[0].formattedValue;
    };
    let labels1 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(205,242,205,1)');
    gradient.addColorStop(1, 'rgba(205,242,205,0)');

    let mainSettings = {
      type: 'line',
      data: {
        labels: [...Array(maxDay).keys()],
        datasets: [
          {
            fill: true,
            backgroundColor: gradient,
            borderColor: '#55D168',
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 10,
            hitRadius: 5,
            data: datas,
            pointStyle: function (context) {
              var img = new Image(20, 20);
              img.src = './img/ellipse_chart.png';
              return img;
            },
          },
        ],
      },
      interaction: {
        intersect: false,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#fff',
            titleFont: {
              weight: 'bold',
              size: 14,
              family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            },
            titleColor: '#000',
            footerFont: {
              weight: 'normal',
              size: 12,
              family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            },
            footerColor: '#000',
            displayColors: false,
            bodyFont: { size: 0 },
            padding: 11,
            cornerRadius: 8,
            borderColor: '#E1E1E1',
            borderWidth: 1,
            callbacks: {
              footer: footer,
              title: title,
            },
          },
          parsing: {
            xAxisKey: 'x',
          },
        },
        responsive: true,
        tension: 0.5,
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: function (value, index, ticks) {
                return '$' + value;
              },
              color: '#000000',
              font: {
                size: 14,
                family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              },
            },
            border: {
              color: '#ff000000',
            },
            grid: {
              color: '#E8E9EA',
              borderCapStyle: 'round',
              borderDash: [9, 9],
              tickColor: '#ff000000',
              borderWidth: 0,
              lineWidth: 2,
            },
          },
          x: {
            scales: {
              type: 'linear',
            },
            grid: {
              display: false,
              borderWidth: 0,
            },
            ticks: {
              color: '#000000',
              font: {
                size: 14,
                family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              },
              callback: function (value, index, ticks) {
                return labels1[value % 7];
              },
            },
          },
        },
      },
    };
    let chart = new Chart(ctx, mainSettings);
    // here the functions for updating
    $('.btn').click(function () {
      function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach(dataset => {
          dataset.data.push(data);
        });
        chart.update();
      }

      function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
        chart.update();
      }
    });
  }

  if ($('#mainChart').length) {
    mainChart();
  }

  // small charts
  if ($('canvas.small-graph').length) {
    $('canvas.small-graph').each(function () {
      let datas = [
        { x: 0, y: Math.floor(Math.random() * 100), date: '1/1/22' },
        { x: 1, y: Math.floor(Math.random() * 100), date: '2/1/22' },
        { x: 2, y: Math.floor(Math.random() * 100), date: '3/1/22' },
        { x: 3, y: Math.floor(Math.random() * 100), date: '4/1/22' },
        { x: 4, y: Math.floor(Math.random() * 100), date: '5/1/22' },
        { x: 5, y: Math.floor(Math.random() * 100), date: '6/1/22' },
        { x: 6, y: Math.floor(Math.random() * 100), date: '7/1/22' },
        { x: 7, y: Math.floor(Math.random() * 100), date: '8/1/22' },
        { x: 8, y: Math.floor(Math.random() * 100), date: '9/1/22' },
        { x: 9, y: Math.floor(Math.random() * 100), date: '10/1/22' },
        { x: 10, y: Math.floor(Math.random() * 100), date: '11/1/22' },
        { x: 11, y: Math.floor(Math.random() * 100), date: '12/1/22' },
        { x: 12, y: Math.floor(Math.random() * 100), date: '13/1/22' },
        { x: 13, y: Math.floor(Math.random() * 100), date: '14/1/22' },
      ];

      var ctx = this.getContext('2d');

      var gradient = ctx.createLinearGradient(0, 0, 0, 40);
      gradient.addColorStop(0, 'rgba(205,242,205,1)');
      gradient.addColorStop(1, 'rgba(205,242,205,0)');

      let mainSettings = {
        type: 'line',
        data: {
          labels: datas.map(a => a['date']),
          datasets: [
            {
              fill: true,
              backgroundColor: gradient,
              borderColor: '#55D168',
              borderWidth: 1,
              pointRadius: 0,
              hitRadius: 0,
              data: datas,
            },
          ],
        },
        interaction: {
          intersect: false,
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y',
            },
          },
          responsive: true,
          tension: 0.5,
          scales: {
            y: {
              min: 0,
              max: 100,
              scales: {
                type: 'linear',
              },
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                borderWidth: 0,
              },
            },
            x: {
              scales: {
                type: 'linear',
              },
              grid: {
                display: false,
                borderWidth: 0,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      };
      let chart = new Chart(this, mainSettings);
    });
  }

  // search in table from default input
  $('#table_search').keyup(function () {
    $('.dataTables_wrapper input[type="search"]').val($('#table_search').val());
    var $search = $('.dataTables_wrapper').find('input[type="search"]');
    console.log($search);
    var e = $.Event('keyup');
    $search.trigger(e);
  });

  // buttons plus and minus

  $('.btn-number').click(function (e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == 'minus') {
        if (currentVal > input.attr('min')) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }
      } else if (type == 'plus') {
        if (currentVal < input.attr('max')) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr('max')) {
          $(this).attr('disabled', true);
        }
      }
    } else {
      input.val(0);
    }
  });
  $('#Expiration_root').click(function (e) {
    e.preventDefault();
    console.log('test');
  });
  if ($('.datepicker').length || $('[data-provide="datepicker"]').length) {
    let DateSettings = {
      title: 'Select expiration date',
      format: 'dd/mm/yyyy',
    };
    $.fn.datepicker.dates['en'] = {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['s', 'm', 't', 'w', 't', 'f', 's'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      today: 'Today',
      clear: 'Clear',
      format: 'mm/dd/yyyy',
      titleFormat: 'MM yyyy',
      weekStart: 0,
    };
    $('#datepicker-expiration').trigger('click');
    $('#datepicker-expiration')
      .datepicker(DateSettings)
      .on('changeDate', function (e) {
        var newday = new Date(e.date);
        var dd = newday.getDate();
        var mm = newday.getMonth() + 1;
        var yyyy = newday.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        newday = dd + '/' + mm + '/' + yyyy;
        $(e.currentTarget).siblings().val(newday);
      });
    $(document)
      .off('click', '#confirmation-btn')
      .on('click', '#confirmation-btn', function () {
        let value = $(this).closest('.modal-body').find('input[type="hidden"]').val();
        let input = $(this).attr('data-input');

        $(this).closest('.modal').find('.btn-close').trigger('click');
        $(input).val(value);
      });
    $(document)
      .off('click', '#Expiration')
      .on('click', '#Expiration', function () {
        $($(this).attr('data-linked-input')).datepicker('setDate', $(this).val());
      });
  }
  if ($('.edit-input').length) {
    $('.edit-input').each(function () {
      $(this).click(function (e) {
        let input = $(this).closest('.row').find('.editable-input');
        if (input.attr('readonly') == 'readonly') {
          input.attr('readonly', false);
          input.focus();
        } else input.attr('readonly', true);
        $(this).toggleClass('button-secondary button-green');
      });
    });
  }
  // function open cropper after uploading
  function UploadCrop(dropArea, file) {
    let element = $(dropArea).siblings('#container-crop')[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.src = reader.result;
      showCropper(img);
    };

    function showCropper(img) {
      $(dropArea).addClass('visually-hidden');
      $(element).toggleClass('visually-hidden');
      $('.crop-image-finish').toggleClass('disabled');
      let cropElement = $(element).cropme({
        container: {
          width: 400,
          height: 300,
        },
        viewport: {
          width: 220,
          height: 220,
          type: 'circle',
          border: {
            width: 0,
            enable: true,
            color: '#fff',
          },
        },
        zoom: {
          enable: true,
          mouseWheel: true,
          slider: true,
        },
        rotation: {
          slider: false,
          enable: false,
          position: 'left',
        },
        transformOrigin: 'viewport',
      });
      cropElement.cropme('bind', {
        url: img.src, //here you can change image that you use
      });
    }

    $('.crop-image-finish').on('click', testing);

    function testing() {
      cropElement.cropme('crop', {}).then(function (res) {
        console.log('resized', res);
      });

      myModal.hide();
    }
  }
  // inner dropdown in tables
  if ($('table').find('.selectpicker-inner').length) {
    $('.selectpicker-inner').selectpicker();

    $('.selectpicker-inner').on('hide.bs.select', function () {
      $('.fixed-table-body').css('overflow', '');
    });

    $('.selectpicker-inner + button').mouseover(function (e) {
      $('.fixed-table-body').css('overflow', 'inherit');
    });

    $('.selectpicker-inner + button').mouseleave(function (e) {
      $('.fixed-table-body').css('overflow', '');
    });
  }

  if ('.negotation-form '.length) {
    $(document)
      .off('keyup', '.form-counter-offer input')
      .on('keyup', '.form-counter-offer input', function () {
        $(this).val() && $(this).siblings('input').val()
          ? $(this).closest('.form-counter-offer').find('.button-green').attr('disabled', false)
          : $(this).closest('.form-counter-offer').find('.button-green').attr('disabled', true);
      });

    $(document)
      .off('click', '.save-negotation-form')
      .on('click', '.save-negotation-form', function () {
        var myModal = new bootstrap.Modal(document.getElementById('saveNegFormModal'));
        myModal.show();
      });

    $(document)
      .off('changed.bs.select', '.negotation-form')
      .on('changed.bs.select', '.negotation-form', function (e) {
        if ($(this).prop('tagName') == 'SELECT') {
          if ($(this).val() == 'CounterOffer') {
            $($(this).closest('td')[0]).find('.form-counter-offer').removeClass('visually-hidden');
          } else {
            $($(this).closest('td')[0]).find('.form-counter-offer').addClass('visually-hidden');
            var myModal;
            if ($(this).val() == 'Accept') {
              myModal = new bootstrap.Modal(document.getElementById('acceptModal'));
            }
            if ($(this).val() == 'Decline') {
              myModal = new bootstrap.Modal(document.getElementById('declineModal'));
            }
            if ($(this).val() == 'Cancel') {
              myModal = new bootstrap.Modal(document.getElementById('cancelModal'));
            }
            myModal.show();
          }
          $(this).selectpicker('val', '');
        }
      });
  }

  $(document)
    .off('changed.bs.select', '.buy-more-select')
    .on('changed.bs.select', '.buy-more-select', function (e) {
      if ($(this).prop('tagName') == 'SELECT') {
        if ($(this).val() == 'Alert') {
          var myModal;
          myModal = new bootstrap.Modal(document.getElementById('alertModal'));
          myModal.show();
        } else if ($(this).val() == 'View') {
          var win = window.open($(this).find(`option:selected`).attr('data-href'), '_blank');
          win.focus();
        }
        $(this).selectpicker('val', '');
      }
    });

  $(document)
    .off('changed.bs.select', '.sell-menu-select')
    .on('changed.bs.select', '.sell-menu-select', function (e) {
      if ($(this).prop('tagName') == 'SELECT') {
        if ($(this).find(`option:selected`).attr('data-bs-toggle')) {
          var myModal;
          myModal = new bootstrap.Modal(
            document.getElementById($(this).find(`option:selected`).attr('data-bs-target'))
          );
          myModal.show();
        } else if ($(this).val() == 'View') {
          var win = window.open($(this).find(`option:selected`).attr('data-href'), '_blank');
          win.focus();
        }
        $(this).selectpicker('val', '');
      }
    });

  $(document)
    .off('click', '.custom-modal-show')
    .on('click', '.custom-modal-show', function (e) {
      var myModal = new bootstrap.Modal(document.getElementById($(this).attr('data-bs-target')));
      myModal.show();

      if (window.innerWidth >= 1000) {
        $(`#${$(this).attr('data-bs-target')}`).addClass('without-bg');
        $(`#${$(this).attr('data-bs-target')}`)
          .find('.modal-dialog')
          .attr(
            'style',
            `margin-left:${e.target.getBoundingClientRect().left - 300}px;margin-top:${
              e.target.getBoundingClientRect().bottom + 10
            }px`
          );
      }
    });
  // init popover
  var popoverTriggerList = [].slice.call(document.querySelectorAll('.link-notifications'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl, {
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body p-32"></div></div>',
      customClass: 'notification-popover',
      html: true,
      sanitize: false,
      content: function () {
        return $('#notif-content').html();
      },
    });
  });

  if (window.innerWidth >= 1000) {
    $('.link-notifications').on('show.bs.popover', function () {
      $($('.container-fluid')[0]).addClass('popoverCSS');
    });
    $('.link-notifications').on('hide.bs.popover', function () {
      $($('.container-fluid')[0]).removeClass('popoverCSS');
    });
  }
});

function priceSorter(a, b) {
  var aa = a;
  var bb = b;
  if (aa.indexOf('$') + 1) {
    aa = a.replace('$', '');
    bb = b.replace('$', '');
  }
  return aa - bb;
}
