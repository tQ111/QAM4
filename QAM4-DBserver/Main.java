import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.sql.*;

import java.net.InetSocketAddress;
import java.util.Map;

//For compiling on the shell on repl: Same on mac
//javac -cp sqlite-jdbc-3.23.1.jar: Main.java
//java -cp sqlite-jdbc-3.23.1.jar: Main

//Use for windows
//javac -cp sqlite-jdbc-3.23.1.jar; Main.java
class Main {

 public static void main(String[] args)throws IOException{
    (new Main()).init();
  }


  void print(Object o){ System.out.println(o);}
  void printt(Object o){ System.out.print(o);}

  void init() throws IOException{
   

    // create a port - our Gateway
    int port = 8501;
    //create the HTTPserver object
    HttpServer server = HttpServer.create(new InetSocketAddress(port),0);
    // create the database object
    Database db = new Database("jdbc:sqlite:menu.db");
    

    // Add your  code here
    String sql1 = "select menuItems.*, categories.categoryName from menuItems join categories on menuItems.categoryID = categories.categoryID";
    server.createContext("/menu", new RouteHandler(db, sql1));

    String sql2 = "select menuItems.itemName, nutrients.calories, nutrients.\"protein(g)\", nutrients.\"carbs(g)\", nutrients.\"fat(g)\" from menuItems join nutrients on menuItems.nutrientID = nutrients.nutrientID";
    server.createContext("/nutrition", new RouteHandler(db, sql2));

    server.createContext("/", new RouteHandler("Connected, open Live Server"));

  
  
    //Start the server
    server.start();
    System.out.println("Server is listening on port "+port);
       
      
    }    
}


