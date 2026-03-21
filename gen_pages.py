import os, sys
BASE = r"F:\OneDrive - Universidad de Montevideo\Escritorio\Pagina Choferes"

IGNO = "this.style.display='none'"

NAV_BLOCK = """  <!-- NAV -->
  <nav class="site-nav" id="site-nav">
    <div class="nav__container">
      <a class="nav__logo" href="index.html" aria-label="Inicio">
        <img src="images/logo.png" alt="Centro Proteccion Choferes" onerror="this.style.display='none'">
      </a>
      <ul class="nav__menu" role="menubar">
        <li class="nav__item"><a class="nav__link" href="index.html">Inicio</a></li>
        <li class="nav__item">
          <a class="nav__link" href="quienes-somos.html">Institucion <span class="nav__arrow">&#9660;</span></a>
          <ul class="nav__dropdown">
            <li><a class="nav__dropdown-link" href="quienes-somos.html">Quienes Somos</a></li>
            <li><a class="nav__dropdown-link" href="historia.html">Sintesis Historica</a></li>
            <li><a class="nav__dropdown-link" href="autoridades.html">Autoridades</a></li>
          </ul>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="convenios.html">Beneficios <span class="nav__arrow">&#9660;</span></a>
          <ul class="nav__dropdown">
            <li><a class="nav__dropdown-link" href="convenios.html">Convenios</a></li>
            <li><a class="nav__dropdown-link" href="area-salud.html">Area Salud</a></li>
            <li><a class="nav__dropdown-link" href="juridico.html">Departamento Juridico</a></li>
            <li><a class="nav__dropdown-link" href="secretaria.html">Secretaria Administrativa</a></li>
            <li><a class="nav__dropdown-link" href="parque-social.html">Parque Social</a></li>
            <li><a class="nav__dropdown-link" href="sala-de-aparatos.html">Sala de Aparatos</a></li>
            <li><a class="nav__dropdown-link" href="complejo-deportivo.html">Complejo Deportivo</a></li>
            <li><a class="nav__dropdown-link" href="colonia-de-verano.html">Colonia de Verano</a></li>
            <li><a class="nav__dropdown-link" href="biblioteca.html">Biblioteca</a></li>
            <li><a class="nav__dropdown-link" href="auxilio-mecanico.html">Auxilio Mecanico</a></li>
          </ul>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="transito.html">Transito <span class="nav__arrow">&#9660;</span></a>
          <ul class="nav__dropdown">
            <li><a class="nav__dropdown-link" href="alcoholemia.html">Alcoholemia</a></li>
            <li><a class="nav__dropdown-link" href="aquaplaning.html">Aquaplaning</a></li>
            <li><a class="nav__dropdown-link" href="cinturon.html">Cinturon de Seguridad</a></li>
            <li><a class="nav__dropdown-link" href="celular.html">Uso del Celular</a></li>
            <li><a class="nav__dropdown-link" href="retencion-infantil.html">Retencion Infantil</a></li>
            <li><a class="nav__dropdown-link" href="preferencias-de-paso.html">Preferencias de Paso</a></li>
            <li><a class="nav__dropdown-link" href="adulto-mayor.html">Adulto Mayor</a></li>
            <li><a class="nav__dropdown-link" href="apnea-del-sueno.html">Apnea del Sueno</a></li>
            <li><a class="nav__dropdown-link" href="amaxofobia.html">Amaxofobia</a></li>
            <li><a class="nav__dropdown-link" href="recomendaciones.html">Recomendaciones</a></li>
            <li><a class="nav__dropdown-link" href="parque-tematico.html">Parque Tematico</a></li>
          </ul>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="eventos.html">Eventos <span class="nav__arrow">&#9660;</span></a>
          <ul class="nav__dropdown">
            <li><a class="nav__dropdown-link" href="eventos-cursos.html">Cursos / Simposios / Congresos</a></li>
            <li><a class="nav__dropdown-link" href="eventos-reconocimientos.html">Reconocimientos</a></li>
            <li><a class="nav__dropdown-link" href="eventos-elecciones.html">Elecciones</a></li>
            <li><a class="nav__dropdown-link" href="eventos-fiesta-inau.html">Fiesta Ninos INAU</a></li>
            <li><a class="nav__dropdown-link" href="eventos-100.html">Centenario</a></li>
          </ul>
        </li>
        <li class="nav__item"><a class="nav__link" href="multimedia.html">Multimedia</a></li>
        <li class="nav__item">
          <a class="nav__link" href="contacto.html">Contacto <span class="nav__arrow">&#9660;</span></a>
          <ul class="nav__dropdown">
            <li><a class="nav__dropdown-link" href="informacion.html">Informacion / Suscripcion</a></li>
            <li><a class="nav__dropdown-link" href="asociarse.html">Asociarse</a></li>
          </ul>
        </li>
      </ul>
      <button class="nav__hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <!-- MOBILE MENU -->
  <div class="nav__mobile" id="nav-mobile">
    <a class="nav__mobile-link" href="index.html">Inicio</a>
    <a class="nav__mobile-link" href="quienes-somos.html" data-toggle="sub-inst">Institucion <span>+</span></a>
    <div class="nav__mobile-sub" id="sub-inst">
      <a class="nav__mobile-sublink" href="quienes-somos.html">Quienes Somos</a>
      <a class="nav__mobile-sublink" href="historia.html">Sintesis Historica</a>
      <a class="nav__mobile-sublink" href="autoridades.html">Autoridades</a>
    </div>
    <a class="nav__mobile-link" href="convenios.html" data-toggle="sub-ben">Beneficios <span>+</span></a>
    <div class="nav__mobile-sub" id="sub-ben">
      <a class="nav__mobile-sublink" href="convenios.html">Convenios</a>
      <a class="nav__mobile-sublink" href="area-salud.html">Area Salud</a>
      <a class="nav__mobile-sublink" href="juridico.html">Departamento Juridico</a>
      <a class="nav__mobile-sublink" href="secretaria.html">Secretaria Administrativa</a>
      <a class="nav__mobile-sublink" href="parque-social.html">Parque Social</a>
      <a class="nav__mobile-sublink" href="sala-de-aparatos.html">Sala de Aparatos</a>
      <a class="nav__mobile-sublink" href="complejo-deportivo.html">Complejo Deportivo</a>
      <a class="nav__mobile-sublink" href="colonia-de-verano.html">Colonia de Verano</a>
      <a class="nav__mobile-sublink" href="biblioteca.html">Biblioteca</a>
      <a class="nav__mobile-sublink" href="auxilio-mecanico.html">Auxilio Mecanico</a>
    </div>
    <a class="nav__mobile-link" href="transito.html" data-toggle="sub-tra">Transito <span>+</span></a>
    <div class="nav__mobile-sub" id="sub-tra">
      <a class="nav__mobile-sublink" href="alcoholemia.html">Alcoholemia</a>
      <a class="nav__mobile-sublink" href="aquaplaning.html">Aquaplaning</a>
      <a class="nav__mobile-sublink" href="cinturon.html">Cinturon de Seguridad</a>
      <a class="nav__mobile-sublink" href="celular.html">Uso del Celular</a>
      <a class="nav__mobile-sublink" href="retencion-infantil.html">Retencion Infantil</a>
      <a class="nav__mobile-sublink" href="preferencias-de-paso.html">Preferencias de Paso</a>
      <a class="nav__mobile-sublink" href="adulto-mayor.html">Adulto Mayor</a>
      <a class="nav__mobile-sublink" href="apnea-del-sueno.html">Apnea del Sueno</a>
      <a class="nav__mobile-sublink" href="amaxofobia.html">Amaxofobia</a>
      <a class="nav__mobile-sublink" href="recomendaciones.html">Recomendaciones</a>
      <a class="nav__mobile-sublink" href="parque-tematico.html">Parque Tematico</a>
    </div>
    <a class="nav__mobile-link" href="eventos.html" data-toggle="sub-ev">Eventos <span>+</span></a>
    <div class="nav__mobile-sub" id="sub-ev">
      <a class="nav__mobile-sublink" href="eventos-cursos.html">Cursos / Simposios / Congresos</a>
      <a class="nav__mobile-sublink" href="eventos-reconocimientos.html">Reconocimientos</a>
      <a class="nav__mobile-sublink" href="eventos-elecciones.html">Elecciones</a>
      <a class="nav__mobile-sublink" href="eventos-fiesta-inau.html">Fiesta Ninos INAU</a>
      <a class="nav__mobile-sublink" href="eventos-100.html">Centenario</a>
    </div>
    <a class="nav__mobile-link" href="multimedia.html">Multimedia</a>
    <a class="nav__mobile-link" href="contacto.html" data-toggle="sub-con">Contacto <span>+</span></a>
    <div class="nav__mobile-sub" id="sub-con">
      <a class="nav__mobile-sublink" href="informacion.html">Informacion / Suscripcion</a>
      <a class="nav__mobile-sublink" href="asociarse.html">Asociarse</a>
    </div>
  </div>"""

