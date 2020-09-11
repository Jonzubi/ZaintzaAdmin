const traducirDias = (dia) => {
  switch (dia) {
    case '1':
      return 'Astelehena';
    case '2':
      return 'Asteartea';
    case '3':
      return 'Asteazkena';
    case '4':
      return 'Osteguna';
    case '5':
      return 'Ostirala';
    case '6':
      return 'Larunbata';
    case '7':
      return 'Igandea';
    default:
      return 'ERROR';
  }
};

export { traducirDias };
