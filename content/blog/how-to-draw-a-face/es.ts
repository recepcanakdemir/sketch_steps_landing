import type { ArticleTranslation } from "@/lib/blog/types";

import { DIR, step } from "./images";

/**
 * Spanish translation of "How to Draw a Face Step by Step" (same article,
 * same nine images): DRAFT. It says what the English version says, step for
 * step; the open drawing-review questions in
 * docs/editorial/how-to-draw-a-face/review.md apply to it too. Spanish
 * standards: docs/editorial/standards.md, section 8.
 *
 * Publishing (separate change, after review and owner approval): set
 * status "published" and the real publishedAt. hreflang en <-> es and the
 * sitemap entries then follow automatically from this entry.
 */

const images = {
  s1: step(1, "Paso 1 del dibujo de una cara: un único círculo trazado a lápiz con suavidad en la parte superior de la hoja"),
  s2: step(2, "Paso 2: el círculo con una línea central vertical inclinada que continúa por debajo y una línea horizontal un poco por debajo de su mitad"),
  s3: step(3, "Paso 3: dos líneas curvas recortan los lados del círculo y bajan hasta formar una mandíbula angulosa con el mentón plano"),
  s4: step(4, "Paso 4: líneas guía horizontales con el contorno de las cejas, una nariz sencilla y una boca colocadas a lo largo de la línea central"),
  s5: step(5, "Paso 5: el contorno del pelo ondulado, las orejas apenas sugeridas a los lados, el cuello, el borde de la ropa y los hombros; los ojos aún no están dibujados"),
  s6: step(6, "Paso 6: ojos abiertos, cejas más oscuras, una boca sonriente y el pelo con más volumen sobre líneas de construcción suaves"),
  s7: step(7, "Paso 7: el dibujo lineal de la cara ya refinado, con más mechones de pelo y detalles más oscuros en los ojos"),
  s8: step(8, "Paso 8: el primer rayado suave a lápiz en el pelo, en la cara y en el cuello"),
  s9: step(9, "Paso 9: boceto a lápiz terminado de un joven sonriente con el pelo ondulado y un sombreado más oscuro"),
};