FOOTER_BLOCK = """  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="footer__grid">
          <div>
            <img src="images/logo.png" alt="CPCH" style="height:56px;width:auto;margin-bottom:1rem;filter:brightness(10);" onerror="this.style.display='none'">
            <p class="footer__desc">Institucion mutualista sin fines de lucro al servicio de los conductores de Montevideo desde 1909. De todos y para todos.</p>
            <div class="footer__socials">
              <a class="footer__social-link" href="https://www.instagram.com/cpchmontevideo/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a class="footer__social-link" href="https://www.facebook.com/proteccionchoferes/" target="_blank" rel="noopener" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="footer__col-title">Institucion</h4>
            <nav class="footer__links">
              <a class="footer__link" href="quienes-somos.html">Quienes Somos</a>
              <a class="footer__link" href="historia.html">Historia</a>
              <a class="footer__link" href="autoridades.html">Autoridades</a>
              <a class="footer__link" href="asociarse.html">Asociarse</a>
            </nav>
          </div>
          <div>
            <h4 class="footer__col-title">Beneficios</h4>
            <nav class="footer__links">
              <a class="footer__link" href="convenios.html">Convenios</a>
              <a class="footer__link" href="area-salud.html">Area Salud</a>
              <a class="footer__link" href="complejo-deportivo.html">Complejo Deportivo</a>
              <a class="footer__link" href="parque-social.html">Parque Social</a>
              <a class="footer__link" href="biblioteca.html">Biblioteca</a>
            </nav>
          </div>
          <div>
            <h4 class="footer__col-title">Contacto</h4>
            <div class="footer__contact-item"><strong>Tel:</strong> <span>2908 1207</span></div>
            <div class="footer__contact-item"><strong>WA:</strong> <span>098 514 097</span></div>
            <div class="footer__contact-item"><strong>Email:</strong> <span>info@proteccionchoferes.org.uy</span></div>
            <div class="footer__contact-item"><strong>Sede:</strong> <span>Soriano 1227</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2025 Centro Proteccion Choferes de Montevideo. Todos los derechos reservados.</p>
      <p class="footer__credit">Departamento de Informatica</p>
    </div>
  </footer>
  <button class="scroll-top" id="scroll-top" aria-label="Volver arriba">&#8593;</button>
  <script src="js/main.js"></script>"""

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
    # crumbs: list of (label, href) pairs; last one is current
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

# --- JURIDICO ---
pages['juridico.html'] = page(
    'Departamento Juridico',
    'Asistencia legal especializada en transito y accidentes para socios del Centro Proteccion Choferes.',
    bc([('Beneficios','convenios.html'),('Departamento Juridico','juridico.html')]),
    """
      <section class="reveal">
        <p class="lead">El Departamento Juridico brinda asistencia legal especializada a los socios, con especial enfasis en materia de transito y accidentes.</p>
      </section>
      <section class="reveal">
        <h2>Abogado Titular</h2>
        <div class="person-cards">
          <div class="person-card">
            <div class="person-card__info">
              <h3 class="person-card__name">Dr. Andres Scavarelli</h3>
              <p class="person-card__role">Abogado &mdash; Departamento Juridico</p>
            </div>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Servicios</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Accidentes de Transito</h3>
            <p class="info-card__text">Asesoramiento legal integral en casos de accidentes de transito.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Defensa en Infracciones</h3>
            <p class="info-card__text">Representacion legal en juicios por infracciones de transito.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Consultas Juridicas</h3>
            <p class="info-card__text">Atencion de consultas juridicas generales vinculadas a la actividad del conductor.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Emergencias</h3>
            <p class="info-card__text">Linea de emergencias disponible para socios en situaciones urgentes.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Contacto</h2>
        <p><strong>Tel. Emergencias:</strong> 099 605 400</p>
        <p><strong>Email:</strong> juridica@proteccionchoferes.org.uy</p>
      </section>
""")

