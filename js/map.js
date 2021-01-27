var map = L.map('map', {
    center: [42.550651, 12.105600],
    zoom: 6.2,
    maxBounds: [[35.354438, 1.087694], [49.003742, 23.123505]],
    maxZoom: 11,
    minZoom: 6.2,
    attributionControl: false,
    zoomControl: false,
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWNvbml0dXMiLCJhIjoiY2trNGppencyMDFxNjJubzBwa3ZoMWw3eCJ9.q5TzubW0nKMfw1l0FPkMNw'
}).addTo(map);

function showInfo(biv, id)
{
    var open = biv.open ? '<h2 class="green">Open!</h2>' : '<h2 class="red">Closed</h2>';
    
    var gallery = '';
    for(i = 0; i < biv.images; i++)
    {
        switch(i)
        {
            case 0:
                gallery += `<div class="cssbox"> <a id="image0" href="#image0"> <img class="biv-thumb" src="img/bivs/${id}-0.jpg"> <span class="cssbox_full"> <img src="img/bivs/${id}-0.jpg"> </span> </a> <a class="cssbox_close" href="#void"></a> <a class="cssbox_next" href="#image1">&gt;</a> </div>`;
                break;
            
            case biv.images - 1:
                gallery += `<div class="cssbox"> <a id="image${i}" href="#image${i}"> <span class="cssbox_full"> <img src="img/bivs/${id}-${i}.jpg"> </span> </a> <a class="cssbox_close" href="#void"></a> <a class="cssbox_prev" href="#image${i - 1}">&lt;</a> </div>`;
                break;

            default:
                gallery += `<div class="cssbox"> <a id="image${i}" href="#image${i}"> <span class="cssbox_full"> <img src="img/bivs/${id}-${i}.jpg"> </span> </a> <a class="cssbox_close" href="#void"></a> <a class="cssbox_prev" href="#image${i - 1}">&lt;</a> <a class="cssbox_next" href="#image${i + 1}">&gt;</a> </div>`;
                
        }
    }

    var difficulty = '';
    switch(biv.difficulty)
    {
        case 0:
            difficulty = '<span class="green">Easy</span>';
            break;

        case 1:
            difficulty = '<span class="orange">Moderate</span>';
            break;

        case 2:
            difficulty = '<span class="red">Hard</span>';
            break;
    }

    var comments = '';
    biv.comments.forEach((comment, i) => {
        if(i !== 0)
            comments += `<div class="comment"> <div class="user"> <img class="avatar" src="img/avatars/ava${comment.avatar}.svg" alt="Avatar picture"> <span class="username">${comment.name}</span> </div><span class="comment-text">${comment.text !== '' ? comment.text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ea accusamus error. Molestias, perspiciatis ipsam? Ab aut tenetur minima numquam, vitae obcaecati repellendus itaque voluptatum illo nesciunt doloremque consequuntur ullam.'}</span> </div>`;
    });

    var busy;
    switch(biv.busy)
    {
        case 0:
            busy = '<span>Probably <span class="green">unoccupied</span> tonight.</span>';
            break;

        case 1:
            busy = '<span><span class="orange">Moderately</span> busy tonight.</span>';
            break;

        case 2:
            busy = '<span>Probably <span class="red">busy</span> tonight.</span>';
            break;
    }

    var result = 
    `<div class="biv">
        <div class="biv-title">
            <div class="title">
                <h1>${biv.name}</h2>
                <h3>${biv.location}</h4>
            </div>
            ${open}
        </div>
        <hr>
        <div class="biv-gallery">
            ${gallery}
            <p style="color: gray;"><i>Click on the picture to check user-submitted photos...</i></p>
        </div>  
        <hr>
        <div class="biv-directions">
            <div class="directions">
                <h3>How to reach:</h3>
                <p>${biv.directions}</p>
                <br>
                <span>Time required: </span>
                <span><i>${biv.time}</i></span>
                <br>
                <span>Difficulty:</span>
                ${difficulty}
            </div>
        </div>
        <hr>
        <div class="biv-comments">
            <div class="comment">
                <div class="user">
                    <img class="avatar" src="img/avatars/ava${biv.comments[0].avatar}.svg" alt="Avatar picture">
                    <span class="username">${biv.comments[0].name}</span>
                </div>
                <span class="comment-text">${biv.comments[0].text}</span>
            </div>
            <a class="btn" href="#comments-modal">View more comments</a>
            <div id="comments-modal" class="modal-window">
                <div class="custom-scrollbar">
                    <a href="#" title="Close" class="modal-close">&#215;</a>
                    ${comments}
                </div>
            </div>
        </div>
        <hr>
        <div class="biv-services">
            <div class="services">
                <div class="service">
                    <img src="img/icons/water_${biv.water ? 'on' : 'off'}.png" alt="Water${biv.water ? '' : ' not'} available" class="service-icon">
                    <span><b>Water</b></span>
                </div>
                <div class="service">
                    <img src="img/icons/current_${biv.current ? 'on' : 'off'}.png" alt="Current${biv.current ? '' : ' not'} available" class="service-icon">
                    <span><b>Current</b></span>
                </div>
                <div class="service">
                    <img src="img/icons/beds_${biv.beds ? 'on' : 'off'}.png" alt="Beds${biv.beds ? '' : ' not'} available" class="service-icon">
                    <span><b>Beds</b></span>
                </div>
                <div class="service">
                    <img src="img/icons/heater_${biv.heater ? 'on' : 'off'}.png" alt="Heater${biv.heater ? '' : ' not'} available" class="service-icon">
                    <span><b>Heater</b></span>
                </div>
            </div>
            <div class="check-in">
                ${busy}
                <a class="btn" href="#">Check-in</a>
            </div>
        </div>
    </div>`
    
    document.querySelector('.biv-wrapper').innerHTML = result;
}

var treeIcon = L.icon({
    iconUrl: 'img/icons/tree.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [40, 40],
    iconAnchor:   [21, 38],
});

data.forEach((biv, ind) => {
    new L.Marker([biv.lat, biv.long], {icon: treeIcon}).on('click', m => { showInfo(biv, ind) }).addTo(map);
});