function onSubmitForm(e) {

  var teachersEmail = { "Alice":"alice@example.com",
                        "Bob": "bob@example.com",
                        "Charlie": "charlie@example.com",
                        "Diana":"diana@example.com",
                        "Eve":"eve@example.com",
                        "Frank":"frank@example.com",
                        "Grace":"grace@example.com",
                        "Hank": "hank@example.com",
                        "Ivy": "ivy@example.com"
                        };

  Logger.log("Launching onSubmitForm function");
  var response = e.response.getItemResponses();
  
  var name = response[0].getResponse();
  var email = response[1].getResponse();
  var leaveType = response[2].getResponse();
  var fromDate = response[3].getResponse();
  var toDate = response[4].getResponse();
  var subject = "Leave on " + fromDate;
  var batch = response[5].getResponse();
  var reason = response[6].getResponse();
  var ccEmail="";
  var startTime ="09:00:00";
  var endTime   ="15:00:00";
  Logger.log("Data stored");

  if (leaveType == "1st Half leave")
    endTime = "12:00:00";
  if (leaveType == "2nd Half leave")
    startTime = "12:00:00";
  
  Logger.log(batch);
  batch.forEach(function(sample){
    if ("BCA" == sample)
      ccEmail += teachersEmail["Alice"] + ",";
    
    if ("BCOM" == sample)
      ccEmail += teachersEmail["Bob"] + ",";
    
    if ("BBA" == sample)
      ccEmail += teachersEmail["Charlie"] + ",";
    
    if ("BAJMC" == sample)
      ccEmail += teachersEmail["Diana"] + ",";
    
  });
  

  ccEmail += teachersEmail["Eve"] + "," + teachersEmail["Frank"] + "," + teachersEmail["Grace"];
  Logger.log("ccEmail = "+ ccEmail);
 
  if (toDate != ""){
    Logger.log("More than one day off");
    var text = " from "+ fromDate +" to "+ toDate;
    leaveType = "Multiple days";
  }
  else{
    Logger.log("Only one day off, either full or half");
    var text = " on "+ fromDate
  }
var body = "Dear _, \n\nI, " + name + ", would like to request a "+ leaveType + text +", due to "+ reason + ".\n\nKind regards,\n"+ name;

  GmailApp.sendEmail(	email, 
                      subject,
                      body, 
                      {
                        cc: ccEmail,
                        name: name
                      }
                    );


  //First half is considered from 9:00AM to 12:00PM
  //Second half is considered from 12:00PM to 3:00PM
  //var fromDateCalendar = new Date(fromDate + ", "+ startTime);
  //var toDateCalendar = new Date(endDate + ", "+ endTime);
  Logger.log("Creating event in google calendar");
  let collegeCalendar = CalendarApp.getCalendarById("destination_account@example.com");
  //var date = new Date("2023-05-24");
  //collegeCalendar.createAllDayEvent("Test", date);
  //collegeCalendar.createEvent("many days test",fromDate,toDate);
  Logger.log("Date and time of leave: " + fromDate+", "+startTime)
  switch(leaveType){
    case "Multiple days"    : collegeCalendar.createEvent(name + " on Leave", new Date(fromDate), new Date(toDate)); break;
    case "1st Half leave"   : 
    case "2nd Half leave"   : collegeCalendar.createEvent(name + " on Leave", new Date(fromDate+", "+startTime), new Date(fromDate+", "+endTime));break;
    case "Full day leave"   : collegeCalendar.createAllDayEvent(name + " on Leave", new Date(fromDate));break;
    default                 : 
  }
}
