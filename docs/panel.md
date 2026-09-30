# Panel de la Parrilla Príncipe

Con este panel, el restaurante cambia su web sin tocar nada técnico: la carta, el menú del día, el horario, el plato de la casa y las fotos.
Está hecho con [Keystatic](https://keystatic.com) y se abre en **`/keystatic`**.

---

## Guía para el restaurante

### Qué se puede cambiar

| En el panel | Qué es |
|---|---|
| **Menú del día** | El precio, qué incluye y qué días hay (en español y en inglés) |
| **Horario** | Qué días abrís y a qué hora. Si dais cenas, se rellena el segundo turno («Abre de nuevo») |
| **Carta** | Las secciones y los platos: nombre, descripción, precio, alérgenos y si es vegetariano, sin gluten o de temporada |
| **Datos generales** | El teléfono de reservas, el plato de la casa y los enlaces a Facebook, Instagram y Tripadvisor |
| **Galería de fotos** | Subir fotos, con su título y el texto que sale al ampliarlas |

### Cómo se usa

1. Entra en `la-direccion-de-la-web/keystatic` e inicia sesión.
2. A la izquierda, elige lo que quieres cambiar.
3. Cambia lo que necesites y pulsa el botón azul **Save**, arriba a la derecha. (El atajo Ctrl+S no guarda.)
4. En uno o dos minutos, la web ya muestra el cambio.

### Tres reglas importantes

- **Alérgenos:** marca «Alérgenos revisados» solo cuando la lista de ese plato esté comprobada. Mientras no lo esté, la web pide a los clientes que pregunten al personal. Nunca dejes una lista a medias marcada como revisada.
- **Casillas «revisado por el restaurante»:** están en el menú del día, el horario, el teléfono y el plato de la casa. Mientras no las marques, la web muestra la etiqueta «Por confirmar» y ese dato no se envía a Google. Márcalas cuando el dato esté bien.
- **Español e inglés:** rellena siempre los dos idiomas. Si el inglés se queda vacío, la web en inglés mostrará un hueco.

### Fotos

- Mejor horizontales y de buena calidad. Sirven las de un móvil actual.
- No hace falta reducirlas: la web las optimiza sola.
- Rellena siempre la «Descripción para personas ciegas»: una frase que cuente lo que se ve.
- Las fotos que no sean vuestras solo se pueden usar con permiso, y hay que indicar el autor en «Crédito».

### Si algo sale mal

Cada guardado queda registrado, así que cualquier cambio se puede deshacer. Si ves algo raro en la web, avisa a quien lleve la web y dile qué cambiaste y a qué hora.

---

## Notas técnicas

### Cómo funciona

- Todo lo editable vive en `frontend/src/contenido/*.json`, y su estructura está definida en `frontend/keystatic.config.ts`.
- La web lee esos JSON **al compilar** (desde `src/data/*.ts`). Sigue siendo HTML estático, rápida y legible para buscadores e IA.
- Keystatic **omite los campos vacíos** al guardar, así que los lectores de `src/data/` tratan todos los campos como opcionales.
- Las fotos subidas van a `frontend/src/assets/img/galeria/` y se cargan con `import.meta.glob`.
- Específico de este proyecto: la casilla `telefonoConfirmado` controla la etiqueta «Por confirmar» del teléfono y si este aparece en el JSON-LD.

### En local (ya funciona)

```bash
cd frontend
npm run dev    # panel en http://localhost:4321/keystatic
```

- **Guardado:** en local, el panel guarda directamente en los archivos del proyecto. Se comprobó el 30/09/2026 cambiando el precio del menú: el cambio llegó al JSON y a la web, y después se deshizo.
- **Carpeta:** `astro dev` debe ejecutarse desde `/frontend`. Si se lanza desde otra carpeta, hay que usar `node frontend/scripts/dev.mjs`.
- **Compilación:** `npm run build` genera la web estática **sin** el panel.

### En producción (Fase 5)

1. **Repositorio privado en GitHub** con el proyecto.
2. **Netlify** conectado al repositorio: cada guardado del panel es un commit, y Netlify vuelve a publicar la web.
3. Variables en Netlify:
   - `KEYSTATIC_PRODUCCION=true`;
   - `PUBLIC_KEYSTATIC_GITHUB_REPO=usuario/repositorio`.
   Con ellas se activa el adaptador de Netlify y el panel.
4. Al entrar por primera vez en `/keystatic`, el asistente de Keystatic crea la GitHub App y da estas variables:
   - `KEYSTATIC_GITHUB_CLIENT_ID`;
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`;
   - `KEYSTATIC_SECRET`;
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
   Se guardan en Netlify, **nunca en el código**.
5. **Acceso del dueño:** una cuenta gratuita de GitHub invitada como colaboradora. Si le resulta complicado, la alternativa es Keystatic Cloud (gratis hasta 3 usuarios).

### Seguridad

- **Quién puede editar:** solo los colaboradores del repositorio. No hay contraseñas propias ni base de datos que proteger.
- **Historial:** cada cambio queda en el historial de Git y se puede deshacer.
- **CSP:** en `netlify.toml` solo se aplica a las páginas públicas, porque `/keystatic` necesita conectar con GitHub.
- **Datos personales:** la web pública no tiene formularios ni los recoge.
- **Rastreadores:** `robots.txt` bloquea `/keystatic`.
