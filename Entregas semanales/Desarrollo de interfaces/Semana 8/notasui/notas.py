import tkinter as tk                        #Importo la libreia de GUI
from tkinter import ttk                     #Importo la nueva libreria TTK
import sqlite3 as bd                            #Importo la libreria SQLite
from tkinter.colorchooser import askcolor #Importo el selector de color
import time

class Nota:                                     #Declaramos una clase
    def __init__(self,texto,color,fecha):       #Método constructor
        self.texto = texto                      #Propiedad texto
        self.color = color                      #Propiedad color
        self.fecha = fecha                      #Propiedad fecha


#Conexión inicial con la base de datos

conexion = bd.connect("notas.sqlite")           #Indico el nobre de la base de datos
cursor = conexion.cursor()                      #Creo un cursor
#Sobre el cursor, ejecuto una petición para crear una tabla en la base de datos en el caso de que no exista anteriormente 
cursor.execute("""
        CREATE TABLE IF NOT EXISTS 'notas'(
            'id' INTEGER,
            'texto' TEXT,
            'color' TEXT,
            'fecha' TEXT,
            PRIMARY KEY('id' AUTOINCREMENT)
        );
""")
#Sobre el cursor ejecuto una peticion para crear una tabla de usuarior en caso de que no exista
cursor.execute("""
        CREATE TABLE IF NOT EXISTS 'usuarios'(
            'id' INTEGER,
            'usuario' TEXT,
            'contrasena' TEXT,
            'email' TEXT,
            PRIMARY KEY('id' AUTOINCREMENT)
        );
""")


#Declaro funciones para el progrma #

def login():                                #Función de inicio de sesión
    print("Vamos a iniciar sesión")         #Imprime un mensaje en pantalla
    print("El usuario es: "+varusuario.get())
    print("La contraseña es: "+varcontrasena.get())
    print("El email es: "+varemail.get())
    #Voy a comprobar si existe un usuario en la base de datos
    cursor = conexion.cursor()              #Creo un cursor
    cursor.execute('SELECT * FROM usuarios')#Ejecuto una petición de seleccionar usuarios
    datos = cursor.fetchall()               #Cargo los datos
    numerousuarios = 0                      #Creo una variable contador
    for i in datos:                         #Para cada uno de los registros devueltos
        numerousuarios = numerousuarios + 1 #Le sumo un valor al contador
    if(numerousuarios == 0):                #Si no hay usuarios
        print("No hay usuarios")
        cursor.execute("INSERT INTO usuarios VALUES(NULL,'"+varusuario.get()+"','"+varcontrasena.get()+"','"+varemail.get()+"');") #Inserto los datos en la base de datos
        conexion.commit()                   #Ejecuto la insercción
    else:                                   #En el caso de que haya usuarios
        print("Hay usuarios")
        cursor.execute('''
                       SELECT *
                       FROM usuarios
                       WHERE usuario ="'''+varusuario.get()+'''"
                       AND contrasena="'''+varcontrasena.get()+'''"
                       AND email="'''+varemail.get()+'''"
                       ''')                 #Realizo una consulta a la base de datos
        existe = False
        datos = cursor.fetchall()           #Cargo los datos
        for i in datos:                     #Para cada uno de los registros devueltos
            existe = True                   #Actualizo el valor
        existe = True
        if existe == True:                  #En el caso de que exista
            print("El usuario que has introducido es correcto")
            marco.destroy()                 #Elimino la ventana de inicio de sesión
            marco2 = ttk.Frame(raiz)        #Creo un nuevo marco
            marco2.pack()                   #Empaqueto el marco
            iconoaplicacion = tk.PhotoImage(file="icono.png")   #cargo la imagen
            etiquetaicono = ttk.Label(
                marco2,
                text="Notas v0.01",
                image = iconoaplicacion,
                compound = tk.TOP,
                font = ("Arial",14)
                )                           #Muestro la imagen en el label
            etiquetaicono.image = iconoaplicacion   #Especifico de nuevo la imagen
            etiquetaicono.pack()            #Empaqueto
            botonnuevanota = ttk.Button(marco2,text="Nueva nota",command=creaNota) #Creo el boton de iniciar sesión
            botonnuevanota.pack(pady=10,expand = True)                    #Lo empaqueto
            botonguardanotas = ttk.Button(marco2,text="Guardar notas",command=guardaNotas) #Creo el boton de iniciar sesión
            botonguardanotas.pack(pady=10,expand = True)                    #Lo empaqueto
            
            #Cargo las notas de la base de datos
            
            cursor.execute('SELECT * FROM notas')      #Realizo una consulta a la base de datos
            datos = cursor.fetchall()                   #Cargo los datos
            for i in datos:
                print("Hay una nota en la base de datos")
                cargaNota(i[1],i[2],i[3])
                #identificador = identificador + 1

            for i in notas:                         #Para cada una de las notas
                print(i.texto)                      #Imprimo su contanido
                print(i.color)                      #Imprimo su color
                print(i.fecha)                      #Imprimo su fecha
                
        else:                               #En el caso de que no exista
            print("El usuario no es correcto")
            raiz.after(3000,lambda:raiz.destroy())#Cierro la ventana despues de 3 segundos

