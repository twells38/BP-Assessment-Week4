const baseUrl = `http://localhost:4000`
const fortuneButton = document.getElementById("fortuneBtn")
const showAllFortuneBtn = document.getElementById('showAllFortune')
const display = document.getElementById('display-section')
const fortuneInput = document.getElementById('addFortune')
const createForm = document.getElementById('createForm')
const updateFortuneInput = document.getElementById('update-fortune')
const updateForm = document.getElementById('updateForm')
const text_id = document.getElementById('text-id')
//get random fortune
const getRandomFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            console.log(res.data)
            alert(data);
            document.body.style.backgroundColor = "hsla(0, 100%, 90%, 0.3)"
        }).catch((error) => {
            console.error('error')
        });
};

fortuneButton.addEventListener('click', getRandomFortune)
/*****/

// create fortune
function createFortune(fortuneArr) {
    display.innerHTML = ''
    fortuneArr.map((fortune) => {
        const elemDiv = document.createElement('div')
        elemDiv.innerHTML = `
          <ul>
          <div class='display'>
          <div class='text-container'>
          <li style="list-style:none;">${fortune.textId}: ${fortune.text}
          </li>
          </div>
          <div class='trash-icon'>
          <span id='deleteBtn' onclick = 'deleteFortune(${fortune.textId})'><i class="fa-solid fa-trash-can"></i>
          </span>
          </div>
         
         </div>
          </ul>
        `
        display.appendChild(elemDiv)
    })
    
    
}
//get all fortune
const getAllFortune = () => {
    axios.get("http://localhost:4000/api/showAllfortune/")
        .then(res => {
            console.log(res.data) // array object
            createFortune(res.data)
           
        }).catch((err) => {
        console.error(err)
    })
}
//show all fortune button, when it is clicked trigger addEvenListener invoke getAllFortune()

showAllFortuneBtn.addEventListener('click', getAllFortune)

// /******/

// add new fortune to fortune database
const addFormFortune = (e)=>{
    e.preventDefault()
    const body = {
        text: fortuneInput.value
    }
    axios
        .post('http://localhost:4000/api/addFortune', body)
        .then((res) => { createFortune(res.data) })
        .catch((err) => {
             console.error(err)
         })
    fortuneInput.value = ''
}
createForm.addEventListener('submit', addFormFortune )
/**** */

// update fortune
const updateFortune = (e) => {
    e.preventDefault()
    console.log(text_id.value, updateFortuneInput.value)
    
    axios.put(`${baseUrl}/api/addFortune/${text_id.value}?newFortuneInput=${updateFortuneInput.value}`)
        .then(res => createFortune(res.data))
        .catch(err => {
            console.error(err)
        })
    text_id.value = ''
    updateFortuneInput.value = ''
}
updateForm.addEventListener('submit', updateFortune)

/*****/

//delete fortune
const deleteFortune = (id) => {
    axios.delete(`${baseUrl}/api/addFortune/${id}`)
        .then(res => createFortune(res.data))
        .catch(err => console.error(err))
}
/*** */