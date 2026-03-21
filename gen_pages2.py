import os
BASE = r"F:\OneDrive - Universidad de Montevideo\Escritorio\Pagina Choferes"

# Read NAV and FOOTER from already-written file
src = open(os.path.join(BASE, 'juridico.html'), encoding='utf-8').read()
# Extract nav block between <!-- NAV --> and end of mobile div
nav_start = src.index('  <!-- NAV -->')
# Find the footer start
footer_start = src.index('  <!-- FOOTER -->')
main_start = src.index('  <section class="page-hero">')
NAV_BLOCK = src[nav_start:main_start].rstrip()
FOOTER_BLOCK = src[footer_start:].strip()
# Remove the closing body/html tags from footer
FOOTER_BLOCK = FOOTER_BLOCK[:FOOTER_BLOCK.rfind('</body>')].rstrip()

def page(title, desc, breadcrumb, main_content):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{desc}">
  <title>{title} | Centro Proteccion Choferes de Montevideo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

{NAV_BLOCK}

  <section class="page-hero">
    <div class="page-hero__content">
      {breadcrumb}
      <h1>{title}</h1>
    </div>
  </section>

  <main class="page-content">
    <div class="container">
{main_content}
    </div>
  </main>

{FOOTER_BLOCK}

</body>
</html>"""

def bc(crumbs):
    parts = ['<nav class="breadcrumb" aria-label="Breadcrumb">',
             '<a href="index.html">Inicio</a>']
    for label, href in crumbs[:-1]:
        parts.append('<span>/</span>')
        parts.append(f'<a href="{href}">{label}</a>')
    parts.append('<span>/</span>')
    parts.append(f'<span class="current">{crumbs[-1][0]}</span>')
    parts.append('</nav>')
    return '\n      '.join(parts)

pages = {}

# --- RECOMENDACIONES (decalogo) ---
pages['recomendaciones.html'] = page(
    'Recomendaciones',
    'Decalogo del Transito para conductores. 10 reglas esenciales de seguridad vial en Uruguay.',
    bc([('Transito','transito.html'),('Recomendaciones','recomendaciones.html')]),
    """
      <section class="reveal">
        <p class="lead">El Decalogo del Transito resume las 10 normas esenciales que todo conductor debe conocer y respetar para garantizar la seguridad en la via publica.</p>
      </section>
      <section class="reveal">
        <div class="decalogo">
          <div class="decalogo-item">
            <span class="decalogo-num">1</span>
            <div>
              <h3>Peatones</h3>
              <p>En los cruces (zonas de seguridad), los peatones tienen preferencia de paso sobre los vehiculos. Debe respetarse el uso de la calzada por los peatones para el ascenso y descenso de vehiculos, cuando no es transitable la vereda o cuando transportan bultos de gran tamano.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">2</span>
            <div>
              <h3>Senalizaciones</h3>
              <p>Donde haya semaforos o funcionarios policiales, deben respetarse estrictamente sus indicaciones. En todos los casos, debe ponerse especial atencion a las senalizaciones fijas y obrar siempre de acuerdo a lo que ellas indican.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">3</span>
            <div>
              <h3>Preferencias</h3>
              <p>El vehiculo que aparece a la derecha tiene preferencia de paso sobre todos los que aparecen a su izquierda. Los vehiculos que circulan por vias de transito preferenciales tienen prioridad de paso sobre los que cruzan o entran en ellas. El vehiculo que sigue en linea recta tiene preferencia de paso sobre los que cambian el sentido de la marcha.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">4</span>
            <div>
              <h3>Velocidad</h3>
              <p>Debe conducirse a velocidad reglamentaria (45 km en general, salvo excepciones), conservando en todo momento el dominio del vehiculo y guardando una distancia prudencial con el vehiculo de adelante. Debe reducirse la velocidad al paso del peaton, en escuelas, donde haya aglomeracion, en ferias, al entrar en vias de preferencia y al doblar.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">5</span>
            <div>
              <h3>Circulacion</h3>
              <p>No se puede adelantar a otro vehiculo por la derecha del mismo, ni en una via de dos carriles con transito en doble sentido. Solo es permitido hacerlo por la izquierda y siempre que aquel a su vez no este adelantando a otro. No debe sobrepasarse el eje de la calzada al acercarse a los cruces. El vehiculo de menor velocidad debe circular por la derecha; el de mayor velocidad por la izquierda.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">6</span>
            <div>
              <h3>Toxicos</h3>
              <p>No se puede ni debe conducir habiendo consumido alcohol, estupefacientes o cualquier droga que altere el equilibrio psicomotriz. El conductor que maneja vehiculos con libreta profesional debe registrar 0 gr. de alcohol. Los demas conductores pueden tener hasta 0,3 gr.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">7</span>
            <div>
              <h3>Accidentes</h3>
              <p>En caso de accidente debe detenerse de inmediato, auxiliar a las victimas procurando su pronta asistencia y dar cuenta a la autoridad policial respectiva.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">8</span>
            <div>
              <h3>Estacionamiento</h3>
              <p>Los vehiculos deben ser estacionados solamente en los lugares permitidos y de modo que no obstaculicen el transito. De noche, deben tener las luces de estacionamiento encendidas. En caso de accidente o reparacion urgente, debe colocarse una baliza.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">9</span>
            <div>
              <h3>Mantenimiento</h3>
              <p>El vehiculo debe ser mantenido en buen estado de funcionamiento, especialmente en cuanto a luces, frenos, senalero de cambio de marcha, canios de escape, espejo retrovisor, direccion, cubiertas, limpiaparabrisas, paragolpes y bocina.</p>
            </div>
          </div>
          <div class="decalogo-item">
            <span class="decalogo-num">10</span>
            <div>
              <h3>Documentacion</h3>
              <p>Debe mantenerse en regla la documentacion del rodado y llevar siempre: Cedula de Identidad, Licencia de Conducir y Libreta del vehiculo. Respete a las autoridades policiales y municipales y exhibales aquellos documentos siempre que se lo soliciten.</p>
            </div>
          </div>
        </div>
      </section>