# --- SECRETARIA ---
pages['secretaria.html'] = page(
    'Secretaria Administrativa',
    'Secretaria Administrativa del Centro Proteccion Choferes. Gestion de socios y tramites.',
    bc([('Beneficios','convenios.html'),('Secretaria Administrativa','secretaria.html')]),
    """
      <section class="reveal">
        <p class="lead">La Secretaria Administrativa es el punto de contacto principal para todos los tramites relacionados con la membresia, la gestion de socios y la administracion general.</p>
      </section>
      <section class="reveal">
        <h2>Categorias de Socios</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Categoria</th><th>Descripcion</th></tr></thead>
            <tbody>
              <tr><td><strong>Activos</strong></td><td>Conductores profesionales en actividad</td></tr>
              <tr><td><strong>Adjuntos</strong></td><td>Familiares directos de socios activos</td></tr>
              <tr><td><strong>Suscriptores</strong></td><td>Afiliados con cuota de suscripcion</td></tr>
              <tr><td><strong>Suscriptor Cadete</strong></td><td>Jovenes en proceso de afiliacion</td></tr>
              <tr><td><strong>Protector</strong></td><td>Socios honorarios o benefactores</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="reveal">
        <h2>Contacto</h2>
        <p><strong>Sede:</strong> Soriano 1227, Montevideo &nbsp;|&nbsp; <strong>Tel:</strong> 2908 1207</p>
        <p><strong>Email:</strong> despacho@proteccionchoferes.org.uy</p>
        <p style="margin-top:1.5rem;"><a href="asociarse.html" class="btn btn-primary">Solicitar Ingreso como Socio &rarr;</a></p>
      </section>
""")

# --- PARQUE SOCIAL ---
pages['parque-social.html'] = page(
    'Parque Social',
    'Parque Social del Centro Proteccion Choferes. 3,5 hectareas con parrilleros, ranchos y salon para eventos.',
    bc([('Beneficios','convenios.html'),('Parque Social','parque-social.html')]),
    """
      <section class="reveal">
        <p class="lead">El Parque Social es un espacio verde de 3,5 hectareas donde los socios y sus familias pueden disfrutar de la naturaleza, celebrar eventos y compartir momentos especiales.</p>
      </section>
      <section class="reveal">
        <h2>Ubicacion</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Acceso Vehicular</h3>
            <p class="info-card__text">Cnel. Raiz 1002</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Acceso Peatonal</h3>
            <p class="info-card__text">Av. De las Instrucciones 997</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Telefono</h3>
            <p class="info-card__text">2359 5074</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Area Total</h3>
            <p class="info-card__text">3,5 hectareas de espacios verdes</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Instalaciones</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">6 Parrilleros Cerrados</h3>
            <p class="info-card__text">Capacidad de 40 a 80 personas cada uno. Ideales para eventos privados.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">7 Ranchos Abiertos Cubiertos</h3>
            <p class="info-card__text">Capacidad de 20 a 100 personas cada uno. Perfectos para reuniones al aire libre.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Salon Diamante</h3>
            <p class="info-card__text">Capacidad para 250 personas. Equipado para celebraciones de gran escala.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Reservas</h2>
        <p>Para reservas de parrilleros, ranchos o el Salon Diamante: <strong>Tel:</strong> 2359 5074 &nbsp;|&nbsp; <strong>Email:</strong> parque@proteccionchoferes.org.uy</p>
      </section>
""")

# --- BIBLIOTECA ---
pages['biblioteca.html'] = page(
    'Biblioteca',
    'Biblioteca del Centro Proteccion Choferes. Mas de 68.000 volumenes. Fundada en 1912.',
    bc([('Beneficios','convenios.html'),('Biblioteca','biblioteca.html')]),
    """
      <section class="reveal">
        <p class="lead">La Biblioteca del Centro Proteccion Choferes cuenta con mas de <strong>68.000 volumenes</strong>. Fundada el 25 de noviembre de 1912, es uno de los patrimonios culturales mas destacados de la institucion.</p>
      </section>
      <section class="reveal">
        <h2>Datos</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Coleccion</h3>
            <p class="info-card__text">Mas de <strong>68.000 volumenes</strong>.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Ubicacion</h3>
            <p class="info-card__text">3er piso, Sede Social &mdash; Soriano 1227.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Horarios</h3>
            <p class="info-card__text">Lunes a Viernes &mdash; 10:00 a 18:00 hs.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Fundacion</h3>
            <p class="info-card__text">25 de noviembre de 1912.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <p><strong>Email:</strong> biblioteca@proteccionchoferes.org.uy &nbsp;|&nbsp; <strong>Tel:</strong> 2908 1207</p>
      </section>
""")

# --- AUXILIO MECANICO ---
pages['auxilio-mecanico.html'] = page(
    'Auxilio Mecanico',
    'Servicio de Auxilio Mecanico del Centro Proteccion Choferes en convenio con el BSE.',
    bc([('Beneficios','convenios.html'),('Auxilio Mecanico','auxilio-mecanico.html')]),
    """
      <section class="reveal">
        <p class="lead">El servicio de Auxilio Mecanico brinda asistencia en ruta a los socios. Fue expandido el <strong>15 de diciembre de 2015</strong> en convenio con el BSE (Banco de Seguros del Estado).</p>
      </section>
      <section class="reveal">
        <h2>Cobertura</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Asistencia en Ruta</h3>
            <p class="info-card__text">Asistencia mecanica para socios con averias o inconvenientes durante la marcha.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Convenio BSE</h3>
            <p class="info-card__text">Opera en convenio con el Banco de Seguros del Estado.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Vigente desde 2015</h3>
            <p class="info-card__text">Servicio expandido el 15 de diciembre de 2015.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Solicitar Servicio</h2>
        <p><strong>Tel:</strong> 2908 1207 &nbsp;|&nbsp; <strong>WhatsApp:</strong> 098 514 097</p>
        <p>Tener a mano la credencial de socio vigente al momento de solicitar el servicio.</p>
      </section>
""")

