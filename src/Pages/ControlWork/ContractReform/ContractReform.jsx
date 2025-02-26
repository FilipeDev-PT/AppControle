import Layout from '../../../Components/Layout/Layout'
import './ContractReform.css'
import { GetDateCont, GetDateMed, GetDateOrc, GetExcelReform, GetExportExcelReform, PostExcelEmail, PostExcelReform } from '../../../Requests/MethodRequest'
import Loading from '../../../Components/Loading/Loading'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import React from 'react'
import { LuFilter } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { IoIosReturnLeft } from "react-icons/io";

export default function ContractReform(){
  const [carregaDados, setCarregaDados] = useState(false)
  const filterRef = useRef(null)
  const ContentItens = useRef(null)
  const [dadosReform, setDadosReform] = useState([])
  const [dadosCont, setDadosCont] = useState([])
  const [dadosMed, setDadosMed] = useState([])
  const [dadosOrc, setDadosOrc] = useState([])

  const [dadosContFiltered, setDadosContFiltered] = useState([])

  var [workItens, setWorkItens] = useState([])
  var [clientItens, setClientItens] = useState([])
  var [userItens, setUserItens] = useState([])
  var [packagesItens, setPackagesItens] = useState([])
  var [serviceItens, setServiceItens] = useState([])

  var [workItensMap, setWorkItensMap] = useState([])
  var [clientItensMap, setClientItensMap] = useState([])
  var [userItensMap, setUserItensMap] = useState([])
  var [packagesItensMap, setPackagesItensMap] = useState([])
  var [serviceItensMap, setServiceItensMap] = useState([])

  const [soma, setSum] = useState('')

  useEffect(() => {
    const GetDateReform = async () => {
      const response = await GetExcelReform({permisisonScreen: "GetExcelReform"})
      const resp = await GetDateCont({permissionScreen:"GetDateCont"})
      const resposta = await GetDateMed({permissionScreen: "GetDateMed"})
      const respos = await GetDateOrc({permissionScreen: "GetDateOrc"})
      setDadosReform(response)
      setDadosCont(resp)
      setDadosContFiltered(resp)
      setDadosMed(resposta)
      setDadosOrc(respos)

      resp.forEach(element => {
        workItens.push(element.skEmpresaObra)
        clientItens.push(element.cod_cont)
        userItens.push(element.quem)
        packagesItens.push(0)
        serviceItens.push(element.serviço)
      });

      const work = [...new Set(workItens)]
      const client = [...new Set(clientItens)]
      const user = [...new Set(userItens)]
      const packages = [...new Set(packagesItens)]
      const service = [...new Set(serviceItens)]

      setWorkItens(work)
      setClientItens(client)
      setUserItens(user)
      setPackagesItens(packages)
      setServiceItens(service)

      setWorkItensMap(work)
      setClientItensMap(client)
      setUserItensMap(user)
      setPackagesItensMap(packages)
      setServiceItensMap(service)
    }
    GetDateReform()
  }, []);

  useEffect(() => {
    const newDescs = {};
    dadosCont.forEach(item => {
      newDescs[`${item.cod_cont}_${item.serviço}_${item.item}`] = getSoma(item.cod_cont, item.serviço , item.item);
    });
    setSum(newDescs);
    function getSoma(cont, serv, item){
      const filta = dadosReform.filter(x => x.ctr === cont && x.codService === serv && x.codItem === item);
      var sum = 0
      filta.forEach(item => {
        sum += item.qtd
      })
      return sum
    }
  }, [dadosCont, dadosReform]);

  const [saldo, setSaldo] = useState()

  useEffect(() => {
    const newDescs = {};
    dadosCont.forEach(item => {
      newDescs[`${item.cod_cont}_${item.serviço}_${item.item}`] = getSaldoCont(item.cod_cont, item.serviço , item.item);
    });
    setSaldo(newDescs);
    function getSaldoCont(cont, serv, item){
      const GetCont = dadosCont.filter(x => x.cod_cont === cont && x.serviço === serv && x.item === item)
      const getMed = dadosMed.filter(x => x.cod_cont === cont && x.cod_Item === serv && x.item_itens === item)
      var sum = 0
      getMed.forEach(item => {
        sum += item.qtdeTotalMedida
      })
      if(GetCont.length === 0){
        return (0 - parseInt(sum))
      }
      return Math.round((GetCont[0].qtde - sum) * 10**4) / 10**4;
    }
  }, [dadosMed, dadosCont]);

  const [somaSaldo, setSomaSaldo] = useState()

  useEffect(() => {
    const newDescs = {};
    dadosCont.forEach(item => {
      newDescs[item.serviço] = getSomaSaldos(item.serviço);
    });
    setSomaSaldo(newDescs);
    function getSomaSaldos(serv){
      const GetCont = dadosCont.filter(x => x.serviço === serv)
      var sum = 0 
      GetCont.forEach(item => {
        sum += saldo[`${item.cod_cont}_${item.serviço}_${item.item}`]
      })

      return Math.round(sum * 10**4) / 10**4;
    }
  }, [dadosCont, saldo]);

  const [somaResAdit, setSomaResAdit] = useState()

  useEffect(() => {
    const newDescs = {};
    newDescs[1] = setSomaResAdits();
    setSomaResAdit(newDescs);
    function setSomaResAdits(){
      const GetCont = dadosCont
      var somaMaiorQueZero = 0
      GetCont.forEach(item => {
        const valorMedido = soma[`${item.cod_cont}_${item.serviço}_${item.item}`]
        const qtdeContrato = saldo[`${item.cod_cont}_${item.serviço}_${item.item}`]
        const resumoAdit = valorMedido - qtdeContrato
        if(resumoAdit > 0){
          somaMaiorQueZero += resumoAdit
        }

        return somaMaiorQueZero
      })
    }
  }, [dadosCont, saldo, soma]);

  const [reforma, setReforma] = useState()
  var valorAditivoReducao = useState(0)

  useEffect(() => {
    const newDescs = {};
    dadosCont.forEach(item => {
      newDescs[`${item.cod_cont}_${item.serviço}_${item.item}`] = getReforma(item.cod_cont, item.serviço , item.item);
    });
    setReforma(newDescs);
    function getReforma(cont, serv, item){
      const qtdeContrato = saldo[`${cont}_${serv}_${item}`]
      var qtdeOrcamentoGeral = dadosOrc.filter(x => x.serv_pla === serv)
      var diferenca = 0
      if(qtdeOrcamentoGeral.length != 0){
        diferenca = parseInt(qtdeOrcamentoGeral[0].qdade_pla) - somaSaldo[serv]
      }
      const valorMedido = soma[`${cont}_${serv}_${item}`]
      const resumoAdit = valorMedido - qtdeContrato
      const contEncerrados = 0
      var aditReducao = 0

      if(qtdeContrato == 0){
        aditReducao = 0
      }else if(valorAditivoReducao * -1 >= diferenca * -1 + somaResAdit[1]){
        aditReducao = 0
      }else if((valorAditivoReducao + resumoAdit + contEncerrados) < (diferenca + (somaResAdit[1] * -1))){
        aditReducao = resumoAdit - ((valorAditivoReducao + resumoAdit) - (diferenca + (somaResAdit[1] * -1)))
      }else{
        aditReducao = resumoAdit;
      }

      valorAditivoReducao += aditReducao;

      var qtdAditivar = 0
      if(qtdeContrato < 0 && valorMedido == 0){
        qtdAditivar = 0
      }else if(resumoAdit >= 0){
        qtdAditivar = resumoAdit
      }else if(contEncerrados * -1 >= diferenca * -1 && resumoAdit <= 0){
        qtdAditivar = 0
      }else{
        qtdAditivar = aditReducao
      }

      return Math.round(qtdAditivar * 10**4) / 10**4;
    }
  }, [dadosOrc, dadosCont]);

  const importDadosReforma = async () => {
    setCarregaDados(true)
    const fileInput = document.getElementById('fileInput')
    const file = fileInput.files[0]
    const resp = await PostExcelReform({ permissionScreen: "PostExcelReform" }, {data: file})
    if(resp){
      setCarregaDados(false)
    }
  }

  const filter = () => {
    const box = filterRef.current;
    const itens = ContentItens.current;
    if (box.style.display === 'flex') {
      box.style.display = 'none'
      itens.style.maxHeight = '600px'
    } else {
      box.style.display = 'flex'
      itens.style.maxHeight = '470px'
    }
  }

  const [work, setWork] = useState('')
  const [client, setClient] = useState('')
  const [user, setUser] = useState('')
  const [packages, setPackages] = useState('')
  const [service, setService] = useState('')

  const onChangeWork = (e) => {
    setWork(e.target.value)
    setWorkItensMap(workItens.filter(x => x.includes(e.target.value)))
  }

  const onChangeClient = (e) => {
    setClient(e.target.value)
    setClientItensMap(clientItens.filter(x => x.toString().includes((e.target.value).toString())))
  }

  const onChangeUser = (e) => {
    setUser(e.target.value)
    setUserItensMap(userItens.filter(x => x.toString().includes((e.target.value.toString()))))
  }

  const onChangePackages = (e) => {
    setPackages(e.target.value)
    setPackagesItensMap(packagesItens.filter(x => x.includes(e.target.value)))
  }

  const onChangeService = (e) => {
    setService(e.target.value)
    setServiceItensMap(serviceItens.filter(x => x.includes(e.target.value)))
  }

  const applyFilteredItens = () => {
    setDadosContFiltered(dadosCont.filter(x => x.skEmpresaObra.toLowerCase().includes(work.toLowerCase()) && x.cod_cont.toString().includes(client.toString()) && x.quem.toLowerCase().includes(user.toLowerCase()) && x.serviço.toLowerCase().includes(service.toLowerCase())))
  }

  const CleanInputWork = () => {
    setWork('')
    handleBlurWork()
  }

  const CleanInputClient = () => {
    setClient('')
    handleBlurClient()
  }

  const CleanInputUser = () => {
    setUser('')
    handleBlurUser()
  }

  const CleanInputPackages = () => {
    setPackages('')
    handleBlurPackage()
  }

  const CleanInputService = () => {
    setService('')
    handleBlurService()
  }

  const [isInputFocusedWork, setIsInputFocusedWork] = useState(false);
  const [isInputFocusedClient, setIsInputFocusedClient] = useState(false);
  const [isInputFocusedUser, setIsInputFocusedUser] = useState(false);
  const [isInputFocusedPackage, setIsInputFocusedPackage] = useState(false);
  const [isInputFocusedService, setIsInputFocusedService] = useState(false);

  const handleFocusWork = () => {
    setIsInputFocusedWork(true);
  };
  const handleFocusClient = () => {
    setIsInputFocusedClient(true);
  };
  const handleFocusUser = () => {
    setIsInputFocusedUser(true);
  };
  const handleFocusPackage = () => {
    setIsInputFocusedPackage(true);
  };
  const handleFocusService = () => {
    setIsInputFocusedService(true);
  };

  const handleBlurWork = () => {
    setIsInputFocusedWork(false);
  };
  const handleBlurClient = () => {
    setIsInputFocusedClient(false);
  };
  const handleBlurUser = () => {
    setIsInputFocusedUser(false);
  };
  const handleBlurPackage = () => {
    setIsInputFocusedPackage(false);
  };
  const handleBlurService = () => {
    setIsInputFocusedService(false);
  };

  const SelectItensWork = (e) => {
    setWork(e.target.innerHTML)
    handleBlurWork()
  }
  const SelectItensClient = (e) => {
    setClient(e.target.innerHTML)
    handleBlurClient()
  }
  const SelectItensUser = (e) => {
    setUser(e.target.innerHTML)
    handleBlurUser()
  }
  const SelectItensPackage = (e) => {
    setPackages(e.target.innerHTML)
    handleBlurPackage()
  }
  const SelectItenService = (e) => {
    setService(e.target.innerHTML)
    handleBlurService()
  }

  const [filterItensAllTime, setFilterItensAllTime] = useState('')

  const filteredItensAllTime = (e) => {
    const value = e.target.value
    setFilterItensAllTime(value)
    setDadosContFiltered(dadosCont.filter(x => x.skEmpresaObra.toLowerCase().includes(value.toLowerCase()) || x.cod_cont.toString().toLowerCase().includes(value.toLowerCase()) || x.quem.toLowerCase().includes(value.toLowerCase()) || x.serviço.toLowerCase().includes(value.toLowerCase())))
  }

  const [isInputFocusExporExcel, setIsInputFocusExporExcel] = useState(false)

  const ExportExcelReform = () => {
    setIsInputFocusExporExcel(true)
  }

  const ReturnExporexcelReform = () => {
    setIsInputFocusExporExcel(false)
  }

  const [email, setEmail] = useState('')
  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')

  const dadosReformAdd = []

  const gerapdf = async () => {
    const resp = await GetExportExcelReform({ permissionScreen: 'GetExportExcelReform' }, { data: dadosReformAdd })
    if(resp){
      ReturnExporexcelReform()
    }
  }

  const SendEmailExcel = async () => {
    const data = {
      "email": email,
      "titulo": titulo,
      "conteudo": conteudo,
      "dados": dadosReformAdd
    }

    const resp = await PostExcelEmail({ permissionScreen: 'PostExcelEmail' }, { data: data })
    setEmail('')
    setTitulo('')
    setConteudo('')
    if(resp){
      ReturnExporexcelReform()
    }
  }
  return(
    <Layout>
      { carregaDados ? <Loading /> : ''}
      <p className='descriptionScreen'>Reforma de Contrato</p>
      <div className='divButtonsFilter'>
        <input type="file" id='fileInput'/>
        <button onClick={importDadosReforma} className='AtualizedDados'>Adicionar Dados</button>
        <button className='buttonFilter' onClick={filter}>Filtros<LuFilter /></button>
      </div>
      <div className='Filters reformContractFilters' ref={filterRef}>
        <div className='divFilter1'>
          <input type="text" placeholder='Obra' value={work} onChange={onChangeWork} onFocus={handleFocusWork}/><IoMdClose className='iconAcomp' onClick={CleanInputWork}/>
          <div className='divSelectItens ItensWork' style={{ display: isInputFocusedWork ? 'flex' : 'none' }}>
            {
              workItensMap.map((item) => {
                return(
                  <>
                    <div className='ItensSelectItens' onClick={SelectItensWork}>{item}</div>
                  </>
                )
              })
            }
          </div>
          <input type="text" placeholder='Contratado(a)' value={client} onChange={onChangeClient} onFocus={handleFocusClient}/><IoMdClose className='iconAcomp' onClick={CleanInputClient}/>
          <div className='divSelectItens ItensClient' style={{ display: isInputFocusedClient ? 'flex' : 'none' }}>
            {
              clientItensMap.map((item) => {
                return(
                  <>
                    <div className='ItensSelectItens' onClick={SelectItensClient}>{item}</div>
                  </>
                )
              })
            }
          </div>
        </div>
        <div className='divFilter2'>
          <input type="text" placeholder='Quem cadastrou?' value={user} onChange={onChangeUser} onFocus={handleFocusUser}/><IoMdClose className='iconAcomp' onClick={CleanInputUser}/>
          <div className='divSelectItens ItensUser' style={{ display: isInputFocusedUser ? 'flex' : 'none' }}>
            {
              userItensMap.map((item) => {
                return(
                  <>
                    <div className='ItensSelectItens' onClick={SelectItensUser}>{item}</div>
                  </>
                )
              })
            }
          </div>
          <input type="text" placeholder='Pacote' value={packages} onChange={onChangePackages} onFocus={handleFocusPackage}/><IoMdClose className='iconAcomp' onClick={CleanInputPackages}/>
          <div className='divSelectItens ItensPackage' style={{ display: isInputFocusedPackage ? 'flex' : 'none' }}>
            {
              packagesItensMap.map((item) => {
                return(
                  <>
                    <div className='ItensSelectItens' onClick={SelectItensPackage}>{item}</div>
                  </>
                )
              })
            }
          </div>
          <input type="text" placeholder='Serviço' value={service} onChange={onChangeService} onFocus={handleFocusService}/><IoMdClose className='iconAcomp' onClick={CleanInputService}/>
          <div className='divSelectItens ItensService' style={{ display: isInputFocusedService ? 'flex' : 'none' }}>
            {
              serviceItensMap.map((item) => {
                return(
                  <>
                    <div className='ItensSelectItens' onClick={SelectItenService}>{item}</div>
                  </>
                )
              })
            }
          </div>
        </div>
        <button className='AtualizedDados applyfilters' onClick={applyFilteredItens}>Aplicar Filtrar</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <input type="text" placeholder='Buscar Registros' value={filterItensAllTime} onChange={filteredItensAllTime}/>
      </div>
      <div className='TableOrc'>
        <div className='CabecalhoOrc'>
          <div className='EmpresaRef'>Empresa</div>
          <div className='QuemRef'>Quem</div>
          <div className='ItemServRef'>Item Serviço</div>
          <div className='CodContRef'>Cod. Contrato</div>
          <div className='CodServRef'>Cod. Serviço</div>
          <div className='DescServRef'>Desc. Serviço</div>
          <div className='UnidRef'>Unid.</div>
          <div className='SaldoContRef'>Saldo Contrato</div>
          <div className='QtdMedidaRef'>Qtd Medida</div>
          <div className='QtdReforRef'>Qtd a Reformar</div>
        </div>
        <div className='ContentMed reformContract' ref={ContentItens}>
          {
            dadosContFiltered.map((item) => {
              const saldos = saldo[`${item.cod_cont}_${item.serviço}_${item.item}`]
              const somas = soma[`${item.cod_cont}_${item.serviço}_${item.item}`]
              const reformas = reforma[`${item.cod_cont}_${item.serviço}_${item.item}`]
              dadosReformAdd.push({
                skEmpresaObra: item.skEmpresaObra,
                quem: item.quem,
                item: parseInt(item.item),
                cod_cont: parseInt(item.cod_cont),
                serviço: item.serviço,
                descrição: item.descrição,
                unid: item.unid,
                saldCont: parseFloat(saldos),
                qtdMed: parseFloat(somas),
                qtdRef: parseFloat(reformas)
              })
              return(
                <React.Fragment key={item.id}>
                  <div className='ContentOrcItens medicoes' >
                    <div className='EmpresaRef' style={{ fontSize: '.8em' }}>{item.skEmpresaObra}</div>
                    <div className='QuemRef' style={{ fontSize: '.8em' }}>{item.quem}</div>
                    <div className='ItemServRef' style={{ fontSize: '.8em' }}>{item.item}</div>
                    <div className='CodContRef' style={{ fontSize: '.8em' }}>{item.cod_cont}</div>
                    <div className='CodServRef' style={{ fontSize: '.8em' }}>{item.serviço}</div>
                    <div className='DescServRef' style={{ fontSize: '.8em' }}>{item.descrição}</div>
                    <div className='UnidRef' style={{ fontSize: '.8em' }}>{item.unid}</div>
                    <div className='SaldoContRef' style={{ fontSize: '.8em' }}>{saldos}</div>
                    <div className='QtdMedidaRef' style={{ fontSize: '.8em' }}>{somas}</div>
                    <div className='QtdReforRef' style={{ fontSize: '.8em' }}>{reformas}</div>
                  </div>
                </React.Fragment>
              )
              
            })
          }
        </div>
      </div>
      <button className='ButtonExportRefrom' onClick={ExportExcelReform}>Exportar Reforma</button>
      <div style={{ display: isInputFocusExporExcel ? 'flex' : 'none' }} className='divExportReform'>
        <div className='divConteudoSendEmail'>
          <div className='divIconReturn' onClick={ReturnExporexcelReform}><IoIosReturnLeft />Retornar</div>
          <div className='divDestinatario'>
            <label htmlFor="">Destinatário: </label>
            <input type="email" placeholder="Digite o e-mail do destinatário" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <div className='divTitle'>
            <label htmlFor="">Título: </label>
            <input type="text" placeholder="Digite o titulo da sua mensagem" value={titulo} onChange={(e) => {setTitulo(e.target.value)}}/>
          </div>
          <div className='divConteudo'>
            <label htmlFor="">Conteúdo: </label>
            <textarea placeholder="Digite o conteúdo do seu e-mail" value={conteudo} onChange={(e) => {setConteudo(e.target.value)}}></textarea>
          </div>
          <div className='divButtonsExportReform'>
            <button onClick={gerapdf}>Baixar Planilha</button>
            <p>ou</p>
            <button onClick={SendEmailExcel}>Enviar Email</button>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}