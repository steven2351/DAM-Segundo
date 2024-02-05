fun main(){
    val nombre:String = "Steven Vallejo"
    val nombre2:String = "Steven Vallejo"
    val solo_nombre:String = "Vallejo"
    val apellidos:String = " Samboni"
    println(nombre.length)
    println(nombre.uppercase())
    println(nombre.lowercase())
    println(nombre.compareTo(nombre2))
    println(nombre.indexOf(solo_nombre))
    println(nombre+" "+apellidos)
    println(nombre.plus(apellidos))
    println("Mi nombre es: $nombre $apellidos")
}