#include <stdio.h>

int main(int argc,char *argv[]){
    printf("Elige un numero entre 0 y 9: ");
    char numero = getchar();
    printf("El caracter que has aeleccionado es: %c \n",numero);
    return 0;
}