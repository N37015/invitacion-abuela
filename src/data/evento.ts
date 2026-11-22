export interface MediaRecuerdo {
  id: string;
  tipo: 'foto' | 'video';
  /** Pega aquí el Public ID de Cloudinary (ej. "cumple-abuela-64/foto1"). Déjalo vacío "" mientras no subas fotos */
  cloudinaryPublicId: string;
  titulo: string;
  anio?: string;
  descripcion?: string;
}

export const DATOS_EVENTO = {
  nombreCorto: 'Abuelita Magdalena',
  nombreCompleto: 'Magdalena Pacheco Roblero',
  edad: 74,
  frasePrincipal:
    'Sesenta y cuatro años de amor, sabiduría y sonrisas que iluminan nuestra familia. Queremos celebrar tu vida rodeados de quienes más te quieren.',
  // Fecha de la fiesta: Sábado 23 de enero de 2027 a las 4:00 PM (hora centro México)
  fechaISO: '2027-01-23T16:00:00-06:00',
  fechaTexto: 'Sábado 23 de Enero de 2027',
  cumpleRealTexto: 'En honor a su cumpleaños el 25 de enero',
  horaTexto: '4:00 PM',
  lugar: {
    nombre: 'Salón Jardín Guadalupe',
    ciudad: 'Ocozocoautla de Espinosa, Chiapas',
    referencia: 'Recepción y convivencia familiar',
    // Cuando tengas el link exacto de Google Maps, pégalo aquí:
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Salon+Jardin+Guadalupe+Ocozocoautla+Chiapas',
  },
  // Foto principal de portada (cuando la subas a Cloudinary, pon su publicId aquí)
  fotoPortadaPublicId: '',
  // Cuando subas las fotos y videos de tu abuelita a Cloudinary, solo llena el campo cloudinaryPublicId:
  recuerdos: [
    {
      id: '1',
      tipo: 'foto',
      cloudinaryPublicId: '',
      titulo: 'Una vida llena de luz',
      anio: 'Recuerdo especial',
      descripcion: 'Su sonrisa siempre ha sido el corazón de nuestro hogar.',
    },
    {
      id: '2',
      tipo: 'foto',
      cloudinaryPublicId: '',
      titulo: 'Momentos en familia',
      anio: 'Nuestra historia',
      descripcion: 'Cada reunión a tu lado se convierte en un tesoro.',
    },
    {
      id: '3',
      tipo: 'video',
      cloudinaryPublicId: '',
      titulo: 'Un mensaje con cariño',
      anio: 'Video recuerdo',
      descripcion: 'Palabras y momentos inolvidables.',
    },
  ] as MediaRecuerdo[],
};