How to Add New Posts to Your Blog
Adding a new post is easy! Follow these 3 steps:

1. Create the Post File
Open the folder posts/.
Copy the file 
post-template.html
 and rename it (e.g., future-of-ai.html).
Open the new file and edit the content:
SEO: Update the <title> and <meta description> at the top.
Content: Update the titles and paragraphs using the data-en (English) and data-es (Spanish) attributes.
Images: Change the src of the <img> tag to a new Unsplash URL or a local image.
2. Add to the Blog Listing
Open 
blog.html
.
Look for the <div class="blog-grid">.
Copy one of the <a class="blog-card">...</a> blocks.
Paste it and update:
The href to point to your new file (e.g., posts/future-of-ai.html).
The date, title, and excerpt (using data-en and data-es).
3. (Optional) Show on Home Page
If you want the new post to appear on the front page:

Open 
index.html
.
Look for the <section id="blog">.
Inside the blog-grid, replace one of the existing cards with your new post's info.
TIP

When choosing images from Unsplash, you can use a URL like https://images.unsplash.com/photo-ID?auto=format&fit=crop&q=80&w=800 where ID is the unique identifier of the photo.

Explaining Blog Management
I have created a comprehensive guide 
how_to_add_posts.md
 that explains the 3 simple steps to create, link, and display new blog posts.

Files Edited
Progress Updates
1
Creating a guide for adding new posts

2
Guide completed. Notifying the user.

¡Añadir más posts es muy sencillo! He preparado una guía paso a paso para que puedas hacerlo tú mismo siguiendo la estructura actual.

Los pasos principales son:

Copiar la plantilla: Duplica el archivo posts/post-template.html y cámbiale el nombre (ej. mi-nuevo-post.html).
Editar el contenido: Cambia los textos dentro de los atributos data-en (inglés) y data-es (español).
Añadir al listado: Copia el bloque de una "tarjeta" en blog.html y actualiza el enlace y la información.
Tienes la guía detallada con ejemplos en el archivo how_to_add_posts.md dentro de la carpeta de artefactos. Solo tienes que seguir esos 3 pasos para mantener tu blog actualizado.