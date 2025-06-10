const website = "https://frapollif.github.io/pet-adoption-data"

async function getPetsData() {
    const data = await fetch(`${website}/pets.json`)
    const petsdata = await data.json()
    return petsdata
}


async function displayPets(){

    const pets = await getPetsData();
    const template = document.querySelector('#animal-card-template')

    const wrapper = document.querySelector('main')

      function ageText(age) {
        if (age > 1) {
            return age + ' years old'
        } else if (age == 1) {
            return age + ' year old'
        } else {
            return 'less than a year old'
        }
    }


    pets.forEach( pet =>{
        const clone = template.content.cloneNode(true)

        // qui modifichiamo il template
        // Nome animale
        const name = clone.querySelector('.animal-name')
        name.textContent=pet.name;

        const ageclass = clone.querySelector('.animal-age')
        const d = new Date();
        let age = d.getFullYear() - pet.birthYear;
        ageclass.innerText = ageText(age)

        const species = clone.querySelector('.species');
        species.textContent=pet.species.charAt(0).toUpperCase() + pet.species.slice(1);

        const description = clone.querySelector('.animal-description')
        description.textContent = pet.description;
        clone.querySelector('.btn-name').textContent = pet.name

        const adoptBtn = clone.querySelector('.adopt-button')
        // adoptBtn.action = `${website}/pets/${pet.id}/`
        adoptBtn.href = `${website}/pets/${pet.id}/`
        // aggiorniamo la foto
        const image = clone.querySelector('.animal-card-photo img')
        image.src=pet.photo
        // console.log(pet.photo)

        //aggiungiamo l'articolo alla pagaina
        wrapper.appendChild(clone)

        }
    )

}


displayPets()
