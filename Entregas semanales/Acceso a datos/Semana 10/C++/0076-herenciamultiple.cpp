#include <iostream>
using namespace std;

class Deidad{
    public:
        string humanos(){
            return "Humanos rendios ante vuestra deidad\n";
        }
};
class Animal{
    public:
        string seMueve(){
            return "Este animal se mueve\n";
        }
};
class Mamifero: public Animal{
    public:
        string mama(){
            return "este animal mama cuando es pequeño\n";
        }
};

class Gato: public Mamifero, public Deidad{
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
    cout << gato1.seMueve();
    cout << gato1.humanos();
    
    return 0;
}