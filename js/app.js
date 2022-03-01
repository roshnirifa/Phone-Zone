const searchAllPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = "";
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('phn-info').innerHTML = '';
    document.getElementById('iphn-mini').innerHTML = '';
    // sppiner
    document.getElementById('spinner').style.display = "block";



    // search error

    if (searchFieldText == '') {
        alert('please write something to display');

    }

    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status === false) {
                    alert('No Phone found');
                }
                else {
                    displaySerachResult(data.data.slice(0, 20))
                }
            })
    }
}
// showing the search result
const displaySerachResult = phones => {
    // console.log(phones);
    for (const phone of phones) {
        // console.log(phone);
        const searchResult = document.getElementById('search-result');
        const div = document.createElement('div')
        div.classList.add('col')
        document.getElementById('spinner').style.display = "none";
        div.innerHTML = `
       
                <div class="col text-center mx-auto">
                    <div class="card  ">
                        <img src="${phone.image}" class="card-img-top w-50 p-2 text-center mx-auto" alt="...">
                        <div class="card-body">
                            <h4> Phone Name : ${phone.phone_name} </h4>
                            <h5 class="card-title">Brand: ${phone.brand}</h5>
                            <a  onclick="PhoneInfo('${phone.slug}')" class="btn btn-success px-5 mt-2" type ="button"> Details</a>
                        </div
                    </div> 
              
                </div>
        
    `;
        searchResult.appendChild(div);

    }
}


// phone detailes
const PhoneInfo = (info) => {
    // console.log(info);
    if (info === "apple_iphone_13_mini-11104") {
        const iphn13miniUrl = `https://openapi.programming-hero.com/api/phone/${info}`
        fetch(iphn13miniUrl)
            .then(res => res.json())
            .then(data => iphnMiniInfo(data.data))
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phone/${info}`
        fetch(url)
            .then(res => res.json())
            .then(data => showPhoneInfo(data.data))
    }

}
// iphn13 mini data
const iphnMiniInfo = (idInfomini) => {
    // console.log(idInfomini);
    // sppiner
    document.getElementById('phn-info').innerHTML = "";
    document.getElementById('iphn-mini').innerHTML = `
    <div class="card mb-3 w-50 mx-auto" >
        <img src="${idInfomini.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
        <div class="card-body">
            <h2> Phone Name : ${idInfomini.name} </h2>
            <h4 id="releaseDate"> Release Date :${idInfomini.releaseDate ? `${idInfomini.releaseDate}` : `Not Found`}</h4>
        <p>
            <h5>Main Features:</h5>
            <b>Stroages:</b> ${idInfomini.mainFeatures.storage} <br>
            <b>Chip:</b> ${idInfomini.mainFeatures.chipSet} <br>
            <b>Memory:</b> ${idInfomini.mainFeatures.memory} <br>
            <b> Sensors:</b> ${idInfomini.mainFeatures.sensors}<br><br>
      
        </p>   
        <h5> Others:</h5>
            <p>
                 <b>WALN</b>: Not Found  <br>
                 <b>Bluetooth:</b> Not Found  <br>
                <b>GPS:</b>Not Found  <br>
                 <b>NFC:</b> Not Found  <br>
                 <b>Radio: </b> Not Found <br>
                     <b> USB :</b> Not Found  
            </p>       
        
        </div>
</div>
    
    `

}
const showPhoneInfo = (idInfo) => {
    // console.log(idInfo);
    document.getElementById('iphn-mini').innerHTML = '';
    document.getElementById('phn-info').innerHTML = `
        <div class="card mb-3 w-50 mx-auto">
            <img src="${idInfo.image}" class="card-img-top w-50 mx-auto p-4" alt="...">
            <div class="card-body">
                <h2> Phone Name : ${idInfo.name} </h2>
                <h4 id="releaseDate"> Release Date :${idInfo.releaseDate ? `${idInfo.releaseDate}` : `Not Found`}</h4>
            <p>
                <h5>Main Features:</h5>
                    <b>Stroages:</b> ${idInfo.mainFeatures.storage} <br>
                     <b>Chip:</b> ${idInfo.mainFeatures.chipSet} <br>
                     <b>Memory:</b> ${idInfo.mainFeatures.memory} <br>
                     <b> Sensors:</b> ${idInfo.mainFeatures.sensors}<br><br>
           <h5> Others:</h5>
            <p>
                 <b>WALN</b>: ${idInfo.others.WLAN} <br>
                 <b>Bluetooth </b> ${idInfo.others.Bluetooth}<br>
                <b>GPS: </b> ${idInfo.others.GPS}<br>
                 <b>NFC: </b> ${idInfo.others.NFC}<br>
                 <b>Radio: </b> ${idInfo.others.Radio}<br>
                     <b> USB : </b> ${idInfo.others.USB} 
            </p>     
            </div>
        </div>
    
`;

}
