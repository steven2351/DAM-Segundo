#include <iostream>
using namespace std;

class Gato{
    public:
        string nombre;
        int edad;
        string maulla(){
            return "el gato está maullando\n";
        }
};

int main(){
    Gato gato1;
    cout << gato1.maulla();
    
    return 0;
}