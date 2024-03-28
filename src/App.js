import { useState } from "react";

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import PDF from "./PDF";
import PDF2 from "./PDF_2";





function App() {

  const [listData,setListData] = useState([])


  const [listRef,setListRef] = useState([1])






  const downloadPdf = (pdfRef) => {
    const input = pdfRef.current
    html2canvas(input)
      .then(canvas => {
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4',true);
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeigth = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth , pdfHeight / imgHeigth);
        const imgX = (pdfWidth - imgWidth *ratio ) / 2;
        const imgY = 0;
        pdf.addImage(imgData,'PNG',imgX,imgY, imgWidth*ratio, imgHeigth*ratio);
        pdf.save('new.pdf')
      })
  }

  const addPage = () => {
    console.log(listRef)
    setListRef(prev => [...prev,Math.max(...prev)+1])
  }

  const deletePage = (index) => {
    console.log('delete',index)
    setListRef(prev => {
      return prev.filter(value => value != index)
    })
  }

  const deleteMois = (value) => {
    setListData(prev => {
      console.log(value.mois)
      console.log(value.annee)
      console.log(value.index)

      return prev.filter((val,index) => val.index !== value.index || val.mois !== value.mois || val.annee !== value.annee)
    })
    
  }

  return (
    <>
    <div style={{marginBottom:'5px'}}>
      <PDF  downloadPdf={downloadPdf} index={1} listData={listData} setListData={setListData} deleteMois={deleteMois}  />
    </div>

    {
      listRef.map((value,index) => 
        value !== 1 &&
        <div style={{marginBottom:'5px'}} key={index} >
          <PDF2 downloadPdf={downloadPdf} index={value} listData={listData} setListData={setListData} deletePage={deletePage} deleteMois={deleteMois}/>
        </div> 
      )
    }
    <button onClick={addPage} className="btn btn-primary">Ajouter Page</button>
    
    </>
  )
}

export default App;
