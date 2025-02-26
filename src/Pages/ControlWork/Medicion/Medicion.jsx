import { useEffect } from 'react'
import Layout from '../../../Components/Layout/Layout'
import './Medicion.css'
import { GetDateCont, GetDateMed, GetExportExcel, GetExportPdf } from '../../../Requests/MethodRequest'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { useRef } from 'react'
import Loading from '../../../Components/Loading/Loading'
import React from 'react';
import { PostExcelUAU } from '../../../Requests/MethodRequest'

export default function Medicion(){
  const [dateMed, setDateMed] = useState([])
  const [dateCont, setDateCont] = useState([])
  const [itensFiltered, setItensFiltered] = useState([])
  const filterRef = useRef(null)
  const ContentItens = useRef(null)
  const [codCont, setCodCont] = useState('')
  const [medFilteres, setMedFiltered] = useState([])
  const [loading, setLoading] = useState(true)

  const [isInputFocusedCont, setIsInputFocusedCont] = useState(false);

  const handleFocusCont = () => {
    setIsInputFocusedCont(true);
  };

  const handleBlurCont = () => {
    setIsInputFocusedCont(false);
  };

  useEffect(() => {
    const GetDados = async () =>{
      const response = await GetDateMed({ permissionScreen: "GetDateMed"})
      const resp = await GetDateCont({permissionScreen: "GetDateCont"})
      setDateCont(resp.filter((value, index, self) => self.findIndex((t) => t.cod_cont === value.cod_cont && t.contratada === value.contratada) === index))
      setItensFiltered(resp.filter((value, index, self) => self.findIndex((t) => t.cod_cont === value.cod_cont && t.contratada === value.contratada) === index))
      setDateMed(response)
      setMedFiltered(response)
      if(response || resp){
        setLoading(false)
      }
    }
    GetDados()
  }, []);

  const RetunPdf = async () => {
    await GetExportPdf({permissionScreen: "GetExportPdf"}, {data: idPostMed})
  }

  const RetunExcel = async () => {
    await GetExportExcel({permissionScreen: "GetExportExcel"}, {data: idPostMed})
  }

  const filter = () => {
    const box = filterRef.current;
    const itens = ContentItens.current;
    if (box.style.display === 'flex') {
      box.style.display = 'none';
      itens.style.maxHeight = '570px'
    } else {
      box.style.display = 'flex';
      itens.style.maxHeight = '490px'
    }
  }

  const cleaninput = () => {
    handleBlurCont()
    setSearchTermCod('')
    setCodCont('')
  }

  const [searchTermCod, setSearchTermCod] = useState('')

  const select = (value, cont) => {
    handleBlurCont()
    setCodCont(value)
    setSearchTermCod(value + " - " + cont)
  }

  const handleInputChangeCod = (event) => {
    const value = event.target.value
    setSearchTermCod(value)
    const Cod = dateCont.filter(x => x.cod_cont.toString().includes(value) || x.contratada.toLowerCase().includes(value.toLowerCase()))
    setItensFiltered(Cod)
  }

  const [dateInit, setDateInit] = useState()
  const [dateFinal, setDateFinal] = useState()

  const onChangeDateInit = (e) => {
    const value = e.target.value
    setDateInit(value)
  }

  const onChangeDateFinal = (e) => {
    const value = e.target.value
    setDateFinal(value)
  }

  const Search = () => {
    setMedFiltered(dateMed.filter(x => x.cod_cont.toString().includes(codCont)))
    setFilteredItensOrc(dateMed.filter(x => x.cod_cont.toString().includes(codCont)))
  }

  const [checkboxs, setCheckboxs] = useState({})
  const [idPostMed, setIdPostMed] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const handleCheckboxChange = (event, id) => {
    const checked = event.target.checked;
  
    setCheckboxs(prevState => ({
      ...prevState,
      [id]: checked,
    }));
  
    if (checked) {
      setIdPostMed(prevState => [...prevState, id]);
    } else {
      setIdPostMed(prevState => prevState.filter(item => item !== id));
    }
  
    if (!checked) {
      setSelectAll(false);
    } else {
      if (Object.values(checkboxs).every(val => val === true)) {
        setSelectAll(true);
      }
    }
  };

  const handleCheckboxChangeAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
  
    const newCheckboxs = {};
    const newIdPostMed = [];
  
    medFilteres.forEach(item => {
      newCheckboxs[item.id] = newSelectAll;
      if (newSelectAll) {
        newIdPostMed.push(item.id);
      }
    });
  
    setCheckboxs(newCheckboxs);
    setIdPostMed(newIdPostMed);
  };

  const [carregaDados, setCarregaDados] = useState(false)

  const AtualizaDados = async () => {
    setCarregaDados(true)
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const resp = await PostExcelUAU({ permissionScreen: "PostExcelUAU" }, {data: file})
    if(resp){
      setCarregaDados(false)
    }
  }

  const [listenedItens, setListenedItens] = useState('')
  const [filteredItensOrc, setFilteredItensOrc] = useState('')

  const filteredItensListened = (e) => {
    const value = e.target.value
    setListenedItens(value)
    setMedFiltered(filteredItensOrc.filter(x => x.cod_cont.toString().includes(value) || x.cod_Item.toLowerCase().includes(value.toLowerCase())))
  }

  return(
    <>
    {carregaDados ? <Loading /> : ''}
      { 
        loading ?
          <Loading />
        :
          <Layout >
            <p className='descriptionScreen'>Consultar Medições</p>
            <div className='divButtonsFilter'>
              <input type="file" id="fileInput"/>
              <button onClick={AtualizaDados} className='AtualizedDados'>Atualizar Cadastros</button>
              <button className='buttonFilter' onClick={filter}>Filtros <LuFilter /></button>
            </div>
            <div className='Filters' ref={filterRef}>
              <input type="date" onChange={onChangeDateInit} value={dateInit}/> <p> a </p> <input type="date" onChange={onChangeDateFinal} value={dateFinal}/>
              <input type="text" placeholder='Codigo do Contrato ou Nome do Contratado' style={{ width: '86%' }} onFocus={handleFocusCont} value={searchTermCod} onChange={handleInputChangeCod}/><IoMdClose className='iconAcomp' onClick={cleaninput}/>
              <IoIosSearch className='iconAcomp' style={{ fontSize: '1.4em'}} onClick={Search}/>
              <div className='selectValueMed' style={{ display: isInputFocusedCont ? 'flex' : 'none' }}>
                {
                  itensFiltered.map((item, index) => {
                    return(
                      <>
                        <div key={index} className="itemSelect" onClick={() => select(item.cod_cont, item.contratada)}>{item.cod_cont} - {item.contratada}</div>
                      </>
                    )
                  })
                }
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <input type="text" placeholder='Buscar Registros' value={listenedItens} onChange={filteredItensListened}/>
            </div>
            <div className='TableOrc'>
              <div className='CabecalhoOrc'>
                <div className='Input'><input type="checkbox" className='inputs' onChange={handleCheckboxChangeAll} checked={selectAll}/></div>
                <div className='CodCont'>Cod. Contrato</div>
                <div className='DescCont'>Desc. Contrato</div>
                <div className='CodServ'>Cod. Serviço</div>
                <div className='ItemServ'>Item Serviço</div>
                <div className='DescServ'>Desc. Serviço</div>
                <div className='QtdMedida'>Qtd Medida</div>
              </div>
              <div className='ContentMed' ref={ContentItens}>
                {
                  medFilteres.map((item) => {
                    return(
                      <React.Fragment key={item.id}>
                        <div className='ContentOrcItens medicoes' >
                          <div className='Input' style={{ fontSize: '.9em' }}><input type="checkbox" className='inputs' id={`checkbox${item.id}`} name={item.id} checked={checkboxs[item.id] || false} onChange={(e) => handleCheckboxChange(e, item.id)}/></div>
                          <div className='CodCont' style={{ fontSize: '.9em' }}>{item.cod_cont}</div>
                          <div className='DescCont' style={{ fontSize: '.9em' }}>{}</div>
                          <div className='CodServ' style={{ fontSize: '.9em' }}>{item.cod_Item}</div>
                          <div className='ItemServ' style={{ fontSize: '.9em' }}>{item.item_itens}</div>
                          <div className='DescServ' style={{ fontSize: '.9em' }}>{item.descr_Item}</div>
                          <div className='QtdMedida' style={{ fontSize: '.9em' }}>{item.totalMedicao}</div>
                        </div>
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </div>
            <div className='ButtonExport'>
              <p>Export: </p>
              <button onClick={RetunPdf} className='buttonExportfilesPdf'> PDF </button>
              <button onClick={RetunExcel} className='buttonExportfilesExcel'> EXCEL </button>
            </div>
          </Layout>
      }
    </>
  )
}