const es: ArticleTranslation = {
  slug: "como-dibujar-una-cara",
  title: "Cómo dibujar una cara paso a paso",
  seoTitle: "Cómo dibujar una cara paso a paso: método Loomis",
  description:
    "Dibuja una cara a lápiz con el método Loomis: un círculo, líneas guía, rasgos, pelo y sombreado, en nueve etapas. Pensado para principiantes.",
  excerpt:
    "Nueve etapas a lápiz, de un simple círculo a un retrato terminado, con lo que hay que dibujar en cada una y cómo detectar los errores más habituales.",
  status: "draft",
  heroImage: {
    ...images.s9,
    alt: "Boceto a lápiz terminado de un joven sonriente con el pelo ondulado, la última de las nueve etapas del dibujo",
  },
  // Spanish version of the social card (same four stages, Spanish title):
  // scripts/blog-og-how-to-draw-a-face.mjs es
  socialImage: {
    src: `${DIR}/como-dibujar-una-cara-og.png`,
    alt: "Cómo dibujar una cara: cuatro etapas de un dibujo a lápiz, de un simple círculo a un retrato terminado",
    width: 1200,
    height: 630,
  },
  body: [
    {
      type: "paragraph",
      text: "Vas a dibujar una cara a lápiz en nueve etapas, desde un simple círculo hasta un retrato terminado. El proceso se basa en el método Loomis: primero construyes la cabeza con unas pocas formas sencillas y líneas guía, y solo después dibujas los ojos, la nariz y la boca.",
    },
    {
      type: "paragraph",
      text: "Las nueve etapas que verás aquí las generó Sketch Steps a partir de una foto de retrato. No son bocetos de un artista. Tómalas como una referencia para copiar a mano: tu tarea es reproducir cada etapa en papel, una por una. Cuando los pasos hablan de \"tu referencia\", se refieren a lo que estés dibujando: por ahora, este dibujo; más adelante, una foto que tú elijas.",
    },

    { type: "heading", level: 2, text: "Qué necesitas" },
    {
      type: "list",
      items: [
        "Un lápiz con el que puedas trazar líneas suaves",
        "Una goma de borrar",
        "Papel",
        "Esta página abierta junto a la hoja, para comparar después de cada etapa",
      ],
    },
    {
      type: "paragraph",
      text: "Durante las cinco primeras etapas, presiona poco el lápiz. Esas líneas son guías y las irás ajustando sobre la marcha.",
    },

    { type: "heading", level: 2, text: "El método Loomis en pocas palabras" },
    {
      type: "paragraph",
      text: "El método debe su nombre a Andrew Loomis, un ilustrador estadounidense cuyos libros, entre ellos *Drawing the Head and Hands*, se siguen usando mucho para enseñar a dibujar retratos. Su idea central es que no se empieza por un ojo ni por la nariz, sino por la cabeza entera: una bola para el cráneo, aplanada por los lados, con la mandíbula unida por debajo.",
    },
    {
      type: "paragraph",
      text: "Las líneas trazadas sobre esa bola te indican dónde va cada cosa. Una línea central vertical muestra hacia dónde gira o se inclina la cara. Las líneas horizontales marcan la altura de los rasgos. Los diagramas clásicos de Loomis dividen la cara en tres partes más o menos iguales: del nacimiento del pelo a las cejas, de las cejas a la base de la nariz y de la nariz al mentón. Cada cara es distinta, así que toma esos tercios como un punto de partida que debes contrastar con tu referencia, no como una regla.",
    },
    {
      type: "paragraph",
      text: "El ejemplo de abajo sigue este enfoque, pero sus líneas guía no coinciden punto por punto con los diagramas clásicos. Donde hay diferencias, los pasos lo indican.",
    },
    {
      type: "paragraph",
      text: "¿Por qué hacerlo así? Porque las proporciones se corrigen mucho mejor mientras el dibujo no es más que unas cuantas líneas suaves. Mover un círculo lleva segundos. Mover un ojo terminado obliga a dibujarlo de nuevo.",
    },

    { type: "heading", level: 2, text: "Cómo dibujar una cara paso a paso" },

    { type: "heading", level: 3, text: "Paso 1: dibuja un círculo para el cráneo" },
    { type: "image", image: images.s1 },
    {
      type: "paragraph",
      text: "Traza un círculo suave en la parte superior de la hoja. Representa el cráneo, es decir, la parte superior y trasera de la cabeza. La cara, la mandíbula y el cuello irán debajo, así que deja bastante espacio libre.",
    },
    {
      type: "paragraph",
      text: "No hace falta que sea un círculo perfecto. Si miras la imagen de cerca, verás en algunas zonas una segunda línea, un poco desplazada. Es una buena forma de trabajar: varias líneas suaves se corrigen con más facilidad que una sola línea oscura.",
    },
    {
      type: "tip",
      title: "Comprueba el tamaño ahora",
      text: "Si el círculo es demasiado grande o está demasiado abajo, el mentón no cabrá en la hoja. Es el momento en que menos cuesta empezar de nuevo.",
    },

    { type: "heading", level: 3, text: "Paso 2: añade la línea central y una guía horizontal" },
    { type: "image", image: images.s2 },
    {
      type: "paragraph",
      text: "Traza una línea vertical que atraviese el círculo y prolóngala bastante por debajo: la cara continúa hacia abajo, hasta el mentón, a lo largo de esta línea. Después traza una línea horizontal que cruce el círculo un poco por debajo de su mitad.",
    },
    {
      type: "paragraph",
      text: "Fíjate en que la cruz está inclinada. La cabeza de este retrato está un poco ladeada, así que la línea vertical se inclina con ella y la horizontal se mantiene más o menos en ángulo recto con la vertical. Todos los rasgos que coloques más adelante sobre estas líneas seguirán esa misma inclinación sin que tengas que pensarlo.",
    },
    {
      type: "paragraph",
      text: "Una aclaración sobre los nombres: los diagramas clásicos de Loomis trazan una línea horizontal justo por la mitad de la bola y la llaman \"línea de las cejas\". La de este dibujo queda un poco más abajo: las cejas se dibujan por encima de ella y, en el paso 6, los ojos se dibujan sobre ella. Por eso aquí funciona como línea guía de los ojos.",
    },
    {
      type: "tip",
      title: "Error común",
      text: "Dibujar una cruz perfectamente recta en una cabeza inclinada. Antes de trazarla, observa cuánto se inclina la cara de tu referencia y copia ese ángulo.",
    },

    { type: "heading", level: 3, text: "Paso 3: recorta los lados y da forma a la mandíbula" },
    { type: "image", image: images.s3 },
    {
      type: "paragraph",
      text: "Ahora la bola empieza a parecer una cabeza. Traza una línea curva justo por dentro del borde izquierdo del círculo y otra justo por dentro del derecho. Marcan los planos laterales: Loomis trata los lados de la cabeza como más planos que una bola, y por eso su método los \"recorta\". De frente, esos lados planos quedan casi paralelos a tu línea de visión; por eso apenas se ven y aparecen como curvas estrechas y no como los óvalos que quizá conozcas de los diagramas de Loomis con la cabeza girada.",
    },
    {
      type: "paragraph",
      text: "Prolonga esas líneas por debajo del círculo y llévalas hacia la línea central para formar la mandíbula. Aquí la mandíbula se compone de unos pocos tramos rectos y termina en un mentón plano situado sobre la línea central. Además, un par de líneas más suaves bajan desde la parte inferior del círculo hacia las esquinas del mentón.",
    },
    {
      type: "paragraph",
      text: "En esta etapa no pasa nada si queda angulosa. Los tramos rectos son más fáciles de valorar que las curvas, y la mandíbula se suaviza más adelante.",
    },
    {
      type: "tip",
      title: "Error común",
      text: "Una mandíbula demasiado larga o demasiado corta. Puede hacer que una cara se vea extraña aunque cada rasgo esté bien dibujado, así que compara el largo de la cara con tu referencia antes de seguir.",
    },

    { type: "heading", level: 3, text: "Paso 4: coloca las cejas, la nariz y la boca" },
    { type: "image", image: images.s4 },
    {
      type: "paragraph",
      text: "En esta etapa se añaden más líneas guía horizontales: una suave en la base de las cejas, otra en la base de la nariz y una corta donde se juntan los labios. Todas siguen la inclinación que marcaste en el paso 2.",
    },
    {
      type: "paragraph",
      text: "Son las líneas guía que usa este dibujo en concreto, no una receta fija de Loomis. Los diagramas clásicos de Loomis trabajan con una línea de las cejas en la mitad de la bola, una línea de la nariz y una línea del mentón, separadas según los tercios descritos más arriba. Este dibujo, en cambio, coloca los ojos sobre la línea horizontal del paso 2, que queda un poco por debajo de la mitad del círculo. En cualquier caso, ajusta las distancias a tu referencia, no a un diagrama.",
    },
    {
      type: "paragraph",
      text: "Dibuja las cejas como formas sencillas, solo con su contorno, una a cada lado de la línea central. Para la nariz, traza unas líneas suaves que bajan desde el entrecejo y, después, la punta y las aletas, apoyadas en la línea de la nariz. Debajo va la boca: el labio superior, la línea donde se juntan los labios y una marca corta bajo el labio inferior.",
    },
    {
      type: "paragraph",
      text: "En este dibujo, la boca queda más cerca de la nariz que del mentón. Comprueba esas mismas distancias en tu referencia. También verás que la mandíbula se ha redibujado un poco en este paso: es normal ajustar las líneas anteriores a medida que añades los rasgos.",
    },
    {
      type: "paragraph",
      text: "Los ojos todavía no están dibujados. Con las cejas, la nariz y la boca en su sitio, ya tienes un marco en el que encajarlos.",
    },

    { type: "heading", level: 3, text: "Paso 5: esboza el pelo, las orejas y el cuello" },
    { type: "image", image: images.s5 },
    {
      type: "paragraph",
      text: "Dibuja el pelo como una sola forma exterior con unas cuantas ondas grandes. Observa cuánto sobresale por encima del círculo: el pelo tiene volumen, así que su contorno queda por fuera del cráneo, no pegado a él. Deja los mechones sueltos para más adelante.",
    },
    {
      type: "paragraph",
      text: "Añade las orejas a los lados de la cabeza. Aquí apenas están sugeridas y el pelo las tapa en parte; quedan, más o menos, entre la línea guía de los ojos y la base de la nariz. Después dibuja el cuello a partir de la mandíbula y, debajo, el borde de la ropa y los hombros.",
    },
    {
      type: "tip",
      title: "Error común",
      text: "Un pelo pegado al círculo, que hace que la cabeza parezca pequeña y plana por arriba. Mira en tu referencia cuánto se separa el pelo de la cabeza.",
    },

    { type: "heading", level: 3, text: "Paso 6: dibuja los ojos y añade detalles al rostro" },
    { type: "image", image: images.s6 },
    {
      type: "paragraph",
      text: "Ahora sí, los ojos: van sobre la línea guía de los ojos, justo debajo de las cejas. Cada uno lleva un párpado superior, un iris y una pupila. Fíjate en cómo el párpado superior tapa la parte de arriba del iris. Si dibujas el iris como un círculo completo, los ojos pueden dar la impresión de mirar fijamente.",
    },
    {
      type: "paragraph",
      text: "Oscurece las cejas, define la nariz y los labios, y añade los pequeños pliegues en las comisuras de los labios. En esta etapa el contorno del pelo se redibuja con más volumen y aparecen los primeros mechones dentro de él, así que no dudes en mejorar la forma que esbozaste en el paso 5.",
    },
    {
      type: "paragraph",
      text: "Las líneas de construcción ya son más suaves, pero siguen ahí. Todavía no hace falta borrarlas.",
    },
    {
      type: "tip",
      title: "Error común",
      text: "Colocar los ojos demasiado arriba, cerca de la parte superior de la cabeza. Una pauta habitual los sitúa más o menos a medio camino entre la parte superior del cráneo y el mentón. En este dibujo quedan un poco más arriba, sobre la línea horizontal del paso 2, así que comprueba la altura con tu propia referencia en lugar de copiar cualquiera de las dos reglas.",
    },

    { type: "heading", level: 3, text: "Paso 7: refina el dibujo lineal" },
    { type: "image", image: images.s7 },
    {
      type: "paragraph",
      text: "Es un repaso de limpieza y los cambios son sutiles. El pelo gana mechones que siguen sus ondas, los ojos tienen pestañas y líneas de los párpados más oscuras, y los contornos de la cara, la mandíbula y el cuello se definen mejor. Todavía no hay sombreado propiamente dicho.",
    },
    {
      type: "paragraph",
      text: "Si comparas esta etapa con el paso 6 y apenas ves diferencias, mira primero el pelo: ahí está la mayoría de las líneas nuevas.",
    },

    { type: "heading", level: 3, text: "Paso 8: añade un sombreado suave" },
    { type: "image", image: images.s8 },
    {
      type: "paragraph",
      text: "Empieza a sombrear con un rayado suave (también llamado achurado): grupos de líneas paralelas a lápiz. En este dibujo, los primeros tonos van en el pelo, en los lados de la cara y de la nariz, en el cuello y en la ropa. Otras zonas quedan casi blancas.",
    },
    {
      type: "paragraph",
      text: "Mantén poca presión. Añadir tono es fácil; quitarlo después cuesta mucho más.",
    },

    { type: "heading", level: 3, text: "Paso 9: oscurece los tonos poco a poco" },
    { type: "image", image: images.s9 },
    {
      type: "paragraph",
      text: "Para terminar, oscurece de forma gradual. El pelo recibe sus mechones más oscuros, las sombras bajo la mandíbula y en el cuello se intensifican, y los ojos y las cejas ganan contraste. Trabaja por capas en lugar de apretar fuerte de una sola vez.",
    },
    {
      type: "paragraph",
      text: "Si miras de cerca, verás que en el boceto terminado aún se distinguen algunas líneas de construcción, por ejemplo la línea central en la frente. Puedes borrarlas o dejarlas para darle un aire de cuaderno de bocetos: tú decides.",
    },

    { type: "heading", level: 2, text: "Errores comunes y cómo corregirlos" },
    {
      type: "list",
      items: [
        "**Apretar demasiado al principio.** Las líneas de construcción deben ser lo bastante suaves como para borrarlas o dibujar encima.",
        "**No tener en cuenta la inclinación de la cabeza.** Si la cara se inclina, la línea central y todas las líneas guía horizontales se inclinan con ella (paso 2).",
        "**Ojos demasiado altos.** Comprueba su altura con tu referencia, no con el lugar donde \"parece\" que deberían ir (paso 6).",
        "**Una mandíbula demasiado larga o demasiado corta.** Compara el largo de la cara con tu referencia antes de añadir los rasgos (paso 3).",
        "**Pelo pegado al cráneo.** Dale volumen por encima del círculo (paso 5).",
        "**Oscurecer demasiado pronto.** Construye el tono en capas suaves (pasos 8 y 9).",
      ],
    },

    { type: "heading", level: 2, text: "Cómo practicar" },
    {
      type: "paragraph",
      text: "Dibuja varias veces las tres primeras etapas antes de seguir: círculo, cruz y mandíbula, con distintos tamaños e inclinaciones. Son rápidas y es en ellas donde se deciden las proporciones.",
    },
    {
      type: "paragraph",
      text: "Después recorre las nueve etapas usando este dibujo como referencia y compara al terminar cada una, no solo al final. Los errores se corrigen con más facilidad entre los pasos 1 y 4. Cuando el proceso te resulte cómodo, prueba a hacer lo mismo con la foto de otra cara que mire a la cámara.",
    },
    {
      type: "paragraph",
      text: "Si quieres etapas como estas para una cara que tú elijas, Sketch Steps convierte una foto en un tutorial de dibujo paso a paso, que puedes recorrer de uno en uno o en una lista continua. La [demo interactiva de nuestra página de inicio](/es#demo-title) muestra las mismas nueve etapas de este artículo.",
    },
    { type: "appCta" },
  ],
};

export default es;
