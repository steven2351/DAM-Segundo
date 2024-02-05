#include <iostream>
#include <string>
using namespace std;

int main(){
    string edad = "20";
    string diez = "10";
    int suma = stoi(edad) + stoi(diez);
    cout << to_string(suma)+"\n";
    return 0;
} 