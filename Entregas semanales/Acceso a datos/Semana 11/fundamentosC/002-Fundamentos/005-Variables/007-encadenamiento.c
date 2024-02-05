#include <stdio.h>
#include <string.h>

int main(int argc,char *argv[]){
    char nombre[] = "Steven";
    char apellidos[] = " Vallejo Samboni";
    strcat(nombre,apellidos);
    printf("Mi nombre completo es: %s",nombre);
    return 0;
}