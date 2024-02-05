#include <iostream>
using namespace std;

int main(){
    int diadelasemana = 1;
    
    switch(diadelasemana){
        case 1:
            cout << "Hoy es lunes\n";
            break;
        case 2:
            cout << "Hoy es martes\n";
            break;
        case 3:
            cout << "Hoy es miercoles\n";
            break;
        case 4:
            cout << "Hoy es jueves\n";
            break;
        case 5:
            cout << "Hoy es viernes\n";
            break;
        case 6:
            cout << "Hoy es sabado\n";
            break;
        case 7:
            cout << "Hoy es domingo\n";
            break;
        default:
            cout << "Lo que has introducido no es un dia de la semana\n"; 
            break;
    }
    return 0;
} 