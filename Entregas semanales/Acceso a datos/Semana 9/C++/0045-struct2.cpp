#include <iostream>
using namespace std;

int main(){
    struct registro{
        string nombre;
        int telefono;
        string email;
    };
    
    registro agenda[20];
    agenda[0].nombre = "Steven";
    agenda[0].telefono = 29832723;
    agenda[0].email = "s@gmail.com";
    
    cout << agenda[0].telefono << "\n";
    
    return 0;
} 