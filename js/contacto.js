/* =====================================================================
   Formulario de contacto (bloque «contacto»)
   ---------------------------------------------------------------------
   El destino sale del campo «Correo de destino» del bloque. Al enviar se
   abre la aplicación de correo de quien escribe, con el mensaje listo,
   y el formulario cambia por el aviso «Mensaje listo». Es el mismo
   mecanismo de las demás plantillas (clínica, genérica y spa-01).
   ===================================================================== */
(function () {
  document.querySelectorAll('.contacto-form').forEach(function (form) {
    var seccion = form.closest('section') || document;
    var enlace = seccion.querySelector('.contacto-form__destino');
    var destino = ((enlace && enlace.getAttribute('href')) || '').replace(/^mailto:/, '');
    var aviso = seccion.querySelector('.contacto-form__enviado');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (!destino) { alert('Este formulario todavía no tiene un correo de destino.'); return; }
      var d = new FormData(form);
      var asunto = 'Mensaje de ' + d.get('nombre') + ' desde ' + location.hostname;
      var cuerpo = 'Nombre: ' + d.get('nombre') +
        '\nCorreo: ' + d.get('correo') +
        '\nWhatsApp: ' + d.get('whatsapp') +
        (d.get('recomendacion') ? '\nMe recomendó: ' + d.get('recomendacion') : '');
      location.href = 'mailto:' + destino + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
      form.hidden = true;
      form.style.display = 'none';
      if (aviso) aviso.hidden = false;
    });
  });
})();