""")

# --- TENGA EN CUENTA ---
pages['tenga-en-cuenta.html'] = page(
    'Tenga en Cuenta',
    'Consejos practicos de seguridad vial. Recomendaciones para conductores responsables.',
    bc([('Transito','transito.html'),('Tenga en Cuenta','tenga-en-cuenta.html')]),
    """
      <section class="reveal">
        <p class="lead">Una serie de consejos practicos y recordatorios de seguridad vial para tener en cuenta antes, durante y despues de cada viaje.</p>
      </section>
      <section class="reveal">
        <h2>Antes de Conducir</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Estado del Vehiculo</h3><p class="info-card__text">Revisar neumaticos, frenos, luces, liquidos y espejos antes de cada viaje.</p></div>
          <div class="info-card"><h3 class="info-card__title">Documentacion</h3><p class="info-card__text">Llevar siempre cedula de identidad, licencia de conducir y libreta del vehiculo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Estado Personal</h3><p class="info-card__text">No conducir si estas cansado, bajo efecto de medicamentos, alcohol o drogas.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Durante la Conduccion</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Cinturon Siempre</h3><p class="info-card__text">Usar el cinturon de seguridad en todo momento, todos los ocupantes del vehiculo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Velocidad Reglamentaria</h3><p class="info-card__text">Respetar los limites de velocidad y adaptarlos a las condiciones de la via.</p></div>
          <div class="info-card"><h3 class="info-card__title">Sin Celular</h3><p class="info-card__text">Guardar el telefono. Si es urgente, detenerse en lugar seguro antes de responder.</p></div>
          <div class="info-card"><h3 class="info-card__title">Distancia de Seguridad</h3><p class="info-card__text">Mantener distancia prudencial con el vehiculo de adelante para tener tiempo de reaccion.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>En Caso de Accidente</h2>
        <p>Detente de inmediato. Activa las balizas. Llama al 911 (emergencias). No muevas a los heridos salvo riesgo de incendio. Espera a las autoridades. Intercambia datos con los otros involucrados.</p>
      </section>
