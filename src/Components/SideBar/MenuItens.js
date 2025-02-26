//import { ListPermission } from "../../Requests/MethodRequest"

export default function RetunlistPermission() {
    const MenuItens = [
        {
            title: 'Novidades',
            itens: '',
            link: '',
            cod: '4',
        },
        {
            title: 'Pagina Inicial',
            itens: '',
            link: '/Home',
            cod: '5',
        },
        {
            title: 'Cadastro',
            itens: [
                
                    {
                        title: 'Usuário',
                        itens: '',
                        link: '/User',
                        cod: '2',
                    },
            ],
            link: '',
            cod: '1',
        },
        {
            title: 'Controle de Obras',
            itens: [
                {
                    title: 'Planejamento',
                    itens: [
                        {
                            title: 'Avançar Serviços',
                            link: '/AdvancedService',
                            itens: '',
                            cod: '12',
                        },
                        {
                            title: 'Medições',
                            link: '/Medicion',
                            itens: '',
                            cod: '12',
                        },
                        {
                            title: 'Reforma de Contrato',
                            link: '/ContractReform',
                            itens: '',
                            cod: '12',
                        },
                        {
                            title: 'Programação',
                            link: '/Programação',
                            itens: '',
                            cod: '12',
                        },
                        {
                            title: 'Acompanhamento',
                            link: '/Acomp',
                            itens: '',
                            cod: '13',
                        }
                    ],
                    link: '',
                    cod: '14',
                },
                {
                    title: 'Relatórios',
                    itens: '',
                    link: '',
                    cod: '15',
                },
                {
                    title: 'Dashboards',
                    itens: '',
                    link: '',
                    cod: '16',
                }
            ],
            link: '',
            cod: '17',
        }
    ];

//    async function addFilteredItems(MenuItens, List) {
 //       for (const item of MenuItens) {
  //          if (await ListPermission(item.cod)) {
   //             List.push(item);
    //        }
     //       if (item.itens && item.itens.length > 0) {
      //          const filteredSubItems = [];
       //         await addFilteredItems(item.itens, filteredSubItems);
        //        if (filteredSubItems.length > 0) {
          //          const newItem = { ...item, itens: filteredSubItems };
           //         List.push(newItem);
            //    }
           // }
       // }
   // }
    
  //  const List = [];
   // addFilteredItems(MenuItens, List);

    return MenuItens;
}
