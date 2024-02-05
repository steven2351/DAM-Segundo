package conector;
import java.sql.*;
public class Conector {

    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/pruebaconector";
        String usuario = "pruebaconector";
        String contrasena = "pruebaconector";
        
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection miconexion = DriverManager.getConnection(url,usuario,contrasena);
            Statement peticion = miconexion.createStatement();
            String cadena = "SELECT * FROM personas";
            ResultSet resultado = peticion.executeQuery(cadena);
            while(resultado.next()){
                String nombre = resultado.getString("nombre");
                String apellidos = resultado.getString("apellidos");
                String email = resultado.getString("email");
                System.out.println(nombre+" "+apellidos+" "+email);
            }
            resultado.close();
            peticion.close();
            miconexion.close();
            
        }catch(ClassNotFoundException | SQLException e){
            e.printStackTrace();
        }
        
    }
    
}