# --- SALA DE APARATOS ---
pages['sala-de-aparatos.html'] = page(
    'Sala de Aparatos',
    'Sala de Aparatos del Centro Proteccion Choferes. Equipamiento para actividad fisica disponible para socios.',
    bc([('Beneficios','convenios.html'),('Sala de Aparatos','sala-de-aparatos.html')]),
    """
      <section class="reveal">
        <p class="lead">La Sala de Aparatos ofrece a los socios y sus familias un espacio equipado para la practica de actividad fisica, contribuyendo al bienestar y la salud integral.</p>
      </section>
      <section class="reveal">
        <h2>Equipamiento</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Maquinas Cardiovasculares</h3>
            <p class="info-card__text">Cintas, bicicletas y elipticas para el trabajo cardiovascular.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Zona de Musculacion</h3>
            <p class="info-card__text">Mancuernas, barras y maquinas de musculacion para entrenamiento de fuerza.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Area Funcional</h3>
            <p class="info-card__text">Espacio para ejercicios funcionales, estiramiento y actividades complementarias.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Acceso</h2>
        <p><strong>Sede:</strong> Soriano 1227 &nbsp;|&nbsp; <strong>Tel:</strong> 2908 1207</p>
        <p>Se requiere presentar credencial de socio vigente.</p>
      </section>
""")

# --- COMPLEJO DEPORTIVO ---
pages['complejo-deportivo.html'] = page(
    'Complejo Deportivo',
    'Complejo Deportivo del Centro Proteccion Choferes en Soriano 1217. Piscina, gimnasia, natacion y mas.',
    bc([('Beneficios','convenios.html'),('Complejo Deportivo','complejo-deportivo.html')]),
    """
      <section class="reveal">
        <p class="lead">El Complejo Deportivo, ubicado en <strong>Soriano 1217</strong>, ofrece una amplia gama de actividades fisicas y deportivas para socios de todas las edades.</p>
      </section>
      <section class="reveal">
        <h2>Actividades</h2>
        <div class="activity-grid">
          <div class="activity-card"><h3>Gimnasia Terapeutica</h3><p>Actividad orientada a la recuperacion y mantenimiento fisico.</p></div>
          <div class="activity-card"><h3>Hidrogimnasia</h3><p>Ejercicios en el agua de bajo impacto articular.</p></div>
          <div class="activity-card"><h3>Nado Libre</h3><p>Acceso libre a la piscina para socios y familias.</p></div>
          <div class="activity-card"><h3>Higiene de Columna</h3><p>Programa para el cuidado y fortalecimiento de la columna vertebral.</p></div>
          <div class="activity-card"><h3>Hidrofuncional</h3><p>Entrenamiento funcional en el medio acuatico.</p></div>
          <div class="activity-card"><h3>Entrenamiento Funcional</h3><p>Circuitos de entrenamiento funcional.</p></div>
          <div class="activity-card"><h3>Natacion Ensenanza</h3><p>Clases de natacion para principiantes de todas las edades.</p></div>
          <div class="activity-card"><h3>Voleibol Social Mixto</h3><p>Practica recreativa de voleibol abierta a todos los socios.</p></div>
          <div class="activity-card"><h3>Natacion Entrenamiento</h3><p>Entrenamiento de natacion para socios con mayor nivel tecnico.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Ubicacion y Contacto</h2>
        <p><strong>Direccion:</strong> Soriano 1217, Montevideo &nbsp;|&nbsp; <strong>Tel:</strong> 2908 1207</p>
      </section>
""")

# --- COLONIA DE VERANO ---
pages['colonia-de-verano.html'] = page(
    'Colonia de Verano',
    'Colonia de Verano del Centro Proteccion Choferes para ninos de 3 a 12 anos. Deportes, natacion, teatro y mas.',
    bc([('Beneficios','convenios.html'),('Colonia de Verano','colonia-de-verano.html')]),
    """
      <section class="reveal">
        <p class="lead">La Colonia de Verano es un espacio de diversion y aprendizaje para los ninos de los socios, con edades de <strong>3 a 12 anos</strong>. Se realiza en la segunda mitad de diciembre.</p>
      </section>
      <section class="reveal">
        <h2>Datos Generales</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Edades</h3><p class="info-card__text">De 3 a 12 anos.</p></div>
          <div class="info-card"><h3 class="info-card__title">Inicio</h3><p class="info-card__text">Segunda mitad de diciembre.</p></div>
          <div class="info-card"><h3 class="info-card__title">Lugar</h3><p class="info-card__text">Complejo Deportivo y Parque Social.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Actividades</h2>
        <div class="activity-grid">
          <div class="activity-card"><h3>Deportes</h3><p>Variedad de actividades deportivas recreativas.</p></div>
          <div class="activity-card"><h3>Natacion</h3><p>Actividades acuaticas en la piscina del complejo.</p></div>
          <div class="activity-card"><h3>Taller de Musica</h3><p>Iniciacion musical y ritmo para los ninos.</p></div>
          <div class="activity-card"><h3>Expresion Plastica</h3><p>Pintura, dibujo y manualidades creativas.</p></div>
          <div class="activity-card"><h3>Capoeira</h3><p>Arte marcial brasileno que combina movimiento y cultura.</p></div>
          <div class="activity-card"><h3>Cocina</h3><p>Taller de iniciacion culinaria.</p></div>
          <div class="activity-card"><h3>Murga</h3><p>Expresion artistica tipica del carnaval uruguayo.</p></div>
          <div class="activity-card"><h3>Teatro</h3><p>Expresion dramatica y juego teatral.</p></div>
        </div>
      </section>
      <section class="reveal">
        <p><strong>Inscripciones:</strong> Secretaria Administrativa &mdash; Tel: 2908 1207</p>
      </section>
""")

