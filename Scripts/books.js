
$(window).on("load", () =>
{
    class Book
	{
		constructor(id, schoolID, name, description, imgSrc, guidedPrice, price)
		{
			this.id = id;
			this.schoolID = schoolID;
			this.name = name;
            this.description = description;
            this.imgSrc = imgSrc
			this.guidedPrice = guidedPrice;
			this.price = price;
        }
        
        createHTML()
        {
            this.html = $(`
                <a class="book" href="index.html">
                    <img class="product" src="${this.imgSrc}" />
                    <img class="cart" src="Frontend/Images/Shop/Cart.png" />
                    <span class="id">Varenummer: ${this.id}</span>
                    <span class="name">${this.name}</span>
                    <span class="description">${truncate(this.description, 100)}</span>
                    <span class="guided-price">Vejledende pris: ${this.guidedPrice.toFixed(2)} DKK</span>
                    <span class="price">Din pris: ${this.price.toFixed(2)} DKK</span>
                </a>
            `);
            
            return this.html;
        }
    }
    
    let books = [
        new Book(619519113, "aalborgsosunord", "Grundforløb 2. PAU", "Grundforløb 2. PAU Vibeke Mossing Thorenfeldt;Mette Vang;Trine Hartmann Grosen;Maria Månsson;Elin Kristensen;Lene Rose Andersen;Mette la Cour Sell;Dorthe Nikolajsen;Rikke Erbs Nørgaard Munksgaard,2015 Sider : 303 ISBN : 978876281510 ", "Frontend/Images/Shop/1.png", 285, 228),
        new Book(343738535, "aalborgsosunord", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/2.png", 530, 424),
        new Book(295566986, "aalborgsosunord", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/5.png", 285, 228),
        new Book(210869980, "hjorringsosunord", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/3.png", 530, 242),
        new Book(558498482, "hjorringsosunord", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/4.png", 285, 228),
        new Book(971716090, "vendsyssel", "Aktiviteter, kultur og natur. Pædagogisk assistent", "Aktiviteter, kultur og natur. Pædagogisk assistent Alis Jensen;Jakob Freud-Magnus;Elsi Busk Odderup;Anette Juhl;Agnete Gudnason;Marie Weber-Andersen;John Nilsson;Linda Katja Jensen", "Frontend/Images/Shop/1.png", 460, 368),
        new Book(678481604, "vendsyssel", "Børn og natur", "Børn og natur Ophelia Achton Frydenlund,2013 Sider : 112 ISBN : 9788771180848", "Frontend/Images/Shop/1.png", 199, 368),
        new Book(215195014, "vendsyssel", "Kommunikation og digital kultur. Pædagogisk assistent", "Kommunikation og digital kultur. Pædagogisk assistent Alis Jensen;Trine Reinholdt Gath;Henrik Wiben;Anja Semke;Lena Knudsmark Munksgaard,2016 Sider : 278 ISBN : 9788762815148", "Frontend/Images/Shop/3.png", 330, 264),
        new Book(295125530, "thistedsosu", "Danskbogen til social- og sundhedselever 2. udgave", "Danskbogen til social- og sundhedselever 2. udgave Lisbeth B. Jensen, Jesper Hansen, Aya Køllgaard Carlsen, Birgitte Andersen Gads Forlag,2015 Sider : 240 ISBN : 9788712050803", "Frontend/Images/Shop/5.png", 250, 187.50),
        new Book(847143853, "thistedsosu", "Håndbog i blodprøver", "Håndbog i blodprøver Henrik Andersen;Cheme Andersen Munksgaard,2014 Sider : 135 ISBN : 9788762814189", "Frontend/Images/Shop/5.png", 145, 116),
        new Book(438224481, "thistedsosu", "Håndbog i lægemidler", "Håndbog i lægemidler Inge Olsen Munksgaard,2014 Sider : 164 ISBN : 9788762812970", "Frontend/Images/Shop/4.png", 175, 140),
        new Book(638534476, "thistedsosu", "Mødet med borgeren (SSH)", "Mødet med borgeren (SSH) Jette Nielsen;Maria Kehlet Brockhoff;Henrik Wiben;Jytte Solhøj;Anja Semke;Birgitte Gøtzsche;Ulla Lund Eskildsen;Merete Becker-Larsen Munksgaard,2017 Sider : 164 ISBN : 9788762817722", "Frontend/Images/Shop/2.png", 195, 156),
        new Book(141393062, "thistedsosu", "Personlig hjælp, omsorg og pleje (SSH)", "Personlig hjælp, omsorg og pleje (SSH) Jette Nielsen;Vibeke Mossing Thorenfeldt;Henrik Wiben;Dorthe Brix;Tina Rode Melbye;Anja Semke;Birgitte Gøtzsche;Trine Hartmann Grosen;Børge Hede;Rikke Syberg Kjær;Anne...", "Frontend/Images/Shop/3.png", 590, 472),
        new Book(767759415, "herningsosu", "Sundhed, krop og bevægelse. Pædagogisk assistent", "Sundhed, krop og bevægelse. Pædagogisk assistent Anne-Merete Kissow;Mogens Ingelhardt Hansen;Henrik Wiben;Anja Semke;Michaela Jørgensen;Anna Østergaard Lauritsen;Pernille", "Frontend/Images/Shop/4.png", 635, 508),
        new Book(788168522, "herningsosu", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(210869980, "kobenhavnsuniversistet", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/4.png", 530, 242),
        new Book(847143853, "kobenhavnsuniversistet", "Håndbog i blodprøver", "Håndbog i blodprøver Henrik Andersen;Cheme Andersen Munksgaard,2014 Sider : 135 ISBN : 9788762814189", "Frontend/Images/Shop/3.png", 145, 116),
        new Book(788168522, "kobenhavnsuniversistet", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(619519113, "kobenhavnsuniversistet", "Grundforløb 2. PAU", "Grundforløb 2. PAU Vibeke Mossing Thorenfeldt;Mette Vang;Trine Hartmann Grosen;Maria Månsson;Elin Kristensen;Lene Rose Andersen;Mette la Cour Sell;Dorthe Nikolajsen;Rikke Erbs Nørgaard Munksgaard,2015 Sider : 303 ISBN : 9788762815100", "Frontend/Images/Shop/5.png", 285, 228),
        new Book(210869980, "skive", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/3.png", 530, 242),
        new Book(788168522, "skive", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(295566986, "skive", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/5.png", 285, 228),
        new Book(619519113, "viborg", "Grundforløb 2. PAU", "Grundforløb 2. PAU Vibeke Mossing Thorenfeldt;Mette Vang;Trine Hartmann Grosen;Maria Månsson;Elin Kristensen;Lene Rose Andersen;Mette la Cour Sell;Dorthe Nikolajsen;Rikke Erbs Nørgaard Munksgaard,2015 Sider : 303 ISBN : 9788762815100", "Frontend/Images/Shop/5.png", 285, 228),
        new Book(638534476, "viborg", "Mødet med borgeren (SSH)", "Mødet med borgeren (SSH) Jette Nielsen;Maria Kehlet Brockhoff;Henrik Wiben;Jytte Solhøj;Anja Semke;Birgitte Gøtzsche;Ulla Lund Eskildsen;Merete Becker-Larsen Munksgaard,2017 Sider : 164 ISBN : 9788762817722", "Frontend/Images/Shop/2.png", 195, 156),
        new Book(295125530, "viborg", "Danskbogen til social- og sundhedselever 2. udgave", "Danskbogen til social- og sundhedselever 2. udgave Lisbeth B. Jensen, Jesper Hansen, Aya Køllgaard Carlsen, Birgitte Andersen Gads Forlag,2015 Sider : 240 ISBN : 9788712050803", "Frontend/Images/Shop/5.png", 250, 187.50),
        new Book(619519113, "viborg", "Grundforløb 2. PAU", "Grundforløb 2. PAU Vibeke Mossing Thorenfeldt;Mette Vang;Trine Hartmann Grosen;Maria Månsson;Elin Kristensen;Lene Rose Andersen;Mette la Cour Sell;Dorthe Nikolajsen;Rikke Erbs Nørgaard Munksgaard,2015 Sider : 303 ISBN : 978876281510 ", "Frontend/Images/Shop/1.png", 285, 228),
        new Book(788168522, "holstebro", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(638534476, "holstebro", "Mødet med borgeren (SSH)", "Mødet med borgeren (SSH) Jette Nielsen;Maria Kehlet Brockhoff;Henrik Wiben;Jytte Solhøj;Anja Semke;Birgitte Gøtzsche;Ulla Lund Eskildsen;Merete Becker-Larsen Munksgaard,2017 Sider : 164 ISBN : 9788762817722", "Frontend/Images/Shop/2.png", 195, 156),
        new Book(558498482, "sosuhkbhg2", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/4.png", 285, 228),
        new Book(210869980, "sosuhkbhg2", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/3.png", 530, 242),
        new Book(788168522, "sosuhkbhg2", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(295566986, "sosuhkbhg2", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/5.png", 285, 228),
        new Book(847143853, "campusbornholm", "Håndbog i blodprøver", "Håndbog i blodprøver Henrik Andersen;Cheme Andersen Munksgaard,2014 Sider : 135 ISBN : 9788762814189", "Frontend/Images/Shop/3.png", 145, 116),
        new Book(767759415, "campusbornholm", "Sundhed, krop og bevægelse. Pædagogisk assistent", "Sundhed, krop og bevægelse. Pædagogisk assistent Anne-Merete Kissow;Mogens Ingelhardt Hansen;Henrik Wiben;Anja Semke;Michaela Jørgensen;Anna Østergaard Lauritsen;Pernille", "Frontend/Images/Shop/4.png", 635, 508),
        new Book(678481604, "campusbornholm", "Børn og natur", "Børn og natur Ophelia Achton Frydenlund,2013 Sider : 112 ISBN : 9788771180848", "Frontend/Images/Shop/1.png", 199, 368),
        new Book(210869980, "hillerodpau", "Grundforløb 2. Sosu", "Grundforløb 2. Sosu Anne Katrine Ørnstrup;Vibeke Mossing Thorenfeldt;Mette Vang;Dorthe Brix;Tina Rode Melbye;Trine Hartmann Grosen;Elin Kristensen Munksgaard,2017 Sider : 480 ISBN : 9788762817876", "Frontend/Images/Shop/4.png", 530, 242),
        new Book(558498482, "hillerodpau", "Naturfag. Niveau F og E", "Naturfag. Niveau F og E Henrik Andersen;Ole Bjerglund Pedersen;Vian Bech Munksgaard,2015 Sider : 160 ISBN : 9788762815766", "Frontend/Images/Shop/4.png", 285, 228),
        new Book(788168522, "hillerodpau", "Samfundsfag, Niveau C - Grundbog", "Samfundsfag, Niveau C - Grundbog Hans Henrik Jacobsen, Jørgen Sauer Trojka,2015 Sider : 0 ISBN : 9788771540222", "Frontend/Images/Shop/2.png", 268, 201),
        new Book(847143853, "hillerodpau", "Håndbog i blodprøver", "Håndbog i blodprøver Henrik Andersen;Cheme Andersen Munksgaard,2014 Sider : 135 ISBN : 9788762814189", "Frontend/Images/Shop/3.png", 145, 116)
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
    
    function truncate(text, max)
    {
        if(text.length > max)
        {
           return text.substring(0, max) + "...";
        }
        else
        {
           return text;
        }
     };
    
    const educationID = GetURLParameter("education");
    const schoolID = GetURLParameter("school");
    
    if(typeof educationID !== "undefined" && typeof schoolID !== "undefined")
    {
        //Filter books by school from URL parameter
        books = books.filter((book) =>
        {
            return book.schoolID === schoolID;
        });
        
        books.forEach((book) =>
        {
            $("#BooksDiv").append(book.createHTML());
        });
    }
    else
    {
        location.href = "index.html";
    }
});
