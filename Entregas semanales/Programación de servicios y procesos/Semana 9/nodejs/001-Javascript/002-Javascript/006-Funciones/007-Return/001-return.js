function saluda(nombre,edad,email){
    cadena = "";
    cadena += "Me llamo "+nombre+".\n";
    cadena += "Tengo "+edad+" años\n"
    cadena += "Mi correo es "+email+"\n"
    return cadena;
}


console.log(saluda("Steven",20,"svs@gmail.com"));
console.log(saluda("jose",23,"jose@gmail.com"));
console.log(saluda("juan",30,"juan@gmail.com"));
