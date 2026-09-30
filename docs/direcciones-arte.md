# Concepto y direcciones de arte

Maqueta visual de las tres: `docs/maquetas/heroes.html` (se abre con la configuración `parrilla-maquetas` de `.claude/launch.json`). Las capturas están en `docs/maquetas/capturas/`.

## Concepto creativo

> **«De la huerta a la brasa, frente al Monasterio.»**

Une los tres rasgos de la casa que se pueden fotografiar: **la huerta** (tomate de la huerta, cosecha propia `[VERIFICAR]`), **la parrilla** (el propio nombre, el entrecot, las chuletillas) y **el lugar** (terraza bajo los castaños, a un paso del Monasterio). Si el dueño no confirma la huerta, el concepto alternativo es **«La brasa de siempre, a la sombra de los castaños»**, que solo usa datos ya contrastados.

## Punto de partida (por qué no se parecen a nada de alrededor)
- **Asador del Rey**, a 60 m, ocupa el terreno de lo oscuro, lo medieval y el horno de leña.
- **La Taberna del Viajero**, en el portal de al lado, usa granito, negro pizarra, oro viejo y Cormorant Garamond. **Ninguna de las tres direcciones repite su paleta ni su tipografía**, para que las dos webs no parezcan hermanas.
- La parrilla es sobre todo **de mediodía** (en Google abre de 11 a 17 h) y su gran baza es el **menú del día de 20 €** con trato familiar. Es un sitio de **sobremesa**, no de cena de lujo.

Contraste comprobado con la fórmula WCAG 2.x (script `contraste.mjs`):

---

## A · Brasa y castaño

- **Paleta:** carbón `#17120F`, castaño `#5A3521`, brasa `#C4552B`, ámbar `#E8A25C` y hueso `#F2E9DA`.
  - Hueso sobre carbón: 15,4:1 (AAA). Ámbar sobre carbón: 8,6:1 (AAA). Carbón sobre botón ámbar: 8,6:1 (AAA). Hueso sobre castaño: 8,9:1 (AAA).
  - Brasa sobre carbón: 4,1:1, **solo para elementos grandes o decorativos**. Para texto sobre fondos claros se usa brasa oscura `#9A3B1B` (5,8:1, AA).
- **Tipografías:** Fraunces (serif variable, cálida, con cursiva expresiva) + Manrope.
- **Tono:** sensorial y directo. Titular de ejemplo: «La brasa de siempre, *a la sombra de los castaños.*»
- **Fotografía:** clave baja, luz lateral cálida, brasas y humo, primeros planos de la carne con grasa brillante.
- **Hero:** Ken Burns sobre la parrilla, ascuas que suben (partículas CSS ligeras) y titular revelado letra a letra.
- **Riesgo:** la oscuridad y la carne son el código de Asador del Rey y de cualquier asador; se pierde la luz de la terraza y lo casero. Además, las fotos oscuras piden un fotógrafo con buen equipo.

## B · Sobremesa ★ recomendada

- **Paleta:** mantel `#F6F0E4`, tinta `#231C17`, burdeos `#7B1E2B`, verde botella `#1E3A2F` y gris cálido `#6B5E52`.
  - Tinta sobre mantel: 14,8:1 (AAA). Burdeos sobre mantel: 9,0:1 (AAA). Verde botella sobre mantel: 10,9:1 (AAA). Mantel sobre botón burdeos: 9,0:1 (AAA). Gris cálido sobre mantel: 5,5:1 (AA).
- **Tipografías:** Playfair Display (títulos, con la cursiva para los acentos) + Source Sans 3.
- **Tono:** de casa de comidas de toda la vida, cercano y con humor tranquilo. Titular de ejemplo: «Comer como antes, *frente al Monasterio.*»
- **Fotografía:** luz natural de mediodía, mantel, vino, platos servidos en la mesa con manos, la terraza con sombra moteada y el equipo (Javier, Ángel y el dueño, si dan permiso).
- **Hero:** foto enmarcada en un **arco** (eco de los arcos de granito del Monasterio y del casco histórico) que se descubre con máscara, una **postal del Monasterio** que entra girada y un titular que sube línea a línea. Encima, el **menú del día** como una tarjeta de carta.
- **Por qué la recomiendo:**
  1. Nace de lo que dicen las reseñas: «un trato y un ambiente de otros tiempos», «como en casa», «un clásico». Convierte en virtud lo que algunos llaman «viejuno».
  2. Pone en primer plano el **menú del día**, que es lo que trae gente cada día y no tiene rival en precio frente al Monasterio.
  3. Es clara, de mediodía y luminosa: lo contrario de Asador del Rey (oscuro, medieval) y de La Taberna (granito y oro).
  4. Funciona aunque las primeras fotos sean modestas: el papel, la tipografía y el arco sostienen el diseño.
- **Riesgo:** si se ejecuta sin cuidado puede parecer anticuada. Se compensa con una composición editorial moderna, mucho aire y animaciones finas.

## C · Huerta y sombra

- **Paleta:** lino `#EEE9DC`, verde castaño `#2F4A2C`, tomate `#A63A25`, tierra `#7A5A3A` y tinta `#1B2419`.
  - Tinta sobre lino: 13,2:1 (AAA). Verde sobre lino: 8,1:1 (AAA). Tomate sobre lino: 5,3:1 (AA). Lino sobre botón tomate: 5,3:1 (AA). Tierra sobre lino: 5,2:1 (AA).
- **Tipografías:** DM Serif Display + DM Sans.
- **Tono:** de temporada, de lo que hay hoy. Titular de ejemplo: «Lo que da la huerta, *lo que pide la brasa.*»
- **Fotografía:** exterior, verde, luz filtrada entre hojas, tomates recién cogidos, cestos y manos de tierra.
- **Hero:** la terraza a pantalla completa con **luz moteada que se mueve** como bajo los castaños, un sello giratorio «De nuestra huerta · A la brasa» y un titular que se enfoca palabra a palabra.
- **Riesgo:** depende de algo **sin confirmar** (la huerta). Si no existe o es pequeña, el concepto se cae. También exige buenas fotos de la terraza, que ahora no tenemos.

---

## Créditos de las fotos de las maquetas (provisionales, Unsplash)
- A: Emerson Vieira (`photo-1558030137-a56c1b004fa3`)
- B: Julie Mallet (`photo-1751011983324-fe9d30fe9efd`) y Fernando Mola-Davis, Monasterio (`photo-1722221628340-df6b30600572`)
- C: Adrien Olichon (`photo-1774887810505-b598a7ef1902`) y Luna Wang (`photo-1758972574908-bc43ad077156`)

En la web real se sustituirán por fotos propias del restaurante. Si alguna de Unsplash se queda, irá con su crédito.
