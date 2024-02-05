#include <iostream>
#include <fstream>

using namespace std;

string saluda(string nombre,int edad){
    string micadena = "Hola, " + nombre + ", yo te saludo\n";
    return micadena;
}

string saluda(string nombre){
    string micadena = "Hola, " + nombre + ", yo te saludo\n";
    return micadena;
} 


string saluda(){
    string micadena = "Hola, yo te saludo\n";
    return micadena;
} 

int main(){
    cout << saluda("Steven");
    cout << saluda("Juan");
    cout << saluda("Carlos");
    cout << saluda();
    return 0;
} 
