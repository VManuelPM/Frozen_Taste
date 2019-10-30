CREATE DATABASE frozen_taste CHARACTER SET utf8 COLLATE utf8_general_ci;;

USE frozen_taste;

#CREACION DE LA TABLA USUARIO#

CREATE TABLE USUARIOS(
id_usuario      int(255) auto_increment not null,
nombre      	varchar(100) not null,
apellido	   	varchar(100) not null,
email           varchar(255) not null,
password    	varchar(255) not null,
rol				varchar(5) not null,
CONSTRAINT pk_usuario PRIMARY KEY(id_usuario),
CONSTRAINT uq_email UNIQUE(email)
)ENGINE=InnoDb;

#CREACION DE LA TABLA TIPO#

CREATE TABLE TIPOS (
id_tipo      int(255) auto_increment not null,
tipo		 varchar(255) not null,
CONSTRAINT pk_tipo PRIMARY KEY(id_tipo)
)ENGINE=InnoDb;


#CREACION DE LA TABLA PRODUCTOS#

CREATE TABLE PRODUCTOS (
id_producto      int(255) auto_increment not null,
fk_id_tipo		 int(255) not null,
nombre_producto  varchar(255) not null,
CONSTRAINT pk_producto PRIMARY KEY(id_producto),
CONSTRAINT fk_id_tipo FOREIGN KEY(fk_id_tipo) REFERENCES TIPOS(id_tipo)
)ENGINE=InnoDb;		


#CREACION DE LA TABLA SABORES#
CREATE TABLE SABORES(
id_sabor      int(255) auto_increment not null,
sabor  		  varchar(255) not null,
CONSTRAINT pk_sabor PRIMARY KEY(id_sabor)
)ENGINE=InnoDb;		


#CREACION DE LA TABLA LINEAS#
CREATE TABLE LINEAS(
id_linea 		int(255) auto_increment not null,
linea			varchar(255) not null,
CONSTRAINT pk_linea PRIMARY KEY(id_linea)
)ENGINE=InnoDb;	

#CREACION DE LA TABLA PRODUCTOS_SABORES#
CREATE TABLE PRODUCTOS_SABORES (
id_producto_sabor     int(255) auto_increment not null,
fk_id_producto		 	int(255) not null,
fk_id_sabor		 		int(255) not null,
CONSTRAINT pk_producto_sabor PRIMARY KEY(id_producto_sabor),
CONSTRAINT fk_id_producto_sabor FOREIGN KEY(fk_id_producto) REFERENCES PRODUCTOS(id_producto),
CONSTRAINT fk_id_sabor_sabor FOREIGN KEY(fk_id_sabor) REFERENCES SABORES(id_sabor)
)ENGINE=InnoDb;		

#CREACION DE LA TABLA PRODUCTOS_SABORES#
CREATE TABLE PRODUCTOS_LINEAS (
id_producto_linea     int(255) auto_increment not null,
fk_id_producto		 	int(255) not null,
fk_id_linea		 		int(255) not null,
CONSTRAINT pk_producto_linea PRIMARY KEY(id_producto_linea),
CONSTRAINT fk_id_producto_linea FOREIGN KEY(fk_id_producto) REFERENCES PRODUCTOS(id_producto),
CONSTRAINT fk_id_linea_linea FOREIGN KEY(fk_id_linea) REFERENCES LINEAS(id_linea)
)ENGINE=InnoDb;		


INSERT INTO USUARIOS VALUES (null,'admin','admin','admin@admin.com','21232f297a57a5a743894a0e4a801fc3','ad');

INSERT INTO TIPOS VALUES (null,'Paletas');

INSERT INTO PRODUCTOS VALUES (null,1,'Paleta 350 gr');
INSERT INTO PRODUCTOS VALUES (null,1,'Paleta 400 gr');
INSERT INTO PRODUCTOS VALUES (null,1,'Paleta 500 gr');

INSERT INTO SABORES VALUES (null, 'Vainilla');
INSERT INTO SABORES VALUES (null, 'Fresa');

INSERT INTO LINEAS VALUES (null,'base de leche');
INSERT INTO LINEAS VALUES (null,'base de agua');


INSERT INTO PRODUCTOS_SABORES VALUES (null,1,1);
INSERT INTO PRODUCTOS_SABORES VALUES (null,2,1);
INSERT INTO PRODUCTOS_SABORES VALUES (null,3,2);


INSERT INTO PRODUCTOS_LINEAS VALUES (null,1,1); 
INSERT INTO PRODUCTOS_LINEAS VALUES (null,2,2); 
INSERT INTO PRODUCTOS_LINEAS VALUES (null,3,1); 