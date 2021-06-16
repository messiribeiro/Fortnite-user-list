const form = document.querySelector('#search')
inputData = document.querySelector('#user-nick')
const sectionRender = document.querySelector(".section-render")
let data = false;
let nick = null

if (localStorage.getItem('nick')) {
    getUserProfile(localStorage.getItem('nick'))
}



form.addEventListener('submit', (event) => {
    event.preventDefault()

    checkInput()

})

async function getUserProfile(user) {

    try {
        const response = await fetch(`https://fortnite-api.com/v1/stats/br/v2?name=${user}`)
        data = await response.json()

        if (data.status === 404) {
            sectionRender.innerHTML = ''

            const msg = document.createElement('p')
            msg.classList.add('msg')
            msg.innerHTML = 'Ops! I think you did something wrong 🤔'
            sectionRender.appendChild(msg)
        } else {
            if (!(data.data.account.name == nick)) {
                render(data)

            }

        }

    } catch (err) {
        console.log(err)
    }





}


function checkInput() {
    if (inputData.value == '') {
        inputData.style.border = '2px solid rgba(255, 0, 0, 0.651)'
        inputData.style.backgroundColor = ' rgba(255, 0, 0, 0.1)';

        inputData.onblur = () => {
            inputData.style.border = '2px solid rgba(12, 180, 166, 0.342)'
            inputData.style.backgroundColor = ' rgba(12, 180, 166, 0.342)';

        }

    } else {
        getUserProfile(inputData.value)

    }
}


function render(data) {

    sectionRender.innerHTML = ``

    const div = document.createElement("div")
    div.classList.add("container")

    const section = document.createElement("section")
    section.classList.add("user-profile")

    div.appendChild(section)

    sectionRender.appendChild(div)

    section.innerHTML = `
    <h1>${data.data.account.name}</h1>
    <div id="informations">
        <p id="level">Battle Pass Level: ${data.data.battlePass.level}</p>
        <p id="level">Wins: ${data.data.stats.all.overall.wins}</p>
        <p>Kills: ${data.data.stats.all.overall.kills} </p>
        <p>Win Rate: ${data.data.stats.all.overall.winRate} </p>
        <p>Horas Jogadas: ${Math.round((data.data.stats.all.overall.minutesPlayed) / 60)}</p>

        <p>K/D: 5.6</p>

    </div>
    `

    localStorage.setItem('nick', data.data.account.name)
    nick = data.data.account.name

}