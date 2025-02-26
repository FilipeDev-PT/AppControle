import './Acomp.css'
import Layout from '../../../Components/Layout/Layout'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Acomp (){

  const colunas = ['Coluna 1', 'Coluna 2', 'Coluna 3']; // Array de colunas
  const linhas = ['Linha 1', 'Linha 2', 'Linha 3'];  // Array de linhas

  // Estado para armazenar os valores da matriz
  const [matriz, setMatriz] = useState([]);

  // Lógica para preencher a matriz com valores vindos do banco de dados
  useEffect(() => {
    const carregarMatriz = async () => {
      let matrizBancoDeDados = [
        ['Valor 1', 'Valor 2', 'Valor 3'],
        ['Valor 4', 'Valor 5', 'Valor 6'],
        ['Valor 7', 'Valor 8', 'Valor 9'],
      ];
      setMatriz(matrizBancoDeDados);
    };

    carregarMatriz();
  }, []);

  // Função para lidar com a alteração de um valor na matriz
  const handleChange = (linhaIndex, colunaIndex, novoValor) => {
    const novaMatriz = [...matriz];
    novaMatriz[linhaIndex][colunaIndex] = novoValor;
    
    setMatriz(novaMatriz);
  };

  const casas = [
    '01-01',
    '01-02',
    '01-03',
    '01-04',
    '01-05',
    '01-06',
    '01-07',
    '02-01',
    '02-02',
    '02-03',
    '02-04',
    '02-05',
    '02-06',
    '02-07',
    '02-08',
    '02-09',
    '02-10',
    '02-11',
    '02-12',
    '02-13',
    '02-14',
    '02-15',
    '02-16',
    '02-17',
    '02-18',
    '02-19',
    '02-20',
    '02-21',
    '02-22',
    '02-23',
    '02-24',
  ]

  const datas = [
    '01/01/2025',
    '02/01/2025',
    '03/01/2025',
    '04/01/2025',
    '05/01/2025',
    '06/01/2025',
    '07/01/2025',
    '08/01/2025',
    '09/01/2025',
    '10/01/2025',
    '01/01/2025',
    '02/01/2025',
    '03/01/2025',
    '04/01/2025',
    '05/01/2025',
    '06/01/2025',
    '07/01/2025',
    '08/01/2025',
    '09/01/2025',
    '10/01/2025',
    '01/01/2025',
    '02/01/2025',
    '03/01/2025',
    '04/01/2025',
    '05/01/2025',
    '06/01/2025',
    '07/01/2025',
    '08/01/2025',
    '09/01/2025',
    '10/01/2025',
  ]

  const salvarAlteracoes = async () => {
    const user = 'usuario_exemplo'; // Você obteria isso de um estado global ou contexto
    const novaMatrizComUsuario = matriz.map((linha, linhaIndex) => 
      linha.map((valor, colunaIndex) => ({
        valor,
        linha: linhas[linhaIndex],
        coluna: colunas[colunaIndex],
        usuario: user,
      }))
    );

    const response = await fetch('/api/salvar-matriz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaMatrizComUsuario),
    });

    if (response.ok) {
      alert('Alterações salvas com sucesso!');
    } else {
      alert('Erro ao salvar alterações!');
    }
  };

  return(
    <Layout>
      <div>
      <table>
        <thead>
          <tr>
          <th>{}</th>
            {colunas.map((coluna, index) => (
              <th key={index}>{coluna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, linhaIndex) => (
            <tr key={linhaIndex}>
              <th>{linha}</th>
              {colunas.map((coluna, colunaIndex) => (
                <td key={colunaIndex}>
                  <input
                    type="text"
                    value={matriz[linhaIndex]?.[colunaIndex] || ''}
                    onChange={(e) => handleChange(linhaIndex, colunaIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={salvarAlteracoes}>Salvar Alterações</button>
    </div>
    </Layout>
  )
}