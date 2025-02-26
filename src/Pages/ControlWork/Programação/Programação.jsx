import Layout from '../../../Components/Layout/Layout'
import { PostExcelProgramação } from '../../../Requests/MethodRequest'
import './Programação.css'
import { useState } from 'react'
import Loading from '../../../Components/Loading/Loading'

export default function Programação(){
  const [carregando, setCarregando] = useState(false)
  const importDadosReforma = async () => {
    const fileInput = document.getElementById('fileInput');
    const files = Array.from(fileInput.files);
  
    if (files.length === 0) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }
  
    try {
      setCarregando(true)
      const zipBlob = await PostExcelProgramação({ date: files });

      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arquivos.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      console.log('Download iniciado.');
      setCarregando(false)
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
    }
  };
  

  return(
    <Layout>
      {
        carregando ? <Loading /> : ""
      }
      <div className='divContentProgram'>
        <input type="file" id='fileInput' multiple />
        <button onClick={importDadosReforma} className='buttonGeraPDF'>Gerar PDF</button>
      </div>
    </Layout>
  )
}