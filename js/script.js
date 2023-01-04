if ($('table[data-height]').length) {
  $('table[data-height]').each(function () {
    let height =
      $(this).closest('.table-container').height() -
      $(this).closest('.table-container').find('.row').outerHeight(true) -
      32;
    if ($(this).closest('.table-container').hasClass('pb-32')) {
      height = height - 130;
    }
    if ($(this).closest('.table-container').find('.search-wrap').length) {
      height = height + 50;
    }
    if (height <= 0) {
      height = '';
    }
    $(this).attr('data-height', height);
  });
}

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
    $('.search-input').val($('#table_search').val());
    var $search = $('.bootstrap-table').find('.search-input');
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
  if ($('.pick-date').length) {
    let DateSet = {
      format: 'dd/mm/yyyy',
      firstDay: 0,
      closeOnSelect: false,
      setOnSelect: false,
      today: '',
      clear: '',
      close: 'Confirm Expiration Date',
      value: '',
      weekdaysShort: ['s', 'm', 't', 'w', 't', 'f', 's'],
      title: 'Select expiration date',

      onOpen: function () {
        this['$node'].value = this['$node'].val();
      },
    };
    let picker = $('.pick-date').pickadate(DateSet);
    picker.off('click');
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