""")

# --- TECNOLOGIAS FUTURISTAS ---
pages['tecnologias-futuristas.html'] = page(
    'Tecnologias Futuristas',
    'Las 10 tecnologias futuristas que cambiaran la conduccion y la seguridad vial.',
    bc([('Transito','transito.html'),('Tecnologias Futuristas','tecnologias-futuristas.html')]),
    """
      <section class="reveal">
        <p class="lead">La tecnologia esta transformando el mundo del automovil. Estas son las 10 innovaciones que cambiaran radicalmente la forma de conducir y la seguridad vial en los proximos anos.</p>
      </section>
      <section class="reveal">
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">1. Vehiculos Autonomos</h3>
            <p class="info-card__text">Autos que se manejan solos sin intervencion humana, utilizando sensores, camaras e inteligencia artificial.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">2. Conectividad V2X</h3>
            <p class="info-card__text">Comunicacion vehiculo&mdash;infraestructura y vehiculo&mdash;vehiculo para anticipar peligros y optimizar el trafico.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">3. Realidad Aumentada en HUD</h3>
            <p class="info-card__text">Informacion de navegacion, velocidad y alertas proyectada directamente sobre el parabrisas.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">4. Frenado Autonomo de Emergencia</h3>
            <p class="info-card__text">El vehiculo frena automaticamente ante una colision inminente, sin que el conductor deba intervenir.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">5. Deteccion de Somnolencia</h3>
            <p class="info-card__text">Sensores que detectan senales de fatiga en el conductor y emiten alertas para que se detenga a descansar.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">6. Reconocimiento Facial</h3>
            <p class="info-card__text">Identifica al conductor y personaliza la configuracion del vehiculo: espejos, asientos, temperatura.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">7. Carga Inalambrica</h3>
            <p class="info-card__text">Vehiculos electricos que se cargan sin cables al estacionar sobre superficies habilitadas.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">8. Airbags Externos</h3>
            <p class="info-card__text">Bolsas de aire que se despliegan en el exterior del vehiculo para proteger en impactos laterales.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">9. Ventanas Inteligentes</h3>
            <p class="info-card__text">Cristales que regulan automaticamente la entrada de luz solar para mejorar la visibilidad y el confort.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">10. Blockchain para Seguros</h3>
            <p class="info-card__text">Contratos y pagos de seguros automaticos basados en datos reales del comportamiento al volante.</p>
          </div>
        </div>
      </section>
""")

# --- PARQUE TEMATICO ---
pages['parque-tematico.html'] = page(
    'Parque Tematico de Educacion Vial',
    'Parque Tematico de Educacion Vial del Centro Proteccion Choferes. Proyecto educativo para ninos.',
    bc([('Transito','transito.html'),('Parque Tematico','parque-tematico.html')]),
    """
      <section class="reveal">
        <p class="lead">El Parque Tematico de Educacion Vial es un proyecto innovador del Centro Proteccion Choferes que lleva la ensenanza de las normas de transito directamente a los ninos, de forma practica y vivencial.</p>
      </section>
      <section class="reveal">
        <h2>Lanzamiento del Proyecto</h2>
        <p>El proyecto fue lanzado en la <strong>Sala de Acuerdos de la Intendencia de Montevideo</strong>, el martes 7 de julio, con la presencia de:</p>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Intendenta Prof. Ana Olivera</h3><p class="info-card__text">Intendencia de Montevideo</p></div>
          <div class="info-card"><h3 class="info-card__title">Sr. Hugo Bosca</h3><p class="info-card__text">Director del Dpto. de Transito y Transporte</p></div>
          <div class="info-card"><h3 class="info-card__title">Prof. Arturo Borges</h3><p class="info-card__text">Director del ISEV</p></div>
          <div class="info-card"><h3 class="info-card__title">Sr. Mario Castro</h3><p class="info-card__text">Presidente del BSE</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Presentacion Internacional</h2>
        <p>El proyecto fue presentado en el <strong>IX Congreso de la Federacion Mundial de Asociaciones y Clubes UNESCO</strong> celebrado en Beijing (China), en el marco del 70 aniversario de UNESCO, y luego ratificado ante el MEC.</p>
      </section>
      <section class="reveal">
        <h2>Convenio con la Intendencia</h2>
        <p>La Intendencia de Montevideo se comprometio a colaborar aportando asesoramiento vial, senalamiento vertical, semaforos y materiales en desuso. Como contrapartida, podra usar la escuela de conduccion cuando lo requiera.</p>
      </section>
      <section class="reveal">
        <h2>Ciclos Lectivos</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Primer Ciclo Lectivo</h3>
            <p class="info-card__text">Primer ano de funcionamiento del parque tematico con grupos escolares.</p>
            <a href="primer.html" class="btn btn-outline" style="margin-top:1rem;display:inline-block;">Ver galeria &rarr;</a>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Segundo Ciclo Lectivo</h3>
            <p class="info-card__text">Segundo ano de actividades con ampliacion de la propuesta educativa.</p>
            <a href="segundo.html" class="btn btn-outline" style="margin-top:1rem;display:inline-block;">Ver galeria &rarr;</a>
          </div>
        </div>
      </section>
