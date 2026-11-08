(() => {
  'use strict';

  // An explicit choice wins on later visits. Otherwise only the primary
  // browser preference is used; secondary Spanish does not override it.
  const resolveLocale = (language) => /^es(?:-|$)/i.test(String(language || '').trim()) ? 'es' : 'en';
  const storageKey = 'mirror-mirror.locale';
  let savedLocale;
  try { savedLocale = window.localStorage.getItem(storageKey); } catch { /* Storage can be unavailable. */ }
  let locale = ['en', 'es'].includes(savedLocale) ? savedLocale : resolveLocale(navigator.languages?.[0] || navigator.language);
  const messages = {
  "en": {
    "lang.group": "Language",
    "lang.en": "English",
    "lang.es": "Español",
    "page.title": "Mirror Mirror — Bridal & luxury stores, events & new collections",
    "page.description": "For bridal and luxury stores, brand events and new-season launches. Start with your goal, explore live and photo try-on, and choose what to test.",
    "page.socialDescription": "Better bridal visits, more personal care, or a clearer next step at your event or launch? Start with the change you want.",
    "nav.skip": "Skip to main page",
    "nav.home": "Mirror Mirror home",
    "nav.main": "Main menu",
    "nav.mobile": "Menu",
    "nav.open": "Open menu",
    "nav.live": "Live try-on",
    "nav.photo": "Photo try-on",
    "nav.brand": "For your brand",
    "nav.mobileLive": "Live try-on <span>01</span>",
    "nav.mobilePhoto": "Photo try-on <span>02</span>",
    "nav.mobileBrand": "For your brand <span>03</span>",
    "action.demo": "Talk about your goal <span aria-hidden=\"true\">↗</span>",
    "brand.promise": "Your collection. Their next choice.",
    "hero.eyebrow": "BRIDAL & LUXURY STORES · BRAND EVENTS · NEW SEASONS",
    "hero.title": "They’re interested.<br><em>What happens next?</em>",
    "hero.description": "From bridal and luxury stores to brand events and new collections: how do people choose today? Where do they get stuck, and what would you like to change?",
    "hero.versions": "Two ways to see your collection",
    "live.eyebrow": "01 / LIVE TRY-ON",
    "photo.eyebrow": "02 / PHOTO TRY-ON",
    "hero.liveTitle": "Your clothes, as they move.",
    "hero.liveDescription": "The customer moves. The view of your clothes moves with them.",
    "hero.liveLink": "See live try-on <span aria-hidden=\"true\">↗</span>",
    "hero.photoTitle": "Their photo. Your clothes.",
    "hero.photoDescription": "They get a new photo of themselves wearing your clothes.",
    "hero.photoLink": "See photo try-on <span aria-hidden=\"true\">↗</span>",
    "hero.watch": "Watch the real demo <span aria-hidden=\"true\">↗</span>",
    "hero.note": "Let them see your clothes on themselves with AI. Live or in a still photo.",
    "demo.region": "Real video of live try-on",
    "demo.eyebrow": "LIVE TRY-ON · REAL VIDEO",
    "demo.length": "49-second video",
    "demo.video": "Real Mirror Mirror video showing three sets of clothes",
    "demo.unsupported": "This browser cannot play the video.",
    "demo.open": "Open the video.",
    "demo.openLink": "Open the video ↗",
    "demo.playAria": "Play the real demo",
    "demo.play": "Play the demo",
    "demo.loading": "Loading the video…",
    "demo.error": "The video could not play.",
    "demo.initialStatus": "Press play to see how it works.",
    "demo.audioAria": "Turn sound on",
    "demo.audio": "Sound off",
    "demo.description": "The large view shows the clothes added by AI. The small circle shows the real camera view. Choose clothes below to see that part of the video.",
    "demo.chapters": "Choose a part of the video",
    "demo.denim": "<small>01</small> Blue",
    "demo.burgundy": "<small>02</small> Dark red",
    "demo.pinstripe": "<small>03</small> Stripes",
    "live.title": "Your collection.<br><em>As they move.</em>",
    "live.description": "At a bridal visit, in a store or at an event, the person stands facing the mirror camera. They choose a piece and see an AI view that moves with them.",
    "workflow.choose": "The customer chooses clothes",
    "live.step1": "Show the clothes you want people to try.",
    "live.step2Title": "They face the mirror",
    "live.step2": "The camera sees their whole body. The screen shows your clothes on them.",
    "live.step3Title": "They compare your clothes",
    "live.step3": "They choose another piece or return to the original camera view.",
    "live.result": "<strong>For your customer:</strong> an AI view of your clothes that moves with them.",
    "live.contact": "Ask about live try-on <span aria-hidden=\"true\">↗</span>",
    "scene.region": "Example made with AI",
    "scene.video": "AI-made example: a woman moves in front of a mirror. The clothes on screen move with her.",
    "scene.unsupported": "This browser cannot play the example.",
    "scene.poster": "A woman in white stands in front of a mirror. The screen shows her in a dark red dress.",
    "scene.replayAria": "Play the AI example again",
    "scene.pauseAria": "Pause the example",
    "scene.pause": "Pause",
    "scene.caption": "AI-made customer example. Watch the real video above.",
    "scene.watch": "Watch the real video <span aria-hidden=\"true\">↗</span>",
    "photo.title": "One photo.<br><em>A look to consider.</em>",
    "photo.description": "They take or upload a photo and choose from your collection. AI makes a new still image of them in that piece. They can use it to choose what to explore next.",
    "photo.step1Title": "They take or upload a photo",
    "photo.step1": "They use a photo of themselves.",
    "photo.step2": "They choose from the clothes you offer.",
    "photo.step3Title": "They see your clothes on them",
    "photo.step3": "The new photo shows them in the clothes they chose. They can choose another piece to make another photo.",
    "photo.result": "<strong>For your customer:</strong> a new still photo made with AI. Their camera can be off.",
    "photo.contact": "Ask about photo try-on <span aria-hidden=\"true\">↗</span>",
    "photo.exampleAlt": "AI-made example: a woman wears a dark red jacket. The same jacket is shown beside her.",
    "photo.exampleLabel": "A still photo with the chosen clothes",
    "photo.caption": "Example made with AI. Your result may look different.",
    "setup.eyebrow": "FOR YOUR STORE OR EVENT",
    "setup.title": "Your goal.<br><em>A useful test.</em>",
    "setup.description": "Tell us about your bridal or luxury store, brand event or new-season launch. Start with the change you want to see.",
    "setup.contact": "Talk about your goal <span aria-hidden=\"true\">↗</span>",
    "setup.collectionTitle": "Your clothes",
    "setup.collection": "Choose the clothes people can try. We agree on the work needed to add them.",
    "setup.storeTitle": "Your space",
    "setup.store": "Live needs a camera, a browser and a screen. We agree on the setup with your team.",
    "setup.websiteTitle": "Your website",
    "setup.website": "We check your website first to see how photo try-on could work there.",
    "setup.nextTitle": "The next step",
    "setup.next": "Tell us what you want to change. See a relevant demo and decide what to test.",
    "faq.eyebrow": "YOUR QUESTIONS",
    "faq.title": "Good questions.",
    "faq.q1": "Live or photo: what changes?<span aria-hidden=\"true\">+</span>",
    "faq.a1": "Live moves with the customer in front of a camera. Photo makes a new still image from a photo they take or upload. Your brand can use one or both.",
    "faq.q2": "Does the camera need to stay on for photo try-on?<span aria-hidden=\"true\">+</span>",
    "faq.a2": "No. The customer takes or uploads a photo and chooses clothes. AI makes a new still photo. Their camera can be off after they take the photo.",
    "faq.q3": "Does it come with a mirror or screen?<span aria-hidden=\"true\">+</span>",
    "faq.a3": "Live needs a camera, a browser and a screen. We agree on the setup with your team. Photo try-on on your website does not need a mirror.",
    "faq.q4": "Can we use our dresses or new collection?<span aria-hidden=\"true\">+</span>",
    "faq.a4": "We start with a few of your pieces and check the results together. Details, fabric and shape can differ in an AI view, so we review them before agreeing on a wider test.",
    "faq.q5": "Can we use it on our website?<span aria-hidden=\"true\">+</span>",
    "faq.a5": "We check your website first. Then we can tell you if photo try-on can work there and what needs to be done.",
    "faq.q6": "Does this replace trying the real clothes?<span aria-hidden=\"true\">+</span>",
    "faq.a6": "No. It helps people explore a look. A bride still needs to feel the dress; a shopper still needs to check size and fit. AI can change colors and details. The preview should help choose what to try, not add a step with no benefit.",
    "contact.eyebrow": "YOUR STORE. YOUR EVENT. YOUR NEXT SEASON.",
    "contact.title": "What do you<br><em>want to change?</em>",
    "contact.description": "Tell us about one real customer visit, event or launch. What happened? Why did it matter? What would you want to be different? We’ll use that to decide what to show and test with you.",
    "footer.top": "Back to top <span aria-hidden=\"true\">↑</span>",
    "footer.disclaimer": "AI images may change colors and details. They do not show the exact size or fit.",
    "photo.story.original": "Your photo at the mirror",
    "photo.story.generated": "Your new photo on screen",
    "photo.story.captured": "Photo taken",
    "photo.story.garment": "Dark red jacket",
    "photo.story.selected": "Chosen",
    "photo.story.steps": "Photo try-on steps",
    "photo.story.stepPhoto": "Take a photo",
    "photo.story.stepGarment": "Choose clothes",
    "photo.story.stepResult": "See your new photo",
    "photo.story.disclaimer": "AI-made example of your customer’s steps in a store. The result is a still photo. Real results may look different.",
    "gap.nav.problem": "Your goal",
    "gap.nav.proof": "See it work",
    "gap.nav.brand": "Plan a test",
    "gap.nav.talk": "Let’s talk <span aria-hidden=\"true\">↗</span>",
    "gap.hero.action": "Find your starting point <span aria-hidden=\"true\">↓</span>",
    "gap.hero.scene": "A customer in front of the mirror. Her own clothes stay the same. The screen shows her in the selected jacket.",
    "gap.hero.tag": "Your collection. On your customers.",
    "gap.hero.caption": "AI-made store example",
    "gap.hero.video": "Watch the real video <span aria-hidden=\"true\">↗</span>",
    "gap.hero.customer": "The customer",
    "gap.hero.screen": "Your clothes on screen",
    "gap.ways.eyebrow": "TWO WAYS TO SEE YOUR CLOTHES",
    "gap.ways.title": "See the look.<br>Then choose what’s next.",
    "gap.ways.description": "If seeing the look is the missing step, start here. Explore dresses or new pieces before a fitting, or let guests see themselves in your collection at an event.",
    "gap.ways.live": "Live. As they move.",
    "gap.ways.liveDesc": "They stand facing the mirror camera. Your clothes appear on screen as they move.",
    "gap.ways.photo": "One photo. A new look.",
    "gap.ways.photoDesc": "They take or upload a photo. They get a new still image in your clothes.",
    "gap.ways.liveLink": "See live <span aria-hidden=\"true\">↗</span>",
    "gap.ways.photoLink": "See photo <span aria-hidden=\"true\">↗</span>",
    "gap.proof.eyebrow": "THE PRODUCT, ON VIDEO",
    "gap.proof.title": "See how it works.<br>Then test what matters.",
    "gap.proof.description": "Watch the real live demo. The main image shows the AI view. The small circle shows the original camera view.",
    "gap.proof.note": "This recording shows the product. Your dresses, event or new collection need their own test. It is not proof of sales or time saved.",
    "gap.proof.action": "Watch 49 seconds <span aria-hidden=\"true\">↗</span>",
    "gap.live.step1": "They choose a piece",
    "gap.live.step2": "They face the mirror",
    "gap.live.step3": "They move and compare",
    "gap.live.note": "The camera needs their whole body in view. The clothes change on screen.",
    "gap.photo.step1": "Their photo",
    "gap.photo.step2": "Your clothes",
    "gap.photo.step3": "Their new photo",
    "gap.photo.note": "At your store or event, they can take the photo at the mirror. On your website, they can upload one. No mirror needed online.",
    "gap.photo.context": "AI-MADE CUSTOMER EXAMPLE · IN STORE",
    "gap.setup.eyebrow": "MAKE THE CHANGE WORTH IT",
    "gap.setup.title": "What would make<br><em>this worth doing?</em>",
    "gap.setup.intro": "More useful bridal visits? More personal advice in your luxury store? Better event talks or less waiting at a launch? Choose the change that matters to your business.",
    "gap.setup.collection": "Start with your own pieces.",
    "gap.setup.collectionDesc": "Check a few dresses or new pieces first. Review the look and details with your team. Then choose live, photo, or both.",
    "gap.setup.collectionCaption": "Example collection made with AI",
    "gap.setup.nowLabel": "01 / TODAY",
    "gap.setup.nowTitle": "What happens now?",
    "gap.setup.nowDesc": "Look at a full visit, event or fitting-room trip. What gets in the way? How often? What does it mean for your team and your business?",
    "gap.setup.goalLabel": "02 / YOUR GOAL",
    "gap.setup.goalTitle": "What needs to change?",
    "gap.setup.goalDesc": "Name the change you want and why it matters now. Choose what you will count, and what result would make the test worthwhile.",
    "gap.setup.testLabel": "03 / THE TEST",
    "gap.setup.testTitle": "Try. Compare. Decide.",
    "gap.setup.testDesc": "Compare similar visits with and without the preview. Count the full time, including setup and repeats. Check the result and the work it takes before expanding.",
    "gap.setup.scope": "Time freed up only helps if you can use it for advice, visits or talks that matter. Count completed orders after returns and all the work the test adds. Keep the care your customers expect.",
    "gap.setup.future": "Your goal sets<br>the next step.",
    "gap.setup.futureDesc": "We review your clothes, space and team’s steps with you. For online photo try-on, we also check your website.",
    "gap.faq.salesQ": "How will we know it helps?<span aria-hidden=\"true\">+</span>",
    "gap.faq.salesA": "Choose a result before the test: fewer unneeded dress changes, more talks with interested guests, or less waiting for a fitting room. Compare it with what happens now. More views alone do not prove more sales.",
    "gap.contact.small": "Start with your goal. We’ll bring a demo that fits the conversation.",
    "gap.live.stepsLabel": "THEIR STEPS",
    "gap.example": "AI-made example"
  },
  "es": {
    "lang.group": "Idioma",
    "lang.en": "English",
    "lang.es": "Español",
    "page.title": "Mirror Mirror — Novias, tiendas de lujo, eventos y nuevas colecciones",
    "page.description": "Para tiendas de novias y de lujo, eventos de marca y nuevas temporadas. Parte de tu meta, conoce la prueba en vivo y por foto, y decide qué probar.",
    "page.socialDescription": "¿Mejores citas de novias, más atención personal o un siguiente paso más claro en tu evento o lanzamiento? Empieza por lo que quieres cambiar.",
    "nav.skip": "Ir al contenido",
    "nav.home": "Mirror Mirror, inicio",
    "nav.main": "Menú principal",
    "nav.mobile": "Menú",
    "nav.open": "Abrir menú",
    "nav.live": "En vivo",
    "nav.photo": "Por foto",
    "nav.brand": "Para tu marca",
    "nav.mobileLive": "En vivo <span>01</span>",
    "nav.mobilePhoto": "Por foto <span>02</span>",
    "nav.mobileBrand": "Para tu marca <span>03</span>",
    "action.demo": "Hablemos de tu meta <span aria-hidden=\"true\">↗</span>",
    "brand.promise": "Tu colección. Su próxima elección.",
    "hero.eyebrow": "TIENDAS DE NOVIAS Y DE LUJO · EVENTOS DE MARCA · NUEVAS TEMPORADAS",
    "hero.title": "Hay interés.<br><em>¿Qué pasa después?</em>",
    "hero.description": "De las tiendas de novias y de lujo a los eventos de marca y las nuevas colecciones: ¿cómo eligen hoy? ¿En qué paso se frenan y qué te gustaría cambiar?",
    "hero.versions": "Dos formas de ver tu colección",
    "live.eyebrow": "01 / EN VIVO",
    "photo.eyebrow": "02 / POR FOTO",
    "hero.liveTitle": "Tu ropa, al moverse.",
    "hero.liveDescription": "El cliente se mueve y ve tu ropa en pantalla.",
    "hero.liveLink": "Ver en vivo <span aria-hidden=\"true\">↗</span>",
    "hero.photoTitle": "Su foto. Tu ropa.",
    "hero.photoDescription": "El cliente recibe una nueva foto con tu ropa.",
    "hero.photoLink": "Ver por foto <span aria-hidden=\"true\">↗</span>",
    "hero.watch": "Ver la demo real <span aria-hidden=\"true\">↗</span>",
    "hero.note": "Deja que se vean con tus prendas con IA. En vivo o en una foto fija.",
    "demo.region": "Video real de la prueba en vivo",
    "demo.eyebrow": "EN VIVO · VIDEO REAL",
    "demo.length": "Video de 49 segundos",
    "demo.video": "Video real de Mirror Mirror con tres cambios de ropa",
    "demo.unsupported": "Este navegador no puede mostrar el video.",
    "demo.open": "Abrir el video.",
    "demo.openLink": "Abrir el video ↗",
    "demo.playAria": "Ver la demo real",
    "demo.play": "Reproducir demo",
    "demo.loading": "Cargando el video…",
    "demo.error": "No se pudo mostrar el video.",
    "demo.initialStatus": "Pulsa el botón para ver cómo funciona.",
    "demo.audioAria": "Activar sonido",
    "demo.audio": "Sonido desactivado",
    "demo.description": "La imagen grande muestra la ropa añadida por IA. El círculo muestra la vista real de la cámara. Elige una prenda abajo para ver esa parte del video.",
    "demo.chapters": "Elige una parte del video",
    "demo.denim": "<small>01</small> Azul",
    "demo.burgundy": "<small>02</small> Rojo oscuro",
    "demo.pinstripe": "<small>03</small> Rayas",
    "live.title": "Tu colección.<br><em>Al moverse.</em>",
    "live.description": "En una cita de novias, una tienda o un evento, la persona se pone frente a la cámara del espejo. Elige una prenda y ve una imagen hecha con IA que sigue sus movimientos.",
    "workflow.choose": "El cliente elige una prenda",
    "live.step1": "Muestra la ropa que quieres que prueben.",
    "live.step2Title": "Se pone frente al espejo",
    "live.step2": "La cámara ve su cuerpo completo. La pantalla muestra cómo se vería con tu ropa.",
    "live.step3Title": "El cliente compara",
    "live.step3": "Elige otra prenda o vuelve a la vista original de la cámara.",
    "live.result": "<strong>Para tu cliente:</strong> una imagen hecha con IA de tu ropa que sigue sus movimientos.",
    "live.contact": "Preguntar por la prueba en vivo <span aria-hidden=\"true\">↗</span>",
    "scene.region": "Ejemplo hecho con IA",
    "scene.video": "Ejemplo hecho con IA: una mujer se mueve frente a un espejo. La ropa en pantalla se mueve con ella.",
    "scene.unsupported": "Este navegador no puede mostrar el ejemplo.",
    "scene.poster": "Una mujer de blanco está frente a un espejo. La pantalla la muestra con un vestido rojo oscuro.",
    "scene.replayAria": "Ver de nuevo el ejemplo hecho con IA",
    "scene.pauseAria": "Pausar el ejemplo",
    "scene.pause": "Pausar",
    "scene.caption": "Ejemplo del cliente hecho con IA. Mira el video real arriba.",
    "scene.watch": "Ver el video real <span aria-hidden=\"true\">↗</span>",
    "photo.title": "Una foto.<br><em>Una opción para elegir.</em>",
    "photo.description": "Toman o suben una foto y eligen de tu colección. La IA crea una imagen fija con esa prenda. Les sirve para elegir qué opción explorar después.",
    "photo.step1Title": "El cliente toma o sube una foto",
    "photo.step1": "Usa una foto de sí mismo.",
    "photo.step2": "Elige entre la ropa que ofreces.",
    "photo.step3Title": "Se ve con tu ropa",
    "photo.step3": "La nueva foto lo muestra con la ropa que eligió. Puede elegir otra prenda para crear otra foto.",
    "photo.result": "<strong>Para tu cliente:</strong> una nueva foto hecha con IA. No se mueve. Su cámara puede estar apagada.",
    "photo.contact": "Preguntar por la prueba por foto <span aria-hidden=\"true\">↗</span>",
    "photo.exampleAlt": "Ejemplo hecho con IA: una mujer lleva una chaqueta roja oscura. La misma chaqueta se ve a su lado.",
    "photo.exampleLabel": "Una foto con la ropa elegida",
    "photo.caption": "Ejemplo hecho con IA. Tu foto puede verse distinta.",
    "setup.eyebrow": "PARA TU TIENDA O EVENTO",
    "setup.title": "Tu meta.<br><em>Una prueba útil.</em>",
    "setup.description": "Cuéntanos sobre tu tienda de novias o de lujo, tu evento de marca o tu nueva temporada. Empieza por el cambio que quieres ver.",
    "setup.contact": "Hablemos de tu meta <span aria-hidden=\"true\">↗</span>",
    "setup.collectionTitle": "Tu ropa",
    "setup.collection": "Elige la ropa que tus clientes pueden probar. Juntos definimos el trabajo para añadirla.",
    "setup.storeTitle": "Tu espacio",
    "setup.store": "En vivo necesitas una cámara, un navegador y una pantalla. Definimos el montaje con tu equipo.",
    "setup.websiteTitle": "Tu sitio web",
    "setup.website": "Primero revisamos tu sitio web para ver cómo usar allí la prueba por foto.",
    "setup.nextTitle": "El siguiente paso",
    "setup.next": "Cuéntanos qué quieres cambiar. Mira una demo para tu caso y decide qué probar.",
    "faq.eyebrow": "TUS PREGUNTAS",
    "faq.title": "Buenas preguntas.",
    "faq.q1": "¿Qué cambia entre en vivo y por foto?<span aria-hidden=\"true\">+</span>",
    "faq.a1": "En vivo, la imagen se mueve con el cliente frente a la cámara. Por foto, se crea una nueva imagen a partir de la foto que toma o sube. Tu marca puede usar una versión o las dos.",
    "faq.q2": "¿La cámara debe seguir encendida para usar fotos?<span aria-hidden=\"true\">+</span>",
    "faq.a2": "No. El cliente toma o sube una foto y elige una prenda. La IA crea una nueva foto. Puede apagar la cámara después de tomar su foto.",
    "faq.q3": "¿Incluye un espejo o una pantalla?<span aria-hidden=\"true\">+</span>",
    "faq.a3": "En vivo necesitas una cámara, un navegador y una pantalla. Definimos el montaje con tu equipo. La prueba por foto en tu web no necesita un espejo.",
    "faq.q4": "¿Podemos usar nuestros vestidos o la nueva colección?<span aria-hidden=\"true\">+</span>",
    "faq.a4": "Empezamos con algunas de tus prendas y revisamos los resultados juntos. Los detalles, la tela y la forma pueden cambiar en una imagen hecha con IA. Los revisamos antes de ampliar la prueba.",
    "faq.q5": "¿Podemos usarlo en nuestro sitio web?<span aria-hidden=\"true\">+</span>",
    "faq.a5": "Primero revisamos tu sitio web. Luego te decimos si se puede usar la prueba por foto y qué hace falta.",
    "faq.q6": "¿Reemplaza la prueba de la ropa real?<span aria-hidden=\"true\">+</span>",
    "faq.a6": "No. Ayuda a explorar cómo se ve una prenda. La novia aún necesita sentir el vestido; el cliente, revisar la talla y el ajuste. La IA puede cambiar colores y detalles. La vista previa debe ayudar a elegir qué probar, no añadir un paso sin valor.",
    "contact.eyebrow": "TU TIENDA. TU EVENTO. TU PRÓXIMA TEMPORADA.",
    "contact.title": "¿Qué quieres<br><em>cambiar?</em>",
    "contact.description": "Cuéntanos una visita de un cliente, un evento o un lanzamiento real. ¿Qué pasó? ¿Por qué importó? ¿Qué te gustaría que fuera distinto? Con eso decidimos qué mostrar y probar contigo.",
    "footer.top": "Volver arriba <span aria-hidden=\"true\">↑</span>",
    "footer.disclaimer": "Las imágenes hechas con IA pueden cambiar colores y detalles. No muestran la talla ni el ajuste exactos.",
    "photo.story.original": "Tu foto frente al espejo",
    "photo.story.generated": "Tu nueva foto en pantalla",
    "photo.story.captured": "Foto tomada",
    "photo.story.garment": "Chaqueta roja oscura",
    "photo.story.selected": "Elegida",
    "photo.story.steps": "Pasos de la prueba por foto",
    "photo.story.stepPhoto": "Toma una foto",
    "photo.story.stepGarment": "Elige una prenda",
    "photo.story.stepResult": "Mira tu nueva foto",
    "photo.story.disclaimer": "Ejemplo hecho con IA de los pasos de tu cliente en tienda. El resultado es una foto que no se mueve. El resultado real puede verse distinto.",
    "gap.nav.problem": "Tu meta",
    "gap.nav.proof": "Mira cómo funciona",
    "gap.nav.brand": "Una prueba",
    "gap.nav.talk": "Hablemos <span aria-hidden=\"true\">↗</span>",
    "gap.hero.action": "Elige tu punto de partida <span aria-hidden=\"true\">↓</span>",
    "gap.hero.scene": "Una cliente frente al espejo. Su ropa no cambia. La pantalla la muestra con la chaqueta elegida.",
    "gap.hero.tag": "Tu colección. En tus clientes.",
    "gap.hero.caption": "Ejemplo de tienda hecho con IA",
    "gap.hero.video": "Mira el video real <span aria-hidden=\"true\">↗</span>",
    "gap.hero.customer": "Tu cliente",
    "gap.hero.screen": "Tu ropa en pantalla",
    "gap.ways.eyebrow": "DOS FORMAS DE VER TU ROPA",
    "gap.ways.title": "Ver cómo se ve.<br>Elegir el siguiente paso.",
    "gap.ways.description": "Si les falta verse con la prenda, empieza aquí. Explora vestidos o prendas nuevas antes del probador, o deja que los invitados se vean con tu colección en un evento.",
    "gap.ways.live": "En vivo. Al moverse.",
    "gap.ways.liveDesc": "Se ponen frente a la cámara del espejo. Tus prendas aparecen en pantalla al moverse.",
    "gap.ways.photo": "Una foto. Otra prenda.",
    "gap.ways.photoDesc": "Toman o suben una foto. Reciben otra con tu ropa puesta. La foto no se mueve.",
    "gap.ways.liveLink": "Ver en vivo <span aria-hidden=\"true\">↗</span>",
    "gap.ways.photoLink": "Ver por foto <span aria-hidden=\"true\">↗</span>",
    "gap.proof.eyebrow": "EL PRODUCTO, EN VIDEO",
    "gap.proof.title": "Mira cómo funciona.<br>Prueba lo que importa.",
    "gap.proof.description": "Mira la demo real en vivo. La imagen grande muestra la vista con IA. El círculo pequeño muestra la cámara original.",
    "gap.proof.note": "Este video muestra el producto. Tus vestidos, tu evento o tu nueva colección necesitan su propia prueba. No demuestra ventas ni tiempo ahorrado.",
    "gap.proof.action": "Ver 49 segundos <span aria-hidden=\"true\">↗</span>",
    "gap.live.step1": "Elige una prenda",
    "gap.live.step2": "Se pone frente al espejo",
    "gap.live.step3": "Se mueve y compara",
    "gap.live.note": "La cámara debe ver todo su cuerpo. La ropa cambia en la pantalla.",
    "gap.photo.step1": "Su foto",
    "gap.photo.step2": "Tu ropa",
    "gap.photo.step3": "Su nueva foto",
    "gap.photo.note": "En tu tienda o evento, pueden tomar la foto frente al espejo. En tu web, pueden subir una. En línea no hace falta un espejo.",
    "gap.photo.context": "EJEMPLO CON IA · EN TIENDA",
    "gap.setup.eyebrow": "QUE EL CAMBIO VALGA LA PENA",
    "gap.setup.title": "¿Qué haría que<br><em>valiera la pena?</em>",
    "gap.setup.intro": "¿Citas de novias más útiles? ¿Más asesoría personal en tu tienda de lujo? ¿Mejores charlas en tu evento o menos espera en un lanzamiento? Elige el cambio que importa para tu negocio.",
    "gap.setup.collection": "Empieza con tus prendas.",
    "gap.setup.collectionDesc": "Revisa primero unos vestidos o prendas nuevas. Mira el resultado y los detalles con tu equipo. Luego elige en vivo, por foto o ambos.",
    "gap.setup.collectionCaption": "Ropa de ejemplo hecha con IA",
    "gap.setup.nowLabel": "01 / HOY",
    "gap.setup.nowTitle": "¿Qué pasa hoy?",
    "gap.setup.nowDesc": "Mira una cita, un evento o una visita al probador de principio a fin. ¿Qué frena a la gente? ¿Cada cuánto? ¿Qué significa para tu equipo y tu negocio?",
    "gap.setup.goalLabel": "02 / TU META",
    "gap.setup.goalTitle": "¿Qué debe cambiar?",
    "gap.setup.goalDesc": "Define qué quieres cambiar y por qué importa ahora. Elige qué vas a medir y qué resultado haría que la prueba valga la pena.",
    "gap.setup.testLabel": "03 / LA PRUEBA",
    "gap.setup.testTitle": "Prueba. Compara. Decide.",
    "gap.setup.testDesc": "Compara visitas parecidas con y sin la vista previa. Cuenta todo el tiempo, incluida la preparación y los intentos extra. Revisa el resultado y el trabajo que exige antes de ampliar.",
    "gap.setup.scope": "El tiempo libre ayuda si puedes usarlo para asesoría, citas o charlas que importan. Cuenta los pedidos tras las devoluciones y todo el trabajo que añade la prueba. Mantén la atención que tus clientes esperan.",
    "gap.setup.future": "Tu meta define<br>el siguiente paso.",
    "gap.setup.futureDesc": "Revisamos contigo las prendas, el espacio y los pasos de tu equipo. Para la prueba por foto en línea, también revisamos tu web.",
    "gap.faq.salesQ": "¿Cómo sabremos si ayuda?<span aria-hidden=\"true\">+</span>",
    "gap.faq.salesA": "Elige un resultado antes de probar: menos cambios de vestido que no ayudan, más charlas con invitados interesados o menos espera en el probador. Compáralo con lo que pasa hoy. Más vistas no prueban más ventas.",
    "gap.contact.small": "Empieza por tu meta. Llevaremos una demo acorde a lo que nos cuentes.",
    "gap.live.stepsLabel": "SUS PASOS",
    "gap.example": "Ejemplo con IA"
  }
};
  const t = (key, params = {}) => {
    const value = messages[locale][key] ?? messages.en[key] ?? key;
    return value.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(params, name) ? String(params[name]) : match);
  };
  const register = (additional) => {
    for (const language of ['en', 'es']) Object.assign(messages[language], additional[language] || {});
  };
  const translate = (root) => {
    root.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = t(element.dataset.i18n);
      if (element.textContent !== value) element.textContent = value;
    });
    // Markup comes exclusively from this local, trusted translation catalog.
    root.querySelectorAll('[data-i18n-html]').forEach((element) => {
      const value = t(element.dataset.i18nHtml);
      if (element.innerHTML !== value) element.innerHTML = value;
    });
    for (const attribute of ['aria-label', 'alt', 'title', 'content']) {
      root.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
        const value = t(element.getAttribute(`data-i18n-${attribute}`));
        if (element.getAttribute(attribute) !== value) element.setAttribute(attribute, value);
      });
    }
    if (root === document) {
      document.documentElement.lang = locale;
      document.documentElement.removeAttribute('data-i18n-pending');
    }
  };
  const announceChange = (previous) => {
    // Runtime controllers restore their current labels after static attributes
    // have been translated. This never reinitializes their state or listeners.
    document.dispatchEvent(new CustomEvent('mirror:languagechange', {
      detail: { locale, previous, changed: previous !== locale },
    }));
  };
  const apply = (root = document) => {
    translate(root);
    if (root === document) announceChange(locale);
  };
  const capturePosition = () => {
    const position = { left: window.scrollX, top: window.scrollY, anchor: null, anchorTop: 0 };
    if (document.querySelector('dialog[open]') || document.body?.style.overflow === 'hidden') return null;
    if (position.top <= 1) return position;
    const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0;
    const readingEdge = Math.max(0, Math.min(window.innerHeight - 1, headerBottom + 16));
    const sections = [...document.querySelectorAll('main > section'), document.querySelector('footer')].filter(Boolean);
    const visible = sections.map(section => ({ section, bounds: section.getBoundingClientRect() }))
      .filter(({ bounds }) => bounds.height > 0 && bounds.bottom > 0 && bounds.top < window.innerHeight);
    // Section navigation leaves a small scroll-margin below the sticky header.
    // Prefer that newly reached section over the trailing pixels of the one
    // before it, which may still contain the reading edge by a few pixels.
    const anchor = visible.find(({ bounds }) => bounds.top >= headerBottom - 4 && bounds.top <= headerBottom + 80)
      || visible.find(({ bounds }) => bounds.top <= readingEdge && bounds.bottom > readingEdge)
      || visible.find(({ bounds }) => bounds.bottom > readingEdge);
    if (anchor) {
      position.anchor = anchor.section;
      position.anchorTop = anchor.bounds.top;
    }
    return position;
  };
  const setLocale = (next) => {
    if (!['en', 'es'].includes(next)) return false;
    try { window.localStorage.setItem(storageKey, next); } catch { /* The current visit still switches. */ }
    if (next === locale) return true;
    const previous = locale;
    const position = capturePosition();
    locale = next;
    translate(document);
    announceChange(previous);
    // Keep the same visible section at the same viewport offset when earlier
    // sections change height. Do not scroll a page locked behind a dialog/menu.
    if (position) {
      const shift = position.anchor ? position.anchor.getBoundingClientRect().top - position.anchorTop : 0;
      const top = position.anchor ? window.scrollY + shift : position.top;
      if (window.scrollX !== position.left || window.scrollY !== top) window.scrollTo({ left: position.left, top, behavior: 'instant' });
    }
    return true;
  };

  window.MirrorI18n = Object.freeze({ get locale() { return locale; }, resolveLocale, t, register, apply, setLocale, storageKey });
  document.documentElement.lang = locale;
  // app.js translates the parsed document before interaction code captures nodes.
  // This fallback also reveals the page if an interaction script fails to load.
  if (locale === 'es') {
    document.documentElement.setAttribute('data-i18n-pending', '');
    const style = document.createElement('style');
    style.textContent = 'html[data-i18n-pending] body { visibility: hidden; }';
    document.head.append(style);
  }
  document.addEventListener('DOMContentLoaded', () => apply(), { once: true });
})();
