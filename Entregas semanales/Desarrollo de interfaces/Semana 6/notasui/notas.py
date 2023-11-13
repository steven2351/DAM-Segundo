import tkinter as tk                        #Importo la libreia de GUI
from tkinter import ttk                     #Importo la nueva libreria TTK

# Creación de la ventana principal y estilo de la ventana #

raiz = tk.Tk()                              #Creo una interfaz gráfica de usuario
raiz.title("Notas v0.01")                   #Especifico el titulo de la ventana
raiz.geometry("200x200+20+50")              #Geometria de la ventana y margen con la pantalla
raiz.attributes("-topmost",True)            #Simepre encima del resto de las ventanas
raiz.attributes("-alpha",0.95)              #Añado un efecto de transparencia
raiz.resizable(0,0)                         #Impido al usuario que pueda redimensionar la ventana
estilo = ttk.Style()                        #Añado soporte para estilos
estilo.theme_use('default')                #Selecciono el estilo de la aplicación

# Añadimos Widgets a la ventana #

version = ttk.Label(raiz,text="Notas v0.01") #Creamos un label
version.pack

inputusuario = ttk.Entry(raiz)              #Creo una entrada para que el usuario diga quien es
inputusuario.insert(0,'Introduce tu usuario')   #Creo un texto de inicio en la entrada
inputusuario.pack(pady=10)                  #Empaqueto la entrada

inputclave = ttk.Entry(raiz)                #Creo una entrada para que el usuario ponga su contraseña
inputclave.insert(0,'Introduce tu contraseña')   #Creo un texto de inicio en la entrada
inputclave.pack(pady=10)                    #Empaqueto la entrada

inputemail = ttk.Entry(raiz)                #Creo una entrada para que el usuario ponga su email
inputemail.insert(0,'Introduce tu email')   #Creo un texto de inicio en la entrada
inputemail.pack(pady=10)                    #Empaqueto la entrada

botonlogin = ttk.Button(raiz,text="Enviar") #Creo el boton de iniciar sesión
botonlogin.pack(pady=10)                    #Lo empaqueto

#Intento introducir antialias en windows y lanzo el bucle #

try:                                        #Intento ejecutar
    from ctypes import windll               #Importo la libreria específica de GUI de Windows
    windll.shcore.SetProcessDpiAwareness(1) #Activo el antialias para texto etc dentro de las interfaces
except Exception as e:                      #Atrapo la excepción en caso de que se produzca
    print(e)                                #Saco la excepción por pantalla
finally:                                    #En todo caso:
    raiz.mainloop()                         #Detiene la ejecución y previene que la ventana se cierre