""")

# --- PRIMER CICLO ---
pages['primer.html'] = page(
    'Primer Ciclo Lectivo',
    'Primer ciclo lectivo del Parque Tematico de Educacion Vial del Centro Proteccion Choferes.',
    bc([('Transito','transito.html'),('Parque Tematico','parque-tematico.html'),('Primer Ciclo Lectivo','primer.html')]),
    """
      <section class="reveal">
        <p class="lead">El primer ciclo lectivo del Parque Tematico de Educacion Vial marco el inicio de una experiencia educativa unica en Uruguay, llevando la ensenanza practica de las normas de transito a los ninos en edad escolar.</p>
      </section>
      <section class="reveal">
        <h2>Descripcion</h2>
        <p>Durante el primer ciclo lectivo, grupos de escolares visitaron el parque tematico donde aprendieron las normas basicas de transito de forma practica y ludica: semaforos, senales de transito, cruces peatonales y comportamiento vial responsable.</p>
        <p>Las actividades fueron disenadas en conjunto con docentes y especialistas en educacion vial para adaptarlas a las distintas edades y niveles escolares.</p>
      </section>
      <section class="reveal">
        <h2>Objetivos Alcanzados</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Educacion Practica</h3><p class="info-card__text">Los ninos aprendieron las normas de transito en un entorno practico y seguro.</p></div>
          <div class="info-card"><h3 class="info-card__title">Concientizacion</h3><p class="info-card__text">Formacion de habitos viales responsables desde la infancia.</p></div>
          <div class="info-card"><h3 class="info-card__title">Participacion Escolar</h3><p class="info-card__text">Escuelas de Montevideo participaron activamente en el programa.</p></div>
        </div>
      </section>
      <section class="reveal">
        <p><a href="parque-tematico.html" class="btn btn-outline">&larr; Volver al Parque Tematico</a> &nbsp; <a href="segundo.html" class="btn btn-primary">Ver Segundo Ciclo &rarr;</a></p>
      </section>
""")

# --- SEGUNDO CICLO ---
pages['segundo.html'] = page(
    'Segundo Ciclo Lectivo',
    'Segundo ciclo lectivo del Parque Tematico de Educacion Vial del Centro Proteccion Choferes.',
    bc([('Transito','transito.html'),('Parque Tematico','parque-tematico.html'),('Segundo Ciclo Lectivo','segundo.html')]),
    """
      <section class="reveal">
        <p class="lead">El segundo ciclo lectivo consolido el Parque Tematico de Educacion Vial como un referente en educacion vial infantil en Uruguay, ampliando la propuesta y llegando a mas escuelas.</p>
      </section>
      <section class="reveal">
        <h2>Descripcion</h2>
        <p>El segundo ciclo lectivo incorporo nuevas actividades y materiales educativos, reforzando los contenidos del ciclo anterior y sumando nuevos grupos escolares. Se incorporo tambien material audiovisual institucional para complementar la experiencia practica.</p>
      </section>
      <section class="reveal">
        <h2>Logros del Segundo Ciclo</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Mayor Alcance</h3><p class="info-card__text">Se amplio el numero de escuelas participantes respecto al primer ciclo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Nuevas Actividades</h3><p class="info-card__text">Incorporacion de nuevos circuitos y propuestas educativas ludicas.</p></div>
          <div class="info-card"><h3 class="info-card__title">Material Audiovisual</h3><p class="info-card__text">Produccion de video institucional documentando las actividades del parque.</p></div>
        </div>
      </section>
      <section class="reveal">
        <p><a href="primer.html" class="btn btn-outline">&larr; Ver Primer Ciclo</a> &nbsp; <a href="parque-tematico.html" class="btn btn-outline">Volver al Parque Tematico &rarr;</a></p>
      </section>
""")

# --- EVENTOS ---
pages['eventos.html'] = page(
    'Eventos',
    'Eventos del Centro Proteccion Choferes: cursos, reconocimientos, elecciones, fiesta INAU y Centenario.',
    bc([('Eventos','eventos.html')]),
    """
      <section class="reveal">
        <p class="lead">El Centro Proteccion Choferes tiene una activa vida institucional, con eventos que van desde cursos de seguridad vial hasta celebraciones con los ninos mas vulnerables del INAU.</p>
      </section>
      <section class="reveal">
        <h2>Categorias de Eventos</h2>
        <div class="eventos-grid">
          <a class="evento-card" href="eventos-cursos.html">
            <h3>Cursos &mdash; Simposios &mdash; Congresos</h3>
            <p>Cursos de Manejo Defensivo, conferencias nacionales e internacionales, participacion en congresos en Argentina, Mexico, Espana, Suiza, Italia y China.</p>
            <span class="evento-card__link">Ver mas &rarr;</span>
          </a>
          <a class="evento-card" href="eventos-reconocimientos.html">
            <h3>Reconocimientos</h3>
            <p>Reconocimientos nacionales e internacionales obtenidos por la institucion por su labor en seguridad vial.</p>
            <span class="evento-card__link">Ver mas &rarr;</span>
          </a>
          <a class="evento-card" href="eventos-elecciones.html">
            <h3>Elecciones</h3>
            <p>Las elecciones institucionales se llevan a cabo cada 2 anos. Galeria historica con imagenes desde 1923.</p>
            <span class="evento-card__link">Ver mas &rarr;</span>
          </a>
          <a class="evento-card" href="eventos-fiesta-inau.html">
            <h3>Fiesta Ninos INAU</h3>
            <p>Tradicion ininterrumpida desde 1929. Cada diciembre la institucion celebra una fiesta para los ninos mas vulnerables del INAU.</p>
            <span class="evento-card__link">Ver mas &rarr;</span>
          </a>
          <a class="evento-card" href="eventos-100.html">
            <h3>Centenario 1909&mdash;2009</h3>
            <p>Homenajes, celebraciones, taller de accidentologia y multiples actividades conmemorativas del centenario institucional.</p>
            <span class="evento-card__link">Ver mas &rarr;</span>
          </a>
        </div>
      </section>
