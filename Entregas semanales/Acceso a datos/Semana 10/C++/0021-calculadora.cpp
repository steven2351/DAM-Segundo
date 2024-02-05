#include <iostream>
using namespace std;

int main(){
    int operando1;
    cout << "Introduce el valor del primer operando: \n";
    cin >> operando1;
    int operando2;
    cout << "Introduce el valor del segundo operando: \n";
    cin >> operando2;
    int suma = operando1 + operando2;
    cout << "El valor de la suma es de " << suma << "\n";
    return 0;
}