import { useRef } from "react";
import ModalComponents from "./components/Modal";



function PDF2({downloadPdf,index,listData,setListData,deletePage,deleteMois}) {
  
  const pdfRef = useRef()
  // const [emptyFile,setEmptyFile] = useState(false)
  // const [nom,setNom] = useState('')
  // const [prenom,setPrenom] = useState('')
  // const [dateDebut,setDateDebut] = useState('')
  // const [dateFin,setDateFin] = useState('')


//   const handleChange = (event,inputName) => {
//     // Update state with input's current value
//     // setNom(event.target.value);
//     switch(inputName){
//       case 'Nom' : setNom(event.target.value);break;
//       case 'Prenom': setPrenom(event.target.value);break;
//       case 'Debut': setDateDebut(event.target.value);break;
//       case 'Fin': setDateFin(event.target.value);break;
//     }
//   };











  return (
    <>
    <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{width:'100%'}}>
        <div class="container px-5 my-5">
        <div>
            <ModalComponents listData={listData} setListData={setListData} index={index} />
            {
              listData
              .filter((value) => value.index === index)
              .map((value,index) =>
                <div key={index} >
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
                <button onClick={()=>downloadPdf(pdfRef)} class="btn btn-primary btn-lg" id="submit" type="button">Download</button>
            </div>
            <div class="d-grid" style={{margin: '10px 0'}}>
              <button class="btn btn-danger btn-lg" id="delete" onClick={()=>deletePage(index)}  type="submit">Delete</button>         
            </div>
        </div>
    </div>
        </div>
        <div style={{width:'220mm'}} >
        <div className='' style={{width:'210mm',height:"297mm",backgroundColor:'#f2f2f2',position:'relative',margin:'auto'}} ref={pdfRef}>
          
          
          <div className=''>
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

export default PDF2