""")

# --- EVENTOS CURSOS ---
pages['eventos-cursos.html'] = page(
    'Cursos &mdash; Simposios &mdash; Congresos',
    'Cursos de manejo defensivo, simposios y congresos internacionales del Centro Proteccion Choferes.',
    bc([('Eventos','eventos.html'),('Cursos / Simposios / Congresos','eventos-cursos.html')]),
    """
      <section class="reveal">
        <p class="lead">Dentro de las acciones que nuestra Institucion realiza en pos de la Seguridad Vial, destacamos los Cursos de Manejo Defensivo para vehiculos livianos y pesados en conjunto con el BSE, y la participacion en conferencias y congresos nacionales e internacionales.</p>
      </section>
      <section class="reveal">
        <h2>Actividades Destacadas</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Manejo Defensivo</h3>
            <p class="info-card__text">Cursos de Manejo Defensivo para vehiculos livianos y pesados, realizados conjuntamente con el BSE.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Conferencias Nacionales</h3>
            <p class="info-card__text">Participacion en conferencias con autoridades nacionales y municipales de Uruguay.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Congresos Internacionales</h3>
            <p class="info-card__text">Asambleas y congresos en Argentina, Mexico, Espana, Suiza, Italia y China (UNESCO Beijing).</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Foro Mexico 2012</h3>
            <p class="info-card__text">Participacion en el Foro de Seguridad Vial Mexico 2012.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Cursos 2013</h3>
            <p class="info-card__text">Cursos y jornadas de capacitacion realizados en setiembre de 2013.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">SEGIB</h3>
            <p class="info-card__text">Participacion en actividades de la Secretaria General Iberoamericana.</p>
          </div>
        </div>
      </section>
""")

# --- EVENTOS RECONOCIMIENTOS ---
pages['eventos-reconocimientos.html'] = page(
    'Reconocimientos',
    'Reconocimientos nacionales e internacionales del Centro Proteccion Choferes de Montevideo.',
    bc([('Eventos','eventos.html'),('Reconocimientos','eventos-reconocimientos.html')]),
    """
      <section class="reveal">
        <p class="lead">El Centro Proteccion Choferes de Montevideo ha recibido reconocimientos nacionales e internacionales por su labor en seguridad vial y su trayectoria institucional.</p>
      </section>
      <section class="reveal">
        <h2>Reconocimientos Destacados</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">ABIQUA 2011</h3>
            <p class="info-card__text">Trofeo y Certificado obtenidos en la Cumbre ABIQUA 2011, reconocimiento internacional a la trayectoria institucional.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Reconocimiento UNESCO</h3>
            <p class="info-card__text">Presentacion del proyecto Parque Tematico en el IX Congreso de la Federacion Mundial de Asociaciones y Clubes UNESCO, Beijing.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Homenaje Junta Departamental</h3>
            <p class="info-card__text">Homenaje recibido en la Junta Departamental de Montevideo en el marco del Centenario institucional.</p>
          </div>
        </div>
      </section>
