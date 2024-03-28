import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

function ModalComponet({listData,setListData,index}) {
    const [modalShow, setModalShow] = useState(false);
    const [list,setList] = useState([])
    const {
        register,
        handleSubmit,
        setValue,
      } = useForm()
    
    const onSubmit = (data) => {
        setList(prevList => [
            ...prevList,
            {
                titre : data.titre,
                heure : data.heure,
                min   : data.min
            }
        ])
        setValue('titre','')
        setValue('heure','')
        setValue('min','')  
    }

    const deleteLine = (titre) => {
        setList(prev => prev.filter(value =>  value.titre !== titre))
    }
    const sumOfHeureAndMin = (list) => {
        let sumHeure = 0
        let sumMin = 0
        list.forEach(value => {
            sumHeure += parseInt(value.heure)
            sumMin += parseInt(value.min)
        })
        sumHeure += Math.floor(sumMin / 60)
        sumMin = sumMin % 60
        return sumHeure+'h '+sumMin+'min'
    }

    const afficherTable = (data) => {
        setListData(prev =>{  
            console.log(prev)
            return [
            ...prev,
            {
                mois : data.mois,
                annee : data.annee,
                index : index,
                sumOfHeureAndMin : sumOfHeureAndMin(list),
                listFormation : [
                    ...list
                ]
            }
        ]})
        setList([])
        setValue('titre','')
        setValue('heure','')
        setValue('min','')
        setModalShow(false)

    }

  return (
    <>
        <Button variant="primary" style={{margin:'10px 0'}} onClick={() => setModalShow(true)}>
            Ajouter Mois
        </Button>
        <Modal
        show={modalShow}
        onHide={()=>setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="form-floating mb-3">
                <select class="form-select" id="mois" {...register("mois")} >
                    <option value="Janvier">Janvier</option>
                    <option value="Février">Février</option>
                    <option value="Mars">Mars</option>
                    <option value="Avril">Avril</option>
                    <option value="Mai">Mai</option>
                    <option value="Juin">Juin</option>
                    <option value="Juillet">Juillet</option>
                    <option value="Août">Août</option>
                    <option value="Septembre">Septembre</option>
                    <option value="Octobre">Octobre</option>
                    <option value="Novembre">Novembre</option>
                    <option value="Décembre">Décembre</option>
                </select>
                <label for="mois">Mois</label>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="annee" type="text" placeholder="Année" {...register("annee")} />
                <label for="annee">Année</label>
                <div class="invalid-feedback" data-sb-feedback="annee:required">Année is required.</div>
            </div>
                  <div class="container my-4">
                    <div class="table-responsive shadow-sm rounded">
                        <table id="myTable" class="table align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" class="text-uppercase">Module de Formation Suivi</th>
                                    <th scope="col" class="text-uppercase">Durée en Heures</th>
                                    <th scope="col" class="text-uppercase">Durée en Minutes</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    
                                    <th scope="col">
                                        <input id="titre" class="form-control" type="text" {...register('titre')} />
                                    </th>
                                    <th scope="col">
                                        <input id="duree_en_heures" class="form-control" type="number" {...register('heure')} />
                                    </th>
                                    <th scope="col">
                                        <input id="duree_en_minutes" class="form-control" type="number" {...register('min')} />
                                    </th>
                                    <th scope="col">
                                        <button type="button" id="ajouter" class="btn btn-primary" onClick={handleSubmit(onSubmit)}>Ajouter</button>
                                    </th>
                                </tr>
                            
                            </thead>
                            <tbody>
                                {
                                list.map((value,index) => 
                                    <tr key={index}>
                                        <th scope="col" class="text-uppercase">{value.titre}</th>
                                        <th scope="col" class="text-uppercase">{value.heure}</th>
                                        <th scope="col" class="text-uppercase">{value.min}</th>
                                        <th scope="col">
                                        <button type="button" id="ajouter" class="btn btn-danger" onClick={() => deleteLine(value.titre)}>Delete</button>
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        </Modal.Body>
        <Modal.Footer>
            <button className='btn btn-secondary' onClick={()=>setModalShow(false)}>Close</button> 
            <Button onClick={handleSubmit(afficherTable)} >Save Changes</Button> 
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalComponet

