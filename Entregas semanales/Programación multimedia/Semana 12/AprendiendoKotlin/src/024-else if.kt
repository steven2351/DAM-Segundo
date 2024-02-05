fun main(){
    val edad = 23
    if(edad < 10){
        println("Eres un niño")
    }else if(edad >= 10 && edad < 30){
        println("Eres un joven")
    }else if(edad >= 30 && edad < 70){
        println("Ya no eres un joven")
    }else{
        println("Eres un senior")
    }
}