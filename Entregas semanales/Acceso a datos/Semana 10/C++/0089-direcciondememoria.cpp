#include <iostream>
#include <string>
using namespace std;

int main(){
    string nombre = "Steven Vallejo Samboni";
    string &referencia = nombre;
    
    cout << &nombre << "\n";
    
    return 0;
} 