# --- CONTACTO ---
pages['contacto.html'] = page(
    'Contacto',
    'Contacto del Centro Proteccion Choferes. Telefonos, emails por departamento y ubicacion.',
    bc([('Contacto','contacto.html')]),
    """
      <section class="reveal">
        <p class="lead">Ponete en contacto con nosotros a traves de cualquiera de los canales disponibles. Encontraras a continuacion los datos de contacto de cada departamento.</p>
      </section>
      <section class="reveal">
        <h2>Contactos por Departamento</h2>
        <div class="contact-boxes">
          <div class="contact-box">
            <h3>General</h3>
            <p><strong>Tel:</strong> 2908 1207</p>
            <p><strong>WhatsApp:</strong> 098 514 097</p>
          </div>
          <div class="contact-box">
            <h3>Informacion General</h3>
            <p>info@proteccionchoferes.org.uy</p>
          </div>
          <div class="contact-box">
            <h3>Despacho Administrativo</h3>
            <p>despacho@proteccionchoferes.org.uy</p>
          </div>
          <div class="contact-box">
            <h3>Departamento Juridico</h3>
            <p>juridica@proteccionchoferes.org.uy</p>
            <p><strong>Emergencias:</strong> 099 605 400</p>
          </div>
          <div class="contact-box">
            <h3>Parque Social</h3>
            <p>parque@proteccionchoferes.org.uy</p>
            <p><strong>Tel:</strong> 2359 5074</p>
          </div>
          <div class="contact-box">
            <h3>Biblioteca Social</h3>
            <p>biblioteca@proteccionchoferes.org.uy</p>
          </div>
          <div class="contact-box">
            <h3>Departamento Fisico</h3>
            <p>departamentofisico@proteccionchoferes.org.uy</p>
          </div>
          <div class="contact-box">
            <h3>Oficina de Personal</h3>
            <p>personal@proteccionchoferes.org.uy</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Sedes</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Sede</th><th>Direccion</th><th>Telefono</th></tr></thead>
            <tbody>
              <tr><td>Sede Social</td><td>Soriano 1227, Montevideo</td><td>2908 1207</td></tr>
              <tr><td>Complejo Deportivo</td><td>Soriano 1217, Montevideo</td><td>2908 1207</td></tr>
              <tr><td>Parque Social (vehicular)</td><td>Cnel. Raiz 1002</td><td>2359 5074</td></tr>
              <tr><td>Parque Social (peatonal)</td><td>Av. De las Instrucciones 997</td><td>2359 5074</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="reveal">
        <p><a href="informacion.html" class="btn btn-primary">Suscribirse a novedades &rarr;</a> &nbsp; <a href="asociarse.html" class="btn btn-outline">Asociarse &rarr;</a></p>
      </section>
""")

# --- MULTIMEDIA ---
pages['multimedia.html'] = page(
    'Multimedia',
    'Videos educativos sobre seguridad vial del Centro Proteccion Choferes de Montevideo.',
    bc([('Multimedia','multimedia.html')]),
    """
      <section class="reveal">
        <p class="lead">Coleccion de videos educativos sobre seguridad vial, campanas de concientizacion y material institucional.</p>
      </section>
      <section class="reveal">
        <div class="video-grid">
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/videoseries?list=PLrandom1" title="Atencion a tu volante" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/cZ_KqNJYqTs" title="Como afecta la distancia de seguridad en un accidente" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random2" title="Accidentes por Alcohol - Canal 10 Noticias" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random3" title="Si Tomas No Manejes" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random4" title="Galeria de autos chocados por exceso de velocidad y alcohol" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random5" title="Ponle Freno: Distancia de seguridad" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random6" title="Securite routiere - 21 morts en 6 mois" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random7" title="Quad crash test" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random8" title="El Semaforo" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random9" title="Usa el Casco" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random10" title="Spot para usar casco" allowfullscreen></iframe>
          </div>
          <div class="video-wrap">
            <iframe src="https://www.youtube.com/embed/random11" title="Los conductores desconocen la mitad de las senales - Ponle Freno" allowfullscreen></iframe>
          </div>
        </div>
      </section>
""")

# --- TRANSITO ---
pages['transito.html'] = page(
    'Transito',
    'Seccion de educacion vial del Centro Proteccion Choferes. Articulos sobre seguridad en el transito.',
    bc([('Transito','transito.html')]),
    """
      <section class="reveal">
        <p class="lead">El Centro Proteccion Choferes promueve activamente la educacion vial y la seguridad en el transito. Accede a nuestros articulos informativos sobre los principales temas de seguridad vial.</p>
      </section>
      <section class="reveal">
        <h2>Temas de Seguridad Vial</h2>
        <div class="transito-grid">
          <a class="transito-card" href="alcoholemia.html">
            <h3>Alcoholemia</h3>
            <p>El alcohol al volante: efectos, limites legales y estadisticas.</p>
          </a>
          <a class="transito-card" href="aquaplaning.html">
            <h3>Aquaplaning</h3>
            <p>Como actuar ante la perdida de control por agua en la calzada.</p>
          </a>
          <a class="transito-card" href="cinturon.html">
            <h3>Cinturon de Seguridad</h3>
            <p>Mitos y verdades sobre el uso del cinturon.</p>
          </a>
          <a class="transito-card" href="celular.html">
            <h3>Uso del Celular</h3>
            <p>Los riesgos de usar el celular al conducir.</p>
          </a>
          <a class="transito-card" href="retencion-infantil.html">
            <h3>Retencion Infantil</h3>
            <p>Sistemas de retencion homologados para ninos en vehiculos.</p>
          </a>
          <a class="transito-card" href="preferencias-de-paso.html">
            <h3>Preferencias de Paso</h3>
            <p>Reglas de prioridad en la via publica uruguaya.</p>
          </a>
          <a class="transito-card" href="adulto-mayor.html">
            <h3>Adulto Mayor</h3>
            <p>Consejos para conductores adultos mayores.</p>
          </a>
          <a class="transito-card" href="apnea-del-sueno.html">
            <h3>Apnea del Sueno</h3>
            <p>El trastorno del sueno que multiplica el riesgo de accidente.</p>
          </a>
          <a class="transito-card" href="amaxofobia.html">
            <h3>Amaxofobia</h3>
            <p>El miedo irracional a conducir o viajar en vehiculos.</p>
          </a>
          <a class="transito-card" href="recomendaciones.html">
            <h3>Recomendaciones</h3>
            <p>Decalogo del transito para conductores responsables.</p>
          </a>
          <a class="transito-card" href="parque-tematico.html">
            <h3>Parque Tematico</h3>
            <p>Educacion vial para ninos en nuestro parque tematico.</p>
          </a>
        </div>
      </section>
""")

