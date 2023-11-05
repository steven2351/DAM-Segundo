from PIL import Image

img = Image.new('RGBA', (30,30), color = 'black')

texto = "Hola soy Steven y este es un texto de prueba para comprobar como cambian los pixeles de la imagen segun la cantidad de texto que haya escrito,por eso hago este texto y veremos si realmente funciona"
x = 0
y = 0
for letra in texto:
    print(letra)
    img.putpixel((x,y),(0,0,ord(letra),255))
    x = x + 1
    if x == 30:
        x = 0
        y = y+1

img.save('miimagen.png')
