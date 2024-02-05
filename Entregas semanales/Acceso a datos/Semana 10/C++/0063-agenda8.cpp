#include <iostream>
#include <cstdlib>
#include <fstream>
using namespace std;

// Defino los datos con los que voy a trabajar ///////
    //Defino un cursor para saber en que posición está la agenda
        int cursor = 0;
    // Defino la longitud de la agenda 
        int longitud = 100;
    // Creo una estructura
        struct registro{
            string nombre;
            string telefono;
            string email;
        };
    // Defino el array de agenda
        registro agenda[100];
    // Guardo la opción del usuario
        string opcion;

void menu(){
    // En primer lugar cargo los registros previamente guardados
    string linea;
    ifstream archivo;
    archivo.open ("agenda.txt");
    while(getline(archivo,linea)){
        cout << linea << "\n";
    }
    archivo.close();
    //Muestro el menú inicial al usuario de la aplicación
        cout << "Programa agenda v.001 por Steven Vallejo Samboni\n";
        cout << "Escoge una opción:\n";
        cout << "1.-Introducir un registro\n";
        cout << "2.-Listar registros\n";
        cout << "3.-Salir del programa\n";
        cout << "4.-Guardar la agenda\n";
    // Solicto la entrada del usuario
        cin >> opcion;
        cout << "Has elegido la opción: " << opcion << "\n";
    // Ejecuto uncódigo u otro en función de la entrada del usuario
        if(opcion == "1"){
            cout << "Vamos a insertar un nuevo registro en la agenda\n";
            cout << "Introduce el nombre de la persona:\n";
            string nombre;
            cin >> nombre;
            cout << "Introduce el telefono de la persona:\n";
            string telefono;
            cin >> telefono;
            cout << "Introduce el email de la persona:\n";
            string email;
            cin >> email;
            cout << "Voy a introducir: " << nombre << ", " << telefono << ", " << email << "\n";
            agenda[cursor].nombre = nombre;
            agenda[cursor].telefono = telefono;
            agenda[cursor].email = email;
            cursor++;
            cout << "Registros en la agenda: ";
            for(int i = 0;i<cursor;i++){
                cout << agenda[i].nombre << ", " << agenda[i].telefono << ", " << agenda[i].email << "\n"; 
            }
            cout << "\n\n\n";
            
        }else if(opcion == "2"){
            cout << "Vamos a listar los elementos de la agenda\n";
            cout << "Registros en la agenda: ";
            for(int i = 0;i<cursor;i++){
                cout << agenda[i].nombre << ", " << agenda[i].telefono << ", " << agenda[i].email << "\n"; 
            }
            cout << "\n\n\n"; 
        }else if(opcion == "3"){
            exit(0);
            
        }else if(opcion == "4"){
            ofstream archivo;
            archivo.open ("agenda.txt");
            for(int i = 0;i<cursor;i++){
                string cadena = agenda[i].nombre + "," + agenda[i].telefono + "," + agenda[i].email + "\n";
                archivo << cadena;
            }
            archivo.close();
        }
    menu();
}

int main(){
        system("cls"); // cls en Wind, clear en Unix/Linux
        menu();
    
    return 0;
} 