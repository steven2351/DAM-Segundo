from PIL import Image

img = Image.new('RGBA', (30,30), color = 'blue')
img.putpixel((0,0),(0,128,0,255))

img.save('miimagen.png')