def guardaNotas():
    for i in notas:                         #Para cada una de las notas
        print(i.texto)                      #Imprimo su contanido
        print(i.color)                      #Imprimo su color
        print(i.fecha)                      #Imprimo su fecha
        existe = False
        cursor.execute('SELECT * FROM notas WHERE fecha = "'+i.fecha+'"')
        datos = cursor.fetchall()
        for i in datos:
            existe = True
        if existe == False:
            cursor.execute("INSERT INTO notas VALUES(NULL,'"+i.texto+"','"+i.color+"','"+i.fecha+"');") #Inserto una a una las notas en la base de datos
        else:
            print(identificador+'" texto ='"+i[1]+"', color='"+i[2]+"' WHERE fecha = '"+i[3]+")
            #cursor.execute("UPDATE notas SET texto ='"+i[1]+"', color='"+i[2]+"' WHERE fecha = '"+i[3]+";")
        conexion.commit()                           #Ejecuto la insercción


def creaNota():
    global notas                            #Traigo la variable global notas
    global identificador                    #Traigo la variable global identificador
    fecha = str(time.time())                #Saco la fecha actual
    notas.append(Nota('','',fecha))   #Añado una nota a la lista
    
    for i in notas:                         #Para cada una de las notas
        print(i.texto)                      #Imprimo su contanido
        print(i.color)                      #Imprimo su color
        print(i.fecha)                      #Imprimo su fecha
    ventananuevanota = tk.Toplevel()        #Nueva ventana flotante
    anchura = 400                           #Defino la anchura como un valor
    altura = 450                            #Defino la altura como un valor
    ventananuevanota.geometry(str(anchura)+'x'+str(altura)+"+100+100")  #Geometria de la ventana y margen con la pantalla
    texto = tk.Text(ventananuevanota,bg="white")
    texto.pack()
    identificadorpropio = identificador
    selectorcolor = ttk.Button(ventananuevanota,text="Cambia color",command=lambda:cambiaColor(ventananuevanota,texto,identificadorpropio))
    selectorcolor.pack()
    identificador = identificador + 1       #Subo el identificador

def cargaNota(mitexto,color,fecha):
    global notas                            #Traigo la variable global notas
    global identificador                    #Traigo la variable global identificador
    fecha = str(time.time())                #Saco la fecha actual
    notas.append(Nota('','',fecha))   #Añado una nota a la lista
    for i in notas:                         #Para cada una de las notas
        print(i.texto)                      #Imprimo su contanido
        print(i.color)                      #Imprimo su color
        print(i.fecha)                      #Imprimo su fecha
    ventananuevanota = tk.Toplevel()        #Nueva ventana flotante
    anchura = 400                           #Defino la anchura como un valor
    altura = 450                            #Defino la altura como un valor
    ventananuevanota.geometry(str(anchura)+'x'+str(altura)+"+100+100")  #Geometria de la ventana y margen con la pantalla
    texto = tk.Text(ventananuevanota,bg="white")
    texto.insert("1.0",mitexto)
    ventananuevanota.configure(bg = color)   #Cambio el color de fondo a la ventana seleccionada
    try:
        texto.configure(bg = color)
    except Exception as e:
        print(e)
    texto.pack()
    identificadorpropio = identificador
    selectorcolor = ttk.Button(ventananuevanota,text="Cambia color",command=lambda:cambiaColor(ventananuevanota,texto,identificadorpropio))
    selectorcolor.pack()
    identificador = identificador + 1       #Subo el identificador
    
