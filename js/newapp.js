(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

      $.each(attendance, function(name, days) {
          var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
              dayChecks = $(studentRow).children('.attend-col').children('input');

          dayChecks.each(function(i) {
              $(this).prop('checked', days[i]);
          });
      });
    });

const model = {

  init : function () {
    this.studentArray = [];
},

  createStudents : function (name, daysMissed) {
    model.studentArray.push({name, daysMissed});
  },
}

const controller = {

  init : function () {

    model.init();
    view.init();
  },

  passData : function(name, missedDays) {
    model.createStudents(name, missedDays);
  },

  collectDaysMissed : function() {
    this.daysMissedArray = model.studentArray.map(x=>x.daysMissed)
  }
}

const view = {

  init : function () {
    this.studentsNames = document.getElementsByClassName("name-col");
    this.daysMissedColumn = document.getElementsByClassName("missed-col");
    this.students = document.getElementsByClassName("student");
    this.pullValidData();
    controller.collectDaysMissed();
    this.applyAttendance();
  },

  pullValidData : function () {
    for(i=0 ; i<this.studentsNames.length; i++){
      let missedDays = 12;
      let name = (this.studentsNames.item(i).innerHTML);
      let boxes = this.students.item(i).children;
      for (j=0; j<boxes.length; j++){
        let current = boxes.item(j);
        if (current.checked){
          missedDays--;
        }
      }
        controller.passData(name, missedDays);
      }
    },

  applyAttendance : function() {
    for(i=0; i<this.daysMissedColumn.length; i++) {
      this.daysMissedColumn.item(i).innerHTML = controller.daysMissedArray[i];
    }
  },

};
controller.init()