""")

# --- EVENTOS ELECCIONES ---
pages['eventos-elecciones.html'] = page(
    'Elecciones',
    'Galeria historica de elecciones del Centro Proteccion Choferes. Imagenes desde 1923.',
    bc([('Eventos','eventos.html'),('Elecciones','eventos-elecciones.html')]),
    """
      <section class="reveal">
        <p class="lead">Las elecciones institucionales se llevan a cabo cada <strong>2 anos</strong>. Nuestra galeria historica conserva imagenes de estas jornadas democraticas desde 1923, testimoniando la continuidad institucional a lo largo de mas de un siglo.</p>
      </section>
      <section class="reveal">
        <h2>Historia Electoral</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Desde 1923</h3>
            <p class="info-card__text">Registro fotografico de las jornadas electorales desde 1923, muestra de la larga tradicion democratica de la institucion.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Cada 2 Anos</h3>
            <p class="info-card__text">Las elecciones se realizan cada dos anos. Todos los socios habilitados participan en la eleccion de sus autoridades.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Participacion Democratica</h3>
            <p class="info-card__text">Cualquier socio habilitado puede postularse para los cargos directivos, fiscal o electoral.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Autoridades Actuales</h2>
        <p>Para conocer a las autoridades electas para el periodo 2024&ndash;2026, visita la pagina de <a href="autoridades.html">Autoridades</a>.</p>
      </section>
""")

# --- EVENTOS FIESTA INAU ---
pages['eventos-fiesta-inau.html'] = page(
    'Fiesta Ninos INAU',
    'Fiesta anual a los ninos del INAU. Tradicion ininterrumpida desde 1929 del Centro Proteccion Choferes.',
    bc([('Eventos','eventos.html'),('Fiesta Ninos INAU','eventos-fiesta-inau.html')]),
    """
      <section class="reveal">
        <p class="lead">Esta es la unica celebracion que en cada aniversario la Institucion lleva a cabo en forma ininterrumpida <strong>desde el ano 1929</strong>. Un homenaje anual a los ninos uruguayos mas vulnerables, con la conviccion de que vale la pena sonar.</p>
      </section>
      <section class="reveal">
        <h2>Una Tradicion de Mas de 90 Anos</h2>
        <p>Cada diciembre, el Centro Proteccion Choferes organiza la Fiesta Anual para los ninos del INAU. Aunque las imagenes son ilustrativas, no logran testimoniar el regocijo que embarga a todos los involucrados en esta jornada especial.</p>
        <p>Tenemos la firme conviccion de que este sencillo homenaje a la ninez uruguaya mas vulnerable constituye un motivo mas de esperanza para demostrarles que vale la pena sonar, porque con la suficiente ilusion, los suenos pueden hacerse realidad.</p>
      </section>
      <section class="reveal">
        <h2>87 Ediciones</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Desde 1929</h3>
            <p class="info-card__text">Tradicion ininterrumpida que ha acompanado mas de 87 ediciones anuales.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Cada Diciembre</h3>
            <p class="info-card__text">La fiesta se realiza cada diciembre, en coincidencia con el aniversario institucional.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Agradecimiento</h3>
            <p class="info-card__text">Nuestro agradecimiento a las instituciones y empresas amigas que ano a ano hacen posible esta jornada.</p>
          </div>
        </div>
      </section>
""")

# --- EVENTOS 100 ---
pages['eventos-100.html'] = page(
    'Centenario',
    'Centenario del Centro Proteccion Choferes 1909-2009. Homenajes, celebraciones y actividades conmemorativas.',
    bc([('Eventos','eventos.html'),('Centenario','eventos-100.html')]),
    """
      <section class="reveal">
        <p class="lead">En 2009, el Centro Proteccion Choferes de Montevideo celebro sus primeros <strong>100 anos</strong> de existencia con un amplio programa de actividades conmemorativas.</p>
      </section>
      <section class="reveal">
        <h2>Actividades del Centenario 1909&mdash;2009</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Reinauguracion del Salon</h3><p class="info-card__text">Reinauguracion del salon principal de la sede social renovado para el centenario.</p></div>
          <div class="info-card"><h3 class="info-card__title">Homenajes</h3><p class="info-card__text">Homenajes a los socios fundadores y a quienes contribuyeron a la historia institucional.</p></div>
          <div class="info-card"><h3 class="info-card__title">Sello Institucional</h3><p class="info-card__text">Presentacion del sello conmemorativo del centenario de la institucion.</p></div>
          <div class="info-card"><h3 class="info-card__title">Correcaminata</h3><p class="info-card__text">Actividad deportiva y de confraternizacion entre socios y la comunidad.</p></div>
          <div class="info-card"><h3 class="info-card__title">Taller de Accidentologia</h3><p class="info-card__text">Taller tecnico sobre accidentologia vial, fortaleciendo el compromiso con la seguridad vial.</p></div>
          <div class="info-card"><h3 class="info-card__title">Homenaje Junta Departamental</h3><p class="info-card__text">Reconocimiento oficial en la Junta Departamental de Montevideo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Cursos Especiales</h3><p class="info-card__text">Cursos especiales de seguridad vial realizados en el marco de las celebraciones del centenario.</p></div>
        </div>
      </section>
