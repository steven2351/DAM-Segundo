#include <iostream>
using namespace std;

int main(){
    float operando1 = 4;
    float operando2 = 3;
    float operando3 = 5;
    float operando4 = 5;
    float operando5 = 6;
    float operando6 = 7;
    bool comparacion;
    
    comparacion = operando1 == operando2 && operando3 == operando4;
    cout << "¿Es cierto que el op1 = op2 y el op3 = op4?: " << comparacion << "\n";
    
    comparacion = operando1 == operando2 || operando3 == operando4;
    cout << "¿Es cierto que el op1 = op2 y el op3 = op4?: " << comparacion << "\n"; 
    
    comparacion = operando1 == operando2 && operando3 == operando4 && operando5 == operando6; 
    cout << "¿Es cierto que el op1 = op2 y el op3 = op4?: " << comparacion << "\n";
    
    comparacion = operando1 == operando2 || operando3 == operando4 || operando5 == operando6;
    cout << "¿Es cierto que el op1 = op2 y el op3 = op4?: " << comparacion << "\n";  
    
    return 0;
}