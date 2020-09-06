/****************** Global Variables *******************************/
//date format for the site
var timeFromat = "dddd, MMMM Do, YYYY";
//getting the current time (day, month, year, etc)
var timeDay = moment(moment(), "MM/DD/YYYY");

//background colors
var bgCurrent = "bg-danger";
var bgAfter = "bg-success";
var bgBefore = "bg-secondary";

//Array of Objects for localStores data
var list = JSON.parse(localStorage.getItem('daySch')) || [];


/*******************************************************************/

/************************* Functions *******************************/

/* Load the fisrt time when the page load  */
function start() {
    // load the current time, 
    displayTime();

    // load the localStore
    loadSchedule();

    // checking each time block whether it is the past, present or future according the hour of the day
    checkingTimeDay();
    
}

//function to check the hour of the day and making colored the time blocks
var checkingTimeDay = function(){

    /*******************************************************************/
    /*  Acceptance Criteria #3                                         */
    /*  WHEN I view the time blocks for that day                       */
    /*  THEN each time block is color-coded to indicate whether it is  */ 
    /*in the past, present, or future                                  */
    /*******************************************************************/

    var hourOfDay = timeDay.format("H");
    
    for(var i = 9; i < 18; i++){
        var index = "#t-"+ i;                        // making the index into a string for each id
        index = index.trim();
        var attr = $(index).attr("atr");           // getting the attribute atr of the element with id = "t-number"

        if(parseInt(hourOfDay) === parseInt(attr)){
            $(index).addClass(bgCurrent);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0 w-100");
            if(list.length === 0){
                $(index).children(".col-10").children("p").text("Current Hour");
            }
               
        }
        else if(parseInt(attr) < parseInt(hourOfDay)){
            $(index).addClass(bgBefore);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0  w-100");
        } else{
            $(index).addClass(bgAfter);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0  w-100");
        }
    }
};

//Function to display the date on top of the site
var displayTime = function(){

/*******************************************************************/
/*  Acceptance Criteria #1                                         */
/*  WHEN I open the planner                                        */
/*  THEN the current day is displayed at the top of the calendar   */
/*******************************************************************/
    //console.log(timeDay.format(timeFromat));
    $("#currentDay").text(timeDay.format(timeFromat));
};

/*******************************************************************/
/*  Acceptance Criteria #4                                         */
/*  WHEN I click into a time block                                 */
/*  THEN I can enter an event                                      */
/*  Noteice, there are 2 functions. one for cliking and other       */ 
/*  when the focus is lost                                         */
/*******************************************************************/

// listener for clicking on each event
$(".col-10").on("click", "p", function() {
    var text = $(this)
    .text()
    .trim();

    var hourOfDay = timeDay.format("H");
    var schTime = $(this).parent().parents().attr("atr");       //going from p to div .col-10 to div id=t-##
    var id = "#t-"+schTime;
    var tempBg = " "; 

    if(parseInt(hourOfDay) === parseInt(schTime)){
        tempBg += bgCurrent;
    }
    else if(parseInt(schTime) < parseInt(hourOfDay)){
        tempBg += bgBefore;
    } else{
        tempBg += bgAfter;
    }

    var textInput = $("<textarea>")
    .addClass("form-control text-dark" + tempBg)
    .val(text);
  
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    
  });

  //Function When the focus is lost 
var functionBlur =function () {
    // get the current value/text of textarea
    var text = $(".form-control")
    .val()
    .trim();
  
    // recreate p element
    var eventP = $("<p>")
    .addClass("h-100 w-100 mt-4")
    .text(text);
  
    // replace textarea with p element
    $(".form-control").replaceWith(eventP);
}

// function to retreive the information from localStore
 var loadSchedule = function(){

/*******************************************************************/
/*  Acceptance Criteria #6                                         */
/*  WHEN I refresh the page                                        */
/*  THEN the saved events persist                                  */
/*******************************************************************/

    if(list){
        for(var i = 9; i < 18; i++){
            var index = "#t-"+ i;                                           // making the index into a string for each id
            index = index.trim();
            var attr = $(index).attr("atr");                                // getting the attribute atr of the element with id = "t-number"
            var elementP = $(index).children(".col-10").children("p");      //tested with DevTool of Google Chrome 

            for(j=0; j<list.length; j++)                                    // for loop to get the list in localStore and compare to the day schedule
            {
                if(parseInt(list[j].hourSch) === parseInt(attr)){
                    elementP.text(list[j].txtSch)
                }
            }
           
        }
    }
 };

// listener for clicking on saveButton
$(".btn").on("click", function(event) {

event.preventDefault();
/*******************************************************************/
/*  Acceptance Criteria #5                                         */
/*  WHEN I click the save button for that time block               */
/*  THEN the text for that event is saved in local storage         */
/*******************************************************************/

var schTime = $(this).attr("atr");
var id = "#t-"+schTime;
var mostParent = $(this).parents(id);
var inputText = mostParent.children(".col-10").children(".form-control");  //tested with DevTool of Google Chrome 

//validating whether the textarea is empty or not... 
if(inputText.val())
{
    //creating the object for to store it in localStore
    var objWorkSchedule ={
        txtSch: inputText.val().trim(),
        hourSch: schTime
    };

    //pushing the information into the array of objects
    list.push(objWorkSchedule);

    localStorage.setItem("daySch",JSON.stringify(list));
    functionBlur();

    loadSchedule();
}
else
{
    alert("You can not save and empty event \n You must enter and event");
}
});

/*******************************************************************/

/************************* Execution *******************************/
start();
/*******************************************************************/