/****************** Global Variables *******************************/
//date format for the site
var timeFromat = "dddd, MMMM Do, YYYY";


/*******************************************************************/

/************************* Functions *******************************/

/* Load the fisrt time when the page load  */
function startRender() {
   // console.log("estoy pasando por aqui por startRender");
    // load the current time, 
    displayTime();

    // load the localStore
}

var displayTime = function(){

/*******************************************************************/
/*  Acceptance Criteria #1                                         */
/*  WHEN I open the planner                                        */
/*  THEN the current day is displayed at the top of the calendar   */
/*******************************************************************/
    //getting the current time (day, month, year, etc)
    var timeDay = moment(moment(), "MM/DD/YYYY");
    //console.log(timeDay.format(timeFromat));
    $("#currentDay").text(timeDay.format(timeFromat));
};





/*******************************************************************/

/************************* Execution *******************************/
startRender();
/*******************************************************************/