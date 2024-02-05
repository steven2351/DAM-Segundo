#include <iostream>
using namespace std;

class Mamifero{
    public:
        string mama(){
            return "este animal mama cuando es pequeño\n";
        }
};

class Gato: public Mamifero{
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
    cout << gato1.mama();
    
    return 0;
}