def cambiaColor(ventana,texto,identificador): #Creo la función cambia color
    nuevocolor = askcolor(title="Selecciona un color")  #Saco un selector de color
    ventana.configure(bg = nuevocolor[1])   #Cambio el color de fondo a la ventana seleccionada
    texto.configure(bg = nuevocolor[1])
    notas[identificador].color = nuevocolor[1]
    notas[identificador].texto = texto.get("1.0",tk.END)
    print("el identificador es "+str(identificador))
    for i in notas:                         #Para cada una de las notas
        print(i.texto)                      #Imprimo su contanido
        print(i.color)                      #Imprimo su color
        print(i.fecha)                      #Imprimo su fecha
    
# Creación de la ventana principal y estilo de la ventana #

raiz = tk.Tk()                              #Creo una interfaz gráfica de usuario
raiz.title("Notas v0.01")                   #Especifico el titulo de la ventana
raiz.geometry("200x200+20+50")              #Geometria de la ventana y margen con la pantalla
raiz.attributes("-topmost",True)            #Simepre encima del resto de las ventanas
raiz.attributes("-alpha",0.95)              #Añado un efecto de transparencia
raiz.resizable(0,0)                         #Impido al usuario que pueda redimensionar la ventana
estilo = ttk.Style()                        #Añado soporte para estilos
estilo.theme_use('default')                #Selecciono el estilo de la aplicación


#Declaro funciones para el progrma #

varusuario = tk.StringVar()                 #Variable para almacenar el usuario
varcontrasena = tk.StringVar()              #variable para almacenar la contraseña
varemail = tk.StringVar()                   #Variable para almacenar el email
notas = []                                  #Creo una lista vacia
identificador = 0                           #Inicializo un identifacador

# Añadimos Widgets a la ventana #

marco = ttk.Frame(raiz)
marco.pack()

version = tk.Label(marco,text="Notas v0.01") #Creamos un label
version.pack()

inputusuario = ttk.Entry(marco,textvariable = varusuario)              #Creo una entrada para que el usuario diga quien es
inputusuario.insert(0,'Introduce tu usuario')   #Creo un texto de inicio en la entrada
inputusuario.pack(pady=10)                  #Empaqueto la entrada

inputclave = ttk.Entry(marco,textvariable = varcontrasena)                #Creo una entrada para que el usuario ponga su contraseña
inputclave.insert(0,'Introduce tu contraseña')   #Creo un texto de inicio en la entrada
inputclave.pack(pady=10)                    #Empaqueto la entrada

inputemail = ttk.Entry(marco,textvariable = varemail)                #Creo una entrada para que el usuario ponga su email
inputemail.insert(0,'Introduce tu email')   #Creo un texto de inicio en la entrada
inputemail.pack(pady=10)                    #Empaqueto la entrada

botonlogin = ttk.Button(marco,text="Enviar",command=login) #Creo el boton de iniciar sesión
botonlogin.pack(pady=10)                    #Lo empaqueto

#Intento introducir antialias en windows y lanzo el bucle #

try:                                        #Intento ejecutar
    from ctypes import windll               #Importo la libreria específica de GUI de Windows
    windll.shcore.SetProcessDpiAwareness(1) #Activo el antialias para texto etc dentro de las interfaces
except Exception as e:                      #Atrapo la excepción en caso de que se produzca
    print(e)                                #Saco la excepción por pantalla
finally:                                    #En todo caso:
    raiz.mainloop()                         #Detiene la ejecución y previene que la ventana se cierre
