fun main(){
    var gato = Gato()
    println(gato.maulla())
    println(gato.mamo())
}

open class Mamifero{
    fun mamo():String{
        return "Soy un mamifero y mamo"
    }
}

class Gato:Mamifero(){
    fun maulla():String{
        return "Soy un gato y maullo"
    }
}