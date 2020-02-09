// Main.js by Brody W. Manquen, 2020 /
//initialize function called when the script loads
function initialize() {
	cities();
}
//    //functioning jQueryAjax
//    function jQueryAjax(){
//        $.getJSON("data/MegaCities.geojson", callback);
//    };
//    //jQ callback
//    function callback(response){
//        console.log(response);
//    };
//    $(document).ready(jQueryAjax);

//debug_ajax.js
function debugCallback(mydata){  //callBack takes mydata instead of 'response'
	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata)); //appends stringified version of mydata to be read as JSON
};
function debugAjax(){ //defines debugAjax function
	var mydata; //creates variable 'mydata'
	$.ajax("data/MegaCities.geojson", { //jQuery requests my MegaCities.geojson
		dataType: "json", //specifies json data to be expected from server
		success: function(response){ //on successful request, run enumerated function
			mydata = response; //sets mydata to response, or to data from Megacities.geojson
			debugCallback(mydata); //calls debugCallback running the newly defined 'mydata' variable 
		}
	});
	//$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata)); -- WILL NOT WORK because will run before successful callback
};
//$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata)); -- WILL NOT WORK because will run before debugAjax() receives data for 'mydata' as it is outside of the callback function

//function to create a table with cities and their populations
function cities() {
//defines cityPop as an array populated by 4 objects, each being a city:population pair
	var cityPop = [              
		{ 
			city: 'Madison',  //creates city name as the first key in the object
			population: 233209 //creates population as second key in object
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244   
		}
	];

	//append the table element to the div -- this creates a table to be populated
	$("#mydiv").append("<table>");

	//append a header row to the table - <tr> indicates a table row
	$("table").append("<tr>");
	
	//adds the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>"); //<th> stands for 'table header'
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";  // <td> indicates table data. The cell is populated as a standard cell rather than a header cell
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop); //calls addColumns(cityPop) as defined below
    addEvents(); //calls addEvents() as defined below
    debugAjax()
};

function addColumns(cityPop){   //defines fucntion addColumns which by default takes "cityPop"
    
    $("tr").each(function(i){  //grabs each table row -- the .each() in jQuery takes an iterative function

    	if (i == 0){
            
    		$(this).append('<th>City Size</th>'); //adds 'City Size' to header row, as the header row will be the first and thus i will equal 0
    	} else { //iteration for each i value (row) after the Header
            
    		var citySize; //creates variable of citySize
            
    		if (cityPop[i-1].population < 100000){  //if statement evaluates the population key for each object in cityPop
    			citySize = 'Small';  //assigns citySize key for each object in cityPop depending on population attribute value (small, medium, or large)
                
    		} else if (cityPop[i-1].population < 500000){ 
    			citySize = 'Medium';
               
    		} else {
    			citySize = 'Large';
                
    		};

    		$(this).append('<td>' + citySize + '</td>'); //appends the citySize attribute value (string) of each object to each object's row in table
    	};
    });
};

function addEvents(){ //creates function called addEvents()

	$('table').mouseover(function(){   //defines what happens when the table is moused over
		
		var color = "rgb(";  //creates variable 'color' as an red,blue,green color set 

		for (var i=0; i<3; i++){  //for each mouseover, iterate through i 3 times

			var random = Math.round(Math.random() * 255); //creates random numbers to populate color of mouseover for each i value
            
			color += random;  //adds random number to color variable for each iteration of i, thus creating three random numbers
            
			if (i<2){
				color += ","; //adds comma to separate the first number from the second, and the second from the third
			     
			} else {
				color += ")"; //ends rgb color set with a closing parens so it can be read properly
		};

		$(this).css('color' , color); //grabs table as thing being colored for each mouseover, then changes style (.css) of table to have it's color set to the (#,#,#) set created randomly 
	};

	function clickme(){  //creates function clickme()

		alert('Hey, you clicked me!'); //creates alert for when table is clicked
	};

	$('table').on('click', clickme);  //calls clickme() when table is clicked
});
};
//call the initialize function when the document has loaded

$(document).ready(initialize);

