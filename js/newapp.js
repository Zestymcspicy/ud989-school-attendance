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
    this.students = document.getElementsByClassName("name-col");
    this.daysMissedColumn = document.getElementsByClassName("missed-col");
    this.pullValidData();
  },


  pullValidData : function () {
    for(i=0 ; i<this.students.length; i++){
      let missedDays = 12;
      let name = (this.students.item(i).innerHTML);
      let children = this.students.item(i).childNodes;
      for(j=0; j<children.length; j++){
        if (children[j].checked === true) {
        missedDays--;
      }
      }
      controller.passData(name, missedDays);
    }
  }

}
controller.init()
