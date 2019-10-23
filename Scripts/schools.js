
$(window).on("load", () =>
{
    class School
    {
        constructor(id, name, coordinates, books)
        {
            this.id = id;
            this.name = name;
            this.coordinates = coordinates;
            this.books = books;
        }
        
        createHTML()
        {
            this.html = $(`
                <a class="school" href="books.html?education=${GetURLParameter("education")}&school=${this.id}">
                    ${this.name}
                </a>
            `);
            
            return this.html;
        }
    }
    
    const schools = [
		new School("aalborgsosunord", "Aalborg, SOSU Nord", {latitude: 57.041864, longitude: 9.920778}),
		new School("hjorringsosunord", "Hjørring, SOSU Nord", {latitude: 57.458418, longitude: 10.022469}),
		new School("vendsyssel", "Vendsyssel", {latitude: 57.507089, longitude: 10.279546}),
		new School("thistedsosu", "Thisted, SOSU", {latitude: 56.965826, longitude: 8.704670}),
		new School("herningsosu", "Herning, SOSU", {latitude: 56.142369, longitude: 8.969105}),
        new School("kobenhavnsuniversistet", "Københavns Universitet", {latitude: 55.680191, longitude: 12.572345}),
		new School("skive", "Skive", {latitude: 56.564456, longitude: 9.031183}),
		new School("viborg", "Viborg", {latitude: 56.451380, longitude: 9.396372}),
		new School("holstebro", "Holstebro", {latitude: 56.359148, longitude: 8.620398}),
		new School("sosuhkbhg2", "SOSU H Kbh G2", {latitude: 55.667671, longitude: 12.556564}),
		new School("campusbornholm", "Campus Bornholm", {latitude: 55.102347, longitude: 14.697799}),
		new School("hillerodpau", "Hillerød PAU", {latitude: 55.930623, longitude: 12.293023})
	];
    
    //Get a parameter from the URL
	function GetURLParameter(param)
	{
		var pageURL = window.location.search.substring(1);
		var urlVariables = pageURL.split("&");
		
		for (var i = 0; i < urlVariables.length; i++)
		{
			var parameterName = urlVariables[i].split("=");
			
			if (parameterName[0] == param)
			{
				return parameterName[1];
			}
		}
	}
    
    function rad(x)
	{
		return x * Math.PI / 180;
	}
    
    //Get distance between two coordinates using the Haversine formula
	function getDistance(coordinates1, coordinates2)
	{
		var R = 6378137;
		var dLat = rad(coordinates2.latitude - coordinates1.latitude);
		var dLong = rad(coordinates2.longitude - coordinates1.longitude);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(coordinates1.latitude)) * Math.cos(rad(coordinates2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		
		return d;
	}
    
    //Ask user to use Google maps to get coordinates
    function useGoogleMaps()
    {
        $("#ChooseSchoolSection > h1").text("Indlæser Google Maps...");
        $("#SchoolsDiv").empty();
        
        let checkMapsAvailabilityInterval;
        
        const checkMapsAvailability = () =>
        {
            if(typeof google === "object" && typeof google.maps === "object")
            {
                $("#Maps").show();
                
                const map = new google.maps.Map($("#Maps")[0], {
                    center: {
                        lat: 56.290451,
                        lng: 10.447101
                    },
                    zoom: 8
                });
                
                let hasClicked = false;
                
                google.maps.event.addListener(map, "click", (event) =>
                {
                    if(!hasClicked)
                    {
                        const coordinates = {
                            latitude: event.latLng.lat(),
                            longitude: event.latLng.lng()
                        };
                        
                        new google.maps.Marker({
                            position: event.latLng,
                            map: map,
                            title: "Din placering"
                        });
                        
                        setTimeout(() =>
                        {
                            gotCoordinates(coordinates);
                        }, 1000);
                        
                        hasClicked = true;
                    }
                });
                
                $("#ChooseSchoolSection > h1").text("Hvor er du?");
                
                clearInterval(checkMapsAvailabilityInterval);
            }
        };
        checkMapsAvailabilityInterval = setInterval(checkMapsAvailability, 100);
        checkMapsAvailability();
    };
    
    //Sucessfully got coordinates from user
    function gotCoordinates(coordinates)
    {
        $("#Maps").empty();
        $("#Maps").hide();
        $("#ChooseSchoolSection > h1").text("Hvilken skole skal du gå på?");
        
        //Sort schools by distance to user
        schools.sort((school1, school2) =>
        {
            return getDistance(coordinates, school1.coordinates)-getDistance(coordinates, school2.coordinates);
        });
        
        for(let schoolIndex = 0; schoolIndex < 8; schoolIndex++)
        {
            const school = schools[schoolIndex];
            
            $("#SchoolsDiv").append(school.createHTML());
        }
        
        const selectOtherCoordinatesHTML = $(`
            <div class="school">
                Vælg en anden placering
            </div>
        `);
        selectOtherCoordinatesHTML.on("click", (even) =>
        {
            useGoogleMaps();
        });
        $("#SchoolsDiv").append(selectOtherCoordinatesHTML);
    };
    
    if(typeof GetURLParameter("education") !== "undefined")
    {
        //If the geolocation api is available
        if("geolocation" in navigator)
        {
            const options = {
                maximumAge: 30000,
                timeout: 27000,
                enableHighAccuracy: true
            };
            const successCallback = (coordinates) =>
            {
                gotCoordinates(coordinates);
            }
            const errorCallback = () =>
            {
                useGoogleMaps();
            }
            
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else
        {
            useGoogleMaps();
        }
    }
    else
    {
        location.href = "index.html";
    }
});
