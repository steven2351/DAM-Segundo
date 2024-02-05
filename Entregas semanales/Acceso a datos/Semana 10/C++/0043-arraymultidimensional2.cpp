#include <iostream>
using namespace std;

int main(){
    int longitud = 20;
    string agenda[longitud][3];
    agenda[0][0] = "Steven";
    agenda[0][1] = "287382";
    agenda[0][2] = "s@gmail.com";
    
    agenda[1][0] = "Carlos";
    agenda[1][1] = "8273499";
    agenda[1][2] = "carlos@gmail.com";
    
    agenda[2][0] = "Juan";
    agenda[2][1] = "98349693";
    agenda[2][2] = "juan@gmail.com";
    
    for(int i = 0;i<longitud;i++){
        cout << "Nombre: " << agenda[i][0] << " - teléfono: " << agenda[i][1] << " - email: " << agenda[i][2] << "\n";
    }
    
    return 0;
} 