import { useRef, useState } from "react";
import ModalComponents from "./components/Modal";



function PDF({downloadPdf,index,setListData,listData,deleteMois}) {
  // const [listData,setListData] = useState([])

  const [nom,setNom] = useState('')
  const [prenom,setPrenom] = useState('')
  const [dateDebut,setDateDebut] = useState('')
  const [dateFin,setDateFin] = useState('')

  const pdfRef = useRef()

  const convertDateFormat = (dateStr) => {
    const parts = dateStr.split('-'); // Splits the date into [YYYY, MM, DD]
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Rearranges parts to DD/MM/YYYY
}


  const calculateSumOfHeureAndMin = () => {
    let sumHeure = 0
    let sumMin = 0
    listData.map((value) => {
      value.listFormation.map((formationValue) => {
        sumHeure += parseInt(formationValue.heure)
        sumMin += parseInt(formationValue.min)
      })
    })
    sumHeure += Math.floor(sumMin / 60)
    sumMin = sumMin % 60
    return sumHeure+'h '+sumMin+'min'

  }


  const handleChange = (event,inputName) => {
    // Update state with input's current value
    // setNom(event.target.value);
    switch(inputName){
      case 'Nom' : setNom(event.target.value);break;
      case 'Prenom': setPrenom(event.target.value);break;
      case 'Debut': setDateDebut(event.target.value);break;
      case 'Fin': setDateFin(event.target.value);break;
    }
  };











  return (
    <>
    <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'100%'}}>
        <div class="container px-5 my-5">
        <div>
            <div class="checkbox">
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="nom" type="text" placeholder="Nom" onChange={(e) => handleChange(e,'Nom')} />
                <label for="nom">Nom</label>
                <div class="invalid-feedback" data-sb-feedback="nom:required">Nom is required.</div>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="prenom" type="text" placeholder="Prénom" data-sb-validations="required" onChange={(e) => handleChange(e,'Prenom')}   />
                <label for="prenom">Prénom</label>
                <div class="invalid-feedback" data-sb-feedback="prenom:required">Prénom is required.</div>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="dateDeDebut" type="date" placeholder="Date De Début" data-sb-validations="required" onChange={(e) => handleChange(e,'Debut')}   />
                <label for="dateDeDebut">Date De Début</label>
                <div class="invalid-feedback" data-sb-feedback="dateDeDebut:required">Date De Début is required.</div>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="dateDeFin" type="date" placeholder="Date De Fin" data-sb-validations="required" onChange={(e) => handleChange(e,'Fin')}   />
                <label for="dateDeFin">Date De Fin</label>
                <div class="invalid-feedback" data-sb-feedback="dateDeFin:required">Date De Fin is required.</div>
            </div>
            <ModalComponents listData={listData} setListData={setListData} index={index} />

            {
              listData
              .filter((value) => value.index === index)
              .map((value,index) =>
              <div key={index} className="mb-2" >
                <div className="d-flex align-items-center">
                    <h4 >{value.mois} {value.annee}</h4>
                    <button className="btn btn-danger mx-3" onClick={()=>deleteMois(value)}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                    </button>
                </div>
              </div>
                
                )
            }


            <div class="d-grid">
                <button onClick={() => downloadPdf(pdfRef)} class="btn btn-primary btn-lg" id="submit" type="button">Download</button>
            </div>
            <div class="d-grid" style={{margin: '10px 0'}}>
              {/* <button class="btn btn-danger btn-lg" id="delete"  type="submit">Delete</button>          */}
            </div>
        </div>
    </div>
        </div>
        <div style={{width:'220mm'}} >
        <div className='' style={{width:'210mm',height:"297mm",backgroundColor:'#f2f2f2',position:'relative',margin:'auto'}} ref={pdfRef}>
          <header style={{color:'white',textAlign:'center',padding:'90px',borderBottomLeftRadius:"35px",borderBottomRightRadius:"35px"}}>
            <h2 style={{fontSize:'16px',fontWeight:'700',position:'absolute',top:'30px',left:'100px'}}>Temps De Formation</h2>
            <h1 style={{fontSize:'26px',fontWeight:'700',position:'absolute',top:'60px',left:'100px'}}>{nom.toUpperCase()} {prenom}</h1>
            <div class="all-card" style={{position:'absolute',left:'0',top:'70px',padding:'20px',margin:'40px 0',display:'flex',gap:'25px',justifyContent:'center',width:'100%'}}>
                <div class="myCard" style={{backgroundColor:'white'}}>
                    <div class="icon bg--bleu">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{color:"white"}} width="22" height="22" fill="currentColor" class="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                          </svg>
                    </div>
                    <div class="card-content" style={{backgroundColor:'white'}}>
                        <h6>Date de début :</h6>
                        <h5>{dateFin?convertDateFormat(dateDebut):''}</h5>
                    </div>
                </div>
                <div class="myCard" style={{backgroundColor:'white'}}>
                    <div class="icon bg--bleu">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{color:"white"}} width="22" height="22" fill="currentColor" class="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                          </svg>
                    </div>
                    <div class="card-content" style={{backgroundColor:'white'}}>
                        <h6>Date de fin :</h6>
                        <h5>{dateFin?convertDateFormat(dateFin):''}</h5>
                    </div>
                </div>
                <div class="myCard" style={{boxShadow: '0 0 10px rgba(0,0,0,0.1)',backgroundColor:'white'}}>
                    <div class="icon bg--red">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{color:"white"}} width="22" height="22" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                          </svg>
                    </div>
                    <div class="card-content" style={{backgroundColor:'white'}}>
                        <h6>Durée :</h6>
                        <h5>{calculateSumOfHeureAndMin()}</h5>
                    </div>
                </div>
                <div class="myCard flex justify-content-center" style={{backgroundColor:'white'}}>
                   <img src="/logo_MB.png" width='140px' />
                </div>
            </div>
          </header>
          
          <div className=''>
             <div className='' style={{backgroundColor:'#298bb1',margin:'70px 20px 0 20px',height:'35px',display:'flex',padding:'5px 10px',borderRadius:'5px'}}>
              <p style={{color:'white',margin:'0',width:'75%',fontSize:'15px',fontWeight:'600'}}>MODULE DE FORMATION SUIVI</p>
              <p style={{color:'white',margin:'0',width:'25%',textAlign:'right',fontSize:'15px',fontWeight:'600'}}>TEMPS DE SUIVI</p>
            </div>
              {
              listData
              .filter((value) => value.index === index)
              .map((value,index) =>
              <div key={index}>
              <div  style={{margin:'0px 20px',height:'35px',display:'flex',padding:'5px 10px',borderRadius:'5px'}}>
                <p style={{color:'white',margin:'0',width:'75%',fontSize:'15px',fontWeight:'600',color:'black'}}>
                  {value.mois} {value.annee}
                </p>
                <p style={{color:'white',margin:'0',width:'25%',textAlign:'right',fontSize:'15px',fontWeight:'600',color:'black'}}>{value.sumOfHeureAndMin}</p>
              </div>
                
              {
                                    
              value.listFormation.map((formationValue,index) => 
              <div  style={{margin:'3px 20px',display:'flex',padding:'5px 10px',borderRadius:'5px',backgroundColor:'white'}}>
              <p style={{margin:'0',width:'75%',fontSize:'13px',fontWeight:'600',color:'#555555'}}>
              {formationValue.titre}
              </p>
              <p style={{margin:'0',width:'25%',textAlign:'right',fontSize:'13px',fontWeight:'600',color:'#555555'}}>
                {formationValue.heure}h {formationValue.min}min
              </p>
            </div>
              )
                        
              }
                </div>
                )
            }


          </div>
          <div style={{position:'absolute',left:'',top:'280mm',width:'100%',textAlign:'center'}}>
            <h6 style={{fontSize:'10px',color:"#444444",margin:'3px 0'}}>MB Institut SAS, Capital : 1000 € - SIRET : 89034821200022 - NAF : 8559B</h6>
            <h6 style={{fontSize:'10px',color:"#444444",margin:'3px 0'}}>4 Rue PAU CASALS - 92100 BOULOGNE BILLANCOURT - FRANCE</h6>
            <h6 style={{fontSize:'10px',color:"#444444",margin:'3px 0'}}>Déclaration d'activité enregistrée sous le numéro 11922366792</h6>
            <h6 style={{fontSize:'10px',color:"#444444",margin:'3px 0'}}>www.mbinstitut.com - E-mail : contact@mbinstitut.com</h6>
      </div>
      </div>

        </div>
    </div>




    </>
  );




}

export default PDF