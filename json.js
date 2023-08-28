function loadData(search = 'iphone') {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        .then(response => response.json())
        .then(json => displayData(json.data))
    loading(true);
}

function search() {
    if (document.getElementById('searchBar').value == '') {
        alert("Search Keyword is an Empty String")
    } else {

        loadData(document.getElementById('searchBar').value);
    }

}

function showAll() {

    if (document.getElementById('all&LessButton').innerText == 'ALL') {
        document.getElementById('all&LessButton').innerText = 'Less';
    } else {
        document.getElementById('all&LessButton').innerText = 'ALL';
    }
    loadData();

}

loadData();

function displayData(data) {

    if (data == '') {
        document.getElementById('showbtn').classList.add('hidden');
        document.getElementById('errorBox').classList.remove('hidden');
        loading(false)

    } else {
        document.getElementById('showbtn').classList.remove('hidden');
        document.getElementById('errorBox').classList.add('hidden');
        const section = document.getElementById('cards')
        section.textContent = '';
        const AllLess = document.getElementById('all&LessButton')
        var dataSort = data.slice(0, 6)

        if (AllLess.innerText == 'ALL') {
            var calculativeData = dataSort;
        } else {
            calculativeData = data;

        }
        calculativeData.forEach(phones => {
            let card = document.createElement('div');
            card.setAttribute("class", "card px-10 pt-10 w-96 bg-base-100 shadow-xl")
            card.innerHTML = `
        <figure class="px-10 pt-10 bg-[#0D6EFD0D]">
            <img src="${phones.image}" alt="Mobile" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phones.phone_name}</h2>
            <p class=" text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
            <h1 class="font-bold text-2xl">$ <span>999</span></h1>
            <div class="card-actions">
                <button id="detailButton" onclick="my_modal_5.showModal();loadData2('${phones.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>

        `
            section.appendChild(card);
            loading(false)

        });
    }


}

function loadData2(slug) {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(json => modalDisplay(json.data))
}

function modalDisplay(data) {
    document.getElementById('phoneName').innerText = data.name;
    document.getElementById('storage').innerText = data.mainFeatures.storage;
    document.getElementById('display').innerText = data.mainFeatures.displaySize;
    document.getElementById('chipset').innerText = data.mainFeatures.chipSet;
    document.getElementById('memory').innerText = data.mainFeatures.memory;
    document.getElementById('slug').innerText = data.slug;
    document.getElementById('releaseDate').innerText = data.releaseDate;
    document.getElementById('brand').innerText = data.brand;
    document.getElementById('gps').innerText = data.others.GPS;

}

function loading(isTrue) {
    if (isTrue) {
        document.getElementById('loading').classList.remove('hidden');
    } else {
        document.getElementById('loading').classList.add('hidden');
    }
}