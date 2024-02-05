#include <iostream>
using namespace std;

class Persona{
    public:
        string nombre;
        int edad;
    string saluda(){
        string cadena = "Yo me llamo " + nombre + " y te digo hola\n";
        return cadena;
    }
    string buenosDias();
};

string Persona::buenosDias(){
    return "yo te digo buenos dias\n";
}

int main(){
    Persona persona1;
    persona1.nombre = "Steven";
    persona1.edad = 20;
    
    Persona persona2;
    persona2.nombre = "Toni";
    persona2.edad = 22;
    
    cout << persona1.nombre << "\n";
    cout << persona2.nombre << "\n";
    
    cout << persona1.saluda();
    cout << persona2.saluda();
    cout << persona1.buenosDias();
    
    return 0;
}