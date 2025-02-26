export async function GetUser( permissionScreen ){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/User`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404)
  }

  return await response.json();
}

export async function GetUserByID( permissionScreen, id){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/User/${id.id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404);
  }

  return await response.json();
}

export async function PostUser(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/User`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    return errorData
  }

  return await response.json();
}

export async function PutUser(permissionScreen, dados, id){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/User/${id.id}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }

  return await response;
}

export async function DeleteUser(permissionScreen, id){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/User/${id.id}`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }

  return await response;
}

export async function GetRelUserWork( permissionScreen ){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/relUserWork`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404)
  }

  return await response.json();
}

export async function Statuslogin(){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch('https://localhost:7066/api/verifyLogin/loginstatus', {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function GetPermission( permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/permission`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404);
  }

  return await response.json();
}

export async function GetWork( permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/work`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404);
  }

  return await response.json();
}

export async function GetWorkByID( permissionScreen, id){
  const token = localStorage.getItem('tokenUser')
  const url = `https://localhost:7066/api/work/${id.id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404);
  }

  return await response.json();
}


export async function PostExcelUAU(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const formData = new FormData();
  formData.append('file', dados.data);
  const response = await fetch(`https://localhost:7066/api/getDate/Med`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: formData,
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }

  const resp = await fetch(`https://localhost:7066/api/getDate/Cont`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: formData,
  })
  if ( resp.status == 403) {
    return resp.status
  }
  if (!resp.ok) {
    const errorData = await resp;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${resp.status} - ${resp.statusText}`);
  }
  const resposta = await fetch(`https://localhost:7066/api/getDate/Orc`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: formData,
  })
  if ( resposta.status == 403) {
    return resposta.status
  }
  if (!resposta.ok) {
    const errorData = await resposta;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${resposta.status} - ${resposta.statusText}`);
  }
  return await resposta;
}

export async function GetExcelReform(permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/getDataReform`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return response.json()
}

export async function PostExcelReform(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const formData = new FormData();
  formData.append('file', dados.data);
  const response = await fetch(`https://localhost:7066/api/getDataReform`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: formData,
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response;
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response
}

export async function GetDateCont(permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/getDate/Cont`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function GetDateMed(permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/getDate/Med`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function GetDateOrc(permissionScreen){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/getDate/Orc`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.error(404)
  }
  return await response.json();
}

export async function PostMedicao(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/work`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function GetVerifyCode(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/SendEmail/verify`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    return response.status;
  }
  return await response.json();
}

export async function PostSendEmail(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/SendEmail`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function PostExcelEmail(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/SendEmail/exportReform`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function PostUserByEmail(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/User/recSenha`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na requisição:', errorData);
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function GetExportPdf(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/exportPDF`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  const pdfBlob = await response.blob();
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Medição.pdf';
  link.click();

  URL.revokeObjectURL(pdfUrl);
}

export async function GetExportExcel(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/exportExcel`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  const pdfBlob = await response.blob();
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Medição.xlsx';
  link.click();

  URL.revokeObjectURL(pdfUrl);
}

export async function GetExportExcelReform(permissionScreen, dados){
  const token = localStorage.getItem('tokenUser')
  const response = await fetch(`https://localhost:7066/api/exportExcel/reform`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Permission": `${permissionScreen.permissionScreen}`,
    },
    body: JSON.stringify(dados.data)
  })
  if ( response.status == 403) {
    return response.status
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
  }
  const pdfBlob = await response.blob();
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Medição.xlsx';
  link.click();

  URL.revokeObjectURL(pdfUrl);
}

export async function PostExcelProgramação(dados) {
  const token = localStorage.getItem('tokenUser');
  const formData = new FormData();

  dados.date.forEach((arquivos) => {
    formData.append('arquivos', arquivos);
  });

  const response = await fetch(`https://localhost:7089/api/export`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.error('Erro na requisição:', response);
    throw new Error(`Erro no upload: ${response.status} - ${response.statusText}`);
  }

  const blob = await response.blob();
  return blob;
}




