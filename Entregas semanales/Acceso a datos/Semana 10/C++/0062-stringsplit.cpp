#include <iostream>
#include <cstring>
using namespace std;

int main(){
    char cadena[100] = "uno,dos,tres";
    char *ptr;
    ptr = strtok(cadena, ",");
    int contador = 0;
    while(ptr != NULL){
        if(contador == 0){
            cout << "nombre:";
        }else if(contador == 1){
            cout << "telefono:";
        }else if(contador == 2){
            cout << "email:";
        }
        contador++;
        cout << ptr << endl;
        ptr = strtok (NULL, ",");
    }
    cout << "\n\n\n";
    return 0;
}