from PIL import Image

img = Image.open(r"miimagen.png")
print(img)
pixeles = img.getdata()
print(pixeles)
cadena = ""
for pixel in pixeles:
    print(chr(pixel[2]))
    cadena = cadena + chr(pixel[2])

print(cadena)