# --- ALCOHOLEMIA ---
pages['alcoholemia.html'] = page(
    'Alcoholemia',
    'El alcohol y la conduccion. Efectos, limites legales en Uruguay y estadisticas de accidentes.',
    bc([('Transito','transito.html'),('Alcoholemia','alcoholemia.html')]),
    """
      <section class="reveal">
        <p class="lead">El alcohol es la principal causa de accidentes de transito en Uruguay y el mundo. Conocer sus efectos y los limites legales es fundamental para conducir con responsabilidad.</p>
      </section>
      <section class="reveal">
        <h2>Marco Legal en Uruguay</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Conductores en General</h3>
            <p class="info-card__text">Maximo permitido: <strong>0,3 g/l</strong> de alcohol en sangre.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Conductores Profesionales</h3>
            <p class="info-card__text">Tolerancia <strong>cero (0 g/l)</strong>. Quienes poseen libreta profesional no pueden registrar ningun nivel de alcohol.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Efectos segun Nivel de Alcohol</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Nivel (g/l)</th><th>Efectos sobre la conduccion</th></tr></thead>
            <tbody>
              <tr><td>0,2 &mdash; 0,5</td><td>Euforia, disminucion de reflejos, alteracion de la percepcion de distancias</td></tr>
              <tr><td>0,5 &mdash; 0,8</td><td>Deterioro de coordinacion, tiempo de reaccion aumentado un 50%</td></tr>
              <tr><td>0,8 &mdash; 1,5</td><td>Alteraciones graves de equilibrio y coordinacion</td></tr>
              <tr><td>Mas de 1,5</td><td>Riesgo vital, conduccion imposible</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="reveal">
        <h2>Datos Estadisticos</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Multiplicador de Riesgo</h3>
            <p class="info-card__text">El alcohol multiplica por <strong>6</strong> el riesgo de sufrir un accidente de transito.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Accidentes Nocturnos</h3>
            <p class="info-card__text">El alcohol es el factor principal en la mayoria de los accidentes nocturnos.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Capacidades Afectadas</h3>
            <p class="info-card__text">Afecta la capacidad de frenar, girar y juzgar distancias correctamente.</p>
          </div>
        </div>
      </section>
""")

# --- AQUAPLANING ---
pages['aquaplaning.html'] = page(
    'Aquaplaning',
    'Aquaplaning: perdida de control del vehiculo por agua en la calzada. Como actuar y como prevenirlo.',
    bc([('Transito','transito.html'),('Aquaplaning','aquaplaning.html')]),
    """
      <section class="reveal">
        <p class="lead">El aquaplaning ocurre cuando una pelicula de agua se interpone entre el neumatico y la calzada, provocando la perdida total de control del vehiculo.</p>
      </section>
      <section class="reveal">
        <h2>Factores que lo Provocan</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Velocidad Excesiva</h3><p class="info-card__text">Conducir rapido en condiciones de lluvia aumenta drasticamente el riesgo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Neumaticos Desgastados</h3><p class="info-card__text">La profundidad insuficiente de la escultura del neumatico impide evacuar el agua.</p></div>
          <div class="info-card"><h3 class="info-card__title">Agua Acumulada</h3><p class="info-card__text">Charcos y superficies inundadas incrementan el riesgo de aquaplaning.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Como Actuar si Ocurre</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">No Frenar Bruscamente</h3><p class="info-card__text">El frenado brusco puede agravar la perdida de control.</p></div>
          <div class="info-card"><h3 class="info-card__title">No Girar el Volante</h3><p class="info-card__text">Mantener la direccion recta hasta recuperar la traccion.</p></div>
          <div class="info-card"><h3 class="info-card__title">Soltar el Acelerador</h3><p class="info-card__text">Liberar suavemente el acelerador para reducir la velocidad progresivamente.</p></div>
          <div class="info-card"><h3 class="info-card__title">Esperar la Traccion</h3><p class="info-card__text">Aguardar que el vehiculo recupere el contacto con la calzada.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Prevencion</h2>
        <ul>
          <li>Mantener los neumaticos en buen estado y con escultura suficiente.</li>
          <li>Reducir la velocidad con lluvia.</li>
          <li>Mantener distancia de seguridad con el vehiculo de adelante.</li>
        </ul>
      </section>
""")

# --- CINTURON ---
pages['cinturon.html'] = page(
    'Cinturon de Seguridad',
    'Mitos y verdades sobre el cinturon de seguridad. La importancia de usarlo correctamente.',
    bc([('Transito','transito.html'),('Cinturon de Seguridad','cinturon.html')]),
    """
      <section class="reveal">
        <p class="lead">El cinturon de seguridad es el elemento de proteccion mas efectivo en un accidente de transito. Conoce los principales mitos y las verdades que los contradicen.</p>
      </section>
      <section class="reveal">
        <h2>10 Mitos y Verdades</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">1. Mito: En ciudad no hace falta</h3>
            <p class="info-card__text"><strong>Verdad:</strong> La mayoria de accidentes ocurren a baja velocidad y en ciudad.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">2. Mito: Me quedo atrapado en incendio</h3>
            <p class="info-card__text"><strong>Verdad:</strong> El cinturon permite mantener el control y reduce el riesgo de quedar inconsciente.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">3. Mito: Prefiero salir despedido</h3>
            <p class="info-card__text"><strong>Verdad:</strong> Salir despedido del vehiculo es 5 veces mas peligroso.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">4. Mito: Solo sirve adelante</h3>
            <p class="info-card__text"><strong>Verdad:</strong> Los pasajeros traseros sin cinturon se convierten en proyectiles internos.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">5. Mito: El airbag lo reemplaza</h3>
            <p class="info-card__text"><strong>Verdad:</strong> El airbag sin cinturon puede causar lesiones graves.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">6. Mito: Es incomodo</h3>
            <p class="info-card__text"><strong>Verdad:</strong> La incomodidad momentanea no se compara con las consecuencias de un accidente.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">7. Mito: Solo en viajes largos</h3>
            <p class="info-card__text"><strong>Verdad:</strong> La mayoria de accidentes fatales ocurren a menos de 25 km del hogar.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">8. Mito: Reduce la visibilidad</h3>
            <p class="info-card__text"><strong>Verdad:</strong> No afecta la vision si esta bien ajustado.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">9. Mito: Los expertos no lo necesitan</h3>
            <p class="info-card__text"><strong>Verdad:</strong> El cinturon protege de los errores de otros conductores.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">10. Mito: En embarazo es peligroso</h3>
            <p class="info-card__text"><strong>Verdad:</strong> Existe tecnica correcta de colocacion para embarazadas.</p>
          </div>
        </div>
      </section>
""")

