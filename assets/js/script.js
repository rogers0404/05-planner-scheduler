/****************** Global Variables *******************************/
//date format for the site
var timeFromat = "dddd, MMMM Do, YYYY";
//getting the current time (day, month, year, etc)
var timeDay = moment(moment(), "MM/DD/YYYY");

//Array of Objects for localStores data
var list = JSON.parse(localStorage.getItem('todolist')) || [];


/*******************************************************************/

/************************* Functions *******************************/

/* Load the fisrt time when the page load  */
function start() {
   // console.log("estoy pasando por aqui por startRender");
    // load the current time, 
    displayTime();

    // load the localStore


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
    var bgCurrent = "bg-danger";
    var bgAfter = "bg-success";
    var bgBefore = "bg-secondary";

    if(typeof hourOfDay === "string")
        console.log("It is a string and the hour is: "+hourOfDay);
    
    
    for(var i = 9; i < 18; i++){
        var index = "#t-"+ i;                        // making the index into a string for each id
        index = index.trim();
        var attr = $(index).attr("atr");           // getting the attribute atr of the element with id = "t-number"
        //console.log("attr " + attr);
        if(typeof attr === "string")
            console.log("attr " + attr);

        if(parseInt(hourOfDay) === parseInt(attr)){
            $(index).addClass(bgCurrent);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0 w-100");
            console.log("not equeal");
        }
        else if(parseInt(attr) < parseInt(hourOfDay)){
            $(index).addClass(bgBefore);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0  w-100");
            console.log("less than " + hourOfDay);
        } else{
            $(index).addClass(bgAfter);
            $(index).children(".business-hour").addClass("text-dark bg-light m-0 p-0  w-100");
            console.log("future ");
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

/************************* Execution *******************************/
start();
/*******************************************************************/