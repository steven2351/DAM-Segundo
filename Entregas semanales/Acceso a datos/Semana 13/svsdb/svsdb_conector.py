import subprocess

class Svsdb:
    def __init__(self,basededatos):
        self.basededatos = basededatos
    def insert(self,coleccion,documento,contenido):
        self.operacion = "insert"
        self.coleccion = coleccion
        self.documento = documento
        self.contenido = contenido
        # Define the command and its arguments as a list
        comando = [
            'C:\\Users\\Steve\\Documents\\Grado superior\\GitHub\\DAM-2-\\Entregas semanales\\Acceso a datos\\Semana 13\\svsdb\\svsdb',
            self.operacion,
            self.basededatos,
            self.coleccion,
            self.documento,
            self.contenido
        ]

        # Execute the command without using shell=True
        resultado = subprocess.run(comando, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Check the return code
        if resultado.returncode == 0:
             return("ok")
        else:
             return("ko")