# --- CELULAR ---
pages['celular.html'] = page(
    'Uso del Celular',
    'Los riesgos de usar el celular al conducir. Datos, legislacion y consejos de seguridad vial.',
    bc([('Transito','transito.html'),('Uso del Celular','celular.html')]),
    """
      <section class="reveal">
        <p class="lead">Usar el celular al conducir multiplica por <strong>4</strong> el riesgo de accidente. Equivale a manejar con 1 g/l de alcohol en sangre.</p>
      </section>
      <section class="reveal">
        <h2>Datos Clave</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">1 de cada 4 accidentes</h3>
            <p class="info-card__text">Uno de cada cuatro accidentes de transito involucra el uso del telefono celular.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">5 segundos = 125 metros</h3>
            <p class="info-card__text">Un mensaje de texto requiere 5 segundos de atencion. A 90 km/h equivale a recorrer 125 metros sin mirar la ruta.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Manos libres tambien distrae</h3>
            <p class="info-card__text">El uso de manos libres tambien genera distraccion cognitiva que afecta la capacidad de reaccion.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Legislacion en Uruguay</h2>
        <p>Esta <strong>prohibido</strong> usar el telefono celular sin dispositivo manos libres al conducir en Uruguay. La infraccion puede resultar en multas y la retencion del vehiculo.</p>
      </section>
      <section class="reveal">
        <h2>Recomendaciones</h2>
        <ul>
          <li>Poner el telefono en modo silencio o avion antes de conducir.</li>
          <li>Si es urgente, detenerse en un lugar seguro antes de responder.</li>
          <li>Usar aplicaciones de respuesta automatica que informan que estas manejando.</li>
          <li>Ante una llamada importante, estacionar antes de contestar.</li>
        </ul>
      </section>
""")

# --- RETENCION INFANTIL ---
pages['retencion-infantil.html'] = page(
    'Retencion Infantil',
    'Sistemas de retencion homologados para ninos en vehiculos. Grupos por peso y obligatoriedad en Uruguay.',
    bc([('Transito','transito.html'),('Retencion Infantil','retencion-infantil.html')]),
    """
      <section class="reveal">
        <p class="lead">En Uruguay, todo nino menor de 12 anos o menor de 1,35 m debe viajar con un sistema de retencion homologado. El uso correcto salva vidas.</p>
      </section>
      <section class="reveal">
        <h2>Grupos por Peso y Talla</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Grupo</th><th>Peso</th><th>Posicion</th></tr></thead>
            <tbody>
              <tr><td><strong>Grupo 0 / 0+</strong></td><td>Hasta 13 kg</td><td>De espaldas a la marcha</td></tr>
              <tr><td><strong>Grupo I</strong></td><td>9 &mdash; 18 kg</td><td>A favor de la marcha</td></tr>
              <tr><td><strong>Grupo II</strong></td><td>15 &mdash; 25 kg</td><td>Con cinturon del vehiculo</td></tr>
              <tr><td><strong>Grupo III</strong></td><td>22 &mdash; 36 kg</td><td>Elevador con respaldo o sin respaldo</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="reveal">
        <h2>Aspectos Clave</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Obligatorio en Uruguay</h3>
            <p class="info-card__text">La ley exige el uso de sistema de retencion homologado para todo nino menor de 12 anos o menor de 1,35 m.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Asiento Trasero</h3>
            <p class="info-card__text">Los ninos deben viajar preferentemente en el asiento trasero del vehiculo.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Homologacion</h3>
            <p class="info-card__text">Adquirir siempre sillas homologadas con certificacion de seguridad reconocida.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Instalacion Correcta</h3>
            <p class="info-card__text">Una silla mal instalada puede ser tan peligrosa como no tener silla.</p>
          </div>
        </div>
      </section>
""")

# --- PREFERENCIAS DE PASO ---
pages['preferencias-de-paso.html'] = page(
    'Preferencias de Paso',
    'Reglas de prioridad en la via publica segun el Codigo de Transito uruguayo.',
    bc([('Transito','transito.html'),('Preferencias de Paso','preferencias-de-paso.html')]),
    """
      <section class="reveal">
        <p class="lead">Las reglas de preferencia de paso determinan quien tiene prioridad en la via publica. Conocerlas y respetarlas es fundamental para la seguridad vial.</p>
      </section>
      <section class="reveal">
        <h2>Reglas Basicas segun Codigo de Transito</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Regla de la Derecha</h3>
            <p class="info-card__text">El vehiculo que aparece a la <strong>derecha</strong> tiene preferencia de paso sobre todos los que aparecen a su izquierda.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Vias Preferenciales</h3>
            <p class="info-card__text">Los vehiculos que circulan por <strong>vias de transito preferenciales</strong> tienen prioridad sobre los que cruzan o ingresan en ellas.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Linea Recta</h3>
            <p class="info-card__text">El vehiculo que sigue en <strong>linea recta</strong> tiene preferencia sobre los que cambian el sentido de la marcha.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Peatones</h3>
            <p class="info-card__text">Los <strong>peatones en cruces</strong> (zonas de seguridad) tienen preferencia de paso sobre los vehiculos.</p>
          </div>
        </div>
      </section>
      <section class="reveal">
        <h2>Situaciones Especiales</h2>
        <div class="info-cards">
          <div class="info-card">
            <h3 class="info-card__title">Semaforos y Policia</h3>
            <p class="info-card__text">Donde haya semaforos o funcionarios policiales, sus indicaciones se respetan por encima de cualquier otra regla.</p>
          </div>
          <div class="info-card">
            <h3 class="info-card__title">Ingreso a Calzada</h3>
            <p class="info-card__text">El vehiculo que sale de una cochera o acceso privado debe ceder el paso a todos los vehiculos que circulan por la via publica.</p>
          </div>
        </div>
      </section>
""")

