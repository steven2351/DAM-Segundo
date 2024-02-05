#include <iostream>
#include <string.h>
using namespace std;

int main(){
    int longitud = 20;
    string agenda[longitud];
    agenda[0] = "Steven";
    agenda[1] = "Juan";
    agenda[2] = "Carlos";
    agenda[3] = "David";
    
    for(int i = 0;i<longitud;i++){
        cout << "Elemento en la agenda: " << agenda[i] << "\n";    
    }    
    return 0;
} 