""")

# --- LINKS ---
pages['links.html'] = page(
    'Links',
    'Links de organizaciones nacionales e internacionales vinculadas al Centro Proteccion Choferes.',
    bc([('Links','links.html')]),
    """
      <section class="reveal">
        <p class="lead">Organizaciones nacionales e internacionales vinculadas a la seguridad vial, el transporte y la proteccion de los conductores con las que el Centro Proteccion Choferes mantiene relacion.</p>
      </section>
      <section class="reveal">
        <h2>Organizaciones</h2>
        <div class="links-grid">
          <div class="link-card">
            <h3>Cutcsa</h3>
            <p>Transporte colectivo de Montevideo</p>
          </div>
          <div class="link-card">
            <h3>UNIT</h3>
            <p>Instituto Uruguayo de Normas Tecnicas</p>
          </div>
          <div class="link-card">
            <h3>UNASEV</h3>
            <p>Unidad Nacional de Seguridad Vial</p>
          </div>
          <div class="link-card">
            <h3>Asociacion Espanola</h3>
            <p>Mutual de salud</p>
          </div>
          <div class="link-card">
            <h3>BSE</h3>
            <p>Banco de Seguros del Estado</p>
          </div>
          <div class="link-card">
            <h3>IMM &mdash; Intendencia de Montevideo</h3>
            <p>Gobierno Departamental de Montevideo</p>
          </div>
          <div class="link-card">
            <h3>Parlamento Uruguayo</h3>
            <p>Poder Legislativo de la Republica Oriental del Uruguay</p>
          </div>
          <div class="link-card">
            <h3>SEGIB</h3>
            <p>Secretaria General Iberoamericana</p>
          </div>
          <div class="link-card">
            <h3>LATIN NCAP</h3>
            <p>Seguridad vehicular en Latinoamerica</p>
          </div>
          <div class="link-card">
            <h3>Cicefov</h3>
            <p>Organizacion de seguridad vial</p>
          </div>
          <div class="link-card">
            <h3>Confederacion Nacional Autoescuelas</h3>
            <p>Escuelas de manejo de Uruguay</p>
          </div>
          <div class="link-card">
            <h3>UECA &mdash; Espana</h3>
            <p>Union de Escuelas de Conductores de Espana</p>
          </div>
          <div class="link-card">
            <h3>ATRAR &mdash; Argentina</h3>
            <p>Asociacion argentina de transporte y conductores</p>
          </div>
          <div class="link-card">
            <h3>Montepio de Conductores La Rioja</h3>
            <p>Organizacion de conductores de La Rioja, Argentina</p>
          </div>
          <div class="link-card">
            <h3>Fundacion Alejandra Forlan</h3>
            <p>Fundacion de seguridad vial</p>
          </div>
          <div class="link-card">
            <h3>Fundacion Gonzalo Rodriguez</h3>
            <p>Fundacion en memoria del piloto uruguayo Gonzalo Rodriguez</p>
          </div>
        </div>
      </section>
""")

# --- INFORMACION / SUSCRIPCION ---
pages['informacion.html'] = page(
    'Informacion y Suscripcion',
    'Informacion de contacto y formulario de suscripcion a novedades del Centro Proteccion Choferes.',
    bc([('Contacto','contacto.html'),('Informacion / Suscripcion','informacion.html')]),
    """
      <section class="reveal">
        <h2>Datos de Contacto por Departamento</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Departamento</th><th>Contacto</th></tr></thead>
            <tbody>
              <tr><td><strong>General</strong></td><td>Tel: 2908 1207 &nbsp;|&nbsp; WhatsApp: 098 514 097</td></tr>
              <tr><td><strong>Informacion General</strong></td><td>info@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Despacho Administrativo</strong></td><td>despacho@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Departamento Juridico</strong></td><td>juridica@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Parque Social</strong></td><td>parque@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Biblioteca Social</strong></td><td>biblioteca@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Departamento Fisico</strong></td><td>departamentofisico@proteccionchoferes.org.uy</td></tr>
              <tr><td><strong>Oficina de Personal</strong></td><td>personal@proteccionchoferes.org.uy</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="reveal">
        <h2>Suscribirse a Novedades</h2>
        <p>Recibe informacion sobre eventos, cursos y novedades del Centro Proteccion Choferes directamente en tu correo electronico.</p>
        <form class="inner-form" action="#" method="post">
          <div class="inner-form__group">
            <label for="nombre">Nombre Completo</label>
            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required>
          </div>
          <div class="inner-form__group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="tu@email.com" required>
          </div>
          <button type="submit" class="btn btn-primary">Suscribirse</button>
        </form>
      </section>
      <section class="reveal">
        <h2>Ubicacion</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Sede</th><th>Direccion</th></tr></thead>
            <tbody>
              <tr><td>Sede Social</td><td>Soriano 1227, Montevideo</td></tr>
              <tr><td>Complejo Deportivo</td><td>Soriano 1217, Montevideo</td></tr>
              <tr><td>Parque Social</td><td>Cnel. Raiz 1002 / Av. De las Instrucciones 997</td></tr>
            </tbody>
          </table>
        </div>
      </section>
