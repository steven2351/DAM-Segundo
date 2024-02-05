fun main(){
    val persona_1 = Persona4("Steven","Vallejo",20)
    val persona_2 = Persona4("Juan","Martinez",56)
    println(persona_1.saluda())
}

class Persona4(nombre:String,apellidos:String,edad:Int){
    fun saluda():String{
        return "Hola que tal"
    }
}