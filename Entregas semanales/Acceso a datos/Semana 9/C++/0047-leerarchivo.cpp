#include <iostream>
#include <fstream>

using namespace std;

int main(){
    string linea;
    ifstream archivo;
    archivo.open ("miarchivo.txt");
    while(getline(archivo,linea)){
        cout << linea << "\n";
    }
    archivo.close();
    
    return 0;
} 