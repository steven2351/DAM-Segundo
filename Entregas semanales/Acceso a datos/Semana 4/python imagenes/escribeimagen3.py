from PIL import Image
import tkinter as tk
from tkinter import ttk

raiz = tk.Tk()
raiz.geometry('200x200')

textoescrito = tk.StringVar()
nombrearchivo = tk.StringVar()

def guardar():
    img = Image.new('RGBA', (30,30), color = 'black')
    texto = textoescrito.get()
    x = 0
    y = 0
    for letra in texto:
        print(letra)
        img.putpixel((x,y),(0,0,ord(letra),255))
        x = x + 1
        if x == 30:
            x = 0
            y = y+1

    img.save(nombrearchivo.get()+'.png')

etiqueta1 = tk.Label(raiz,text = "Indica el nombre del archivo")
etiqueta1.pack()

entrada1 = tk.Entry(raiz,textvariable=nombrearchivo)
entrada1.pack()

etiqueta2 = tk.Label(raiz,text = "Indica el mensaje a grabar")
etiqueta2.pack()

entrada2 = tk.Entry(raiz,textvariable=textoescrito)
entrada2.pack()

boton = tk.Button(raiz,text="Guarda",command=guardar)
boton.pack()

raiz.mainloop()
