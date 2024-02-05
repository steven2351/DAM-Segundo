#include <iostream>
#include <fstream>

using namespace std;

int main(){
    ofstream archivo;
    archivo.open ("miarchivo.txt");
    archivo << "Hola archivo.\n";
    archivo.close();
    
    return 0;
} 