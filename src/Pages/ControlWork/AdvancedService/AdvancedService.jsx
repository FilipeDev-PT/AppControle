import './AdvancedService.css'
import Layout from '../../../Components/Layout/Layout'
import { GetDateCont, GetDateMed, GetDateOrc, PostExcelUAU, PostMedicao } from '../../../Requests/MethodRequest'
import { useState } from 'react'
import { useEffect } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import React from 'react';
import Loading from '../../../Components/Loading/Loading'

export default function AdvancedService(){
  const [orc, setOrc] = useState([])
  const [map, setMap] = useState([])
  const [med, setMed] = useState([])
  const [contrato, setContrato] = useState([])
  const [searc, setSearch] = useState('')
  const filterRef = useRef(null)
  const ContentItens = useRef(null)
  const [searchTermCod, setSearchTermCod] = useState([]);
  const [searchTerm, setSearchTerm] = useState([])
  const [searchCont, setSearchCont] = useState([])
  const [searchContCont, setSearchContCont] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setDateOrc = async () => {
      const response = await GetDateOrc({ permissionScreen: "GetDateOrc" })
      const date = await GetDateMed({ permissionScreen: "GetDateMed" })
      const dados = await GetDateCont({ permissionScreen: "GetDateCont" })
      setContrato(dados)
      setMap(response)
      if(response != 404){
        setLoading(false)
      }
      setOrc(response)
      setMed(date)
    }
    setDateOrc()
  }, []);

  const [soma, setSum] = useState('')

  useEffect(() => {
    const newDescs = {};
    orc.forEach(item => {
      newDescs[item.serv_pla] = getDesc(item.serv_pla);
    });
    setSum(newDescs);
    function getDesc(id){
      const filta = med.filter(x => x.cod_Item === id);
      var sum = 0
      filta.forEach(item => {
        sum += item.qtdeTotalMedida
      })
      return sum
    }
  }, [orc, med]);

  const handleInputChangeCod = (event) => {
    const value = event.target.value
    setSearchTermCod(value)
    const Cod = map.filter(x => x.serv_pla.toLowerCase().includes(value.toLowerCase()) || x.desc_orc.toLowerCase().includes(value.toLowerCase()))
    setSearchTerm(Cod)
  };

  const handleInputChangeCods = (value) => {
    setSearchTermCod(value)
    const Cod = map.filter(x => x.serv_pla.toLowerCase().includes(value.toLowerCase()) || x.desc_orc.toLowerCase().includes(value.toLowerCase()))
    setSearchTerm(Cod)
  };

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const [isInputFocusedCont, setIsInputFocusedCont] = useState(false);

  const handleFocusCont = () => {
    setIsInputFocusedCont(true);
  };

  const handleBlurCont = () => {
    setIsInputFocusedCont(false);
  };

  const SelectList = (serv) => {
    handleInputChangeCods(serv)
    handleBlur()
    const cont = orc.filter(x => x.serv_pla.toLowerCase().includes(serv.toLowerCase()))
    setSearch(cont[0].serv_pla)
    setSearchTermCod(cont[0].serv_pla + " - " + cont[0].desc_orc)
  }

  const cleaninput = () => {
    handleBlur()
    setSearchTermCod('')
    setSearch('')
  }

  const search = () => {
    setFilteredItensOrc(map.filter(x => x.serv_pla.toLowerCase().includes(searc.toLowerCase()) || x.desc_orc.toLowerCase().includes(searc.toLowerCase())))
    setOrc(map.filter(x => x.serv_pla.toLowerCase().includes(searc.toLowerCase()) || x.desc_orc.toLowerCase().includes(searc.toLowerCase())))
    const filterCont = contrato.filter(x => x.serviço.toLowerCase().includes(searc.toLowerCase()))
    setSearchContCont(filterCont)
  }

  const [listenedItens, setListenedItens] = useState('')
  const [filteredItensOrc, setFilteredItensOrc] = useState('')

  const filteredItensListened = (e) => {
    const value = e.target.value
    setListenedItens(value)
    setOrc(filteredItensOrc.filter(x => x.serv_pla.toLowerCase().includes(value.toLowerCase()) || x.desc_orc.toLowerCase().includes(value.toLowerCase())))
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

  const handleInputChangeContrato = (event) => {
    const value = event.target.value
    setSearchCont(value)
    const filterCont = contrato.filter(x => x.serviço.toLowerCase().includes(searc.toLowerCase()) && ( x.empContrato.includes(value) || x.contratada.toLowerCase().includes(value.toLowerCase())))
    setSearchContCont(filterCont)
  };

  const SelectListCont = (serv, desc) => {
    handleBlurCont()
    const cont = contrato.filter(x => x.empContrato.includes(serv) || x.contratada.toLowerCase().includes(desc.toLowerCase()))
    setSearchCont(cont[0].cod_cont + " - " + cont[0].contratada)
  }

  const cleaninputCont = () => {
    handleBlurCont()
    setSearchCont('')
  }

  const [qtdValue, setQtdValue] = useState('')
  const [qtdPorcent, setQtdPorcent] = useState('')

  const getValorUnit = (e) => {
    const value = e.target.value
    setQtdValue(value)
    setQtdPorcent('')
  }

  const getPercent = (e) => {
    const value = e.target.value
    setQtdValue('')
    setQtdPorcent(value)
  }

  const [idPostMed, setIdPostMed] = useState([])

  const postMedição = async () => {
    for(let i = 0; i < idPostMed.length; i++){
      const data = {
        empObraCont: "",
        empObraContServ: "",
        empObraItem: "",
        empresa_cont: "",
        obra_cont: "",
        cod_cont: "",
        serv_itens: "",
        qtdeTotalMedida: "",
        totalMedicao: "",
        saldoContrato: "",
        item_itens: "",
        cod_Itens: "",
        descr_Item: "",
      }

      await PostMedicao({permissionScreen: "PostMedicao"}, {dados: data})
    }
  }

  const [checkboxs, setCheckboxs] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxs(prevState => ({
        ...prevState,
        [name]: checked,
    }));

    if (!checked) {
      setIdPostMed(idPostMed.filter(x => x !== name))
    } else {
      idPostMed.push(name)
    }
  };
  
  return(
    <>
    { loading ?
      <Loading />
    :
    <Layout >
      <p className='descriptionScreen'>Avançar serviços</p>
      <div className='divButtonsFilter'>
        <button onClick={() => {PostExcelUAU({ permissionScreen: "PostExcelUAU" })}} className='AtualizedDados'>Atualizar Cadastros</button>
        <button className='buttonFilter' onClick={filter}>Filtros <LuFilter /></button>
      </div>
      <div className='Filters' ref={filterRef}>
        <h4>Pesquise por: </h4>
        <input type="text" placeholder='Codigo do Serviço ou Descrição do Serviço' style={{ width: '86%' }} value={searchTermCod} onChange={handleInputChangeCod} onFocus={handleFocus} /><IoMdClose className='iconAcomp' onClick={cleaninput}/>
        <IoIosSearch className='iconAcomp' style={{ fontSize: '1.4em'}} onClick={search}/>
        <div className='selectValue' style={{ display: isInputFocused ? 'flex' : 'none' }}>
          {
            searchTerm.map((item, index) => {
              return(
                <>
                  <div key={index} className="itemSelect" onClick={() => {SelectList(item.serv_pla)}}>{item.serv_pla} - {item.desc_orc}</div>
                </>
              )
            })
          }
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <input type="text" placeholder='Buscar Registros' value={listenedItens} onChange={filteredItensListened} />
      </div>
      <div className='TableOrc'> 
        <div className='CabecalhoOrc'>
          <div className='Input'></div>
          <div className='Serviço'>Serviço</div>
          <div className='Descrição'>Descrição</div>
          <div className='QuantidadePlan'>Quantidade Planejada</div>
          <div className='QuantidadeMed'>Quantidade Medida</div>
          <div className='QuantidadeRest'>Quantidade Restante</div>
        </div>
        <div className='ContentOrc' ref={ContentItens}>
        {
          orc.map((item) => {
            return(
              <React.Fragment key={item.id}>
                <div className='ContentOrcItens' >
                  <div className='Input' style={{ fontSize: '.9em' }}><input type="checkbox" className='inputs' id={`checkbox${item.id}`} name={item.id}  checked={checkboxs[item.id] || false} onChange={handleCheckboxChange} /></div>
                  <div className='Serviço' style={{ fontSize: '.9em' }}>{item.serv_pla}</div>
                  <div className='Descrição' style={{ fontSize: '.9em' }}>{item.desc_orc}</div>
                  <div className='QuantidadePlan' style={{ fontSize: '.9em' }}>{item.qdade_pla}</div>
                  <div className='QuantidadeMed' style={{ fontSize: '.9em' }}>{soma[item.serv_pla]}</div>
                  <div className='QuantidadeRest' style={{ fontSize: '.9em' }}>{item.qdade_pla-soma[item.serv_pla]}</div>
                </div>
              </React.Fragment>
            )
          })
        }
        </div>
      </div>
      <div className='divContratadoFooter'>
        <div className='filteresContrato'>
          <h4>Pesquise por: </h4>
          <input type="text" placeholder='Número do Contrato ou Nome do Contratado' style={{ width: '60%' }} value={searchCont} onChange={handleInputChangeContrato} onFocus={handleFocusCont}/><IoMdClose className='iconAcomp' onClick={cleaninputCont}/>
          <input type="number" className='inputNumberValue' placeholder="Valor Unitário" value={qtdValue} onChange={getValorUnit}/>
          <p>ou</p>
          <input type="number" className='inputNumberPercent' placeholder="Porcentagem" value={qtdPorcent} onChange={getPercent}/>
          <button className='AddMed' onClick={postMedição}>Adicionar Medição</button>
        </div>
        <div className='contentContrato' style={{ display: isInputFocusedCont ? 'flex' : 'none'}}>
          {
            searchContCont.map((item, index) => {
              return(
                <>
                  <div key={index} className="itemSelectContrato" onClick={ () => {SelectListCont(item.cod_cont, item.contratada)}}>{item.cod_cont} - {item.contratada}</div>
                </>
              )
            })
          }
        </div>
      </div>
    </Layout>
    }
    </>
  )
}