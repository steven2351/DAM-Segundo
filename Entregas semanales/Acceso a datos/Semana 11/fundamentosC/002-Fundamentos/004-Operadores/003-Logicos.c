#include <stdio.h>

int main(int argc,char *argv[]){
    printf("Dime si es cierto: %i \n",(4>3 && 3>2 && 2>1));
    printf("Dime si es cierto: %i \n",(4>3 && 3>2 && 2>2));
    printf("Dime si es cierto: %i \n",(4>3 || 3>2 || 2>1));
    printf("Dime si es cierto: %i \n",(4>3 || 3>3 || 2>2));
    printf("Dime si es cierto: %i \n",(4>4 || 3>3 || 2>2));
    return 0;
}