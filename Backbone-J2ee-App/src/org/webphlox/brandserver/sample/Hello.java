package org.webphlox.brandserver.sample;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

// POJO, no interface no extends

// The class registers its methods for the HTTP GET request using the @GET annotation. 
// Using the @Produces annotation, it defines that it can deliver several MIME types,
// text, XML and HTML. 

// The browser requests per default the HTML MIME type.

//Sets the path to base URL + /hello
@Path("/hello")
public class Hello {

  // This method is called if TEXT_PLAIN is request
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String sayPlainTextHello() {
    return "{\"items\":[{\"part1\":\"obj1.1\",\"part2\":\"obj1.2\"},{\"part1\":\"obj2.1\",\"part2\":\"obj2.2\"}]}";
  }

  // This method is called if XML is request
  @GET
  @Produces(MediaType.TEXT_XML)
  public String sayXMLHello() {
    return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
  }

  // This method is called if HTML is request
  @GET
  @Produces(MediaType.TEXT_HTML)
  public String sayHtmlHello() {
    return "<html> " + "<title>" + "Hello Jersey" + "</title>"
        + "<body><h1>" + "Hello Jersey" + "</body></h1>" + "</html> ";
  }
//{"wine":[{"country":"USA","description":"With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.","grapes":"Pinot Noir","id":"9","name":"BLOCK NINE","picture":"block_nine.jpg","region":"California","year":"2009"},{"country":"Argentina","description":"Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.","grapes":"Pinot Gris","id":"11","name":"BODEGA LURTON","picture":"bodega_lurton.jpg","region":"Mendoza","year":"2011"},{"country":"France","description":"The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.","grapes":"Grenache / Syrah","id":"1","name":"CHATEAU DE SAINT COSME","picture":"saint_cosme.jpg","region":"Southern Rhone / Gigondas","year":"2009"},{"country":"France","description":"Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the\nsenses.","grapes":"Merlot","id":"7","name":"CHATEAU LE DOYENNE","picture":"le_doyenne.jpg","region":"Bordeaux","year":"2005"},{"country":"France","description":"The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.","grapes":"Merlot","id":"8","name":"DOMAINE DU BOUSCAT","picture":"bouscat.jpg","region":"Bordeaux","year":"2009"},{"country":"USA","description":"Though subtle in its complexities, this wine is sure to please a wide range of enthusiasts. Notes of pomegranate will delight as the nutty finish completes the picture of a fine sipping experience.","grapes":"Pinot Noir","id":"10","name":"DOMAINE SERENE","picture":"domaine_serene.jpg","region":"Oregon","year":"2007"},{"country":"Spain","description":"A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.","grapes":"Tempranillo","id":"2","name":"LAN RIOJA CRIANZA","picture":"lan_rioja.jpg","region":"Rioja","year":"2006"},{"country":"France","description":"Breaking the mold of the classics, this offering will surprise and undoubtedly get tongues wagging with the hints of coffee and tobacco in\nperfect alignment with more traditional notes. Breaking the mold of the classics, this offering will surprise and\nundoubtedly get tongues wagging with the hints of coffee and tobacco in\nperfect alignment with more traditional notes. Sure to please the late-night crowd with the slight jolt of adrenaline it brings.","grapes":"Chardonnay","id":"12","name":"LES MORIZOTTES","picture":"morizottes.jpg","region":"Burgundy","year":"2009"},{"country":"USA","description":"The cache of a fine Cabernet in ones wine cellar can now be replaced with a childishly playful wine bubbling over with tempting tastes of\nblack cherry and licorice. This is a taste sure to transport you back in time.","grapes":"Sauvignon Blanc","id":"3","name":"MARGERUM SYBARITE","picture":"margerum.jpg","region":"California Central Cosat","year":"2010"},{"country":"USA","description":"A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss\nthis award-winning taste sensation.","grapes":"Syrah","id":"4","name":"OWEN ROE \"EX UMBRIS\"","picture":"ex_umbris.jpg","region":"Washington","year":"2009"},{"country":"USA","description":"One cannot doubt that this will be the wine served at the Hollywood award shows, because it has undeniable star power. Be the first to catch\nthe debut that everyone will be talking about tomorrow.","grapes":"Pinot Noir","id":"5","name":"REX HILL","picture":"rex_hill.jpg","region":"Oregon","year":"2009"},{"country":"Italy","description":"Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.","grapes":"Sangiovese Merlot","id":"6","name":"VITICCIO CLASSICO RISERVA","picture":"viticcio.jpg","region":"Tuscany","year":"2007"}]}
} 