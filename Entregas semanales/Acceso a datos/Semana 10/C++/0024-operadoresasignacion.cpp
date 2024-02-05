#include <iostream>
using namespace std;

int main(){
    cout << "operador de asignación\n";
    float operando1 = 4;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1++;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1--;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1 = operando1 + 5;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1 += 5;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1 -= 5;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1 *= 5;
    cout << "ahora el operando vale " << operando1 << "\n";
    operando1 /= 5;
    cout << "ahora el operando vale " << operando1 << "\n";
    return 0;
}