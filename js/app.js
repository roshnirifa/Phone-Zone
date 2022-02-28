const searchAllPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = "";
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('phn-info').innerHTML = '';


    // search error

    if (searchFieldText == '') {
        alert('please write something to display')
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySerachResult(data.data))
    }
}

const displaySerachResult = phones => {
    // console.log(phones);
    for (const phone of phones) {
        console.log(phone);
        const searchResult = document.getElementById('search-result');
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <div class="col">
                    <div class="card  ">
                        <img src="${phone.image}" class="card-img-top w-50 p-4" alt="...">
                        <div class="card-body">
                        <h4> Phone Name : ${phone.phone_name} </h4>
                        <h5 class="card-title">Brand: ${phone.brand}</h5>
                        <button onclick="PhoneInfo('${phone.slug}')" class="btn btn-success"> Details</button>
                        </div
                    </div >
                </div >

    `;
        searchResult.appendChild(div);

    }
}
const PhoneInfo = (info) => {
    // console.log(info);

    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneInfo(data.data))

}
const showPhoneInfo = (idInfo) => {
    // console.log(idInfo);
    document.getElementById('phn-info').innerHTML = `
                <div class="card mb-3 w-50 mx-auto">
                    <img src="${idInfo.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
                    <div class="card-body">
                        <h2> Phone Name : ${idInfo.name} </h2>
                        <h3> Release Date : ${idInfo.releaseDate} </h3>
                    <p>
                        <h5>Main Features:</h5> <br>
                            <b>Stroages:</b> ${idInfo.mainFeatures.storage} <br>
                             <b>Chip:</b> ${idInfo.mainFeatures.chipSet} <br>
                             <b>Memory:</b> ${idInfo.mainFeatures.memory} <br>
                             <b> Sensors:</b> ${idInfo.mainFeatures.sensors}<br>
                   <h5> Others:</h5>
                    <p>
                         <b>WALN</b>:  ${idInfo.others.WLAN} <br>
                         <b>Bluetooth </b> ${idInfo.others.Bluetooth}<br>
                        <b>GPS: </b> ${idInfo.others.GPS}<br>
                         <b>NFC: </b> ${idInfo.others.NFC}<br>
                         <b>Radio: </b> ${idInfo.others.Radio}<br>
                             <b> USB : </b> ${idInfo.others.USB} 
                    </p>     
                    </div>
                </div>
            
    `
}
