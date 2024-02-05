#include <iostream>
using namespace std;

int main(){
    struct{
        string nombre;
        int telefono;
        string email;
    } registro1,registro2;
    
    registro1.nombre = "Steven";
    registro1.telefono = 8732835;
    registro1.email = "s@gmail.com";
    
    cout << registro1.telefono << "\n";
    
    return 0;
} 