# --- ADULTO MAYOR ---
pages['adulto-mayor.html'] = page(
    'Adulto Mayor',
    'Consejos para el adulto mayor al volante. Cambios fisicos y recomendaciones de seguridad vial.',
    bc([('Transito','transito.html'),('Adulto Mayor','adulto-mayor.html')]),
    """
      <section class="reveal">
        <p class="lead">Con la edad se producen cambios fisicos y cognitivos que pueden afectar la capacidad de conduccion. Conocerlos y adaptarse es clave para seguir conduciendo con seguridad.</p>
      </section>
      <section class="reveal">
        <h2>Cambios Fisicos que Afectan la Conduccion</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Campo Visual</h3><p class="info-card__text">Reduccion del campo visual periferico que puede dificultar la deteccion de vehiculos o peatones laterales.</p></div>
          <div class="info-card"><h3 class="info-card__title">Tiempo de Reaccion</h3><p class="info-card__text">Mayor tiempo de reaccion ante situaciones inesperadas.</p></div>
          <div class="info-card"><h3 class="info-card__title">Flexibilidad</h3><p class="info-card__text">Disminucion de la flexibilidad que puede dificultar maniobras como girar la cabeza al retroceder.</p></div>
          <div class="info-card"><h3 class="info-card__title">Audicion</h3><p class="info-card__text">Afectacion de la audicion que puede impedir escuchar alertas o bocinas.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Recomendaciones</h2>
        <ul>
          <li>Realizar revisiones medicas periodicas que incluyan evaluacion de la aptitud para conducir.</li>
          <li>Evitar conducir de noche si hay dificultades con el deslumbramiento.</li>
          <li>Planificar rutas evitando zonas de trafico intenso o complejas.</li>
          <li>Hacer pausas frecuentes en viajes largos para descansar.</li>
          <li>Revisar con el medico si los medicamentos pueden afectar la conduccion.</li>
          <li>Adaptar la velocidad a las propias capacidades, no a la presion del trafico.</li>
        </ul>
      </section>
""")

# --- APNEA DEL SUENO ---
pages['apnea-del-sueno.html'] = page(
    'Apnea del Sueno',
    'La apnea del sueno y su relacion con los accidentes de transito. Sintomas y conducta recomendada.',
    bc([('Transito','transito.html'),('Apnea del Sueno','apnea-del-sueno.html')]),
    """
      <section class="reveal">
        <p class="lead">La apnea del sueno es un trastorno que interrumpe la respiracion durante el sueno, causando somnolencia diurna extrema. Multiplica por <strong>7</strong> el riesgo de accidente de transito.</p>
      </section>
      <section class="reveal">
        <h2>Sintomas</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Ronquidos Fuertes</h3><p class="info-card__text">Ronquidos intensos y frecuentes durante el sueno, posible indicador de apnea.</p></div>
          <div class="info-card"><h3 class="info-card__title">Pausas Respiratorias</h3><p class="info-card__text">Pausas en la respiracion nocturna observadas por el companero de cama.</p></div>
          <div class="info-card"><h3 class="info-card__title">Somnolencia Diurna</h3><p class="info-card__text">Sueno excesivo durante el dia, incluso tras dormir varias horas.</p></div>
          <div class="info-card"><h3 class="info-card__title">Falta de Concentracion</h3><p class="info-card__text">Dificultad para concentrarse, deficit de atencion y memoria.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Riesgo Vial</h2>
        <p>La apnea del sueno no tratada multiplica por <strong>7</strong> el riesgo de sufrir un accidente de transito. Es causa frecuente de siniestros en conductores profesionales.</p>
        <p><strong>Conducta recomendada:</strong> Quienes sufren apnea del sueno no tratada no deben conducir hasta recibir tratamiento adecuado. Consultar al medico ante la presencia de los sintomas.</p>
      </section>
""")

# --- AMAXOFOBIA ---
pages['amaxofobia.html'] = page(
    'Amaxofobia',
    'La amaxofobia: miedo irracional a conducir o viajar en vehiculos. Sintomas, tipos y tratamiento.',
    bc([('Transito','transito.html'),('Amaxofobia','amaxofobia.html')]),
    """
      <section class="reveal">
        <p class="lead">La amaxofobia es el miedo irracional a conducir o a viajar en vehiculos. Afecta a un porcentaje significativo de la poblacion y puede tratarse eficazmente.</p>
      </section>
      <section class="reveal">
        <h2>Sintomas</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Ansiedad al Volante</h3><p class="info-card__text">Sensacion de ansiedad o panico al conducir o estar dentro de un vehiculo en movimiento.</p></div>
          <div class="info-card"><h3 class="info-card__title">Sintomas Fisicos</h3><p class="info-card__text">Taquicardia, sudoracion excesiva, tension muscular o dificultad para respirar.</p></div>
          <div class="info-card"><h3 class="info-card__title">Evitacion</h3><p class="info-card__text">Tendencia a evitar situaciones de conduccion o buscar excusas para no conducir.</p></div>
          <div class="info-card"><h3 class="info-card__title">Pensamientos Catastrofistas</h3><p class="info-card__text">Imaginar constantemente accidentes o situaciones peligrosas al volante.</p></div>
        </div>
      </section>
      <section class="reveal">
        <h2>Tipos de Amaxofobia</h2>
        <ul>
          <li>Miedo a conducir en autopistas o rutas de alta velocidad.</li>
          <li>Miedo al trafico intenso en ciudades.</li>
          <li>Miedo a aparcar o realizar maniobras.</li>
          <li>Miedo a ser pasajero de otros conductores.</li>
        </ul>
      </section>
      <section class="reveal">
        <h2>Tratamiento</h2>
        <div class="info-cards">
          <div class="info-card"><h3 class="info-card__title">Terapia Cognitivo-Conductual</h3><p class="info-card__text">El tratamiento mas eficaz, que trabaja sobre los pensamientos y conductas asociados al miedo.</p></div>
          <div class="info-card"><h3 class="info-card__title">Exposicion Gradual</h3><p class="info-card__text">Exposicion progresiva a las situaciones temidas, comenzando por las menos aterradoras.</p></div>
          <div class="info-card"><h3 class="info-card__title">Tecnicas de Relajacion</h3><p class="info-card__text">Respiracion, mindfulness y tecnicas de relajacion muscular para controlar la ansiedad.</p></div>
          <div class="info-card"><h3 class="info-card__title">Apoyo Farmacologico</h3><p class="info-card__text">En casos severos, el medico puede recomendar tratamiento farmacologico complementario.</p></div>
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
