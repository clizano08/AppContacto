Use master
Go 
Create Database DBContacto;
Go
Use DBContacto
Go

Create Table Contacto(
idContacto int primary key identity(1,1),
nombre varchar(50),
correo varchar(50),
telefono varchar(50)
)

insert into Contacto(nombre,correo,telefono) values ('Carlos', 'carloslizano97@gmail.com', '87806817')

Select * from Contacto

Delete from Contacto