""")

# --- ASOCIARSE ---
pages['asociarse.html'] = page(
    'Asociarse',
    'Solicitud de ingreso como socio del Centro Proteccion Choferes de Montevideo.',
    bc([('Contacto','contacto.html'),('Asociarse','asociarse.html')]),
    """
      <section class="reveal">
        <p class="lead">Puede llenar la solicitud de ingreso a continuacion. <strong>Nota: Dicha solicitud no habilita el uso de la piscina.</strong></p>
        <p>Una vez enviada la solicitud automaticamente queda asociado a nuestra Institucion. En caso de algun inconveniente, personal administrativo se comunicara con usted.</p>
      </section>
      <section class="reveal">
        <h2>Solicitud de Ingreso</h2>
        <form class="inner-form" action="#" method="post">
          <div class="inner-form__group">
            <label for="nombres">Nombres</label>
            <input type="text" id="nombres" name="nombres" placeholder="Sus nombres" required>
          </div>
          <div class="inner-form__group">
            <label for="apellidos">Apellidos</label>
            <input type="text" id="apellidos" name="apellidos" placeholder="Sus apellidos" required>
          </div>
          <div class="inner-form__group">
            <label for="ci">Cedula de Identidad</label>
            <input type="text" id="ci" name="ci" placeholder="Numero de cedula" required>
          </div>
          <div class="inner-form__group">
            <label for="telefono">Telefono</label>
            <input type="tel" id="telefono" name="telefono" placeholder="Numero de telefono">
          </div>
          <div class="inner-form__group">
            <label for="email-soc">Email</label>
            <input type="email" id="email-soc" name="email" placeholder="su@email.com" required>
          </div>
          <div class="inner-form__group">
            <label for="categoria">Categoria de Socio</label>
            <select id="categoria" name="categoria">
              <option value="">Seleccione una categoria</option>
              <option value="activo">Activo &mdash; Conductor profesional en actividad</option>
              <option value="adjunto">Adjunto &mdash; Familiar directo de socio activo</option>
              <option value="suscriptor">Suscriptor</option>
              <option value="cadete">Suscriptor Cadete</option>
              <option value="protector">Protector</option>
            </select>
          </div>
          <div class="inner-form__group">
            <label for="mensaje">Mensaje (opcional)</label>
            <textarea id="mensaje" name="mensaje" rows="4" placeholder="Informacion adicional..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar Solicitud</button>
        </form>
        <p style="margin-top:1rem;font-size:.9em;">Tambien puede descargar el formulario en formato Word para enviarlo por email a <strong>info@proteccionchoferes.org.uy</strong>.</p>
      </section>
      <section class="reveal">
        <h2>Beneficios de Asociarse</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Convenios</h3><p class="info-card__text">Acceso a descuentos en seguros, salud, repuestos y mas.</p></div>
          <div class="info-card"><h3 class="info-card__title">Complejo Deportivo</h3><p class="info-card__text">Piscina, gimnasia terapeutica, natacion y mas actividades.</p></div>
          <div class="info-card"><h3 class="info-card__title">Parque Social</h3><p class="info-card__text">3,5 hectareas con parrilleros, ranchos y salon para eventos.</p></div>
          <div class="info-card"><h3 class="info-card__title">Asistencia Juridica</h3><p class="info-card__text">Asesoramiento legal en materia de transito y accidentes.</p></div>
          <div class="info-card"><h3 class="info-card__title">Biblioteca</h3><p class="info-card__text">Acceso a mas de 68.000 volumenes en la Sede Social.</p></div>
          <div class="info-card"><h3 class="info-card__title">Auxilio Mecanico</h3><p class="info-card__text">Asistencia en ruta en convenio con el BSE.</p></div>
        </div>
      </section>
""")

# Write all pages
written = []
for filename, content in pages.items():
    filepath = os.path.join(BASE, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    written.append(filename)

print("Written:", written)
print("Total:", len(written))
