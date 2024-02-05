fun main(){
    val persona = Persona2()
    persona.nombre = "Steven"
    persona.apellidos = "Vallejo Samboni"
    persona.edad = 20

    val persona2 = Persona2()
    persona2.nombre = "Jose"
    persona2.apellidos = "Lopez Garcia"
    persona2.edad = 25

    println(persona.nombre)
    println(persona2.nombre)
}

class Persona2(){
    var nombre:String = ""
    var apellidos:String = ""
    var edad:Int = 0
}