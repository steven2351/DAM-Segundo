#include <iostream>
using namespace std;

int main(){
    float operando1 = 4;
    float operando2 = 3;
    bool comparacion;
    
    comparacion = operando1 == operando2;
    cout << "¿Es cierto que el operando 1 es igual al operando 2?: " << comparacion << "\n";    
    comparacion = operando1 != operando2;
    cout << "¿Es cierto que el operando 1 NO es igual que operando 2?: " << comparacion << "\n";
    comparacion = operando1 < operando2;
    cout << "¿Es cierto que el operando 1 es menor que operando 2?: " << comparacion << "\n";
    comparacion = operando1 > operando2;
    cout << "¿Es cierto que el operando 1 es mayor que operando 2?: " << comparacion << "\n";
    comparacion = operando1 <= operando2;
    cout << "¿Es cierto que el operando 1 menor o igual que operando 2?: " << comparacion << "\n";
    comparacion = operando1 >= operando2;
    cout << "¿Es cierto que el operando 1 es mayor o igual que operando 2?: " << comparacion << "\n";
    return 0;
}