export class DataTableOptions {
  constructor() {}

  static getSpanishOptions(pageLength: number): DataTableOptions {
    return {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: pageLength,
      language: {
        search: ' ',
        zeroRecords: 'No se ha encontrado registros - lo lamento',
        info: 'Mostrando página _PAGE_ de _PAGES_',
        infoEmpty: 'No hay registros',
        infoFiltered: '(Filtrados de _MAX_ registros totales)',
        searchPlaceholder: 'Buscar',
        lengthMenu: 'Mostrar _MENU_ registros',
        paginate: {
          first: 'Primera',
          last: 'Última',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      },
    };
  }
}
