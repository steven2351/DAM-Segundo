#include <iostream>
using namespace std;

int main(){
    string diadelasemana = "sabado";
    if(diadelasemana == "lunes"){
        cout << "Hoy es lunes\n";
    }else if(diadelasemana == "martes"){
        cout << "Hoy es martes\n";
    }else if(diadelasemana == "miercoles"){
        cout << "Hoy es miercoles\n";
    }else if(diadelasemana == "jueves"){
        cout << "Hoy es jueves\n";
    }else if(diadelasemana == "viernes"){
        cout << "Hoy es viernes\n";
    }else if(diadelasemana == "sabado"){
        cout << "Hoy es sabado\n";
    }else if(diadelasemana == "domingo"){
        cout << "Hoy es domingo\n";
    }else{
        cout << "Lo que has introducido no es un dia de la semana\n"; 
    }
    return 0;
} 