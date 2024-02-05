fun main(){
    val diadelasemana:Int = 3
    val resultado = when(diadelasemana){
        1 -> "Hoy es lunes"
        2 -> "Hoy es martes"
        3 -> "Hoy es miercoles"
        4 -> "Hoy es jueves"
        5 -> "Hoy es viernes"
        6 -> "Hoy es sabado"
        7 -> "Hoy es domingo"
        else -> "No es un dia de la semana"
    }
    println(resultado)
}